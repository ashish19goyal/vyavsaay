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
		},1000);
		
		sync_local_to_server(function()
		{
			progress_value=80;
			clearInterval(progress_timer);
			var progress_timer=setInterval(function()
			{
				progress_value+=(2*(100-progress_value))/100;
			},1000);
			
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
			},1000);

			sync_server_to_local(function()
			{
				progress_value=80;
				clearInterval(progress_timer);
				var progress_timer=setInterval(function()
				{
					progress_value+=(2*(100-progress_value))/100;
				},1000);
				
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
		},1000);
		
		sync_local_to_server(function()
		{
			progress_value=70;
			clearInterval(progress_timer);
			var progress_timer=setInterval(function()
			{
				progress_value+=(2*(100-progress_value))/100;
			},1000);
			
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
	
	get_last_sync_time(function(last_sync_time)
	{
		sync_server_to_local_ajax(start_table,start_offset,last_sync_time);
	});
	
	var sync_download_complete=setInterval(function()
	{
  	   //console.log(number_active_ajax);
  	   if(number_active_ajax===0 && localdb_open_requests===0)
  	   {
  		   	clearInterval(sync_download_complete);
  		   	update_last_sync_time(function()
			{
				func();
			});
  	   }
     },1000);
	
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
		console.log(e.responseText);
		
		var end_table=response.childNodes[0].childNodes[1].childNodes[0].innerHTML;
		var end_offset=response.childNodes[0].childNodes[1].childNodes[1].innerHTML;
		console.log(end_table);
		if(end_table!="end_syncing")
		{
			sync_server_to_local_ajax(end_table,end_offset,last_sync_time);
		}
		
		sklad.open(db_name,{version:2},function(err,database)
		{
			var tables=response.childNodes[0].childNodes[0].childNodes;
			for(var i=0;i<tables.length; i++)
			{
				tableName=tables[i].nodeName;
				if(tableName!="" && tableName!="#text")
				{	
					var num_rows=tables[i].childElementCount;
					for(var k=0;k<num_rows;k++)
					{
						var el=tables[i].childNodes[0].childElementCount;
						var row=new Object();
						for(var j=0;j<el;j++)
						{
							var nname=tables[i].childNodes[k].childNodes[j].nodeName;
							row[nname]=tables[i].childNodes[k].childNodes[j].innerHTML;
						}
						
						localdb_open_requests+=1;
						database.upsert(tableName,row,function(err,insertedkey)
						{
							console.log('adding record to table'+tableName);
							localdb_open_requests-=1;
						});
						
						if(tableName==='activities')
						{
							if(row['type']==='delete')
							{
								var del_table=row['tablename'];
								var del_id=row['data_id'];
								localdb_open_requests+=1;
								database.delete(del_table,del_id,function(err)
								{
									localdb_open_requests-=1;
								});
							}
						}
					}			
				}
			}
		});
	});
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
	console.log("syncing started");
	
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
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		database.get('activities',{},function(err,records)
		{
			var log_data="";
			var counter=0;
			for(var row in records)
			{
				if(records[row].status=='unsynced')
				{
					if(counter===100)
					{
						log_data+="<separator></separator>";
						counter=0;
					}
					var row_data=records[row];
					log_data+="<row>";
					for(var field in row_data)
					{
						log_data+="<"+field+">";
							log_data+=row_data[field];
						log_data+="</"+field+">";
					}
					log_data+="</row>";
					
					counter+=1;
				}
			}
			//console.log(log_data);
			func(log_data);
		});	
	});
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
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		//console.log(response.childNodes[0]);
		var table='activities';
		var ids=response.childNodes[0].getElementsByTagName('id');
		for(var id=0; id<ids.length; id++)
		{
			//console.log(ids[id].innerHTML);
			database.get(table,{range:IDBKeyRange.only(ids[id].innerHTML)},function(err,records)
			{
				for(var row in records)
				{
					var row_data=records[row];
					row_data['status']='synced';
					row_data['data_xml']='';
					database.upsert(table,row_data,function(err,insertedkey)
					{
					});
				}
			});				
		}
	});
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
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		database.get('user_preferences',{index:'name',range:IDBKeyRange.only('last_sync_time')},function(err,records)
		{
			var last_sync_time="0";
			for(var row in records)
			{
				last_sync_time=records[row]['value'];
			}
			func(last_sync_time);	
		});	
	});
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
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		var time=get_my_time();
		var row_data={id:'700',name:'last_sync_time',value:time,type:'other',display_name:'Last Sync Time',status:'active'};
		//{value:row_data,key:row_data.id}
		database.upsert('user_preferences',row_data,function(err,insertedkey)
		{
			func();
		});
	});	
}

/**
 * This function sets the session variable to online and write it to db
 * @returns
 */
function set_session_online()
{
	//show_loader();
	var offline_data="<user_preferences>" +
		"<id></id>" +
		"<name>offline</name>" +
		"</user_preferences>";

	get_single_column_data(function(data_ids)
	{
		data_ids.forEach(function(data_id)
		{
			set_session_var('offline','online');
			var data_xml="<user_preferences>" +
				"<id>"+data_id+"</id>" +
				"<name>offline</name>" +
				"<value>online</value>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</user_preferences>";	
			var activity_xml="<activity>" +
				"<data_id>1000"+data_id+"</data_id>" +
				"<tablename>user_preferences</tablename>" +
				"<link_to></link_to>" +
				"<title>Changed</title>" +
				"<notes>Set mode of operation to Online</notes>" +
				"<user_display>yes</user_display>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
			//server_update_row(data_xml,activity_xml);
			local_update_row(data_xml,activity_xml);
			hide_menu_items();
			set_session_var('offline','online');
			hide_loader();
		});
	},offline_data);
};

/**
 * This function sets the session variable to offline and write it to db
 * @returns
 */
function set_session_offline()
{
	//show_loader();
	var offline_data="<user_preferences>" +
			"<id></id>" +
			"<name>offline</name>" +
			"</user_preferences>";

	get_single_column_data(function(data_ids)
	{
		data_ids.forEach(function(data_id)
		{
			set_session_var('offline','offline');
			var data_xml="<user_preferences>" +
				"<id>"+data_id+"</id>" +
				"<name>offline</name>" +
				"<value>offline</value>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</user_preferences>";	
			var activity_xml="<activity>" +
				"<data_id>1000"+data_id+"</data_id>" +
				"<tablename>user_preferences</tablename>" +
				"<link_to></link_to>" +
				"<title>Changed</title>" +
				"<notes>Set mode of operation to Offline</notes>" +
				"<user_display>yes</user_display>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
			//server_update_simple(data_xml);
			local_update_row(data_xml,activity_xml);
			hide_menu_items();
			set_session_var('offline','offline');
			hide_loader();
		});
	},offline_data);
};
