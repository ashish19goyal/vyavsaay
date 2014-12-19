/**
 * This function is called to switch the application mode to offline
 * @param username username to create a unique local database
 */
function switch_to_online()
{
	if(is_read_access('sync_mode'))
	{	
		show_progress();
		show_loader();
		var progress_timer=setInterval(function()
		{
			progress_value+=(2*(80-progress_value))/100;
		},3000);
		//console.log(localdb_open_requests);
		sync_local_to_server(function()
		{
			progress_value=80;
			clearInterval(progress_timer);
			var progress_timer=setInterval(function()
			{
				progress_value+=(2*(100-progress_value))/100;
			},3000);
			
			sync_server_to_local(function()
			{
				clearInterval(progress_timer);
				progress_value=100;
				set_session_online();
				hide_progress();
			});
		});
	}
	else
	{
		$("#modal_access_denied").dialog("open");
	}
}

/**
 * This function is called to switch the application mode to offline
 * @param username username to create a unique local database
 */
function switch_to_offline()
{
	if(is_read_access('sync_mode'))
	{
		var domain=get_domain();
		show_progress();
		show_loader();
		
		create_local_db(domain,function(e)
		{
			progress_value=5;
			var progress_timer=setInterval(function()
			{
				progress_value+=(2*(80-progress_value))/100;
			},3000);

			sync_server_to_local(function()
			{
				progress_value=80;
				clearInterval(progress_timer);
				var progress_timer=setInterval(function()
				{
					progress_value+=(2*(100-progress_value))/100;
				},3000);
				
				sync_local_to_server(function()
				{
					clearInterval(progress_timer);
					progress_value=100;
					set_session_offline();
					hide_progress();
				});
			});
		});
	}
	else
	{
		$("#modal_access_denied").dialog("open");
	}
}

/**
 * 
 */
function sync_local_and_server()
{
	if(is_read_access('sync'))
	{
		show_progress();
		show_loader();
		var progress_timer=setInterval(function()
		{
			progress_value+=(2*(70-progress_value))/100;
		},2000);
		
		sync_local_to_server(function()
		{
			progress_value=70;
			clearInterval(progress_timer);
			var progress_timer=setInterval(function()
			{
				progress_value+=(2*(100-progress_value))/100;
			},2000);
			
			sync_server_to_local(function()
			{
				clearInterval(progress_timer);
				progress_value=100;
				hide_menu_items();
				hide_progress();
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal_access_denied").dialog("open");
	}
}

/**
 * This function syncs the database on server to local db
 * @param func
 */
function sync_server_to_local(func)
{
	start_table="";
	start_offset=0;
	
	//console.log(number_active_ajax);
	//console.log(localdb_open_requests);
	get_last_sync_time(function(last_sync_time)
	{
		sync_server_to_local_ajax(start_table,start_offset,last_sync_time);
	});
	
	var sync_download_complete=setInterval(function()
	{
  	   if(number_active_ajax===0 && localdb_open_requests===0)
  	   {
  		   	clearInterval(sync_download_complete);
  		   	update_last_sync_time(function()
			{
				func();
			});
  	   }
     },2000);
	
};

function sync_server_to_local_ajax(start_table,start_offset,last_sync_time)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	var db_name="re_local_" + domain;
	
	ajax_with_custom_func("./ajax/sync_download.php","domain="+domain+"&username="+username+"&re="+re_access+"&start_table="+start_table+"&start_offset="+start_offset+"&last_sync_time="+last_sync_time,function(e)
	{
		var response=e.responseXML;
		//console.log(e.responseText);
		if(typeof static_local_db=='undefined')
		{
			open_local_db(function()
			{
				sync_server_to_local_ajax(start_table,start_offset,last_sync_time);
			});
		}
		else
		{
			var end_table=response.childNodes[0].childNodes[1].childNodes[0].innerHTML;
			var end_offset=response.childNodes[0].childNodes[1].childNodes[1].innerHTML;
			//console.log(end_table);
			if(end_table!="end_syncing")
			{
				sync_server_to_local_ajax(end_table,end_offset,last_sync_time);
			}
			else
			{
				console.log('got everything from server');
			}

			var tables=response.childNodes[0].childNodes[0].childNodes;

			//console.log(localdb_open_requests);
			for(var i=0;i<tables.length; i++)
			{
				var tableName=tables[i].nodeName;
				
				var objectStore=static_local_db.transaction([tableName],"readwrite").objectStore(tableName);
				var this_table=tables[i];
				var num_rows=tables[i].childElementCount;
				localdb_open_requests+=num_rows;
				if(tableName!="" && tableName!="#text")
				{	
					local_put_record(this_table,objectStore,num_rows,0);
				}
				if(tableName==='activities')
				{
					local_delete_record(this_table,num_rows,0);
				}
			}
			//console.log('exiting sync_server_to_local_ajax');
		}
	});
}

function local_put_record(this_table,objectStore,num_rows,row_index)
{
	if(row_index<num_rows)
	{
		var el=this_table.childNodes[0].childElementCount;
		var row=new Object();
		for(var j=0;j<el;j++)
		{
			var nname=this_table.childNodes[row_index].childNodes[j].nodeName;
			row[nname]=this_table.childNodes[row_index].childNodes[j].innerHTML;
		}
		
		row_index+=1;
		var req=objectStore.put(row);
		req.onsuccess=function(e)
		{
			console.log(this_table.nodeName);
			localdb_open_requests-=1;
			local_put_record(this_table,objectStore,num_rows,row_index);
		};
		req.onerror = function()
		{
			console.error("error", this.error);
			localdb_open_requests-=1;
			local_put_record(this_table,objectStore,num_rows,row_index);
		};
	}
}


function local_delete_record(this_table,num_rows,row_index)
{
	if(row_index<num_rows)
	{
		var el=this_table.childNodes[0].childElementCount;
		var row=new Object();
		for(var j=0;j<el;j++)
		{
			var nname=this_table.childNodes[row_index].childNodes[j].nodeName;
			row[nname]=this_table.childNodes[row_index].childNodes[j].innerHTML;
		}
		
		localdb_open_requests-=1;
		row_index+=1;
		
		if(row['type']==='delete')
		{
			var del_table=row['tablename'];
			var del_id=row['data_id'];
			static_local_db.transaction([del_table],"readwrite").objectStore(del_table).delete(del_id).onsuccess=function(e)
			{
				//console.log("deleted row");
			};
		}
		local_delete_record(this_table,num_rows,row_index);
	}
}


function local_update_record(ids,objectStore,row_index)
{
	if(row_index<ids.length)
	{
		var req=objectStore.get(ids[row_index].innerHTML);
		req.onsuccess=function(e)
		{
			var data=req.result;
			row_index+=1;
			if(data)
			{
				data['status']='synced';
				data['data_xml']='';
				var put_req=objectStore.put(data);
				put_req.onssuccess=function(e)
				{
					local_update_record(ids,objectStore,row_index);
				};
				put_req.onerror=function(e)
				{
					console.log('error updating activitiy status');
					local_update_record(ids,objectStore,row_index);
				};
			}
			else
			{
				local_update_record(ids,objectStore,row_index);
			}
		};
	}
}


/**
 * This function syncs up the local db to the server db
 * @param func
 */
function sync_local_to_server(func)
{
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	var up_access=get_session_var('up');
	var del_access=get_session_var('del');
	//console.log("syncing started");
	
	get_data_from_log_table(function(log_data)
	{
		get_last_sync_time(function(last_sync_time)
		{
			//console.log(log_data);
			var log_data_array=log_data.split("<separator></separator>");
			log_data_array.forEach(function(log_data_chunk)
			{
				log_data_chunk="<activities>"+log_data_chunk+"</activities>";
				//console.log(log_data_chunk);
				ajax_with_custom_func("./ajax/sync_upload.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&up="+up_access+"&del="+del_access+"&data="+log_data_chunk+"&last_sync="+last_sync_time,function(e)
				{
					var response=e.responseXML;
					console.log(e.responseText);
					set_activities_to_synced(response);
				});
			});
			var sync_complete=setInterval(function()
			{
         	   if(number_active_ajax===0)
         	   {
         		   clearInterval(sync_complete);
         		   func();
         	   }
            },1000);		
		});
	});
};

/**
 * This function prepares an xml string from the unsynced data in activities log
 * @param func Function to be executed after successful access
 */
function get_data_from_log_table(func)
{
	//show_loader();
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			get_data_from_log_table(func);
		});
	}
	else
	{
		var keyValue=IDBKeyRange.only('unsynced');
		var counter=0;
		var log_data="";
		
		static_local_db.transaction(['activities'],"readonly").objectStore('activities').index('status').openCursor(keyValue).onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				
				if(counter===200)
				{
					log_data+="<separator></separator>";
					counter=0;
				}
					
				log_data+="<row>";
				for(var field in record)
				{
					log_data+="<"+field+">";
						log_data+=record[field];
					log_data+="</"+field+">";
				}
				log_data+="</row>";
				counter+=1;
				result.continue();
			}
			else
			{
				//console.log(log_data);
				func(log_data);
			}
		};	
	}
}


/**
 * This function updates the status for the synced activity logs
 * @param response Ids of the synced logs
 * @param func Function to be executed on successful update
 */
function set_activities_to_synced(response)
{
	//show_loader();
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			set_activities_to_synced(response);
		});
	}
	else
	{
		var objectStore=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
		var ids=response.childNodes[0].getElementsByTagName('id');
		local_update_record(ids,objectStore,0);
	}
}

/**
 * This function gets the last sync time from the user_prefernces table
 * @param func Function to be executed after successul access
 */
function get_last_sync_time(func)
{
	//show_loader();
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			get_last_sync_time(func);
		});
	}
	else
	{
		var objectStore=static_local_db.transaction(['user_preferences'],"readonly").objectStore('user_preferences').index('name');
		var req=objectStore.get('last_sync_time');
		
		req.onsuccess=function(e)
		{
			var data=req.result;
			var last_sync_time="0";
			if(data)
			{
				last_sync_time=data['value'];
			}
			func(last_sync_time);	
		};	
	}
}


/**
 * This function sets the new last_sync_time
 * @param func Function to be executed on successful update
 */
function update_last_sync_time(func)
{
	//show_loader();
	var domain=get_domain();
	var db_name="re_local_"+domain;
		
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			update_last_sync_time(func);
		});
	}
	else
	{
		var objectStore=static_local_db.transaction(['user_preferences'],"readwrite").objectStore('user_preferences');
		var time=get_my_time();
		var row_data={id:'700',name:'last_sync_time',value:time,type:'other',display_name:'Last Sync Time',status:'active'};
		
		var req=objectStore.put(row_data);
		req.onsuccess=function(e)
		{
			func();	
		};
	}
}

/**
 * This function sets the session variable to online and write it to db
 * @returns
 */
function set_session_online()
{
	var domain=get_domain();
	var db_name="re_local_"+domain;
		
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
	}
};

/**
 * This function sets the session variable to offline and write it to db
 * @returns
 */
function set_session_offline()
{
	var domain=get_domain();
	var db_name="re_local_"+domain;
		
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
