/**
 * This function is called to switch the application mode to offline
 * @param username username to create a unique local database
 */
function switch_to_online()
{
	if(is_read_access('sync_mode'))
	{	
		show_loader();
		sync_local_to_server(function()
		{
			sync_server_to_local(function()
			{
				set_session_online();
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
		show_loader();
		create_local_db(domain,function(e)
		{
			sync_server_to_local(function()
			{
				sync_local_to_server(function()
				{
					set_session_offline();
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
		show_loader();
		sync_local_to_server(function()
		{
			sync_server_to_local(function()
			{
				hide_menu_items();
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
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	//console.log("domain: "+domain);
	get_last_sync_time(function(last_sync_time)
	{
		ajax_with_custom_func("./ajax/sync_download.php","domain="+domain+"&username="+username+"&re="+re_access+"&last_sync_time="+last_sync_time,function(e)
		{
			var response=e.responseXML;
			//console.log(response);
			console.log(e.responseText);
			var db_name="re_local_" + domain;
			sklad.open(db_name,{version:2},function(err,database)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					//console.log("sync dowload: writing to local db");
					//console.log(response);
					var tables=response.childNodes[0].childNodes;
					for(var i=0;i<tables.length; i++)
					{
						//console.log(tables[i]);
						tableName=tables[i].nodeName;
						if(tableName!="" && tableName!="#text")
						{	
							//console.log("sync download: syncing " + tableName);
							
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
								//row.sync="synced";
								//console.log(row);{value:row,key:row.id}
								database.upsert(tableName,row,function(err,insertedkey)
								{
									//console.log("inserted row in database"+i+k);
									if(err)
									{
										console.log(err+"----"+tableName);
									}
								});
								
								if(tableName==='activities')
								{
									if(row['type']==='delete')
										{
											var del_table=row['tablename'];
											var del_id=row['data_id'];
											database.delete(del_table,del_id,function(err)
											{
												if(err)
												{
													console.log(err);
												}
											});
										}
								}
							}			
						}
					}
				}
			});
			update_last_sync_time(function()
			{
				func();
			});
		});

	});
	
};


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
	show_loader();
	console.log("syncing started");
	
	get_data_from_log_table(function(log_data)
	{
		get_last_sync_time(function(last_sync_time)
		{
			ajax_with_custom_func("./ajax/sync_upload.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&up="+up_access+"&del="+del_access+"&data="+log_data+"&last_sync="+last_sync_time,function(e)
			{
				var response=e.responseXML;
				console.log(e.responseText);
				set_activities_to_synced(response,function()
				{
					console.log("sync upload: data for table saved on the server");
					func();
				});
				
			});
			
		});
	});
};

/**
 * This function prepares an xml string from the unsynced data in acitivities log
 * @param func Function to be executed after successful access
 */
function get_data_from_log_table(func)
{
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			database.get('activities',{
				index:'status',
				range:IDBKeyRange.only('unsynced')
			},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				
				var log_data="<activities>";
				for(var row in records)
				{
					var row_data=records[row];
					log_data+="<row>";
					for(var field in row_data)
					{
						log_data+="<"+field+">";
							log_data+=row_data[field];
						log_data+="</"+field+">";
					}
					log_data+="</row>";
				}
				log_data+="</activities>";
				//console.log("this is the data in table :"+log_data);
				//upload_documents(database,log_data);
				func(log_data);
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
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{			
			database.get('user_preferences',{
				index:'name',
				range:IDBKeyRange.only('last_sync_time')
			},function(err,records)
			{
				var last_sync_time="";
				if(err)
				{
					console.log(err);
					last_sync_time="0";
				}
				else
				{
					for(var row in records)
					{
						var row_data=records[row];
						last_sync_time=row_data['value'];
					}
				}
				console.log("this is the last sync time :"+last_sync_time);
				func(last_sync_time);	
			});	
		}
	});

}

/**
 * This function updates the status for the synced activity logs
 * @param response Ids of the synced logs
 * @param func Function to be executed on successful update
 */
function set_activities_to_synced(response,func)
{
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			//console.log(response);
			console.log(response.childNodes[0]);
			var table='activities';
			//console.log(response.childNodes[0].childNodes);
			//var ids=response.childNodes[0].childNodes;
			var ids=response.childNodes[0].getElementsByTagName('id');
			for(var id=0; id<ids.length; id++)
			{
				console.log(ids[id].innerHTML);
				database.get(table,{
					range:IDBKeyRange.only(ids[id].innerHTML)
				},function(err,records)
				{
					if(err)
					{
						console.log(err);
					}
					
					for(var row in records)
					{
						var row_data=records[row];
						row_data['status']='synced';
						//{value:row_data,key:id.nodeValue}
						database.upsert(table,row_data,function(err,insertedkey)
						{
							//console.log("inserted row in database"+i+k);
							if(err)
							{
								console.log(err);
							}
						});
					}
				});
				
			}
			func();
		}
	});
}

/**
 * This function sets the new last_sync_time
 * @param func Function to be executed on successful update
 */
function update_last_sync_time(func)
{
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{version:2},function(err,database)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			var time=get_my_time();
			
			var row_data={id:'700',name:'last_sync_time',value:time,type:'other',display_name:'Last sync time',status:'active'};
			//{value:row_data,key:row_data.id}
			database.upsert('user_preferences',row_data,function(err,insertedkey)
			{
				if(err)
				{
					console.log(err);
				}
			});	
			func();
		}
	});	
}

/*
function download_documents(database,doc_data)
{
	console.log(doc_data);
	var domain=get_domain();
	var documents=doc_data.getElementsByTagName('row');
	//console.log(documents);
	for(var doc=0;doc<documents.length;doc++)
	{
		var d_url=documents[doc].getElementsByTagName('url')[0].innerHTML;
		var d_id=documents[doc].getElementsByTagName('id')[0].innerHTML;
		var d_target_id=documents[doc].getElementsByTagName('target_id')[0].innerHTML;
		var d_doc_type=documents[doc].getElementsByTagName('doc_type')[0].innerHTML;
		var d_last_updated=documents[doc].getElementsByTagName('last_updated')[0].innerHTML;

        var xhr = new XMLHttpRequest();
        xhr.open("GET",d_url, true);
        xhr.responseType = "blob";
        //xhr.responseType='document';  
        
        xhr.onreadystatechange=function()
    	{
    		if(xhr.readyState===4 && xmlhttp.status===200)
    		{
    			console.log(xhr.response);
    			var reader = new FileReader();
    	        reader.addEventListener("loadend", function()
    	        {
    	        
    	        	var d_doc_blob=reader.result;
    				console.log(d_id);
           			database.upsert('documents',{id:d_id,url:d_doc_blob,target_id:d_target_id,doc_type:d_doc_type,last_updated:d_last_updated},function(err,insertedkey)
    				{
    					//console.log("inserted row in database"+i+k);
    					if(err)
    					{
    						console.log(err);
    					}
    				});
    	        });
    	        reader.readAsDataURL(xhr.response);
    		}
    	};
        xhr.send();
	}		
}


function upload_documents(database,log_data)
{
	var parser=new DOMParser();
	var xml_data=parser.parseFromString(log_data,"text/xml");
	var rows=xml_data.childNodes[0].childNodes;
	//console.log(rows);
	var domain=get_domain();
	for(var i=0;i<rows.length;i++)
	{	
		var row=rows[i];
		//console.log(row);
		if(row.getElementsByTagName('tablename')[0].nodeValue==='documents')
		{
			var data_id=row.getElementsByTagName('data_id')[0].nodeValue;
			
			database.get('documents',{
				index:'id',
				range:IDBKeyRange.only(data_id)
			},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				
				for(var j in records)
				{
					var row_data=records[j];
					var url=row_data['url'];
					var target_id=row_data['target_id'];
					var doc_type=row_data['doc_type'];
					
					ajax_with_custom_func("./ajax/upload_docs.php","domain="+domain+"&url="+url+"&target_id="+target_id+"&doc_type="+doc_type,function()
					{
						console.log("document uploaded to server");
					});
				}
			});
		}
	}
}
*/

function set_session_online()
{
	var offline_data="<user_preferences>" +
		"<id></id>" +
		"<name>offline</name>" +
		"</user_preferences>";

	get_single_column_data(function(data_ids)
	{
		data_ids.forEach(function(data_id)
		{
			sessionStorage.setItem('offline','online');
			var data_xml="<user_preferences>" +
				"<id>"+data_id+"</id>" +
				"<name>offline</name>" +
				"<display_name>Mode of operation</display_name>" +
				"<value>online</value>" +
				"<type>other</type>" +
				"<status>active</status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</user_preferences>";	
			var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>user_preferences</tablename>" +
				"<link_to>home</link_to>" +
				"<title>Changed</title>" +
				"<notes>Set mode of operation to Online</notes>" +
				"<user_display>yes</user_display>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
			//console.log(data_xml);
			//console.log(activity_xml);
			server_write_row(data_xml,activity_xml);
			local_write_simple(data_xml);
			hide_menu_items();
			hide_loader();
		});
	},offline_data);
}

function set_session_offline()
{
	var offline_data="<user_preferences>" +
			"<id></id>" +
			"<name>offline</name>" +
			"</user_preferences>";

	get_single_column_data(function(data_ids)
	{
		data_ids.forEach(function(data_id)
		{
			sessionStorage.setItem('offline','offline');
			var data_xml="<user_preferences>" +
				"<id>"+data_id+"</id>" +
				"<name>offline</name>" +
				"<display_name>Mode of operation</display_name>" +
				"<value>offline</value>" +
				"<type>other</type>" +
				"<status>active</status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</user_preferences>";	
			var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>user_preferences</tablename>" +
				"<link_to>home</link_to>" +
				"<title>Changed</title>" +
				"<notes>Set mode of operation to Offline</notes>" +
				"<user_display>yes</user_display>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
			//console.log(data_xml);
			//console.log(activity_xml);
			server_write_simple(data_xml);
			local_write_row(data_xml,activity_xml);
			hide_menu_items();
			hide_loader();
		});
	},offline_data);
}
