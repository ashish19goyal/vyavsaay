/**
 * This function is called to switch the application mode to offline
 * @param username username to create a unique local database
 */
function switch_to_online()
{
	if(is_update_access('sync_mode'))
	{
		var domain=get_domain();
		var username=get_username();
		var cr_access=get_session_var('cr');
		var up_access=get_session_var('up');
		var del_access=get_session_var('del');
		var re_access=get_session_var('re');
		
		ajax_with_custom_func("./ajax/connection_testing.php",{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,re:re_access},function(e)
		{
			if(e.responseText==='connected')
			{
				show_progress();
				show_loader();
				sync_local_to_server(function()
				{
					progress_value=50;
					sync_server_to_local(function()
					{
						progress_value=100;
						set_session_online(function()
						{
							hide_progress();
							hide_loader();
						});
					});
				});
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function is called to switch the application mode to offline
 * @param username username to create a unique local database
 */
function switch_to_offline()
{
	if(is_update_access('sync_mode'))
	{
		var domain=get_domain();
		show_progress();
		show_loader();
		create_local_db(domain,function(e)
		{
			//console.log('db_created');
			progress_value=10;
			sync_server_to_local(function()
			{
				//console.log('server to local complete');
				progress_value=50;
								
				sync_local_to_server(function()
				{
					//console.log('sync local t0 server');
					
					progress_value=100;
					set_session_offline();
					hide_progress();
					//hide_loader();
				});
				
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * 
 */
function sync_local_and_server()
{
	if(is_update_access('sync'))
	{
		var domain=get_domain();
		var username=get_username();
		var cr_access=get_session_var('cr');
		var up_access=get_session_var('up');
		var del_access=get_session_var('del');
		var re_access=get_session_var('re');
		
		ajax_with_custom_func("./ajax/connection_testing.php",{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,re:re_access},function(e)
		{
			if(e.responseText==='connected')
			{
				show_progress();
				show_loader();
				
				sync_local_to_server(function()
				{
					progress_value=50;
					sync_server_to_local(function()
					{
						progress_value=100;
						hide_menu_items();
						count_sync();
						hide_progress();
						hide_loader();
					});
				});
			}
			else 
			{
				$("#modal74").dialog("open");
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function syncs the database on server to local db
 * @param func
 */
function sync_server_to_local(func)
{
	//console.log('row135');
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			sync_server_to_local(func);
		});
	}
	else
	{
		start_table="";
		start_offset=0;
		var domain=get_domain();

		var new_version=parseInt(static_local_db.version)+1;		
		static_local_db.close();
		delete(static_local_db);//="undefined";
				
		//console.log('db_closed');
				
		update_local_db(domain,function()
		{
			//console.log('row156');
			get_last_sync_time(function(last_sync_time)
			{
				//console.log('row158');
				sync_server_to_local_ajax(start_table,start_offset,last_sync_time);
			});
		},new_version);
		
		var max_localdb_open_requests=0;
		var progress_dummy=progress_value+1;
		var online_counter=100;
		var sync_download_complete=setInterval(function()
		{
			//console.log("aj"+number_active_ajax);
			console.log("l"+localdb_open_requests);
			
			if(online_counter>0)
			{
				online_counter-=1;
			}
	  	   if(number_active_ajax===0)
	  	   {
	  	   		var progress_dummy1=progress_dummy+20;
	  		   if(max_localdb_open_requests===0)
	  		   {
	  			  max_localdb_open_requests=localdb_open_requests;
	  		   }
	  		   else
	  		   {
	  			   progress_value=progress_dummy1+(1-(localdb_open_requests/max_localdb_open_requests))*20;
	  		   }
	  		   if(localdb_open_requests===0)
	  		   {
	  			   clearInterval(sync_download_complete);
		  		   update_last_sync_time(function()
		  		   {
		  		   		//console.log('update last sync time');
						func();
				   });
	  		   }
	  	   }
	  	   else
	  	   {
	  	   		progress_value=progress_dummy+(1-(online_counter/100))*20;
	  	   }
	     },1000);	
	 }
};

function sync_server_to_local_ajax(start_table,start_offset,last_sync_time)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	var db_name="re_local_" + domain;
	//console.log(last_sync_time);
	ajax_json("./ajax_json/sync_download.php",{domain:domain,username:username,re:re_access,start_table:start_table,start_offset:start_offset,last_sync_time:last_sync_time},function(response_object)
	{
		if(typeof static_local_db=='undefined')
		{
			open_local_db(function()
			{
				sync_server_to_local_ajax(start_table,start_offset,last_sync_time);
			});
		}
		else
		{
			var end_table=response_object.end_table;
			var end_offset=response_object.end_offset;
			//console.log(end_table);
			//console.log(end_offset);			
			if(end_table!="end_syncing")
			{
				sync_server_to_local_ajax(end_table,end_offset,last_sync_time);
			}
			
			var tables=response_object.data;
			
			for(var i in tables)
			{
				//console.log(tableName);
				var tableName=i;
				
				var objectStore=static_local_db.transaction([tableName],"readwrite").objectStore(tableName);
				var this_table=tables[i];
				var num_rows=tables[i].length;
				
				localdb_open_requests+=num_rows;
				
				local_put_record(this_table,objectStore,num_rows,0);

				if(tableName=='activities')
				{
					//console.log(this_table);
					local_delete_record(this_table,num_rows,0);
				}
			}
		}
		
	});
}

function local_put_record(this_table,objectStore,num_rows,row_index)
{
	if(row_index<num_rows)
	{
		var row=new Object();
		//this_table[row_index]['id']=String(this_table[row_index]['id']);
		//console.log(this_table[row_index]['id']);
		for(var j in this_table[row_index])
		{
			if(typeof this_table[row_index][j]=='object')
			{
				row[j]=JSON.stringify(this_table[row_index][j]);
			}
			else{
				row[j]=this_table[row_index][j];				
			}
		}
		
		//console.log(row);
		row_index+=1;
		var req=objectStore.put(row);
		req.onsuccess=function(e)
		{
			//console.log(this_table.nodeName);
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
		var row=new Object();
		for(var j in this_table[row_index])
		{
			row[j]=this_table[row_index][j];
		}
		
		row_index+=1;
		
		if(row['type']==='delete')
		{
			localdb_open_requests+=1;
			var del_table=row['tablename'];
			var del_id=row['data_id'];
			static_local_db.transaction([del_table],"readwrite").objectStore(del_table).delete(del_id).onsuccess=function(e)
			{
				localdb_open_requests-=1;
			};
		}
		local_delete_record(this_table,num_rows,row_index);
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
	
	get_data_from_log_table(function(log_data)
	{
		get_last_sync_time(function(last_sync_time)
		{
			var log_data_counter=0;
			log_data.forEach(function(log_data_sub_array)
			{
				log_data_counter+=1;
				var run_daemons='no';
				if(log_data_counter==log_data.length)
				{
					run_daemons='yes';
				}
				var log_data_chunk=JSON.stringify(log_data_sub_array);				
				//console.log(log_data_chunk);
				ajax_json("./ajax_json/sync_upload.php",{run_daemons:run_daemons,domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,data:log_data_chunk,last_sync:last_sync_time},function(response_object)
				{
					console.log(response_object);
					set_activities_to_synced(response_object);
				});
			});

			var progress_dummy=progress_value+5;
			var sync_complete=setInterval(function()
			{
  			   progress_value=progress_dummy+(1-(number_active_ajax/log_data.length))*30;
  			   //console.log(number_active_ajax);
  			   //console.log(localdb_open_requests);
  			   
  			   if(number_active_ajax===0)
         	   {
  				   if(localdb_open_requests===0)
  				   {
  					   progress_value+=15;
  	         		   clearInterval(sync_complete);
  	         		   func();
  				   }
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
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			get_data_from_log_table(func);
		});
	}
	else
	{
		var keyValue=IDBKeyRange.bound(['unsynced','0'],['unsynced','99999999']);
		var counter=0;
		var log_data=[];
		var sub_log_data=[];
		
		static_local_db.transaction(['activities'],"readonly").objectStore('activities').index('status').openCursor(keyValue,'next').onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				
				if(counter===200)
				{
					log_data.push(sub_log_data);
					sub_log_data=[];
					counter=0;
				}
				//	console.log(record);
				sub_log_data.push(record);	
				
				counter+=1;
				result.continue();
			}
			else
			{
				log_data.push(sub_log_data);
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
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			set_activities_to_synced(response);
		});
	}
	else
	{
		//var delete_ids=response.responseXML.childNodes[0].childNodes[0].getElementsByTagName('id');
		var update_ids=response;
		var transaction=static_local_db.transaction(['activities'],"readwrite");
		var objectStore=transaction.objectStore('activities');
		localdb_open_requests+=update_ids.length;
		
		transaction.onabort = function(e) 
		{
			console.log("aborted");
			console.log(this.error);
		};
		transaction.oncomplete = function(e) 
		{
			console.log("transaction complete"); 
		};
		
		function local_update_record(row_index)
		{
			if(row_index<update_ids.length)
			{
				var record_id=update_ids[row_index];
				var req=objectStore.get(record_id);
				req.onsuccess=function(e)
				{
					var data=req.result;
					row_index+=1;
					if(data)
					{
						data['status']='synced';
						data['data_xml']='';
						var put_req=objectStore.put(data);
						put_req.onsuccess=function(e)
						{
							localdb_open_requests-=1;
							local_update_record(row_index);
						};
						put_req.onerror=function(e)
						{
							localdb_open_requests-=1;
							local_update_record(row_index);
						};
					}
					else
					{
						localdb_open_requests-=1;
						local_update_record(row_index);
					}
				};
			}
		};
		
		local_update_record(0);	
	}
}

/**
 * This function gets the last sync time from the user_prefernces table
 * @param func Function to be executed after successul access
 */
function get_last_sync_time(func)
{
	//console.log('row518');
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			get_last_sync_time(func);
		});
	}
	else
	{
		var kv=IDBKeyRange.bound(['last_sync_time','0'],['last_sync_time','99999999']);
		var req=static_local_db.transaction(['user_preferences'],"readonly").objectStore('user_preferences').index('name').get(kv);
		req.onsuccess=function(e)
		{
			var data=req.result;
			var last_sync_time="0";
			if(data)
			{
				last_sync_time=data['value'];
			}
			//console.log(last_sync_time);
			func(last_sync_time);	
		};
		req.onerror=function(e)
		{
			console.log(this.error);
		};
	}
}


/**
 * This function sets the new last_sync_time
 * @param func Function to be executed on successful update
 */
function update_last_sync_time(func)
{
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
		var row_data={id:'700',name:'last_sync_time',value:time,type:'other',display_name:'Last Sync Time',status:'active',last_updated:'1'};

		var req=objectStore.put(row_data);
		req.onsuccess=function(e)
		{
			func();	
		};
		req.onerror=function(e)
		{
			console.log(this.error);
		};
	}
}

