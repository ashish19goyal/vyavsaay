/**
 * this function initiates the session by using local storage
 * @param username
 */
function ini_session(domain,user)
{
	localStorage.setItem('domain',domain);
	localStorage.setItem('session','yes');
	localStorage.setItem('username',user);
}

/**
 * 
 * @param username
 * @param session_data
 */
function set_session(session_data)
{
	for(var field in session_data)
	{
		localStorage.setItem(field,session_data[field]);
	}
	window.location.assign("main.php");	
}

/**
 * 
 */
function set_session_var(name,value)
{
	localStorage.setItem(name,value);
}


/**
 * 
 * @returns {Boolean}
 */
function is_online()
{
	var offline=localStorage.getItem('offline');
	if(offline=="online")
		return true;
	else
		return false;
}


/**
 * 
 * @param ses_var
 * @returns
 */
function get_session_var(ses_var)
{
	var value=localStorage.getItem(ses_var);
	return value;
}

/**
 * this function returns the domain for the current session
 * @returns
 */
function get_domain()
{
	var domain=localStorage.getItem('domain');
	return domain;
}


/**
 * this function returns the username for the current session
 * @returns
 */
function get_username()
{
	var username=localStorage.getItem('username');
	return username;
}

/**
 * this function returns the name for the current session
 * @returns
 */
function get_name()
{
	var name=localStorage.getItem('name');
	return name;
}


/**
 * 
 * @returns {Boolean}
 */
function is_set_session()
{
	var sess=localStorage.getItem('session');
	if(sess=='yes')
		return true;
	else
		return false;
}

/**
 * 
 * @returns {String}
 */
function get_theme()
{
	var theme=localStorage.getItem('theme');
	if(theme==null)
	{
		theme="theme1";
	}
	var css="./CSS/"+theme+".css";
	return css;
}


function get_credit_period()
{
	var period=localStorage.getItem('credit_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*86400000);
	return p_time;
}


function get_debit_period()
{
	var period=localStorage.getItem('debit_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*86400000);
	return p_time;
}

function get_task_due_period()
{
	var period=localStorage.getItem('task_due_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*3600000);
	return p_time;
}

function get_task_due_time(raw_time)
{
	var period=localStorage.getItem('task_due_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=raw_time+(parseFloat(period)*3600000);
	return p_time;
}

/**
 * 
 */
function delete_session()
{
	localStorage.removeItem('session');
	localStorage.removeItem('domain');
	localStorage.removeItem('username');
	localStorage.clear();
	if(is_online())
	{
		window.location.assign("logout.php");
	}
	else
	{
		window.location.assign("index.php");
	}
}

function get_pamphlet_template()
{
	var template=localStorage.getItem('pamphlet');
	return template;
}


/**
 * This function sets the session variable to online and write it to db
 * @returns
 */
function set_session_online()
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			set_session_online();
		});
	}
	else
	{
		var objectStore=static_local_db.transaction(['user_preferences'],"readwrite").objectStore('user_preferences');
		
		var req=objectStore.index('name').get('offline');
		req.onsuccess=function(e)
		{
			var data=req.result;
			if(data)
			{
				data.value='online';
				var put_req=objectStore.put(data);
				put_req.onsuccess=function(e)
				{
					set_session_var('offline','online');
					hide_menu_items();
					hide_loader();
				};
			}
		};
		req.onerror=function(e)
		{
			console.log(this.error);
		};
	}
};

/**
 * This function sets the session variable to offline and write it to db
 * @returns
 */
function set_session_offline()
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			set_session_offline();
		});
	}
	else
	{
		var objectStore=static_local_db.transaction(['user_preferences'],"readwrite").objectStore('user_preferences');
		
		var req=objectStore.index('name').get('offline');
		req.onsuccess=function(e)
		{
			var data=req.result;
			if(data)
			{
				data.value='offline';
				var put_req=objectStore.put(data);
				put_req.onsuccess=function(e)
				{
					set_session_var('offline','offline');
					hide_menu_items();
					hide_loader();
				};
			}
		};
	}
};
