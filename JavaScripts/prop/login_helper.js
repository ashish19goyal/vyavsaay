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
	//console.log("funny---still loging online");
	ajax_with_custom_func("./ajax/login.php","domain="+domain+"&user="+username+"&pass="+pass,function(e)
	{
		login_status=e.responseText;
		var session_xml=e.responseXML;
		//console.log(login_status);
		//console.log("this is session variable"+session_xml);
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
			//console.log(num_svar);
			for(var z=0;z<num_svar;z++)
			{
				session_vars[session_var[0].childNodes[z].nodeName]=session_var[0].childNodes[z].innerHTML;
				//console.log();
			}
			ini_session(domain,username);
			set_session(session_vars);
			set_session_online();
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
	
	
	sklad.open(db_name,{
		version:2
	},function (err,database)
	{
		if(err)
		{
			console.log(err);
		}
		//console.log("reading session variables from database");		
		database.get('user_preferences', {},function(err,records)
		{
			//console.log("inside user_preferences table");
			if(err)
			{
				console.log(err);
			}
			var data=new Object();
			for(var row in records)
			{
				var row_data=records[row];
				if(row_data['type']=='template' || row_data['type']=='other')
				{
					data[row_data['name']]=row_data['value'];
				}
			};
			data.session='yes';
			data.domain=domain;
			data.username=username;
			if(data.offline==='online')
			{
				login_online(username,domain,pass);
			}
			else
			{
				database.get('user_profiles',{
					index:'username',
					range: IDBKeyRange.only(username)
					},function(err,records2)
				{
						for(var row in records2)
						{
							data.name=records2[row].name;
						}
	
						database.get('access_control',{
							},function(err,records3)
						{
								var re='';
								var cr='';
								var up='';
								var del='';
								for(var r in records3)
								{
									var r_data=records3[r];
									if(r_data.status==='active' && r_data.username===username)
									{
										if(r_data.re==='checked')
										{	
											console.log("re element "+r_data.element_id);
											re+=r_data.element_id+"-";
										}
										if(r_data.cr==='checked')
										{	
											console.log("cr element "+r_data.element_id);
											cr+=r_data.element_id+"-";
										}
										if(r_data.up==='checked')
										{
											console.log("up element "+r_data.element_id);
											up+=r_data.element_id+"-";
										}
										if(r_data.del==='checked')
										{
											console.log("del element "+r_data.element_id);
											del+=r_data.element_id+"-";
										}
									}
								}
								data.re=re;
								data.cr=cr;
								data.up=up;
								data.del=del;
								//console.log("these are session variables: "+data);
								set_session(data);
						});
				});
			}
		});
	
		//console.log("2.1 set_session_variables() exited");
	});
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
		console.log("3. inside try_local_db()");
		var db_name="re_local_" + domain;
		var request = indexedDB.open(db_name);
		
		request.onsuccess=function(e)
		{
			console.log("3. inside onsucess function of db access inside try_local_db_login");
			db=e.target.result;
			if(!db.objectStoreNames.contains("user_profiles"))
			{
				console.log("3.1 inside the if section of onsuccess function of try_local_db_login");
				var deleterequest=indexedDB.deleteDatabase(db_name);
				deleterequest.onsuccess=func_failure();
			}
			else
			{
				console.log("3.2 inside the else section of onsuccess function of try_local_db_login");
				var tran=db.transaction("user_profiles","readonly");
				var table = tran.objectStore("user_profiles");
				
				var index=table.index("username");
				var records=index.get(username);
				
				records.onsuccess=function(e)
				{
					var result;
					    // IE 9 implementation
						if(e.result){
							result = e.result;
							}
						// IE 10, Chrome and Firefox implementation
						else if (records.result){
							result = records.result;
							}
						console.log("3.3 successfully retrieved local password");
						
						func_success(result);
						
				};
				records.onerror=function(e)
				{
					console.log("could not retrieve password");
					func_failure();
				};
			}

			console.log("3. exiting onsucess function of db access inside try_local_db_login");
			db.close();
		};
		
		request.onerror = function(e)
		{
			console.log("db could not be opened, so login online");
			db=e.target.result;
			db.close();
			func_failure();
		};
	}
	else
	{
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

		ajax_with_custom_func("./ajax/user_db_creation.php","userid="+userid,function(e2)
		{
			if(e2.responseText=="")
			{
				ajax_with_custom_func("./ajax/register.php",post_data,function(e)
				{
					if(e.responseText=="successful")
					{
						$("#r_register").slideUp();
						document.getElementById("r_complete").innerHTML="Registration complete, proceed to <a href='#home'>login</a>";
					}
					else
					{
						document.getElementById("failed_register").innerHTML="An error occured, please try again.";
						console.log(e.responseText);
					}
					window.location.assign("index.php#register");	
					hide_loader();
				});
			}
			else
			{
				document.getElementById("failed_register").innerHTML="An error occured, please try again.";
				window.location.assign("index.php#register");	
				hide_loader();
			}	
		});
	}
}

/**
 * This function checks if the desired user id has already been taken
 */
function userid_validation()
{
	var form=document.getElementById('registeration');

	var userid=form.elements[1].value;
	
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
function emailid_validation()
{
	var form=document.getElementById('registeration');

	var emailid=form.elements[2].value;
	
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
