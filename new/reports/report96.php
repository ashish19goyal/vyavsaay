<div id='report96' class='tab-pane'>
	<form id='report96_header' autocomplete="off">
		<fieldset>
			<label>Person<br><input type='text' name='person'></label>
			<label>Date<br><input type='text' required name='date'></label>
			<input type='submit' class='generic_icon' value='Refresh'>
			<input type='button' class='print_icon' name='print'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th style='width:auto;'>Person</th>
				<th style='width:auto;'>Amount</th>
				<th style='width:auto;'>Balance</th>
			</tr>
		</thead>
		<tbody id='report96_body'>
		</tbody>
		<tfoot id='report96_foot'>
		</tfoot>
	</table>
	
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
	
	var person_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";	
	set_my_value_list(person_data,person_filter,function () 
	{
		$(person_filter).focus();
	});	
}

function report96_ini()
{
	show_loader();
	var form=document.getElementById('report96_header');
	var person=form.elements[1].value;
	var date=get_raw_time(form.elements[2].value);
	var end_time=date+86399000;
	
	$('#report96_body').html('');
	$('#report96_foot').html('');

	var list1_data=new Object();
		list1_data.count=0;
		list1_data.start_index=0;
		list1_data.data_store='staff';		
				
		list1_data.indexes=[{index:'id'},{index:'acc_name',value:person}];

	read_json_rows('',list1_data,function(staff)
	{
		var list_data=new Object();
			list_data.count=0;
			list_data.start_index=0;
			list_data.data_store='cod_collections';		
					
			list_data.indexes=[{index:'acc_name',value:person},
							{index:'date',exact:date},
							{index:'amount'}];
			
		read_json_rows('',list_data,function(collections)
		{
			var list2_data=new Object();
				list2_data.count=0;
				list2_data.start_index=0;
				list2_data.data_store='logistics_orders';		
	
				list2_data.indexes=[{index:'delivery_person',value:person},
									{index:'status',exact:'delivered'},
									{index:'type',exact:'COD'},										
									{index:'delivery_time',lowerbound:date,upperbound:end_time},
									{index:'collectable_value'}];
		
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
							rowsHTML+=result.acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<b>Collected</b>: Rs. "+staff_collected;
							rowsHTML+="<br><b>Deposited</b>: Rs. "+staff_deposited;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Balance' id='report96_balance_"+result.id+"'>";
							rowsHTML+="<a onclick=\"report96_show_balance('"+result.id+"','"+result.acc_name+"',"+date+");\"><u>Show Balance on "+form.elements[2].value+"</u></a>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report96_body').append(rowsHTML);
				});
				
				var total_row="<tr><td data-th='Total'>Total Collected<br>Total Deposited</td><td colspan='2' data-th='Total'>Rs. "+total_collected+"<br>Rs. "+total_deposited+"</td></tr>";
				$('#report96_foot').html(total_row);
				
				var print_button=form.elements['print'];
				print_tabular_report('report96','COD Collection Report',print_button);
				hide_loader();
			});
		});
	});
};

function report96_show_balance(id,person,date)
{
	var list_data=new Object();
		list_data.count=0;
		list_data.start_index=0;
		list_data.data_store='cod_collections';		
		list_data.return_column='amount';		
				
		list_data.indexes=[{index:'acc_name',exact:person},
						{index:'date',upperbound:(date+86399000)}];
		//console.log(list_data);
	read_json_single_column(list_data,function(collections)
	{
		var list2_data=new Object();
			list2_data.count=0;
			list2_data.start_index=0;
			list2_data.data_store='logistics_orders';		
			list2_data.return_column='collectable_value';		
		
			list2_data.indexes=[{index:'delivery_person',exact:person},
								{index:'status',exact:'delivered'},
								{index:'type',exact:'COD'},										
								{index:'delivery_time',upperbound:(date+86399000)}];
	
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