/**
 * xml attributes for read queries
 * comapre: more than,less than, not equal, equal
 * array: yes
 * exact: yes
 * sort: asc,desc
 * count: <integer>
 * start_index: <integer>
 */

/**
 * This function creates a new table in the local database
 * @param db_name name of the local database
 * @param func function to be executed on success
 */
function create_local_db(domain,func)
{
	if("indexedDB" in window)
	{
		if(typeof static_local_db=='undefined')
		{
			open_local_db(function()
			{
				create_local_db(domain,func);
			});
		}
		else
		{
			var dbversion=parseInt(static_local_db.version);
			if(dbversion<2 || dbversion==NaN)
			{
				dbversion=2;
			}
			static_local_db.close();
			delete(static_local_db);//="undefined";

			var db_name="re_local_"+domain;
			ajax_with_custom_func("./db/db_schema.xml","",function(e)
			{
				var request = indexedDB.open(db_name,dbversion);

				request.onsuccess=function(e)
				{
					var db=e.target.result;
					db.close();
					if(typeof func!="undefined")
					{					
						func();
					}
				};
	
				request.onerror=function(ev)
				{
					alert('Could not switch to offline mode. Please refresh your browser and try again.');
				};
					
				request.onupgradeneeded=function(ev)
				{
					var db=ev.target.result;
					var tables=e.responseXML.childNodes[0].childNodes;
					
					//console.log(tables);
					
					for(var k=0;k<tables.length;k++)
					{
						if(tables[k].nodeName!="" && tables[k].nodeName!="#text" && tables[k].nodeName!="#comment")
						{	
							//console.log(tables[k].nodeName);
							var table=db.createObjectStore(tables[k].nodeName,{keyPath:'id'});
						
							for(var i=0;i<tables[k].childNodes.length;i++)
							{	
								if(tables[k].childNodes[i].nodeName!="" && tables[k].childNodes[i].nodeName!="#text" && tables[k].childNodes[i].nodeName!="#comment")
								{	
									var indexing=tables[k].childNodes[i].getAttribute('index');
									if(indexing=='yes')
									{
										table.createIndex(tables[k].childNodes[i].nodeName,[tables[k].childNodes[i].nodeName,'last_updated']);
									}
								}		
							}
						}
					}			
				};
			});
		}		
	}
	else
	{
		alert('Offline mode is not supported in your browser. Please update your browser.');
	}
};

/**
 * This func sets a global variable to an instance of local db
 * @param func
 * @returns
 */
function open_local_db(func)
{
	var db_name="re_local_"+get_domain();
	var request = indexedDB.open(db_name);
	request.onsuccess=function(e)
	{
		static_local_db=e.target.result;
		if(typeof func!="undefined")
		{					
			func();
		}
	};
	request.onerror=function(e)
	{
	    var db=e.target.result;
	    if(db)
	    	db.close();
		console.log(this.error);
		//func();
	};
	request.onabort=function(e)
	{
	    var db=e.target.result;
	    db.close();
	    console.log(this.error);
	    //func();
	};
	
};


function delete_local_db()
{
	$("#modal52").dialog(
	{
		close:function(e,ui)
		{
			delete_session();
		}
	});
	if("indexedDB" in window)
	{
		var db_name="re_local_"+get_domain();

		if(typeof static_local_db!=='undefined')
		{
			static_local_db.close();
		}
		
		var deleterequest=indexedDB.deleteDatabase(db_name);
		deleterequest.onsuccess=function(ev)
		{
			$("#modal52").dialog("open");
		};
		
		deleterequest.onerror=function(ev)
		{
			alert('Could not delete local storage. Please refresh your browser and try again.');
		};
		
		deleterequest.onblocked=function(ev)
		{
			alert('Deleting local storage. Please wait for a few moments.');
		};
	}
	else
	{
		$("#modal52").dialog("open");
	}
}

/**
 * This function creates a new table in the local database if it is not already present
 * @param db_name name of the local database
 * @param func function to be executed on success
 */
function update_local_db(domain,func,new_version)
{
	if("indexedDB" in window)
	{
		var db_name="re_local_"+domain;
		ajax_with_custom_func("./db/db_schema.xml","",function(e)
		{
			var request = indexedDB.open(db_name,new_version);
		
			request.onsuccess=function(e)
			{
				var db=e.target.result;
				//console.log(db.version);
				db.close();
				if(typeof func!="undefined")
				{					
					func();
				}
			};

			request.onerror=function(ev)
			{
				alert('Could not switch to offline mode. Please refresh your browser and try again.');
			};
				
			request.onupgradeneeded=function(ev)
			{
				var db=ev.target.result;
				//console.log(db.version);
				var tables=e.responseXML.childNodes[0].childNodes;
				
				//console.log(tables);
				
				for(var k=0;k<tables.length;k++)
				{
					if(tables[k].nodeName!="" && tables[k].nodeName!="#text" && tables[k].nodeName!="#comment")
					{
						if(!db.objectStoreNames.contains(tables[k].nodeName))
						{
							//console.log(tables[k].nodeName);
							var table=db.createObjectStore(tables[k].nodeName,{keyPath:'id'});
						
							for(var i=0;i<tables[k].childNodes.length;i++)
							{	
								if(tables[k].childNodes[i].nodeName!="" && tables[k].childNodes[i].nodeName!="#text" && tables[k].childNodes[i].nodeName!="#comment")
								{	
									var indexing=tables[k].childNodes[i].getAttribute('index');
									if(indexing=='yes')
									{
										table.createIndex(tables[k].childNodes[i].nodeName,[tables[k].childNodes[i].nodeName,'last_updated']);
									}
								}		
							}
						}
					}
				}
				/*
				if(typeof func!="undefined")
				{					
					func();
				}
				*/
			};

			request.onerror=function(ev)
			{
				alert('Could not switch to offline mode. Please refresh your browser and try again.');
			};
		});
	}
	else
	{
		alert('Offline mode is not supported in your browser. Please update your browser.');
	}
};


function backup_server_db()
{
	if(is_create_access('db_backup'))
	{
		var domain=get_domain();
		var username=get_username();
		var cr_access=get_session_var('cr');
		show_loader();
		ajax_with_custom_func("./ajax/db_backup.php",{domain:domain,username:username,cr:cr_access},function(e)
		{
			var response=e.responseText;
			
			var type = e.getResponseHeader('Content-Type');
			console.log(type);
			//console.log(response);
			
			var blob = new Blob([response], { type: type });			
			var URL = window.URL || window.webkitURL;
         	var downloadUrl = URL.createObjectURL(blob);	
			
			var modal_element=document.getElementById('modal55');
			//var updated_response=response.replace(/ /g,"+");
			var link=document.createElement('a');
			link.setAttribute('href',downloadUrl);
			link.setAttribute('download',domain+".sql");
			link.textContent="Click to download the file.";			
			modal_element.appendChild(link);
			$("#modal55").dialog("open");
			hide_loader();
		});
	}
	else 
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function executes a simple read access on local database
 * @param columns xml data for read query
 * @param results data to be passed on to the callback function
 * @param callback function to be executed on successful access
 */
function local_read_single_column(columns,callback,results)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_single_column(columns,callback,results);
		});
	}
	else
	{
		var parser=new DOMParser();
		var data=parser.parseFromString(columns,"text/xml");
		var table=data.childNodes[0].nodeName;
		var tcols=data.childNodes[0].childNodes;
		var sum=false;
		if(data.childNodes[0].hasAttribute('sum'))
		{
			sum=true;
		}
		
		var sum_result=0;
		
		if(tcols.length>0)
		{
			var result_column_name=tcols[0].nodeName;
			var count=0;
			if(data.childNodes[0].hasAttribute('count'))
			{
				count=parseInt(data.childNodes[0].getAttribute('count'));
			}
			var sort_index='last_updated';
			var sort_order='prev';
			var lowerbound=['0','0'];
			var upperbound=['9999999999','9999999999'];
			
			var bound_count=0;
			var filter=new Array();
			
			for(var j=0; j<tcols.length;j++)
			{
				if(tcols[j].textContent!=null && tcols[j].textContent!="")
				{
					var fil=new Object();
					fil.name=tcols[j].nodeName;
					
					if(tcols[j].hasAttribute('lowerbound'))
					{
						fil.value=tcols[j].textContent;
						fil.type='lowerbound';
						filter.push(fil);
						lowerbound=[fil.value,'0'];
						sort_index=tcols[j].nodeName;
						
						if(bound_count==0)
						{
							upperbound=['9999999999','9999999999'];
						}
						bound_count+=1;
					}
					if(tcols[j].hasAttribute('upperbound'))
					{
						fil.value=tcols[j].textContent;
						fil.type='upperbound';
						filter.push(fil);
						upperbound=[fil.value,'999999999999'];
						sort_index=tcols[j].nodeName;
						
						if(bound_count==0)
						{
							lowerbound=['0','0'];
						}
						bound_count+=1;
					}
					
					if(tcols[j].hasAttribute('array'))
					{
						fil.value=tcols[j].textContent;
						fil.type='array';
						filter.push(fil);
					}
					else if(!(tcols[j].hasAttributes()))
					{
						fil.value=tcols[j].textContent;
						fil.type='';
						filter.push(fil);
					}
				}
				if(tcols[j].hasAttribute('exact'))
				{
					var fil=new Object();
					fil.name=tcols[j].nodeName;
					fil.value=tcols[j].textContent;
					fil.type='exact';
					filter.push(fil);
					sort_index=tcols[j].nodeName;
					lowerbound=[fil.value,'0'];
					upperbound=[fil.value,'99999999'];
					bound_count=0;
				}
			}
			
			var sort_key=IDBKeyRange.bound(lowerbound,upperbound);
			
			//console.log(table+" "+sort_index+" "+columns);	
			var read_tx=static_local_db.transaction([table],"readonly");		
			var read_index=read_tx.objectStore(table).index(sort_index);		
			var read_request=read_index.openCursor(sort_key,sort_order);
			
			localdb_open_requests+=1;
	
			read_request.onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var record=result.value;
					var match_word=true;
					for(var i=0;i<filter.length;i++)
					{
						var string=record[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						var found=0;
						
						if(filter[i].type=='')
						{
							found=string.indexOf(search_word);
						}
						else if(filter[i].type=='exact')
						{
							if(search_word!==string)
							{
								match_word=false;
								break;
							}
						}
						else if(filter[i].type=='array')
						{
							found=search_word.indexOf("-"+string+"-");
						}
						else if(filter[i].type=='upperbound') 
						{
							if(parseFloat(record[filter[i].name])>=parseFloat(filter[i].value))
							{
								match_word=false;
								break;
							}
						}
						else if(filter[i].type=='lowerbound') 
						{
							if(parseFloat(record[filter[i].name])<=parseFloat(filter[i].value))
							{
								match_word=false;
								break;
							}
						}
						
						if(found==-1)
						{
							match_word=false;
							break;
						}
					}
					
					if(match_word===true)
					{
						//console.log(columns);
						if(sum)
						{
							sum_result+=parseFloat(record[result_column_name]);
							result.continue();
						}
						else
						{
							results.push(record[result_column_name]);
						
							if(results.length===count)
							{
								localdb_open_requests-=1;
								results=array_unique(results);								
								callback(results);
							}
							else
							{
								result.continue();
							}
						}
					}
					else
					{
						result.continue();
					}
				}
				else
				{
					localdb_open_requests-=1;
					
					if(sum)
					{
						callback([sum_result]);
					}
					else
					{
						results=array_unique(results);
						callback(results);
					}
				}
			};
		}
		else
		{
			callback(results);
		}
	}
};


function local_read_multi_column(columns,callback,results)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_multi_column(columns,callback,results);
		});
	}
	else
	{
		var parser=new DOMParser();
		var data=parser.parseFromString(columns,"text/xml");
		var table=data.childNodes[0].nodeName;
		var cols=data.childNodes[0].childNodes;
		var count=0;
		var start_index=0;
		if(data.childNodes[0].hasAttribute('count'))
		{
			count=parseInt(data.childNodes[0].getAttribute('count'));
		}
		if(data.childNodes[0].hasAttribute('start_index'))
		{
			start_index=parseInt(data.childNodes[0].getAttribute('start_index'));
		}
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];
		
		var bound_count=0;
		
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				var fil=new Object();
				fil.name=cols[j].nodeName;
				
				if(cols[j].hasAttribute('lowerbound'))
				{
					fil.value=cols[j].textContent;
					fil.type='lowerbound';
					filter.push(fil);
					lowerbound=[fil.value,'0'];
					sort_index=cols[j].nodeName;
					
					if(bound_count==0)
					{
						var upperbound=['9999999999','9999999999'];
					}
					bound_count+=1;
				}
				if(cols[j].hasAttribute('upperbound'))
				{
					fil.value=cols[j].textContent;
					fil.type='upperbound';
					filter.push(fil);
					upperbound=[fil.value,'999999999999'];
					sort_index=cols[j].nodeName;
					
					if(bound_count==0)
					{
						lowerbound=['0','0'];
					}
					bound_count+=1;
				}
				
				if(cols[j].hasAttribute('array'))
				{
					fil.value=cols[j].textContent;
					fil.type='array';
					filter.push(fil);
				}
				else if(!(cols[j].hasAttributes()))
				{
					fil.value=cols[j].textContent;
					fil.type='';
					filter.push(fil);
				}
			}
			if(cols[j].hasAttribute('exact'))
			{
				var fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].textContent;
				fil.type='exact';
				filter.push(fil);
				sort_index=cols[j].nodeName;
				lowerbound=[fil.value,'0'];
				upperbound=[fil.value,'99999999'];
				bound_count=0;
			}
		}
	
		var sort_key=IDBKeyRange.bound(lowerbound,upperbound);
		var objectstore=static_local_db.transaction([table],"readonly").objectStore(table).index(sort_index);
		
		if(filter.length>0)
		{
			if(filter[0].name=='id')
			{
				objectstore=static_local_db.transaction([table],"readonly").objectStore(table);
				sort_key=IDBKeyRange.only(filter[0].value);
			}
		}
		
		
		var read_request=objectstore.openCursor(sort_key,sort_order);
		
		localdb_open_requests+=1;

		read_request.onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				var match_word=true;
				for(var i=0;i<filter.length;i++)
				{
					var string=record[filter[i].name].toString().toLowerCase();
					var search_word=filter[i].value.toString().toLowerCase();
					var found=0;
					
					if(filter[i].type=='')
					{
						found=string.indexOf(search_word);
					}
					else if(filter[i].type=='exact')
					{
						if(search_word!==string)
						{
							match_word=false;
							break;
						}
					}
					else if(filter[i].type=='array')
					{
						found=search_word.indexOf("-"+string+"-");
					}
					
					if(found===-1)
					{
						match_word=false;
						break;
					}
					
					if(filter[i].type=='upperbound') 
					{
						if(parseFloat(record[filter[i].name])>=parseFloat(filter[i].value))
						{
							match_word=false;
							break;
						}
					}
					else if(filter[i].type=='lowerbound') 
					{
						if(parseFloat(record[filter[i].name])<=parseFloat(filter[i].value))
						{
							match_word=false;
							break;
						}
					}
				}
				
				if(match_word===true)
				{
					if(start_index==0)
					{
						results.push(record);
					}
					else
					{					
						start_index-=1;
					}
					
					if(results.length===count)
					{
						localdb_open_requests-=1;
						callback(results);
					}
					else
					{
						result.continue();
					}
				}
				else
				{
					result.continue();
				}
			}
			else
			{
				localdb_open_requests-=1;
				callback(results);
			}
		};		
	}
};


/**
 * this function updated a row of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_row(data_xml,activity_xml);
		});
	}
	else
	{
		show_loader();
		localdb_open_requests+=1;
		
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;
	
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;

		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=objectStore.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].textContent;
				}
				var put_req=objectStore.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id+"",
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'yes',
							last_updated:""+get_my_time()};

					for(var k=0;k<activity_data.length;k++)
					{
						act_row[activity_data[k].nodeName]=activity_data[k].textContent;
					}

					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
						hide_loader();
					};
				};
			}
		};
	}
}

/**
 * this function updates a row of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_simple(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		//data_xml=data_xml.replace(/[\x{0009}\x{000a}\x{000d}\x{0020}\x{D7FF}\x{E000}\x{FFFD}]/g," ");
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;
		
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=objectStore.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].textContent;
				}
				
				var put_req=objectStore.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id+"",
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'no',
							data_id:data_record.id,
							tablename:table,
							link_to:'',
							last_updated:""+get_my_time()};
					
					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
					};
				};
			}
		};
	}
}


/**
 * this function updates multiple rows of record in local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_batch(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_batch(data_xml);
		});
	}
	else
	{
		show_loader();
		var parser=new DOMParser();
		var data_xml_array=data_xml.split("<separator></separator>");
		var table="";
		var rows=[];
		
		data_xml_array.forEach(function(data_chunk)
		{
			var data=parser.parseFromString(data_chunk,"text/xml");
			table=data.childNodes[0].nodeName;
			var rows_data=data.childNodes[0].childNodes;
			
			for(var x=0;x<rows_data.length;x++)
			{
				rows.push(rows_data[x]);
			}
		});
		
		//console.log(rows.length);
		
		var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
		var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
		
		var i=0;
		var j=0;
		var success_count=0;
		
		function update_records()
		{
			if(i<rows.length)
			{
				//console.log("I"+i);
				var data_id=rows[i].getElementsByTagName('id')[0].textContent;
				var cols=rows[i].childNodes;
				localdb_open_requests+=1;
								
				var req=os1.get(data_id);
				req.onsuccess=function(e)
				{
					i++;
					localdb_open_requests-=1;
					
					var data_record=req.result;
					if(data_record)
					{
						for(var j=0;j<cols.length;j++)
						{
							data_record[cols[j].nodeName]=cols[j].textContent;
						}
						
						var put_req=os1.put(data_record);
						put_req.onsuccess=function(e)
						{
							success_count+=1;
							update_records();
						};
					}
				};
				req.onerror=function(e)
				{
					i++;
					localdb_open_requests-=1;
					update_records();
				};
			}
		};
		
		var activity_id=parseFloat(get_new_key());
		function insert_activities()
		{
			if(j<rows.length)
			{
				//console.log("J"+j);
				var data_id=rows[j].getElementsByTagName('id')[0].textContent;
				localdb_open_requests+=1;
				
				var row_data_xml="<"+table+">"+rows[j].textContent+"</"+table+">";
				var act_row={id:""+(activity_id+j),
						type:'update',
						status:'unsynced',
						data_xml:row_data_xml,
						user_display:'no',
						data_id:data_id,
						tablename:table,
						link_to:'',
						last_updated:""+get_my_time()};
				
				os2.put(act_row).onsuccess=function(e)
				{
					j++;
					localdb_open_requests-=1;
					insert_activities();
				};
			}
		};
		
		update_records();
		insert_activities();
		
		var local_update_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
		   		var act_row={id:""+(activity_id+i+5),
						type:'update',
						status:'unsynced',
						title:'Data import',
						notes:'Updated '+success_count+' records from table '+table,
						data_xml:data_xml,
						user_display:'yes',
						data_id:'',
						tablename:'',
						link_to:'',
						last_updated:""+get_my_time()};
				var transaction=static_local_db.transaction([table,'activities'],"readwrite");		
				var os3=transaction.objectStore('activities');		
				os3.put(act_row).onsuccess=function(e){};
			    
			   clearInterval(local_update_complete);
     		   hide_loader();
		   }
        },2000);
	}
}


/**
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;
		
		var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=os1.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j].nodeName]=cols[j].textContent;
				}
				
				var put_req=os1.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:id+"",
							type:'update',
							status:'unsynced',
							data_xml:data_xml,
							user_display:'no',
							data_id:data_record.id,
							tablename:table,
							link_to:'',
							last_updated:""+get_my_time()};
				
					static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
					{
						localdb_open_requests-=1;
						if(typeof func!="undefined")
						{					
							func();
						}
					};
				};
			}
		};
	}
}


/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_row(data_xml,activity_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		show_loader();
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;
		
		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].textContent;
					unique.push(fil);
				}
			}
		}
		
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var type='create';
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].textContent;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'yes',
						last_updated:""+get_my_time()};
				for(var k=0;k<activity_data.length;k++)
				{
					act_row[activity_data[k].nodeName]=activity_data[k].textContent;
				}
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					hide_loader();
				};
			};
		}
		else
		{
			var data_row=new Object();
			var key=IDBKeyRange.bound([unique[0].value,'0'],[unique[0].value,'99999999']);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
					$("#modal5").dialog("open");
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].textContent;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:""+id,
								type:'create',
								status:'unsynced',
								data_xml:data_xml,
								user_display:'yes',
								last_updated:""+get_my_time()};
						
						for(var k=0;k<activity_data.length;k++)
						{
							act_row[activity_data[k].nodeName]=activity_data[k].textContent;
						}
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
							hide_loader();
						};
					};
				}
			};
		}
	}
}

/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_row_func(data_xml,activity_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_row_func(data_xml,activity_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		show_loader();
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;
		
		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].textContent;
					unique.push(fil);
				}
			}
		}
		
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var type='create';
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].textContent;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'yes',
						last_updated:""+get_my_time()};
				for(var k=0;k<activity_data.length;k++)
				{
					act_row[activity_data[k].nodeName]=activity_data[k].textContent;
				}
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					if(typeof func!="undefined")
					{					
						func();
					}
					hide_loader();
				};
			};
		}
		else
		{
			var data_row=new Object();
			var key=IDBKeyRange.bound([unique[0].value,'0'],[unique[0].value,'99999999']);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
					$("#modal5").dialog("open");
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].textContent;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:""+id,
								type:'create',
								status:'unsynced',
								data_xml:data_xml,
								user_display:'yes',
								last_updated:""+get_my_time()};
						
						for(var k=0;k<activity_data.length;k++)
						{
							act_row[activity_data[k].nodeName]=activity_data[k].textContent;
						}
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
									
							if(typeof func!="undefined")
							{					
								func();
							}
							hide_loader();
						};
					};
				}
			};
		}
	}
}


/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].textContent;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].textContent;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:""+get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var data_row=new Object();
			var key=IDBKeyRange.bound([unique[0].value,'0'],[unique[0].value,'99999999']);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
					$("#modal5").dialog("open");
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].textContent;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:""+id,
								type:'create',
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								data_id:data_row.id,
								tablename:table,
								link_to:'',
								last_updated:""+get_my_time()};
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
						};
					};
				}
			};
		}
	}
}


/**
 * this function saves multiple records to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_batch(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_batch(data_xml);
		});
	}
	else
	{
		show_loader();
		var parser=new DOMParser();
		var data_xml_array=data_xml.split("<separator></separator>");
		var rows=[];
		var table="";
		data_xml_array.forEach(function(data_chunk)
		{
			var data=parser.parseFromString(data_chunk,"text/xml");
			table=data.childNodes[0].nodeName;
			var rows_data=data.childNodes[0].childNodes;
			
			for(var x=0;x<rows_data.length;x++)
			{
				rows.push(rows_data[x]);
			}
		});
		
		var unique=new Array();
		
		if(rows.length>0)
		{
			var first_col=rows[0].childNodes;
			for(var j=0;j<first_col.length;j++)
			{
				if(first_col[j].textContent!=null && first_col[j].textContent!="")
				{
					if(first_col[j].hasAttribute('unique'))
					{
						var fil=new Object();
						fil.name=first_col[j].nodeName;
						fil.value=first_col[j].textContent;
						unique.push(fil);
					}
				}
			}
		}

		var transaction=static_local_db.transaction([table,'activities'],"readwrite");
		var os1=transaction.objectStore(table);
		var os2=transaction.objectStore('activities');
		var activity_id=parseFloat(get_new_key());
		
		var i=0;
		var m=0;
		var success_count=0;
		
		function create_records()
		{
			if(i<rows.length)
			{
				var data_id=rows[i].getElementsByTagName('id')[0].textContent;
				var cols=rows[i].childNodes;
				
				var data_row=new Object();
				
				for(var j=0;j<cols.length;j++)
				{
					data_row[cols[j].nodeName]=cols[j].textContent;
				}
				
				localdb_open_requests+=1;
				
				if(unique.length>0)
				{
					var kv=IDBKeyRange.bound([data_row[unique[0].name],'0'],[data_row[unique[0].name],'99999999']);
					os1.index(unique[0].name).get(kv).onsuccess=function(e)
					{
						var data_record=e.target.result;
						if(data_record)
						{
							i+=1;
							localdb_open_requests-=1;
							create_records();
						}
						else
						{
							os1.put(data_row).onsuccess=function(e)
							{
								success_count+=1;
								var data_id=rows[i].getElementsByTagName('id')[0].textContent;
								var row_data_xml="<"+table+">"+rows[i].textContent+"</"+table+">";
								var act_row={id:""+(activity_id+i),
										type:'create',
										status:'unsynced',
										data_xml:row_data_xml,
										user_display:'no',
										data_id:data_id,
										tablename:table,
										link_to:'',
										last_updated:""+get_my_time()};
								
								os2.put(act_row).onsuccess=function(e)
								{
									i+=1;
									localdb_open_requests-=1;
									create_records();
								};
							};
						}
					};
				}
				else
				{
					os1.put(data_row).onsuccess=function(e)
					{
						var data_id=rows[i].getElementsByTagName('id')[0].textContent;
						var row_data_xml="<"+table+">"+rows[i].textContent+"</"+table+">";
						var act_row={id:""+(activity_id+i),
								type:'create',
								status:'unsynced',
								data_xml:row_data_xml,
								user_display:'no',
								data_id:data_id,
								tablename:table,
								link_to:'',
								last_updated:""+get_my_time()};
						
						os2.put(act_row).onsuccess=function(e)
						{
							i+=1;
							localdb_open_requests-=1;
							create_records();
						};
					};
				}
			}
		};

		
		create_records();
		
		var local_create_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
		   		var act_row={id:""+(activity_id+i+5),
						type:'create',
						status:'unsynced',
						title:'Data import',
						notes:'Added '+success_count+' records to table '+table,
						data_xml:data_xml,
						user_display:'yes',
						data_id:'',
						tablename:'',
						link_to:'',
						updated_by:""+get_session_var('name'),
						last_updated:""+get_my_time()};
				var transaction=static_local_db.transaction([table,'activities'],"readwrite");		
				var os3=transaction.objectStore('activities');		
				os3.put(act_row).onsuccess=function(e){};
			   clearInterval(local_create_complete);
     		   hide_loader();
		   }
        },2000);

	}
}


/**
 * this function saves multiple records to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_batch_noloader(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_batch_noloader(data_xml);
		});
	}
	else
	{
		var parser=new DOMParser();
		var data_xml_array=data_xml.split("<separator></separator>");
		var rows=[];
		var table="";
		data_xml_array.forEach(function(data_chunk)
		{
			var data=parser.parseFromString(data_chunk,"text/xml");
			table=data.childNodes[0].nodeName;
			var rows_data=data.childNodes[0].childNodes;
			
			for(var x=0;x<rows_data.length;x++)
			{
				rows.push(rows_data[x]);
			}
		});
		
		var unique=new Array();
		
		if(rows.length>0)
		{
			var first_col=rows[0].childNodes;
			for(var j=0;j<first_col.length;j++)
			{
				if(first_col[j].textContent!=null && first_col[j].textContent!="")
				{
					if(first_col[j].hasAttribute('unique'))
					{
						var fil=new Object();
						fil.name=first_col[j].nodeName;
						fil.value=first_col[j].textContent;
						unique.push(fil);
					}
				}
			}
		}

		var transaction=static_local_db.transaction([table,'activities'],"readwrite");
		var os1=transaction.objectStore(table);
		var os2=transaction.objectStore('activities');
		var activity_id=parseFloat(get_new_key());
		
		var i=0;
		var m=0;
		var success_count=0;
		
		function create_records()
		{
			if(i<rows.length)
			{
				var data_id=rows[i].getElementsByTagName('id')[0].textContent;
				var cols=rows[i].childNodes;
				
				var data_row=new Object();
				
				for(var j=0;j<cols.length;j++)
				{
					data_row[cols[j].nodeName]=cols[j].textContent;
				}
				
				localdb_open_requests+=1;
				
				if(unique.length>0)
				{
					var kv=IDBKeyRange.bound([data_row[unique[0].name],'0'],[data_row[unique[0].name],'99999999']);
					os1.index(unique[0].name).get(kv).onsuccess=function(e)
					{
						var data_record=e.target.result;
						if(data_record)
						{
							i+=1;
							localdb_open_requests-=1;
							create_records();
						}
						else
						{
							os1.put(data_row).onsuccess=function(e)
							{
								success_count+=1;
								var data_id=rows[i].getElementsByTagName('id')[0].textContent;
								var row_data_xml="<"+table+">"+rows[i].textContent+"</"+table+">";
								var act_row={id:""+(activity_id+i),
										type:'create',
										status:'unsynced',
										data_xml:row_data_xml,
										user_display:'no',
										data_id:data_id,
										tablename:table,
										link_to:'',
										last_updated:""+get_my_time()};
								
								os2.put(act_row).onsuccess=function(e)
								{
									i+=1;
									localdb_open_requests-=1;
									create_records();
								};
							};
						}
					};
				}
				else
				{
					os1.put(data_row).onsuccess=function(e)
					{
						var data_id=rows[i].getElementsByTagName('id')[0].textContent;
						var row_data_xml="<"+table+">"+rows[i].textContent+"</"+table+">";
						var act_row={id:""+(activity_id+i),
								type:'create',
								status:'unsynced',
								data_xml:row_data_xml,
								user_display:'no',
								data_id:data_id,
								tablename:table,
								link_to:'',
								last_updated:""+get_my_time()};
						
						os2.put(act_row).onsuccess=function(e)
						{
							i+=1;
							localdb_open_requests-=1;
							create_records();
						};
					};
				}
			}
		};

		create_records();		
	}
}


function local_create_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].textContent;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].textContent;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:""+get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					if(typeof func!="undefined")
					{					
						func();
					}
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var data_row=new Object();
			var key=IDBKeyRange.bound([unique[0].value,'0'],[unique[0].value,'99999999']);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
					$("#modal5").dialog("open");
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].textContent;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:""+id,
								type:'create',
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								data_id:data_row.id,
								tablename:table,
								link_to:'',
								last_updated:""+get_my_time()};
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
							if(typeof func!="undefined")
							{					
								func();
							}
						};
					};
				}
			};
		}
	}
}



/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_simple_no_warning(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_simple_no_warning(data_xml);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		var data_id=data.childNodes[0].getElementsByTagName('id')[0].textContent;
		var cols=data.childNodes[0].childNodes;

		var unique=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				if(cols[j].hasAttribute('unique'))
				{
					var fil=new Object();
					fil.name=cols[j].nodeName;
					fil.value=cols[j].textContent;
					unique.push(fil);
				}
			}
		}
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(unique.length===0)
		{
			//console.log("unique length is zero");
			var data_row=new Object();
				
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].nodeName]=cols[j].textContent;
			}
			
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_xml:data_xml,
						user_display:'no',
						data_id:data_row.id,
						tablename:table,
						link_to:'',
						last_updated:""+get_my_time()};
				static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
				{
					localdb_open_requests-=1;
					//hide_loader();
				};
			};
		}
		else
		{
			//console.log("unique length is non-zero");
			var data_row=new Object();
			var key=IDBKeyRange.bound([unique[0].value,'0'],[unique[0].value,'99999999']);
			objectStore.index(unique[0].name).openCursor(key).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					localdb_open_requests-=1;
				}
				else
				{
					for(var j=0;j<cols.length;j++)
					{
						data_row[cols[j].nodeName]=cols[j].textContent;
					}
					objectStore.put(data_row).onsuccess=function(e)
					{
						var id=get_new_key();
						var act_row={id:""+id,
								type:'create',
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								data_id:data_row.id,
								tablename:table,
								link_to:'',
								last_updated:""+get_my_time()};
						static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
						{
							localdb_open_requests-=1;
						};
					};
				}
			};
		}
	}
}



/**
 * 
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_delete_row(data_xml,activity_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_row(data_xml,activity_xml);
		});
	}
	else
	{
		show_loader();
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;
		
		var activity=parser.parseFromString(activity_xml,"text/xml");
		var activity_data=activity.childNodes[0].childNodes;
		
		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].textContent;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:""+id,
									type:'delete',
									status:'unsynced',
									user_display:'yes',
									data_xml:data_xml,
									last_updated:""+get_my_time()};
							
							for(var k=0;k<activity_data.length;k++)
							{
								act_row[activity_data[k].nodeName]=activity_data[k].textContent;
							}
							
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								hide_loader();
							};
						};
					}
				}
			};
		}
		else
		{
			var keyValue=IDBKeyRange.bound([filter[0].value,'0'],[filter[0].value,'99999999']);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								delete_records();
							};
							i++;
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:""+(activity_id+j),
									type:'delete',
									status:'unsynced',
									user_display:'yes',
									data_xml:data_xml,
									last_updated:""+get_my_time()};
							
							for(var k=0;k<activity_data.length;k++)
							{
								act_row[activity_data[k].nodeName]=activity_data[k].textContent;
							}
							act_row['data_id']=delete_ids_array[j];

							os2.put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								insert_activities();
							};
							j++;
						}
					};
					
					delete_records();
					insert_activities();
					
					localdb_open_requests-=1;
				}
			};
		}
		
		var local_delete_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_delete_complete);
     		   hide_loader();
		   }
        },2000);
	}
};

/**
 * @param data_xml
 * @returns
 */
function local_delete_simple(data_xml)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_simple(data_xml);
		});
	}
	else
	{
		//show_loader();
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;

		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].textContent;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:""+id,
									type:'delete',
									data_id:data.id,
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:""+get_my_time()};
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								//hide_loader();
							};
						};
					}
				}
			};
		}
		else
		{
			show_loader();
			var keyValue=IDBKeyRange.bound([filter[0].value,'0'],[filter[0].value,'99999999']);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								i++;
								localdb_open_requests-=1;
								delete_records();
							};
							
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						//console.log('j '+j);
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:""+(activity_id+j),
									type:'delete',
									data_id:delete_ids_array[j],
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:""+get_my_time()};
							os2.put(act_row).onsuccess=function(e)
							{
								j++;
								localdb_open_requests-=1;
								insert_activities();
							};
						}
					};
					
					delete_records();
					insert_activities();
					localdb_open_requests-=1;
				}
			};
			
			var local_delete_complete=setInterval(function()
			{
			   if(localdb_open_requests===0)
			   {
				   clearInterval(local_delete_complete);
	     		   hide_loader();
			   }
	        },2000);
		}
		
	}
};


/**
 * @param data_xml
 * @returns
 */
function local_delete_simple_func(data_xml,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_simple_func(data_xml,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		var parser=new DOMParser();
		var data=parser.parseFromString(data_xml,"text/xml");
		var table=data.childNodes[0].nodeName;

		var cols=data.childNodes[0].childNodes;
		var filter=new Array();
		for(var j=0;j<cols.length;j++)
		{
			if(cols[j].textContent!=null && cols[j].textContent!="")
			{
				fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].textContent;
				filter.push(fil);
			}
		}
	
		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);
		
		if(filter[0].name=='id')
		{
			var get_req=objectStore.get(filter[0].value);
			get_req.onsuccess=function(e)
			{
				localdb_open_requests-=1;
				var data=get_req.result;
				if(data)
				{
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						localdb_open_requests+=1;
						objectStore.delete(filter[0].value).onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:""+id,
									type:'delete',
									data_id:data.id,
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:""+get_my_time()};
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								if(typeof func!="undefined")
								{					
									func();
								}
							};
						};
					}
				}
			};
		}
		else
		{
			var keyValue=IDBKeyRange.bound([filter[0].value,'0'],[filter[0].value,'99999999']);
			var delete_ids_array=[];
			objectStore.index(filter[0].name).openCursor(keyValue).onsuccess=function(e)
			{
				var result=e.target.result;
				if(result)
				{
					var data=result.value;
					
					var match_word=true;
					for(var i=1;i<filter.length;i++)
					{
						var string=data[filter[i].name].toString().toLowerCase();
						var search_word=filter[i].value.toString().toLowerCase();
						if(string!=search_word)
						{
							match_word=false;
							break;
						}
					}
					if(match_word===true)
					{
						delete_ids_array.push(data.id);
					}
					result.continue();
				}
				else
				{
					var i=0;
					var j=0;
					var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
					var os2=static_local_db.transaction(['activities'],"readwrite").objectStore('activities');
					
					
					function delete_records()
					{
						//console.log('i '+i);
						if(i<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							os1.delete(delete_ids_array[i]).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								delete_records();
							};
							i++;
						}
					};

					var activity_id=parseFloat(get_new_key());
					function insert_activities()
					{
						//console.log('j '+j);
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:""+(activity_id+j),
									type:'delete',
									data_id:delete_ids_array[j],
									data_xml:data_xml,
									tablename:table,
									status:'unsynced',
									user_display:'no',
									link_to:'',
									last_updated:""+get_my_time()};
							os2.put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								insert_activities();
							};
							j++;
						}
					};
					
					delete_records();
					insert_activities();
					
					localdb_open_requests-=1;
				}
			};
		}
		
		var local_delete_complete=setInterval(function()
		{
		   if(localdb_open_requests===0)
		   {
			   clearInterval(local_delete_complete);
			   if(typeof func!="undefined")
				{					
					func();
				}
		   }
        },2000);
	}
};

/**
 * This function calculates the current inventory levels for a product
 * @param product
 * @param batch
 * @param callback
 * @returns
 */
function local_get_inventory(product,batch,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_get_inventory(product,batch,callback);
		});
	}
	else
	{
		var sort_order='prev';
		var result=0;
		var transaction=static_local_db.transaction(['bill_items','supplier_bill_items','supplier_return_items','inventory_adjust','customer_return_items','discarded','unbilled_sale_items','unbilled_purchase_items'],"readonly");
		
		var keyValue=IDBKeyRange.bound([product,'0'],[product,'99999999']);
		transaction.objectStore('bill_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
		{
			var bi_result=e.target.result;
			if(bi_result)
			{
				var bi_record=bi_result.value;
				if((bi_record['batch']==batch || batch=='' || batch===null) && bi_record['hired']!='yes')
				{
					result-=parseFloat(bi_record['quantity']);
				}
				bi_result.continue();
			}
			else
			{
				transaction.objectStore('supplier_bill_items').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
				{
					var si_result=e.target.result;
					if(si_result)
					{
						var si_record=si_result.value;
						if(si_record['batch']==batch || batch=='' || batch===null)
						{
							result+=parseFloat(si_record['quantity']);
						}
						si_result.continue();
					}
					else
					{
						transaction.objectStore('supplier_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
						{
							var sr_result=e.target.result;
							if(sr_result)
							{
								var sr_record=sr_result.value;
								if(sr_record['batch']==batch || batch=='' || batch===null)
								{
									result-=parseFloat(sr_record['quantity']);
								}
								sr_result.continue();
							}
							else
							{
								transaction.objectStore('inventory_adjust').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
								{
									var ia_result=e.target.result;
									if(ia_result)
									{
										var ia_record=ia_result.value;
										if(ia_record['batch']==batch || batch=='' || batch===null)
										{
											result+=parseFloat(ia_record['quantity']);
										}
										ia_result.continue();
									}
									else
									{
										transaction.objectStore('customer_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
										{
											var cr_result=e.target.result;
											if(cr_result)
											{
												var cr_record=cr_result.value;
												if(cr_record['batch']==batch || batch=='' || batch===null)
												{
													result+=parseFloat(cr_record['quantity']);
												}
												if(cr_record['exchange_batch']==batch || batch=='' || batch===null)
												{
													result-=parseFloat(cr_record['quantity']);
												}
												cr_result.continue();
											}
											else
											{
												transaction.objectStore('discarded').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
												{
													var di_result=e.target.result;
													if(di_result)
													{
														var di_record=di_result.value;
														if(di_record['batch']==batch || batch=='' || batch===null)
														{
															result-=parseFloat(di_record['quantity']);
														}
														di_result.continue();
													}
													else
													{
														transaction.objectStore('unbilled_sale_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
														{
															var us_result=e.target.result;
															if(us_result)
															{
																var us_record=us_result.value;
																if(us_record['batch']==batch || batch=='' || batch===null)
																{
																	result-=parseFloat(us_record['quantity']);
																}
																us_result.continue();
															}
															else
															{
																transaction.objectStore('unbilled_purchase_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
																{
																	var up_result=e.target.result;
																	if(up_result)
																	{
																		var up_record=up_result.value;
																		if(up_record['batch']==batch || batch=='' || batch===null)
																		{
																			result+=parseFloat(up_record['quantity']);
																		}
																		up_result.continue();
																	}
																	else
																	{
																		callback(result);
																	}
																};
															}
														};
													}
												};
											}
										};
									}
								};
							}
						};
					}
				};			
			}
		};		
	}
}


/**
 * This function calculates the current inventory levels of a product instance at a particular store
 * @param product
 * @param batch
 * @param callback
 * @returns
 */
function local_get_store_inventory(store,product,batch,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_get_store_inventory(store,product,batch,callback);
		});
	}
	else
	{
		var sort_order='prev';
		var result=0;
		var transaction=static_local_db.transaction(['bill_items','supplier_bill_items','inventory_adjust','supplier_return_items','store_movement','customer_return_items','discarded','unbilled_sale_items','unbilled_purchase_items'],"readonly");
		
		var keyValue=IDBKeyRange.bound([product,'0'],[product,'99999999']);
		transaction.objectStore('bill_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
		{
			var bi_result=e.target.result;
			//console.log(bi_result);			
			if(bi_result)
			{
				var bi_record=bi_result.value;
				if(bi_record['storage']==store && bi_record['hiring']!='yes' && (bi_record['batch']==batch || batch=='' || batch===null))
				{
					result-=parseFloat(bi_record['quantity']);
				}
				bi_result.continue();
			}
			else
			{
				transaction.objectStore('supplier_bill_items').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
				{
					var si_result=e.target.result;
					//console.log("si_result");			
					//console.log(si_result);			
					if(si_result)
					{
						var si_record=si_result.value;
						if(si_record['storage']==store && (si_record['batch']==batch || batch=='' || batch===null))
						{
							result+=parseFloat(si_record['quantity']);
						}
						si_result.continue();
					}
					else
					{
						transaction.objectStore('supplier_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
						{
							var sr_result=e.target.result;
							//console.log("sr_result");			
							//console.log(sr_result);			
							if(sr_result)
							{
								var sr_record=sr_result.value;
								if(sr_record['storage']==store && (sr_record['batch']==batch || batch=='' || batch===null))
								{
									result-=parseFloat(sr_record['quantity']);
								}
								sr_result.continue();
							}
							else 
							{
								transaction.objectStore('inventory_adjust').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
								{
									var ia_result=e.target.result;
									//console.log("ia_result");			
									//console.log(ia_result);			
									if(ia_result)
									{
										var ia_record=ia_result.value;
										if(ia_record['storage']==store && (ia_record['batch']==batch || batch=='' || batch===null))
										{
											result+=parseFloat(ia_record['quantity']);
										}
										ia_result.continue();
									}
									else
									{
										transaction.objectStore('store_movement').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
										{
											var sm_result=e.target.result;
											//console.log("sm_result");			
											//console.log(sm_result);		
											if(sm_result)
											{
												var sm_record=sm_result.value;
												if(sm_record['source']==store && (sm_record['batch']==batch || batch=='' || batch===null))
												{
													result-=parseFloat(sm_record['quantity']);
												}
												if(sm_record['target']==store && (sm_record['batch']==batch || batch=='' || batch===null))
												{
													result+=parseFloat(sm_record['quantity']);
												}
												sm_result.continue();
											}
											else
											{
												transaction.objectStore('customer_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
												{
													var cr_result=e.target.result;
													//console.log("cr_result");			
													//console.log(cr_result);			
																		
													if(cr_result)
													{
														var cr_record=cr_result.value;
														if(cr_record['storage']==store && (cr_record['batch']==batch || batch=='' || batch===null))
														{
															result+=parseFloat(cr_record['quantity']);
														}
														if(cr_record['storage']==store && (cr_record['exchange_batch']==batch || batch=='' || batch===null))
														{
															result-=parseFloat(cr_record['quantity']);
														}
														cr_result.continue();
													}
													else
													{
														transaction.objectStore('discarded').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
														{
															var di_result=e.target.result;
															//console.log("di_result");			
															//console.log(di_result);				
					
															if(di_result)
															{
																var di_record=di_result.value;
																if(di_record['storage']==store && (di_record['batch']==batch || batch=='' || batch===null))
																{
																	result-=parseFloat(di_record['quantity']);
																}
																di_result.continue();
															}
															else
															{
																transaction.objectStore('unbilled_sale_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
																{
																	var us_result=e.target.result;
																	//console.log("us_result");			
																	//console.log(us_result);			
																						
																	if(us_result)
																	{
																		var us_record=us_result.value;
																		if(us_record['storage']==store && (us_record['batch']==batch || batch=='' || batch===null))
																		{
																			result-=parseFloat(us_record['quantity']);
																		}
																		us_result.continue();
																	}
																	else
																	{
																		transaction.objectStore('unbilled_purchase_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
																		{
																			var up_result=e.target.result;
																			//console.log("up_result");			
																			//console.log(up_result);			
																			if(up_result)
																			{
																				var up_record=up_result.value;
																				if(up_record['storage']==store && (up_record['batch']==batch || batch=='' || batch===null))
																				{
																					result+=parseFloat(up_record['quantity']);
																				}
																				up_result.continue();
																			}
																			else
																			{
																				callback(result);
																			}
																		};
																	}
																};
															}
														};
													}
												};
											}
										};
									}
								};
							}
						};
					}
				};			
			}
		};		
	}
}

/**
 * This function calculates the current inventory levels for a product
 * @param product
 * @param batch
 * @param callback
 * @returns
 */
function local_get_available_inventory(product,batch,data_array,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_get_available_inventory(product,batch,data_array,callback);
		});
	}
	else
	{
		var sort_order='prev';
		var result=0;
		var transaction=static_local_db.transaction(['bill_items','supplier_bill_items','supplier_return_items','inventory_adjust','customer_return_items','discarded','unbilled_sale_items','unbilled_purchase_items'],"readonly");
		
		var keyValue=IDBKeyRange.bound([product,'0'],[product,'99999999']);
		transaction.objectStore('bill_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
		{
			var bi_result=e.target.result;
			if(bi_result)
			{
				var bi_record=bi_result.value;
				if((bi_record['batch']==batch || batch=='' || batch===null) && bi_record['hired']!='yes')
				{
					result-=parseFloat(bi_record['quantity']);
				}
				bi_result.continue();
			}
			else
			{
				transaction.objectStore('supplier_bill_items').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
				{
					var si_result=e.target.result;
					if(si_result)
					{
						var si_record=si_result.value;
						if(si_record['batch']==batch || batch=='' || batch===null)
						{
							result+=parseFloat(si_record['quantity']);
						}
						si_result.continue();
					}
					else
					{
						transaction.objectStore('supplier_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
						{
							var sr_result=e.target.result;
							if(sr_result)
							{
								var sr_record=sr_result.value;
								if(sr_record['batch']==batch || batch=='' || batch===null)
								{
									result-=parseFloat(sr_record['quantity']);
								}
								sr_result.continue();
							}
							else
							{
								transaction.objectStore('inventory_adjust').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
								{
									var ia_result=e.target.result;
									if(ia_result)
									{
										var ia_record=ia_result.value;
										if(ia_record['batch']==batch || batch=='' || batch===null)
										{
											result+=parseFloat(ia_record['quantity']);
										}
										ia_result.continue();
									}
									else
									{
										transaction.objectStore('customer_return_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
										{
											var cr_result=e.target.result;
											if(cr_result)
											{
												var cr_record=cr_result.value;
												if(cr_record['batch']==batch || batch=='' || batch===null)
												{
													result+=parseFloat(cr_record['quantity']);
												}
												if(cr_record['exchange_batch']==batch || batch=='' || batch===null)
												{
													result-=parseFloat(cr_record['quantity']);
												}
												cr_result.continue();
											}
											else
											{
												transaction.objectStore('discarded').index('product_name').openCursor(keyValue,sort_order).onsuccess=function(e)
												{
													var di_result=e.target.result;
													if(di_result)
													{
														var di_record=di_result.value;
														if(di_record['batch']==batch || batch=='' || batch===null)
														{
															result-=parseFloat(di_record['quantity']);
														}
														di_result.continue();
													}
													else
													{
														transaction.objectStore('unbilled_sale_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
														{
															var us_result=e.target.result;
															if(us_result)
															{
																var us_record=us_result.value;
																if(us_record['batch']==batch || batch=='' || batch===null)
																{
																	result-=parseFloat(us_record['quantity']);
																}
																us_result.continue();
															}
															else
															{
																transaction.objectStore('unbilled_purchase_items').index('item_name').openCursor(keyValue,sort_order).onsuccess=function(e)
																{
																	var up_result=e.target.result;
																	if(up_result)
																	{
																		var up_record=up_result.value;
																		if(up_record['batch']==batch || batch=='' || batch===null)
																		{
																			result+=parseFloat(up_record['quantity']);
																		}
																		up_result.continue();
																	}
																	else
																	{
																	//////////////////////////////////////////////////////	
																		var parser=new DOMParser();
																		var data=parser.parseFromString(data_array,"text/xml");
																		var table=data.childNodes[0].nodeName;
																		var tcols=data.childNodes[0].childNodes;
																		
																		if(tcols.length>0)
																		{
																			var add_sub_type="";
																			if(data.childNodes[0].hasAttribute('type'))
																			{
																				add_sub_type=data.childNodes[0].getAttribute('type');
																			}
																			
																			var lowerbound=['0','0'];
																			var upperbound=['9999999999','9999999999'];
																			
																			var bound_count=0;
																			var filter=new Array();
																			
																			for(var j=0; j<tcols.length;j++)
																			{
																				if(tcols[j].textContent!=null && tcols[j].textContent!="")
																				{
																					var fil=new Object();
																					fil.name=tcols[j].nodeName;
																					
																					if(tcols[j].hasAttribute('lowerbound'))
																					{
																						fil.value=tcols[j].textContent;
																						fil.type='lowerbound';
																						filter.push(fil);
																						lowerbound=[fil.value,'0'];
																						sort_index=tcols[j].nodeName;
																						
																						if(bound_count==0)
																						{
																							upperbound=['9999999999','9999999999'];
																						}
																						bound_count+=1;
																					}
																					if(tcols[j].hasAttribute('upperbound'))
																					{
																						fil.value=tcols[j].textContent;
																						fil.type='upperbound';
																						filter.push(fil);
																						upperbound=[fil.value,'999999999999'];
																						sort_index=tcols[j].nodeName;
																						
																						if(bound_count==0)
																						{
																							lowerbound=['0','0'];
																						}
																						bound_count+=1;
																					}
																					
																					if(tcols[j].hasAttribute('array'))
																					{
																						fil.value=tcols[j].textContent;
																						fil.type='array';
																						filter.push(fil);
																					}
																					else if(!(tcols[j].hasAttributes()))
																					{
																						fil.value=tcols[j].textContent;
																						fil.type='';
																						filter.push(fil);
																					}
																				}
																				if(tcols[j].hasAttribute('exact'))
																				{
																					var fil=new Object();
																					fil.name=tcols[j].nodeName;
																					fil.value=tcols[j].textContent;
																					fil.type='exact';
																					filter.push(fil);
																					sort_index=tcols[j].nodeName;
																					lowerbound=[fil.value,'0'];
																					upperbound=[fil.value,'99999999'];
																					bound_count=0;
																				}
																			}
																			
																			var sort_key=IDBKeyRange.bound(lowerbound,upperbound);
																			
																			var read_request=static_local_db.transaction([table],"readonly").objectStore(table).index(sort_index).openCursor(sort_key,sort_order);
																			read_request.onsuccess=function(e)
																			{
																				var iresult=e.target.result;
																				if(iresult)
																				{
																					var record=iresult.value;
																					var match_word=true;
																					
																					for(var i=0;i<filter.length;i++)
																					{
																						var string=record[filter[i].name].toString().toLowerCase();
																						var search_word=filter[i].value.toString().toLowerCase();
																						var found=0;
																						
																						if(filter[i].type=='')
																						{
																							found=string.indexOf(search_word);
																						}
																						else if(filter[i].type=='exact')
																						{
																							if(search_word!==string)
																							{
																								match_word=false;
																								break;
																							}
																						}
																						else if(filter[i].type=='array')
																						{
																							found=search_word.indexOf("-"+string+"-");
																						}
																						else if(filter[i].type=='upperbound') 
																						{
																							if(parseFloat(record[filter[i].name])>=parseFloat(filter[i].value))
																							{
																								match_word=false;
																								break;
																							}
																						}
																						else if(filter[i].type=='lowerbound') 
																						{
																							if(parseFloat(record[filter[i].name])<=parseFloat(filter[i].value))
																							{
																								match_word=false;
																								break;
																							}
																						}
																						
																						if(found==-1)
																						{
																							match_word=false;
																							break;
																						}
																					}
																					
																					if(match_word===true)
																					{
																						if(add_sub_type=='add')
																							result+=record['quantity'];
																						else
																							result-=record['quantity'];
																					}
																					
																					iresult.continue();
																				}
																				else
																				{
																					callback(result);
																				}
																			};
																		}
																	}
																};
															}
														};
													}
												};
											}
										};
									}
								};
							}
						};
					}
				};			
			}
		};		
	}
}



/**
 * This function generated a custom report
 * @param report_id
 * @param results
 * @param callback
 * @returns
 */
function local_generate_report(report_id,results,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_generate_report(report_id,results,callback);
		});
	}
	else
	{
		var report_tables=[];
		var report_fields=[];
		var field_conditions=[];
		var value_conditions=[];
		
		var keyValue=IDBKeyRange.bound([report_id,'0'],[report_id,'99999999']);
		static_local_db.transaction(['report_items'],"readonly").objectStore('report_items').index('report_id').openCursor(keyValue).onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;
				
				report_tables.push(record['table1']);
				report_fields.push([record['table1'],record['field1']]);
				
				if(record['condition1']!='none')
				{
					if(record['condition1'].indexOf('field')!=-1)
					{
						report_tables.push(record['table2']);
						report_fields.push([record['table2'],record['field2']]);
						field_conditions.push([record['table1'],record['field1'],record['condition1'],record['table2'],record['field2']]);
					}
					else
					{
						value_conditions.push([record['table1'],record['field1'],record['condition1'],record['value']]);
					}
				}
				result.continue();
			}
			else
			{
				report_tables=array_unique(report_tables);
				report_fields=array_unique(report_fields);
				field_conditions=array_unique(field_conditions);
				value_conditions=array_unique(value_conditions);
				
				var trans=static_local_db.transaction(report_tables,"readonly");
				var cursors=[];

				function open_cursor(i)
				{
					if(i<report_tables.length)
					{
						var objectStore=trans.objectStore(report_tables[i]);
						var j=i+1;
						objectStore.openCursor().onsuccess=function(event)
						{
							cursors[report_tables[i]]=event.target.result;
						    if(cursors[report_tables[i]])
						    {
								if(j==report_tables.length)
							    {
									var match_word=true;
									for(var y in field_conditions)
									{
										if(field_conditions[y][2]=='equals field' && cursors[field_conditions[y][0]].value[field_conditions[y][1]]!=cursors[field_conditions[y][3]].value[field_conditions[y][4]])
										{
											match_word=false;
											break;
										}
										if(field_conditions[y][2]=='not equals field' && cursors[field_conditions[y][0]].value[field_conditions[y][1]]==cursors[field_conditions[y][3]].value[field_conditions[y][4]])
										{
											match_word=false;
											break;
										}	
										if(field_conditions[y][2]=='greater than field' && cursors[field_conditions[y][0]].value[field_conditions[y][1]]<=cursors[field_conditions[y][3]].value[field_conditions[y][4]])
										{
											match_word=false;
											break;
										}
										if(field_conditions[y][2]=='less than field' && cursors[field_conditions[y][0]].value[field_conditions[y][1]]>=cursors[field_conditions[y][3]].value[field_conditions[y][4]])
										{
											match_word=false;
											break;
										}
									}
									
									for(var z in value_conditions)
									{
										if(value_conditions[z][2]=='equals value' && cursors[value_conditions[z][0]].value[value_conditions[z][1]]!=value_conditions[z][3])
										{
											match_word=false;
											break;
										}
										if(value_conditions[z][2]=='not equals value' && cursors[value_conditions[z][0]].value[value_conditions[z][1]]==value_conditions[z][3])
										{
											match_word=false;
											break;
										}	
										if(value_conditions[z][2]=='greater than value' && cursors[value_conditions[z][0]].value[value_conditions[z][1]]<=value_conditions[z][3])
										{
											match_word=false;
											break;
										}
										if(value_conditions[z][2]=='less than value' && cursors[value_conditions[z][0]].value[value_conditions[z][1]]>=value_conditions[z][3])
										{
											match_word=false;
											break;
										}
									}
									
									if(match_word===true)
									{
										var data_array=new Object();
										for(var x=0;x<report_fields.length;x++)
										{
											data_array[report_fields[x][1]]=cursors[report_fields[x][0]].value[report_fields[x][1]];
										}
								    	results.push(data_array);
							    	}
							    	
							    	cursors[report_tables[i]].continue();
							    }
							    else
							    {
							    	open_cursor(j);
							    }
						    }
						    else if((i-1)>=0)
						    {
						    	cursors[report_tables[i-1]].continue();
						    }
						    else
						    {
						    	callback(results);
						    }
						}
					}
				};
				
				open_cursor(0);
				
			}
		};
	}
}