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
        var access_control=false;
		if(typeof columns.count!='undefined')
		{
			count=parseInt(columns.count);
		}
		if(typeof columns.start_index!='undefined')
		{
			start_index=parseInt(columns.start_index);
		}
		var access_store=table;
        if(typeof columns.access!='undefined')
		{
			access_control=true;
            if(typeof columns.access.data_store!='undefined')
            {
                access_store=columns.access.data_store;
            }
		}
		var account_name=get_session_var('acc_name');
        var rolename=get_session_var('user_roles');
        var roles_array=rolename.split("--");

        //console.log(account_name+"-"+rolename);
		var filter=new Array();
		var sort_index='last_updated';
		var sort_order='prev';
		var lowerbound=['0','0'];
		var upperbound=['9999999999','9999999999'];

		var bound_count=0;

		for(var j=0;j<cols.length;j++)
		{
			if(typeof cols[j].lowerbound!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;

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
				var fil=new Object();
				fil.name=cols[j].index;

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
				var fil=new Object();
				fil.name=cols[j].index;

				fil.value=cols[j].array;
				fil.type='array';
				filter.push(fil);
			}

			if(typeof cols[j].approx_array!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;

				fil.value=cols[j].approx_array;
				fil.type='approx_array';
				filter.push(fil);
			}

            if(typeof cols[j].all_approx_array!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;

				fil.value=cols[j].all_approx_array;
				fil.type='all_approx_array';
				filter.push(fil);
			}


			if(typeof cols[j].unequal!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;

				fil.value=cols[j].unequal;
				fil.type='unequal';
				filter.push(fil);
			}

			if(typeof cols[j].isnull!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;

				fil.value=cols[j].isnull;
				fil.type='isnull';
				filter.push(fil);
			}

			if(typeof cols[j].value!='undefined' && cols[j].value!="")
			{
				var fil=new Object();
				fil.name=cols[j].index;

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

        function local_read_json_rows_filtering(record)
        {
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
                                return false;
                            }
                        }

                        if(filter[i].type=='exact')
                        {
                            if(search_word!==string)
                            {
                                return false;
                            }
                        }
                        if(filter[i].type=='unequal')
                        {
                            if(search_word==string)
                            {
                                return false;
                            }
                        }

                        if(filter[i].type=='isnull')
                        {
                            if(filter[i].value=='no' && string=="null")
                            {
                                return false;
                            }
                            else if(filter[i].value=='yes' && string!="null")
                            {
                                return false;
                            }
                        }

                        if(filter[i].type=='upperbound')
                        {
                            if(parseFloat(record[filter[i].name])>=parseFloat(filter[i].value))
                            {
                                return false;
                            }
                        }
                        else if(filter[i].type=='lowerbound')
                        {
                            if(parseFloat(record[filter[i].name])<=parseFloat(filter[i].value))
                            {
                                return false;
                            }
                        }
                    }
                    else if(filter[i].type=='array')
                    {
                        if(filter[i].value.indexOf(string)==-1)
                        {
                            return false;
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
                            return false;
                        }
                    }

                    if(filter[i].type=='all_approx_array')
                    {
                        var all_approx_array=filter[i].value;
                        for(var ab in all_approx_array)
                        {
                            if(string.indexOf(all_approx_array[ab])==-1)
                            {
                                return false;
                            }
                        }
                    }
                }
                else
                {
                    if(filter[i].type!='unequal')
                    {
                        return false;
                    }
                    if(filter[i].type=='isnull')
                    {
                        if(filter[i].value=='no')
                        {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        function local_read_json_rows_data_traversing()
        {
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
                    //console.log(record);
                    var match_word=local_read_json_rows_filtering(record);
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

        function local_read_json_rows_object_traversing(access_conditions_array)
        {
            var sort_key=IDBKeyRange.bound(lowerbound,upperbound);
            var ac_transaction=static_local_db.transaction([table,'object_access'],"readonly");
            var t_objectstore=ac_transaction.objectStore(table).index(sort_index);
            var o_objectstore=ac_transaction.objectStore('object_access').index('record_id');

            if(filter.length>0)
            {
                if(filter[0].name=='id')
                {
                    objectstore=static_local_db.transaction([table],"readonly").objectStore(table);
                    sort_key=IDBKeyRange.only(filter[0].value);
                }
            }

            var read_request=t_objectstore.openCursor(sort_key,sort_order);

            localdb_open_requests+=1;

            read_request.onsuccess=function(e)
            {
                var result=e.target.result;
                //console.log(result);
                if(result)
                {
                    var record=result.value;
                    //console.log(record);
                    var match_word=local_read_json_rows_filtering(record);
                    if(match_word===true)
                    {
                        var object_key=IDBKeyRange.bound([record.id,'000000000'],[record.id,'99999999999999']);
                        var object_read_request=o_objectstore.openCursor(object_key,sort_order);
                        object_read_request.onsuccess=function(oe)
                        {
                            var oresult=oe.target.result;
                            //console.log(oresult);
                            if(oresult)
                            {
                                var orecord=oresult.value;
                                //console.log(orecord);
                                if(orecord.tablename==access_store)
                                {
                                    //console.log('check1');
                                    if(orecord.user_type=='user')
                                    {
                                        //console.log('check1');
                                        if(orecord.user.indexOf(account_name)!=-1)
                                        {
                                            //console.log('check1');
                                            if(start_index==0)
                                            {
                                                //console.log('check1');
                                                results.push(record);
                                            }
                                            else
                                            {
                                                //console.log('check1');
                                                start_index-=1;
                                            }

                                            if(results.length===count)
                                            {
                                                //console.log('check1');
                                                localdb_open_requests-=1;
                                                callback(results);
                                            }
                                            else
                                            {
                                                //console.log('check1');
                                                result.continue();
                                            }
                                        }
                                    }
                                    else if(orecord.user_type=='role')
                                    {
                                        //console.log('check1');
                                        for(var aa in roles_array)
                                        {
                                            //console.log('check1');
                                            if(roles_array[aa]!="" && orecord.user.indexOf(roles_array[aa])!=-1)
                                            {
                                                //console.log('check1');
                                                if(start_index==0)
                                                {
                                                    //console.log('check1');
                                                    results.push(record);
                                                }
                                                else
                                                {
                                                    //console.log('check1');
                                                    start_index-=1;
                                                }

                                                if(results.length===count)
                                                {
                                                    //console.log('check1');
                                                    localdb_open_requests-=1;
                                                    callback(results);
                                                }
                                                else
                                                {
                                                    //console.log('check1');
                                                    result.continue();
                                                }
                                                break;
                                            }
                                        }
                                        result.continue();
                                    }
                                }
                                else
                                {
                                    //console.log('check1');
                                   oresult.continue();
                                }
                            }
                            else
                            {
                                //console.log('check1');
                                for(var bb in access_conditions_array)
                                {
                                    //console.log('check1');
                                    if(access_conditions_array[bb].user_type=='field')
                                    {
                                        //console.log('check1');
                                        if(record[access_conditions_array[bb].user].indexOf(account_name)!=-1)
                                        {
                                           //console.log('check1');
																					 if(access_conditions_array[bb].criteria_field=="" || access_conditions_array[bb].criteria_field==null || record[access_conditions_array[bb].criteria_field]==access_conditions_array[bb].criteria_value)
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
                                    }
                                    else
                                    {
                                       //console.log('check1');
                                        if(access_conditions_array[bb].criteria_field=="" || access_conditions_array[bb].criteria_field==null || record[access_conditions_array[bb].criteria_field]==access_conditions_array[bb].criteria_value)
                                        {
                                            if(start_index==0)
                                            {
                                                //console.log('check1');
                                                results.push(record);
                                            }
                                            else
                                            {
                                                //console.log('check1');
                                                start_index-=1;
                                            }

                                            if(results.length===count)
                                            {
                                                //console.log('check1');
                                                localdb_open_requests-=1;
                                                callback(results);
                                            }
                                            else
                                            {
                                                //console.log('check1');
                                                result.continue();
                                            }
                                        }
                                        else
                                        {
                                            //console.log('check1');
                                            result.continue();
                                        }
                                    }
                                }
                                if(access_conditions_array.length==0)
                                {
																	result.continue();
																}
                            }
                        };
                    }
                    else
                    {
                        //console.log('check1');
                        result.continue();
                    }
                }
                else
                {
                    //console.log('check1');
                    localdb_open_requests-=1;
                    callback(results);
                }
            };
        }

        if(!access_control)
        {
            local_read_json_rows_data_traversing();
        }
        else
        {
            var access_conditions_array=[];
            var ac_objectstore=static_local_db.transaction(['access_conditions'],"readonly").objectStore('access_conditions').index('tablename');
            var ac_lowerbound=[access_store,'0'];
            var ac_upperbound=[access_store,'9999999999'];
            var ac_key=IDBKeyRange.bound(ac_lowerbound,ac_upperbound);
            var ac_read_req=ac_objectstore.openCursor(ac_key,sort_order);
            ac_read_req.onsuccess=function(e)
            {
                var result=e.target.result;
                if(result)
                {
                    var record=result.value;
                    if(record.user_type=='field')
                    {
                        access_conditions_array.push(record);
                    }
                    else if(record.user_type=='user')
                    {
                        if(record.user.indexOf(account_name)!=-1)
                        {
                            access_conditions_array.push(record);
                        }
                    }
                    else if(record.user_type=='role')
                    {
                        for(var aa in roles_array)
                        {
                            if(roles_array[aa]!="" && record.user.indexOf(roles_array[aa])!=-1)
                            {
                                access_conditions_array.push(record);
                                break;
                            }
                        }
                    }
                    result.continue();
                }
                else
                {
                   // console.log(access_conditions_array);
                    local_read_json_rows_object_traversing(access_conditions_array);
                }
            }
        }

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

		if(typeof columns.indexes!='undefined')
		{
			var cols=columns.indexes;
			for(var j=0;j<cols.length;j++)
			{
				if(typeof cols[j].lowerbound!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

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
					var fil=new Object();
					fil.name=cols[j].index;
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
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].array;
					fil.type='array';
					filter.push(fil);
				}

				if(typeof cols[j].approx_array!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].approx_array;
					fil.type='approx_array';
					filter.push(fil);
				}

                if(typeof cols[j].all_approx_array!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].all_approx_array;
					fil.type='all_approx_array';
					filter.push(fil);
				}

				if(typeof cols[j].unequal!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].unequal;
					fil.type='unequal';
					filter.push(fil);
				}

				if(typeof cols[j].isnull!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].isnull;
					fil.type='isnull';
					filter.push(fil);
				}

				if(typeof cols[j].value!='undefined' && cols[j].value!="")
				{
					var fil=new Object();
					fil.name=cols[j].index;

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
							if(filter[i].type=='isnull')
							{
								if(filter[i].value=='no' && string=="null")
								{
									match_word=false;
									break;
								}
								else if(filter[i].value=='yes' && string!="null")
								{
									march_word=false;
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

                        if(filter[i].type=='all_approx_array')
						{
                            var all_approx_array=filter[i].value;
                            var sub_match=true;
                            for(var ab in all_approx_array)
							{
								if(string.indexOf(all_approx_array[ab])==-1)
								{
									sub_match=false;
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
						if(filter[i].type=='isnull')
						{
							if(filter[i].value=='no')
							{
								match_word=false;
								break;
							}
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

		if(typeof columns.indexes!='undefined')
		{
			var cols=columns.indexes;
			for(var j=0;j<cols.length;j++)
			{
				if(typeof cols[j].lowerbound!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

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
					var fil=new Object();
					fil.name=cols[j].index;

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
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].array;
					fil.type='array';
					filter.push(fil);
				}

				if(typeof cols[j].approx_array!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].approx_array;
					fil.type='approx_array';
					filter.push(fil);
				}

                if(typeof cols[j].all_approx_array!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].all_approx_array;
					fil.type='all_approx_array';
					filter.push(fil);
				}

				if(typeof cols[j].unequal!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].unequal;
					fil.type='unequal';
					filter.push(fil);
				}

				if(typeof cols[j].isnull!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;

					fil.value=cols[j].isnull;
					fil.type='isnull';
					filter.push(fil);
				}

				if(typeof cols[j].value!='undefined' && cols[j].value!="")
				{
					var fil=new Object();
					fil.name=cols[j].index;

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
							if(filter[i].type=='isnull')
							{
								if(filter[i].value=='no' && string=="null")
								{
									match_word=false;
									break;
								}
								else if(filter[i].value=='yes' && string!="null")
								{
									march_word=false;
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

                        if(filter[i].type=='all_approx_array')
						{
							var all_approx_array=filter[i].value;
							var sub_match=true;
							for(var ab in all_approx_array)
							{
								if(string.indexOf(all_approx_array[ab])==-1)
								{
									sub_match=false;
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
						if(filter[i].type=='isnull')
						{
							if(filter[i].value=='no')
							{
								match_word=false;
								break;
							}
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
								act_row['title']=activity_data['title'];
								act_row['notes']=activity_data['notes'];
								act_row['link_to']=activity_data['link_to'];
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
								act_row['title']=activity_data['title'];
								act_row['notes']=activity_data['notes'];
								act_row['link_to']=activity_data['link_to'];
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

function local_create_json(data_json,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_json(data_json,func);
		});
	}
	else
	{
		localdb_open_requests+=1;
		show_loader();

		var table=data_json.data_store;
		var cols=data_json.data;
		var log='no';
		var activity_data=[];
		if(typeof data_json.log!='undefined')
		{
			log=data_json.log;
		}
		if(typeof data_json.log_data!='undefined')
		{
			activity_data=data_json.log_data;
		}

		var unique=new Array();
		var indexed_col=new Array();

		for(var j=0;j<cols.length;j++)
		{
			if(typeof cols[j]['unique']!='undefined' && cols[j]['unique']=='yes')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].value;
				unique.push(fil);
			}
			else if(typeof cols[j]['uniqueWith']!='undefined')
			{
				var fil=new Object();
				fil.name=cols[j].index;
				fil.value=cols[j].value;
				fil.uniqueWith=cols[j]['uniqueWith'];
				unique.push(fil);
			}
			indexed_col[cols[j].index]=cols[j].value;
		}

		var data_id=indexed_col['id'];

		var objectStore=static_local_db.transaction([table],"readwrite").objectStore(table);

		function local_create_json_put()
		{
			var data_row=new Object();
			for(var j=0;j<cols.length;j++)
			{
				data_row[cols[j].index]=""+cols[j].value;
			}
			var put_req=objectStore.put(data_row);
			put_req.onsuccess=function(e)
			{
				var id=get_new_key();
				var act_row={id:""+id,
						type:'create',
						status:'unsynced',
						data_type:'json',
						data_xml:JSON.stringify(cols),
						user_display:log,
						tablename:table,
						data_id:data_id,
						updated_by:get_name(),
						last_updated:""+get_my_time()};
				if(log=='yes')
				{
					act_row['title']=activity_data['title'];
					act_row['notes']=activity_data['notes'];
					act_row['link_to']=activity_data['link_to'];
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
		};

		function local_create_json_unique(index)
		{
			if(index<unique.length)
			{
				var unique_element=unique[index];
				var key=IDBKeyRange.bound([unique_element.value,'0'],[unique_element.value,'99999999']);
				objectStore.index(unique_element.name).openCursor(key).onsuccess=function(e)
				{
					var result=e.target.result;
					if(result)
					{
						var match_word=true;
						if(typeof unique_element.uniqueWith!='undefined')
						{
							var record=result.value;
							for(var i in unique_element.uniqueWith)
							{
								if(record[unique_element.uniqueWith[i]]!=indexed_col[unique_element.uniqueWith[i]])
								{
									match_word=false;
									break;
								}
							}
						}
						if(match_word)
						{
							localdb_open_requests-=1;
							hide_loader();
							if(typeof data_json['warning']!='undefined' && data_json['warning']=='no')
							{}
							else
							{
								$("#modal5_link").click();
							}
						}
						else
						{
							result.continue();
						}
					}
					else
					{
						local_create_json_unique(index+1);
					}
				};
			}
			else
			{
				local_create_json_put();
			}
		};
		local_create_json_unique(0);
	}
}

function local_create_batch_json(data_json,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_create_batch_json(data_json,func);
		});
	}
	else
	{
		if(typeof data_json.loader!='undefined' && data_json.loader=='no')
		{}else{show_loader();}

		var table=data_json.data_store;
		var rows=data_json.data;
		var log='no';
		var activity_data=[];
		var result_count=0;

		if(typeof data_json.log!='undefined')
		{
			log=data_json.log;
		}
		if(typeof data_json.log_data!='undefined')
		{
			activity_data=data_json.log_data;
		}

		var unique=new Array();

		if(rows.length>0)
		{
			var cols=rows[0];
			for(var j=0;j<cols.length;j++)
			{
				if(typeof cols[j]['unique']!='undefined' && cols[j]['unique']=='yes')
				{
					var fil=new Object();
					fil.name=cols[j].index;
					unique.push(fil);
				}
				else if(typeof cols[j]['uniqueWith']!='undefined')
				{
					var fil=new Object();
					fil.name=cols[j].index;
					fil.uniqueWith=cols[j]['uniqueWith'];
					unique.push(fil);
				}
			}

			var transaction=static_local_db.transaction([table,'activities'],"readwrite");
			var os1=transaction.objectStore(table);
			var os2=transaction.objectStore('activities');
			var activity_id=get_new_key();

			var i=0;
			var success_count=0;

			function create_records()
			{
				if(i<rows.length)
				{
					var cols=rows[i];
					localdb_open_requests+=1;
					local_create_json_unique(cols,0);
				}
			};

			function local_create_json_put(data_row,cols)
			{
				os1.put(data_row).onsuccess=function(e)
				{
					success_count+=1;

					var id=get_new_key();
					var act_row={id:""+(activity_id+i),
							type:'create',
							status:'unsynced',
							data_type:'json',
							data_xml:JSON.stringify(cols),
							user_display:'no',
							tablename:table,
							data_id:data_row['id'],
							updated_by:get_name(),
							last_updated:""+get_my_time()};

					os2.put(act_row).onsuccess=function(e)
					{
						i+=1;
						localdb_open_requests-=1;
						create_records();
					};
				};
			};

			function local_create_json_unique(cols,index)
			{
				var data_row=new Object();
				for(var j=0;j<cols.length;j++)
				{
					data_row[cols[j].index]=""+cols[j].value;
				}

				if(index<unique.length)
				{
					var kv=IDBKeyRange.bound([data_row[unique[index].name],'0'],[data_row[unique[index].name],'99999999']);
					os1.index(unique[index].name).openCursor(kv).onsuccess=function(e)
					{
						var result=e.target.result;
						if(result)
						{
							var match_word=true;
							if(typeof unique[index].uniqueWith!='undefined')
							{
								var record=result.value;
								for(var x in unique[index].uniqueWith)
								{
									if(record[unique[index].uniqueWith[x]]!=data_row[unique[index].uniqueWith[x]])
									{
										match_word=false;
										break;
									}
								}
							}
							if(match_word)
							{
								i+=1;
								localdb_open_requests-=1;
								create_records();
							}
							else
							{
								result.continue();
							}
						}
						else
						{
							local_create_json_unique(cols,index+1);
						}
					};
				}
				else
				{
					local_create_json_put(data_row,cols);
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
							notes:'Added '+success_count+' records for '+activity_data['title'],
							data_xml:JSON.stringify(rows),
							data_type:'json',
							user_display:log,
							data_id:"",
							tablename:"",
							link_to:activity_data['link_to'],
							updated_by:""+get_name(),
							last_updated:""+get_my_time()};
					var transaction=static_local_db.transaction([table,'activities'],"readwrite");
					var os3=transaction.objectStore('activities');
					os3.put(act_row).onsuccess=function(e){};
					clearInterval(local_create_complete);

					if(typeof data_json.loader!='undefined' && data_json.loader=='no')
					{}else{hide_loader();}

					if(typeof func!='undefined')
					{
						func();
					}
				}
			},2000);
		}
		else
		{
			if(typeof data_json.loader!='undefined' && data_json.loader=='no')
			{}else{hide_loader();}

			if(typeof func!='undefined')
			{
				func();
			}
		}
	}
}

function local_update_json(data_json,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_json(data_json,func);
		});
	}
	else
	{
		localdb_open_requests+=1;

		var table=data_json.data_store;
		var cols=data_json.data;
		var log='no';
		var activity_data=[];
		if(typeof data_json.log!='undefined')
		{
			log=data_json.log;
		}
		if(typeof data_json.log_data!='undefined')
		{
			activity_data=data_json.log_data;
		}

		var data_id=cols[0]['value'];

		//console.log(table+"-"+data_id);

		var os1=static_local_db.transaction([table],"readwrite").objectStore(table);
		var req=os1.get(data_id);
		req.onsuccess=function(e)
		{
			var data_record=req.result;
			if(data_record)
			{
				//console.log('found local record '+data_record);
				for(var j=0;j<cols.length;j++)
				{
					data_record[cols[j]['index']]=""+cols[j]['value'];
				}

				var put_req=os1.put(data_record);
				put_req.onsuccess=function(e)
				{
					var id=get_new_key();
					var act_row={id:""+id,
							type:'update',
							status:'unsynced',
							data_type:'json',
							data_xml:JSON.stringify(cols),
							user_display:log,
							tablename:table,
							data_id:data_id,
							updated_by:get_name(),
							last_updated:""+get_my_time()};
					if(log=='yes')
					{
						act_row['title']=activity_data['title'];
						act_row['notes']=activity_data['notes'];
						act_row['link_to']=activity_data['link_to'];
					}

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

function local_update_batch_json(data_json,func)
{
	if(typeof static_local_db=='undefined')
	{
		open_local_db(function()
		{
			local_update_batch_json(data_json,func);
		});
	}
	else
	{
		if(typeof data_json.loader!='undefined' && data_json.loader=='no')
		{}else{show_loader();}

		var table=data_json.data_store;
		var rows=data_json.data;
		var log='no';
		var activity_data=[];
		var result_count=0;

		if(typeof data_json.log!='undefined')
		{
			log=data_json.log;
		}
		if(typeof data_json.log_data!='undefined')
		{
			activity_data=data_json.log_data;
		}

		//console.log(rows.length);

		var transaction=static_local_db.transaction([table,'activities'],"readwrite");
		var os1=transaction.objectStore(table);
		var os2=transaction.objectStore('activities');

		var i=0;
		var success_count=0;
		var activity_id=get_new_key();

		function update_records()
		{
			if(i<rows.length)
			{
				var cols=rows[i];
				var data_id=cols[0]['value'];
				localdb_open_requests+=1;

				var req=os1.get(data_id);
				req.onsuccess=function(e)
				{
					var data_record=req.result;
					if(data_record)
					{
						for(var j=0;j<cols.length;j++)
						{
							data_record[cols[j]['index']]=""+cols[j]['value'];
						}

						var put_req=os1.put(data_record);
						put_req.onsuccess=function(e)
						{
							var id=get_new_key();
							var act_row={id:""+(activity_id+i),
									type:'update',
									status:'unsynced',
									data_type:'json',
									data_xml:JSON.stringify(cols),
									user_display:'no',
									tablename:table,
									data_id:data_record['id'],
									updated_by:get_name(),
									last_updated:""+get_my_time()};

							os2.put(act_row).onsuccess=function(e)
							{
								i++;
								success_count+=1;
								localdb_open_requests-=1;
								update_records();
							};
						};
					}
					else
					{
						i++;
						localdb_open_requests-=1;
						update_records();
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

		update_records();

		var local_update_complete=setInterval(function()
		{
			//console.log(localdb_open_requests);
			if(localdb_open_requests===0)
			{
				var act_row={id:""+(activity_id+i+5),
						type:'update',
						status:'unsynced',
						title:'Data import',
						notes:'Updated '+success_count+' records for '+activity_data['title'],
						data_xml:JSON.stringify(rows),
						data_type:'json',
						user_display:log,
						data_id:"",
						tablename:"",
						link_to:activity_data['link_to'],
						updated_by:""+get_name(),
						last_updated:""+get_my_time()};

				var transaction=static_local_db.transaction(['activities'],"readwrite");
				var os3=transaction.objectStore('activities');
				os3.put(act_row).onsuccess=function(e){};
				clearInterval(local_update_complete);

				if(typeof data_json.loader!='undefined' && data_json.loader=='no')
				{}else{hide_loader();}

				if(typeof func!='undefined')
				{
					func();
				}
			}
		},2000);
	}
}
