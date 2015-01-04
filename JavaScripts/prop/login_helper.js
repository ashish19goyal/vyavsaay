/**
 * This function executes the login opertation
 */
function login_action()
{
	show_loader();
	var form=document.getElementById('login');

	var l_id=form.elements[1].value;
	var index=l_id.indexOf("@");
	var domain="";
	var username="";
	if(index===-1)
	{
		domain=l_id;
		username="master";
	}
	else
	{
		domain=l_id.substr(index+1);
		username=l_id.substr(0,index);
	}
	var pass=form.elements[2].value;
	try_local_db_login(username,domain,function(result)
	{
		var password="p";
		if(result) { password=result.password;}
		var salt='$2a$10$'+domain+'1234567891234567891234';
		var salt_22=salt.substring(0, 29);
		
		var bcrypt = new bCrypt();
		bcrypt.hashpw(pass, salt_22, function(newhash)
		{
			if(newhash.substring(3)==password.substring(3))
			{
				set_session_variables(domain,username,pass);
			}
			else
			{
				login_online(username,domain,pass);
			}
			
		}, function() {});
		
	},function()
	{
		login_online(username,domain,pass);
	});
}


function login_online(username,domain,pass)
{
	ajax_with_custom_func("./ajax/login.php","domain="+domain+"&user="+username+"&pass="+pass,function(e)
	{
		login_status=e.responseText;
		var session_xml=e.responseXML;
		if(login_status=="failed_auth")
		{
			document.getElementById("failed_auth").innerHTML="Login failed, try again!";
			hide_loader();
		}
		else
		{
			var session_var=session_xml.getElementsByTagName('session');
			var session_vars=new Object();
			var num_svar=session_var[0].childElementCount;

			for(var z=0;z<num_svar;z++)
			{
				session_vars[session_var[0].childNodes[z].nodeName]=session_var[0].childNodes[z].innerHTML;
			}
			ini_session(domain,username);
			
			set_session_online(function()
			{
				set_session(session_vars);
			});
		}
	});

}


/**
 * This function sets the session variables from offline after the login is successful
 * @param domain
 * @param username
 */
function set_session_variables(domain,username,pass)
{
	//console.log("2. inside set_session_variables()");
	var db_name="re_local_"+domain;

	var request = indexedDB.open(db_name);
	request.onsuccess=function(e)
	{
		static_local_db=e.target.result;
		var report_string="-";
		var form_string="-";
		var data=new Object();

		static_local_db.transaction(['user_preferences'],"readonly").objectStore('user_preferences').openCursor().onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				
				if(record['type']=='report')
				{
					if(record['value']=='checked')
						report_string+=record['name']+"-";
				}
				else if(record['type']=='form')
				{
					if(record['value']=='checked')
						form_string+=record['name']+"-";
				}
				else
				{
					data[record['name']]=record['value'];
				}
				result.continue();
			}
			else
			{
				data.reports=report_string;
				data.forms=form_string;
				data.session='yes';
				data.domain=domain;
				data.username=username;
				if(data.offline==='online')
				{
					login_online(username,domain,pass);
				}
				else
				{
					var keyValue=IDBKeyRange.only(username);
					static_local_db.transaction(['staff'],"readonly").objectStore('staff').index('username').openCursor(keyValue).onsuccess=function(e)
					{
						var result2=e.target.result;
						if(result2)
						{
							data.name=result2.value.name;
						}
						var re='';
						var cr='';
						var up='';
						var del='';
						
						static_local_db.transaction(['access_control'],"readonly").objectStore('access_control').index('username').openCursor(keyValue).onsuccess=function(e)
						{
							var result3=e.target.result;
							if(result3)
							{
								var record3=result3.value;
								
								if(record3.status==='active')
								{
									if(record3.re==='checked')
									{	
										re+=record3.element_id+"-";
									}
									if(record3.cr==='checked')
									{	
										cr+=record3.element_id+"-";
									}
									if(record3.up==='checked')
									{
										up+=record3.element_id+"-";
									}
									if(record3.del==='checked')
									{
										del+=record3.element_id+"-";
									}
								}
								result3.continue();
							}
							else
							{
								data.re=re;
								data.cr=cr;
								data.up=up;
								data.del=del;
								set_session(data);
							}
						};
					};
				}
			}
		};
	};
};

/**
 * This function tries to check if local db exists and contains the right password
 * @param domain domain to look for the specific database
 * @param func_success function to be executed if the login is successful
 * @param func_failure fucntion to be executed if login fails
 */
function try_local_db_login(username,domain,func_success,func_failure)
{
	////////////checking if indexed db is supported/////////////////
	if("indexedDB" in window)
	{
		//console.log("3.1");
		var db_name="re_local_" + domain;
		var request = indexedDB.open(db_name);
		
		request.onsuccess=function(e)
		{
			//console.log("3.2");
			db=e.target.result;
			if(!db.objectStoreNames.contains("staff"))
			{
				//console.log("3.3");
				var deleterequest=indexedDB.deleteDatabase(db_name);
				deleterequest.onsuccess=function(ev)
				{
					//console.log("3.3.1");
					func_failure();
				};
			}
			else
			{
				//console.log("3.4");
				var tran=db.transaction("staff","readonly");
				var table = tran.objectStore("staff");
				
				var index=table.index("username");
				var records=index.get(username);
				
				records.onsuccess=function(e)
				{
					var result=records.result;
					func_success(result);
					//console.log("3.5");	
				};
				records.onerror=function(e)
				{
					//console.log("3.6");
					func_failure();
				};
			}
			//console.log("3.7");
			db.close();
		};
		
		request.onerror = function(e)
		{
			//console.log("3.8");
			db=e.target.result;
			db.close();
			func_failure();
		};
	}
	else
	{
		//alert('you browser doesnt support offline mode. Please upgrade');
		func_failure();
	}
};

/**
 * This fucntion validates that the passwords match during registration process
 */
function match_password()
{
	var form=document.getElementById('registeration');

	var pass1=form.elements[5].value;
	var pass2=form.elements[6].value;
	
	if(pass1==pass2 && pass1!="")
	{
		document.getElementById("password_match_validation").innerHTML="Match!!";
		document.getElementById("password_match_validation").value="correct";
	}	
	else
	{
		document.getElementById("password_match_validation").innerHTML="Passwords do not match!";
		document.getElementById("password_match_validation").value="incorrect";
	}
	
}


/**
 * This function is run to set the preferences during registration process
 */
function register_click()
{
	var form=document.getElementById('registeration');

	var userid=form.elements[1].value;
	var email=form.elements[2].value;
	var name=form.elements[3].value;
	var phone=form.elements[4].value;
	var pass=form.elements[5].value;
	var repass=form.elements[6].value;
	var e0=form.elements[7];
	var industry=e0.options[e0.selectedIndex].value;
	var userid_valid=document.getElementById("userid_validation").value;
	var emailid_valid=document.getElementById("emailid_validation").value;
	var pass_valid=document.getElementById("password_match_validation").value;
	
	
	if(userid_valid=="incorrect" || emailid_valid=="incorrect" || pass_valid=="incorrect")
	{
		document.getElementById("failed_register").innerHTML="Please update the incorrect fields to proceed!";
	}
	else	
	{
		show_loader();
		var post_data="userid="+userid+
						"&email="+email+
						"&name="+name+
						"&pass="+pass+
						"&industry="+industry+
						"&phone="+phone;

		ajax_with_custom_func("./ajax/user_db_creation.php","userid="+userid+"&industry="+industry,function(e2)
		{
			if(e2.responseText=="")
			{
				ajax_with_custom_func("./ajax/register.php",post_data,function(e)
				{
					if(e.responseText=="successful")
					{
						$("#r_register").slideUp();
						document.getElementById("r_complete").innerHTML="Registration complete, proceed to <a href='#home' onclick='display_login_box();'>login</a>";
					}
					else
					{
						document.getElementById("failed_register").innerHTML="An error occured, please try again.";
						console.log(e.responseText);
					}
					window.location.assign("#register");	
					hide_loader();
				});
			}
			else
			{
				console.log(e2.responseText);
				document.getElementById("failed_register").innerHTML="An error occured, please try again.";
				window.location.assign("#register");	
				hide_loader();
			}	
		});
	}
}

/**
 * This function checks if the desired user id has already been taken
 */
function userid_validation(userid)
{
	if(userid!="")
	{
		var match=userid.match(/[a-z0-9]*/i);
		//console.log(match);
		if(match[0].length!=userid.length)
		{
			document.getElementById("userid_validation").innerHTML="The UserId is invalid, it can only contain alpha-numeric characters";
			document.getElementById("userid_validation").value="incorrect";
		}
		else
		{
			ajax_with_custom_func("./ajax/verify_id.php","userid="+userid,function(e)
			{
				status=e.responseText;
				//console.log(status);
				if(status=="match")
				{
					document.getElementById("userid_validation").innerHTML="This ID already exists, choose a different ID.";
					document.getElementById("userid_validation").value="incorrect";
				}
				else
				{
					document.getElementById("userid_validation").innerHTML="User ID is available.";
					document.getElementById("userid_validation").value="correct";
				}
	
			});
		}
	}
}

/**
 * This function checks if the email id is already registered for an account
 */
function emailid_validation(emailid)
{
	if(emailid!="")
	{
		ajax_with_custom_func("./ajax/verify_id.php","&email="+emailid,function(e)
		{
			status=e.responseText;
			//console.log(status);
			if(status=="match")
			{
				document.getElementById("emailid_validation").innerHTML="This email ID is already registered, choose a different ID.";
				document.getElementById("emailid_validation").value="incorrect";
			}
			else
			{
				document.getElementById("emailid_validation").innerHTML="";
				document.getElementById("emailid_validation").value="correct";
			}

		});
	}
}


/**
 * This function is run to set the preferences during registration process
 */
function reseller_register_click()
{
	var form=document.getElementById('reseller_registeration');

	var userid=form.elements[1].value;
	var email=form.elements[2].value;
	var name=form.elements[3].value;
	var phone=form.elements[4].value;
	var userid_valid=document.getElementById("reseller_id_validation").value;
	var emailid_valid=document.getElementById("reseller_emailid_validation").value;
	
	
	if(userid_valid=="incorrect" || emailid_valid=="incorrect")
	{
		document.getElementById("reseller_failed_register").innerHTML="Please update the incorrect fields to proceed!";
	}
	else	
	{
		show_loader();
		var post_data="userid="+userid+
						"&email="+email+
						"&name="+name+
						"&phone="+phone;

		ajax_with_custom_func("./ajax/reseller_register.php",post_data,function(e)
		{
			if(e.responseText=="successful")
			{
				$("#reseller_r_register").slideUp();
				document.getElementById("reseller_r_complete").innerHTML="Congrats!! you are now reigstered as a reseller with Vyavsaay.";
			}
			else
			{
				document.getElementById("reseller_failed_register").innerHTML="An error occured, please try again.";
				console.log(e.responseText);
			}
			window.location.assign("#reseller_register");	
			hide_loader();
		});
	}
}

/**
 * This function checks if the desired user id has already been taken
 */
function reseller_id_validation(userid)
{
	if(userid!="")
	{
		var match=userid.match(/[a-z0-9]*/i);
		if(match[0].length!=userid.length)
		{
			document.getElementById("reseller_id_validation").innerHTML="The UserId is invalid, it can only contain alpha-numeric characters";
			document.getElementById("reseller_id_validation").value="incorrect";
		}
		else
		{
			ajax_with_custom_func("./ajax/reseller_verify_id.php","userid="+userid,function(e)
			{
				status=e.responseText;
				if(status=="match")
				{
					document.getElementById("reseller_id_validation").innerHTML="This ID already exists, choose a different ID.";
					document.getElementById("reseller_id_validation").value="incorrect";
				}
				else
				{
					document.getElementById("reseller_id_validation").innerHTML="User ID is available.";
					document.getElementById("reseller_id_validation").value="correct";
				}
	
			});
		}
	}
}

/**
 * This function checks if the email id is already registered for an account
 */
function reseller_emailid_validation(emailid)
{
	if(emailid!="")
	{
		ajax_with_custom_func("./ajax/reseller_verify_id.php","&email="+emailid,function(e)
		{
			status=e.responseText;
			//console.log(status);
			if(status=="match")
			{
				document.getElementById("reseller_emailid_validation").innerHTML="This email ID is already registered, choose a different ID.";
				document.getElementById("reseller_emailid_validation").value="incorrect";
			}
			else
			{
				document.getElementById("reseller_emailid_validation").innerHTML="";
				document.getElementById("reseller_emailid_validation").value="correct";
			}

		});
	}
}
