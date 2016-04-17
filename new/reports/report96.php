<div id='report96' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report96_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report96_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report96_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report96_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Person" class='floatlabel' name='person'></label>
				<label><input type='text' placeholder="Date" class='floatlabel' name='date'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
					<th>Amount Collected</th>
                    <th>Amount Deposited</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody id='report96_body'></tbody>
            <tfoot id='report96_foot'></tfoot>
		</table>
	</div>

	<script>

function report96_header_ini()
{	
	var form=document.getElementById('report96_header');
	var person_filter=form.elements['person'];
	var date_filter=form.elements['date'];

	$('#report96_body').html('');
	$('#report96_foot').html('');

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report96_ini();
	});

	$(date_filter).datepicker();
	date_filter.value=get_my_date();
	
	var person_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(person_data,person_filter,function () 
	{
		$(person_filter).focus();
	});	
}

function report96_ini()
{
	show_loader();
	var form=document.getElementById('report96_header');
	var person=form.elements['person'].value;
	var date=get_raw_time(form.elements['date'].value);
	var end_time=date+86399000;
	
	$('#report96_body').html('');
	$('#report96_foot').html('');
    
    var paginator=$('#report96_body').paginator({page_size:100});
	
	var list1_data={data_store:'staff',
                    count:paginator.page_size(),
			         start_index:paginator.get_index(),
                  indexes:[{index:'id'},{index:'acc_name',value:person}]};

	read_json_rows('report96',list1_data,function(staff)
	{
		var list_data={data_store:'cod_collections',
			         indexes:[{index:'acc_name',value:person},
							{index:'date',exact:date},
							{index:'amount'}]};
			
		read_json_rows('',list_data,function(collections)
		{
			var list2_data={data_store:'logistics_orders',		
	                       indexes:[{index:'delivery_person',value:person},
									{index:'status',exact:'delivered'},
									{index:'type',exact:'COD'},										
									{index:'delivery_time',lowerbound:date,upperbound:end_time},
									{index:'collectable_value'}]};
		
			read_json_rows('',list2_data,function(orders_collection)
			{	
				var total_collected=0;
				var total_deposited=0;
				
				staff.forEach(function(result)
				{	
					var staff_collected=0;
					var staff_deposited=0;
					
					for(var a=0;a<collections.length;a++)
					{
						if(collections[a].acc_name==result.acc_name)
						{
							staff_deposited+=parseFloat(collections[a].amount);
							collections.splice(a,1);
							a--;
						}
					}

					for(var b=0;b<orders_collection.length;b++)
					{
						if(orders_collection[b].delivery_person==result.acc_name)
						{
							staff_collected+=parseFloat(orders_collection[b].collectable_amount);
							orders_collection.splice(b,1);
							b--;
						}
					}
					
					total_collected+=staff_collected;
					total_deposited+=staff_deposited;
					
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Person'>";
							rowsHTML+="<a onclick=\"show_object('staff','"+result.acc_name+"');\">"+result.acc_name+"</a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount Collected'>";
							rowsHTML+="Rs. "+staff_collected;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount Deposited'>";
							rowsHTML+="Rs. "+staff_deposited;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Balance' id='report96_balance_"+result.id+"'>";
							rowsHTML+="<a onclick=\"report96_show_balance('"+result.id+"','"+result.acc_name+"',"+date+");\">Show Balance on "+form.elements[2].value+"</a>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report96_body').append(rowsHTML);
				});
				
				var total_row="<tr><td data-th='Total'>Total Collected<br>Total Deposited</td><td colspan='3' data-th='Total'>Rs. "+total_collected+"<br>Rs. "+total_deposited+"</td></tr>";
				$('#report96_foot').html(total_row);
				
                initialize_static_tabular_report_buttons('COD Collection Report','report96');
				hide_loader();
			});
		});
        paginator.update_index(staff.length);
	});
};

function report96_show_balance(id,person,date)
{
	var list_data={data_store:'cod_collections',return_column:'amount',		
		          indexes:[{index:'acc_name',exact:person},
						{index:'date',upperbound:(date+86399000)}]};
		
	read_json_single_column(list_data,function(collections)
	{
		var list2_data={data_store:'logistics_orders',return_column:'collectable_value',
			             indexes:[{index:'delivery_person',exact:person},
								{index:'status',exact:'delivered'},
								{index:'type',exact:'COD'},										
								{index:'delivery_time',upperbound:(date+86399000)}]};
	
		read_json_single_column(list2_data,function(orders_collection)
		{
			var balance=0;
			for(var a in collections)
			{
				balance-=parseFloat(collections[a]);
			}
			for(var b in orders_collection)
			{
				balance+=parseFloat(orders_collection[b]);
			}

			document.getElementById('report96_balance_'+id).textContent="Rs. "+balance;
		});
	});		
}
	
	</script>
</div>