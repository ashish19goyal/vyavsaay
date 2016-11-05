function my_datalist_change(element,func)
{
	$(element).off('keyup');
	$(element).on('keyup', function()
	{
		var list_id=element.getAttribute('list');
    	var options = $('#'+list_id)[0].options;
    	for (var i=0;i<options.length;i++)
    	{
	       	if (options[i].value == $(this).val())
    	    {
    	    	func();
    	    	break;
    	    }
    	}
	});
}


function get_all_child_storage(store_area,area_array)
{
	var child_data={data_store:'store_areas',return_column:'name'};
		child_data.indexes=[{index:'parent',exact:store_area}];

	storage_count_tracker+=1;

	read_json_single_column(child_data,function(children)
	{
		if(children.length>0)
		{
			children.forEach(function(child)
			{
				area_array.push(child);
				get_all_child_storage(child,area_array);
			});
		}
		storage_count_tracker-=1;
	});
}

function get_available_batch(item_name,batch_array,min_quantity,result_array,success_func)
{
	if(batch_array.length>0)
	{
		get_inventory(item_name,batch_array[0],function(inventory)
		{
			if(parseFloat(inventory)>0)
			{
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();
				}
				else
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					batch_array.splice(0,1);
					get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				batch_array.splice(0,1);
				get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
			}
		});
	}
	else
	{
		success_func();
	}
}

function get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func)
{
	if(storage_array.length>0)
	{
		get_store_inventory(storage_array[0],item_name,batch,function(inventory)
		{
			if(parseFloat(inventory)>0)
			{
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();
				}
				else
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					storage_array.splice(0,1);
					get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				storage_array.splice(0,1);
				get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
			}
		});
	}
	else
	{
		success_func();
	}
}
