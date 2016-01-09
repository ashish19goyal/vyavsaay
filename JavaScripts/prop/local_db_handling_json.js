function local_read_json_rows(columns,callback,results)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_json_rows(columns,callback,results);
		});
	}
	else
	{
		var table=columns.data_store;
		var cols=columns.indexes;
		var count=0;
		var start_index=0;
		if(typeof columns.count!='undefined')
		{
			count=parseInt(columns.count);
		}
		if(typeof columns.start_index!='undefined')
		{
			start_index=parseInt(columns.start_index);
		}
		
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];
		
		var bound_count=0;
		
		for(var j=0;j<cols.length;j++)
		{
			var fil=new Object();
			fil.name=cols[j].index;
			
			if(typeof cols[j].lowerbound!='undefined')
			{
				fil.value=""+cols[j].lowerbound;
				fil.type='lowerbound';
				filter.push(fil);
				lowerbound=[fil.value,'0'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					var upperbound=['9999999999','9999999999'];
				}
				bound_count+=1;
			}
			if(typeof cols[j].upperbound!='undefined')
			{
				fil.value=""+cols[j].upperbound;
				fil.type='upperbound';
				filter.push(fil);
				upperbound=[fil.value,'999999999999'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					lowerbound=['0','0'];
				}
				bound_count+=1;
			}
						
			if(typeof cols[j].array!='undefined')
			{
				fil.value=cols[j].array;
				fil.type='array';
				filter.push(fil);
			}
			
			if(typeof cols[j].approx_array!='undefined')
			{
				fil.value=cols[j].approx_array;
				fil.type='approx_array';
				filter.push(fil);
			}
			
			if(typeof cols[j].unequal!='undefined')
			{
				fil.value=cols[j].unequal;
				fil.type='unequal';
				filter.push(fil);
			}

			if(typeof cols[j].value!='undefined' && cols[j].value!="")
			{
				fil.value=cols[j].value;
				fil.type='';
				filter.push(fil);
			}
		
			if(typeof cols[j].exact!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].exact;
				fil.type='exact';
				filter.push(fil);
				sort_index=cols[j].index;
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
					if(typeof record[filter[i].name]!="undefined")
					{
						var string=record[filter[i].name].toString().toLowerCase();
						if(filter[i].type!='array')
						{					
							var search_word=filter[i].value.toString().toLowerCase();
							
							if(filter[i].type=='')
							{
								if(string.indexOf(search_word)===-1)
								{
									match_word=false;
									break;
								}
							}
							
							if(filter[i].type=='exact')
							{
								if(search_word!==string)
								{
									match_word=false;
									break;
								}
							}
							if(filter[i].type=='unequal')
							{
								if(search_word==string)
								{
									match_word=false;
									break;
								}
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
						else if(filter[i].type=='array')
						{
							if(filter[i].value.indexOf(string)==-1)
							{
								match_word=false;
								break;
							}
						}
						
						if(filter[i].type=='approx_array')
						{
							var approx_array=filter[i].value;
							var sub_match=false;
							for(var ab in approx_array)
							{
								if(string.indexOf(approx_array[ab])>-1)
								{
									sub_match=true;
									break;
								}
							}
							if(!sub_match)
							{
								match_word=false;
								break;
							}
						}						
					}
					else
					{
						if(filter[i].type!='unequal')
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


function local_read_json_column(columns,callback,results)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_json_column(columns,callback,results);
		});
	}
	else
	{
		var table=columns.data_store;
		var cols=columns.indexes;
		var count=0;
		var start_index=0;
		var result_column_name=columns.return_column;
			
		var sum=false;
		if(typeof columns.sum!='undefined')
		{
			sum=true;
		}
		
		var sum_result=0;
		
		if(typeof columns.count!='undefined')
		{
			count=parseInt(columns.count);
		}
		if(typeof columns.start_index!='undefined')
		{
			start_index=parseInt(columns.start_index);
		}
		
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];
		
		var bound_count=0;
		
		for(var j=0;j<cols.length;j++)
		{
			var fil=new Object();
			fil.name=cols[j].index;
			
			if(typeof cols[j].lowerbound!='undefined')
			{
				fil.value=""+cols[j].lowerbound;
				fil.type='lowerbound';
				filter.push(fil);
				lowerbound=[fil.value,'0'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					var upperbound=['9999999999','9999999999'];
				}
				bound_count+=1;
			}
			if(typeof cols[j].upperbound!='undefined')
			{
				fil.value=""+cols[j].upperbound;
				fil.type='upperbound';
				filter.push(fil);
				upperbound=[fil.value,'999999999999'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					lowerbound=['0','0'];
				}
				bound_count+=1;
			}
						
			if(typeof cols[j].array!='undefined')
			{
				fil.value=cols[j].array;
				fil.type='array';
				filter.push(fil);
			}
			
			if(typeof cols[j].approx_array!='undefined')
			{
				fil.value=cols[j].approx_array;
				fil.type='approx_array';
				filter.push(fil);
			}
			
			if(typeof cols[j].unequal!='undefined')
			{
				fil.value=cols[j].unequal;
				fil.type='unequal';
				filter.push(fil);
			}

			if(typeof cols[j].value!='undefined' && cols[j].value!="")
			{
				fil.value=cols[j].value;
				fil.type='';
				filter.push(fil);
			}
		
			if(typeof cols[j].exact!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].exact;
				fil.type='exact';
				filter.push(fil);
				sort_index=cols[j].index;
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
					if(typeof record[filter[i].name]!="undefined")
					{
						var string=record[filter[i].name].toString().toLowerCase();
						if(filter[i].type!='array')
						{
												
							var search_word=filter[i].value.toString().toLowerCase();
							
							if(filter[i].type=='')
							{
								if(string.indexOf(search_word)===-1)
								{
									match_word=false;
									break;
								}
							}
							if(filter[i].type=='exact')
							{
								if(search_word!==string)
								{
									match_word=false;
									break;
								}
							}
							if(filter[i].type=='unequal')
							{
								if(search_word==string)
								{
									match_word=false;
									break;
								}
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
						else if(filter[i].type=='array')
						{
							if(filter[i].value.indexOf(string)==-1)
							{
								match_word=false;
								break;
							}
						}
						
						if(filter[i].type=='approx_array')
						{
							var approx_array=filter[i].value;
							var sub_match=false;
							for(var ab in approx_array)
							{
								if(string.indexOf(approx_array[ab])>-1)
								{
									sub_match=true;
									break;
								}
							}
							if(!sub_match)
							{
								match_word=false;
								break;
							}
						}
					}
					else
					{
						if(filter[i].type!='unequal')
						{
							match_word=false;
							break;
						}
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
};


function local_read_json_count(columns,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_read_json_count(columns,callback);
		});
	}
	else
	{
		var table=columns.data_store;
		var cols=columns.indexes;
		var count=0;
		var start_index=0;
		var result_count=0;
		if(typeof columns.count!='undefined')
		{
			count=parseInt(columns.count);
		}
		if(typeof columns.start_index!='undefined')
		{
			start_index=parseInt(columns.start_index);
		}
		
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];
		
		var bound_count=0;
		
		for(var j=0;j<cols.length;j++)
		{
			var fil=new Object();
			fil.name=cols[j].index;
			
			if(typeof cols[j].lowerbound!='undefined')
			{
				fil.value=""+cols[j].lowerbound;
				fil.type='lowerbound';
				filter.push(fil);
				lowerbound=[fil.value,'0'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					var upperbound=['9999999999','9999999999'];
				}
				bound_count+=1;
			}
			if(typeof cols[j].upperbound!='undefined')
			{
				fil.value=""+cols[j].upperbound;
				fil.type='upperbound';
				filter.push(fil);
				upperbound=[fil.value,'999999999999'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					lowerbound=['0','0'];
				}
				bound_count+=1;
			}
						
			if(typeof cols[j].array!='undefined')
			{
				fil.value=cols[j].array;
				fil.type='array';
				filter.push(fil);
			}
			
			if(typeof cols[j].approx_array!='undefined')
			{
				fil.value=cols[j].approx_array;
				fil.type='approx_array';
				filter.push(fil);
			}
			
			if(typeof cols[j].unequal!='undefined')
			{
				fil.value=cols[j].unequal;
				fil.type='unequal';
				filter.push(fil);
			}

			if(typeof cols[j].value!='undefined' && cols[j].value!="")
			{
				fil.value=cols[j].value;
				fil.type='';
				filter.push(fil);
			}
		
			if(typeof cols[j].exact!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].exact;
				fil.type='exact';
				filter.push(fil);
				sort_index=cols[j].index;
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
					if(typeof record[filter[i].name]!="undefined")
					{
						var string=record[filter[i].name].toString().toLowerCase();
						if(filter[i].type!='array')
						{					
							var search_word=filter[i].value.toString().toLowerCase();
							
							if(filter[i].type=='')
							{
								if(string.indexOf(search_word)===-1)
								{
									match_word=false;
									break;
								}
							}
							
							if(filter[i].type=='exact')
							{
								if(search_word!==string)
								{
									match_word=false;
									break;
								}
							}
							if(filter[i].type=='unequal')
							{
								if(search_word==string)
								{
									match_word=false;
									break;
								}
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
						else if(filter[i].type=='array')
						{
							if(filter[i].value.indexOf(string)==-1)
							{
								match_word=false;
								break;
							}
						}
						
						if(filter[i].type=='approx_array')
						{
							var approx_array=filter[i].value;
							var sub_match=false;
							for(var ab in approx_array)
							{
								if(string.indexOf(approx_array[ab])>-1)
								{
									sub_match=true;
									break;
								}
							}
							if(!sub_match)
							{
								match_word=false;
								break;
							}
						}						
					}
					else
					{
						if(filter[i].type!='unequal')
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
						result_count+=1;
					}
					else
					{					
						start_index-=1;
					}
					
					if(result_count===count)
					{
						localdb_open_requests-=1;
						callback(result_count);
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
				callback(result_count);
			}
		};		
	}
};


/**
 * This function generated a custom report
 * @param report_id
 * @param results
 * @param callback
 * @returns
 */
function local_generate_report_json(report_id,callback)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_generate_report_json(report_id,callback);
		});
	}
	else
	{
		show_loader();
		var report_tables=[];
		var report_fields=[];
		var field_conditions=[];
		var value_conditions=[];
		var results=[];
		
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
						    	hide_loader();
						    }
						}
					}
				};
				
				open_cursor(0);
				
			}
		};
	}
}

/**
 * 
 * @param data_xml
 * @param activity_xml
 * @returns
 */
function local_delete_json(columns,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_delete_json(columns,func);
		});
	}
	else
	{
		show_loader();
		localdb_open_requests+=1;
		var table=columns.data_store;
		var cols=columns.data;
		var log='no';
		var activity_data=[];
		var result_count=0;
		if(typeof columns.log!='undefined')
		{
			log=columns.log;
		}
		if(typeof columns.log_data!='undefined')
		{
			activity_data=columns.log_data;
		}
		
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];
		
		var bound_count=0;
		
		for(var j=0;j<cols.length;j++)
		{
			var fil=new Object();
			fil.name=cols[j].index;
			
			if(typeof cols[j].lowerbound!='undefined')
			{
				fil.value=""+cols[j].lowerbound;
				fil.type='lowerbound';
				filter.push(fil);
				lowerbound=[fil.value,'0'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					var upperbound=['9999999999','9999999999'];
				}
				bound_count+=1;
			}
			if(typeof cols[j].upperbound!='undefined')
			{
				fil.value=""+cols[j].upperbound;
				fil.type='upperbound';
				filter.push(fil);
				upperbound=[fil.value,'999999999999'];
				sort_index=cols[j].index;
				
				if(bound_count==0)
				{
					lowerbound=['0','0'];
				}
				bound_count+=1;
			}
						
			if(typeof cols[j].array!='undefined')
			{
				fil.value=cols[j].array;
				fil.type='array';
				filter.push(fil);
			}
			
			if(typeof cols[j].approx_array!='undefined')
			{
				fil.value=cols[j].approx_array;
				fil.type='approx_array';
				filter.push(fil);
			}
			
			if(typeof cols[j].unequal!='undefined')
			{
				fil.value=cols[j].unequal;
				fil.type='unequal';
				filter.push(fil);
			}

			if(typeof cols[j].value!='undefined' && cols[j].value!="")
			{
				fil.value=cols[j].value;
				fil.type='';
				filter.push(fil);
			}
		
			if(typeof cols[j].exact!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].exact;
				fil.type='exact';
				filter.push(fil);
				sort_index=cols[j].index;
				lowerbound=[fil.value,'0'];
				upperbound=[fil.value,'99999999'];
				bound_count=0;
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
									user_display:log,
									tablename:table,
									data_type:'json',
									data_id:filter[0].value,
									data_xml:JSON.stringify(cols),
									updated_by:get_name(),
									last_updated:""+get_my_time()};
							if(log=='yes')
							{
								act_row['title']=log;
								act_row['notes']=log;
								act_row['link_to']=log;
							}
							
							static_local_db.transaction(['activities'],"readwrite").objectStore('activities').put(act_row).onsuccess=function(e)
							{
								localdb_open_requests-=1;
								
								hide_loader();
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
					var record=result.value;
					var match_word=true;
					for(var i=0;i<filter.length;i++)
					{
						if(typeof record[filter[i].name]!="undefined")
						{
							var string=record[filter[i].name].toString().toLowerCase();
							if(filter[i].type!='array')
							{					
								var search_word=filter[i].value.toString().toLowerCase();
								
								if(filter[i].type=='')
								{
									if(string.indexOf(search_word)===-1)
									{
										match_word=false;
										break;
									}
								}
								
								if(filter[i].type=='exact')
								{
									if(search_word!==string)
									{
										match_word=false;
										break;
									}
								}
								if(filter[i].type=='unequal')
								{
									if(search_word==string)
									{
										match_word=false;
										break;
									}
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
							else if(filter[i].type=='array')
							{
								if(filter[i].value.indexOf(string)==-1)
								{
									match_word=false;
									break;
								}
							}
							
							if(filter[i].type=='approx_array')
							{
								var approx_array=filter[i].value;
								var sub_match=false;
								for(var ab in approx_array)
								{
									if(string.indexOf(approx_array[ab])>-1)
									{
										sub_match=true;
										break;
									}
								}
								if(!sub_match)
								{
									match_word=false;
									break;
								}
							}						
						}
						else
						{
							if(filter[i].type!='unequal')
							{
								match_word=false;
								break;
							}
						}
					}
					
					if(match_word===true)
					{
						delete_ids_array.push(record.id);
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

					var activity_id=get_new_key();
					function insert_activities()
					{
						if(j<delete_ids_array.length)
						{
							localdb_open_requests+=1;
							var act_row={id:""+(activity_id+j),
									type:'delete',
									status:'unsynced',
									user_display:log,
									tablename:table,
									data_type:'json',
									data_id:delete_ids_array[j],
									data_xml:JSON.stringify(cols),
									updated_by:get_name(),
									last_updated:""+get_my_time()};
							if(log=='yes')
							{
								act_row['title']=log;
								act_row['notes']=log;
								act_row['link_to']=log;
							}
							
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
				if(typeof func!="undefined")
				{					
					func();
				}
			}
		},500);
	}
};