/**
 * This function creates a new table in the local database
 * @param db_name name of the local database
 * @param func function to be executed on success
 */
function create_local_db(domain,func)
{
	var db_name="re_local_"+domain;
	ajax_with_custom_func("./db/db_schema.xml","",function(e)
	{
		console.log("creating local db");
		var request = indexedDB.open(db_name,2);
	
		request.onsuccess=function(e)
		{
			console.log("db exists or created. syncing data");
			db=e.target.result;
			db.close();
			func();
		};
		
		request.onupgradeneeded=function(ev)
		{
			console.log("db didn't exist. creating it");
			db=ev.target.result;
			//var indexes= new Array(38);
			//var table=new Array(38);		
			var tables=e.responseXML.childNodes[0].childNodes;
			
			for(var k=0; k<tables.length; k++)
			{
				if(tables[k].nodeName!="" && tables[k].nodeName!="#text" && tables[k].nodeName!="#comment")
				{	
					table=db.createObjectStore(tables[k].nodeName,{keyPath:'id'});
				
					for(var i=0;i<tables[k].childNodes.length;i++)
					{	
						if(tables[k].childNodes[i].nodeName!="" && tables[k].childNodes[i].nodeName!="#text" && tables[k].childNodes[i].nodeName!="#comment")
						{	
							//console.log(tables[k].childNodes[i].nodeName);
							var indexing=tables[k].childNodes[i].getAttribute('index');
							if(indexing=='yes')
								table.createIndex(tables[k].childNodes[i].nodeName,tables[k].childNodes[i].nodeName);
						}		
					}
				}
			}			

		};
		
		request.onerror=function(e)
		{
			console.log("2.3 error occured when creating tables");
		};
	});
};


/**
 * This function executes a simple read access on local database
 * @param table table name that is to be accessed
 * @param column name of the column to be referenced
 * @param results data to be passed on to the callback function
 * @param callback function to be executed on successful access
 */
function local_read_single_column(columns,callback,results)
{
	//console.log(columns);
	var parser=new DOMParser();
	var data=parser.parseFromString(columns,"text/xml");
	var table=data.childNodes[0].nodeName;
	var cols=data.childNodes[0].childNodes;
	
	var filter=new Array();
	for(var j in cols)
	{
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			var fil=new Object();
			fil.name=cols[j].nodeName;
			if(cols[j].hasAttribute('compare'))
			{
				fil.value=parseInt(cols[j].innerHTML);
				fil.type=cols[j].getAttribute('compare');
			}
			else if(cols[j].hasAttribute('array'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='array';
			}
			else
			{
				fil.value=cols[j].innerHTML;
				fil.type='';
			}
			filter.push(fil);
			//console.log(filter);
		}
	}
	//console.log(filter);
	var domain=get_domain();
	var db_name="re_local_"+domain;
	sklad.open(db_name,{
		version:2},
		function (err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			
			database.get(table,{direction:sklad.DESC}, function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				for(var row in records)
				{
					var match=true;
					for(var i in filter)
					{
						//console.log(filter[i].name);
						//console.log(records[row]);
						var string=records[row][filter[i].name].toLowerCase();
						var search=filter[i].value.toLowerCase();
						var found=0;
						
						if(filter[i].type=='')
						{
							found=string.search(search);
						}
						else if(filter[i].type=='array')
						{
							found=search.search(string);
						}
						if(filter[i].type=='less than') 
						{
							if(parseInt(records[row][filter[i].name])>=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='more than') 
						{
							if(parseInt(records[row][filter[i].name])<=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='equal') 
						{
							if(parseInt(records[row][filter[i].name])!=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='not equal') 
						{
							if(parseInt(records[row][filter[i].name])==filter[i].value)
							{
								match=false;
								break;
							}
						}

						if(found===-1)
						{
							match=false;
							break;
						}
					}
					
					if(match===true)
					{
						results.push(records[row][cols[0].nodeName]);
					}
				}
				callback(results);
			});		
		});
};

/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_row(data_xml,activity_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;
	var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
	var cols=data.childNodes[0].childNodes;

	
	var activity=parser.parseFromString(activity_xml,"text/xml");
	var activity_data=activity.childNodes[0].childNodes;
	
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log("unique length is zero");
			database.get(table,{range: IDBKeyRange.only(data_id)},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					var data_row=new Object();
					
					for(var i in records)
					{
						type='update';
						data_row=records[i];
						break;
					}
						
					for(var j in cols)
					{
						data_row[cols[j].nodeName]=cols[j].innerHTML;
					}
					database.upsert(table,data_row,function(err,insertedkey)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							var act_row={id:get_new_key(),
									type:type,
									status:'unsynced',
									data_xml:data_xml,
									user_display:'yes',
									last_updated:get_my_time()};
							for(var k in activity_data)
							{
								act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
							}
							//console.log("activities length="+activity_data.length);
							database.upsert('activities',act_row,function(err,insertedkey)
							{
								if(err)
								{
									console.log(err);
								}
								hide_loader();
							});	
						}
					});
				}
			});			
		});
}



/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_update_simple(data_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;
	var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
	var cols=data.childNodes[0].childNodes;
	
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			database.get(table,{range: IDBKeyRange.only(data_id)},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					var data_row=new Object();
					
					for(var i in records)
					{
						type='update';
						data_row=records[i];
						break;
					}
					
					for(var j in cols)
					{
						data_row[cols[j].nodeName]=cols[j].innerHTML;
					}
					database.upsert(table,data_row,function(err,insertedkey)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							var act_row={id:get_new_key(),
									type:type,
									status:'unsynced',
									data_xml:data_xml,
									user_display:'no',
									last_updated:get_my_time()};
								
							database.upsert('activities',act_row,function(err,insertedkey)
							{
								if(err)
								{
									console.log(err);
								}
								hide_loader();
							});
						
						}
					});
				}
			});
		});
}


/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_row(data_xml,activity_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;
	var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
	var cols=data.childNodes[0].childNodes;

	var unique=new Array();
	for(var j in cols)
	{
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			if(cols[j].hasAttribute('unique'))
			{
				var fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].innerHTML;
				unique.push(fil);
			}
		}
	}
	//console.log("this is the unique array--"+unique);
	
	var activity=parser.parseFromString(activity_xml,"text/xml");
	var activity_data=activity.childNodes[0].childNodes;
	
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			if(unique.length===0)
			{
				//console.log("unique length is zero");
				var type='create';
				var data_row=new Object();
					
				for(var j in cols)
				{
					data_row[cols[j].nodeName]=cols[j].innerHTML;
				}
				database.upsert(table,data_row,function(err,insertedkey)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						var act_row={id:get_new_key(),
								type:type,
								status:'unsynced',
								data_xml:data_xml,
								user_display:'yes',
								last_updated:get_my_time()};
						for(var k in activity_data)
						{
							act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
						}
						//console.log("activities length="+activity_data.length);
						database.upsert('activities',act_row,function(err,insertedkey)
						{
							if(err)
							{
								console.log(err);
							}
							hide_loader();
						});	
					}
				});
				
			}
			else
			{
				//console.log("unique length is non-zero");
				database.get(table,{},function(err,records)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						var unique_rec=true;
						var type='create';
						var data_row=new Object();
						
						for(var i in records)
						{	
							for(var k in unique)
							{
								if(records[i][unique[k].name]==unique[k].value)
								{
									unique_rec=false;
								}
							}	
						}
						
						if(unique_rec===true)
						{
							//console.log("didnt find any duplicate records");

							for(var j in cols)
							{
								data_row[cols[j].nodeName]=cols[j].innerHTML;
							}
							database.upsert(table,data_row,function(err,insertedkey)
							{
								if(err)
								{
									console.log(err);
								}
								else
								{
									var act_row={id:get_new_key(),
											type:type,
											status:'unsynced',
											data_xml:data_xml,
											user_display:'yes',
											last_updated:get_my_time()};
									for(var k in activity_data)
									{
										act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
									}
									//console.log("activities length="+activity_data.length);
									database.upsert('activities',act_row,function(err,insertedkey)
									{
										if(err)
										{
											console.log(err);
										}
										hide_loader();
									});
								
								}
							});
						}
						else
						{
							//console.log("found duplicate records");
							hide_loader();
							$("#modal5").dialog("open");
						}
					}
				});
			}
		});
}



/**
 * this function save a row of record to local db
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_create_simple(data_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;
	var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
	var cols=data.childNodes[0].childNodes;

	var unique=new Array();
	for(var j in cols)
	{
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			if(cols[j].hasAttribute('unique'))
			{
				var fil=new Object();
				fil.name=cols[j].nodeName;
				fil.value=cols[j].innerHTML;
				unique.push(fil);
			}
		}
	}
	
	var domain=get_domain();
	var db_name="re_local_"+domain;
	
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			if(unique.length===0)
			{
				var type='create';
				var data_row=new Object();
				
				for(var j in cols)
				{
					data_row[cols[j].nodeName]=cols[j].innerHTML;
				}
				database.upsert(table,data_row,function(err,insertedkey)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						var act_row={id:get_new_key(),
								type:type,
								status:'unsynced',
								data_xml:data_xml,
								user_display:'no',
								last_updated:get_my_time()};
							
						database.upsert('activities',act_row,function(err,insertedkey)
						{
							if(err)
							{
								console.log(err);
							}
							hide_loader();
						});
					
					}
				});
			}
			else
			{
				//console.log("unique length is non-zero");
				database.get(table,{},function(err,records)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						var unique_rec=true;
						var type='create';
						var data_row=new Object();
						
						for(var i in records)
						{
							if(records[i].id==data_id)
							{
								type='update';
								data_row=records[i];
								unique_rec=true;
								break;
							}
							else 
							{	
								for(var k in unique)
								{
									if(records[i][unique[k].name]==unique[k].value)
									{
										unique_rec=false;
									}
								}
							}
							
						}
						
						//console.log(unique_rec);
						if(unique_rec===true)
						{
							//console.log("didnt find any duplicate records");

							for(var j in cols)
							{
								data_row[cols[j].nodeName]=cols[j].innerHTML;
							}
							database.upsert(table,data_row,function(err,insertedkey)
							{
								if(err)
								{
									console.log(err);
								}
								else
								{
									var act_row={id:get_new_key(),
											type:type,
											status:'unsynced',
											data_xml:data_xml,
											user_display:'no',
											last_updated:get_my_time()};
									
									//console.log("activities data------"+act_row);
									database.upsert('activities',act_row,function(err,insertedkey)
									{
										if(err)
										{
											console.log(err);
										}
										hide_loader();
									});
								}
							});
						}
						else
						{
							//console.log("found duplicate records");
							hide_loader();
							$("#modal5").dialog("open");
						}
					}
				});
			}
		});
}



	
function local_read_multi_column(columns,callback,results)
{
	//console.log(columns);
	var parser=new DOMParser();
	var data=parser.parseFromString(columns,"text/xml");
	var table=data.childNodes[0].nodeName;
	var cols=data.childNodes[0].childNodes;
	var filter=new Array();
	var compare=new Array();
	for(var j in cols)
	{
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			var fil=new Object();
			fil.name=cols[j].nodeName;
			
			if(cols[j].hasAttribute('compare'))
			{
				fil.value=parseInt(cols[j].innerHTML);
				fil.type=cols[j].getAttribute('compare');
			}
			else if(cols[j].hasAttribute('array'))
			{
				fil.value=cols[j].innerHTML;
				fil.type='array';
			}
			else
			{
				fil.value=cols[j].innerHTML;
				fil.type='';
			}
			filter.push(fil);
		}
	}
	//console.log(filter);
	var domain=get_domain();
	var db_name="re_local_"+domain;
	sklad.open(db_name,{
		version:2},
		function (err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			
			database.get(table,{direction:sklad.DESC}, function(err,records)
			{
				if(err)
				{
					console.log(err+"------"+table);
				}
				for(var row in records)
				{
					var match=true;
					for(var i in filter)
					{
						var string=records[row][filter[i].name].toLowerCase();
						var search=filter[i].value.toLowerCase();
						var found=0;
						
						if(filter[i].type=='')
						{
							found=string.search(search);
						}
						else if(filter[i].type=='array')
						{
							found=search.search(string);
						}
						if(filter[i].type=='less than') 
						{
							if(parseInt(records[row][filter[i].name])>=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='more than') 
						{
							if(parseInt(records[row][filter[i].name])<=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='equal') 
						{
							if(parseInt(records[row][filter[i].name])!=filter[i].value)
							{
								match=false;
								break;
							}
						}
						else if(filter[i].type=='not equal') 
						{
							if(parseInt(records[row][filter[i].name])==filter[i].value)
							{
								match=false;
								break;
							}
						}

						if(found===-1)
						{
							match=false;
							break;
						}
					}
					
					if(match===true)
					{
						results.push(records[row]);
					}
				}
				callback(results);
			});		
		});
}

/**
 * 
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_delete_row(data_xml,activity_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;
	var data_id=data.childNodes[0].getElementsByTagName('id')[0].innerHTML;
	
	var activity=parser.parseFromString(activity_xml,"text/xml");
	var activity_data=activity.childNodes[0].childNodes;
	
	var domain=get_domain();
	var db_name="re_local_"+domain;
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			
			database.get(table,{range: IDBKeyRange.only(data_id)},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					for(var i in records)
					{
						database.delete(table,data_id,function(err)
						{
							if(err)
							{
								console.log(err);
							}
							else
							{
								var act_row={id:get_new_key(),
										type:'delete',
										status:'unsynced',
										user_display:'yes',
										data_xml:data_xml,
										last_updated:get_my_time()};
								for(var k in activity_data)
								{
									act_row[activity_data[k].nodeName]=activity_data[k].innerHTML;
								}
								database.upsert('activities',act_row,function(err,insertedkey)
								{
									if(err)
									{
										console.log(err);
										
									}
									hide_loader();
								});
							}
						});
						break;
					}
				}
			});
		});
};

/**
 * 
 * @param data_xml
 * @returns
 */
function local_delete_simple(data_xml)
{
	show_loader();
	var parser=new DOMParser();
	var data=parser.parseFromString(data_xml,"text/xml");
	var table=data.childNodes[0].nodeName;

	var cols=data.childNodes[0].childNodes;
	var filter=new Array();
	for(var j in cols)
	{
		if(cols[j].innerHTML!=null && cols[j].innerHTML!="")
		{
			fil=new Object();
			fil.name=cols[j].nodeName;
			fil.value=cols[j].innerHTML;
			filter.push(fil);
		}
	}

	var domain=get_domain();
	var db_name="re_local_"+domain;
	sklad.open(db_name,{
		version:2},
		function(err,database)
		{
			if(err)
			{
				console.log(err);
			}
			//console.log(tables);
			
			database.get(table,{
				index: filter[0].name,
				range: IDBKeyRange.only(filter[0].value)
			},function(err,records)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					records.forEach(function(record)
					{
						var match=true;
						for(var i in filter)
						{
							var string=record[filter[i].name].toLowerCase();
							var search=filter[i].value.toLowerCase();
							var found=string.search(search);
							if(found===-1)
							{
								match=false;
								break;
							}
						}
						if(match===true)
						{
							database.delete(table,record.id,function(err)
							{
								if(err)
								{
									console.log(err);
								}
								else
								{
									var act_row={id:get_new_key(),
											type:'delete',
											data_id:record.id,
											data_xml:data_xml,
											tablename:table,
											status:'unsynced',
											user_display:'no',
											last_updated:get_my_time()};
									database.upsert('activities',act_row,function(err,insertedkey)
									{
										if(err)
										{
											console.log(err);
										}
										hide_loader();
									});
								}
							});
						}
					});
				}
			});
		});
};

