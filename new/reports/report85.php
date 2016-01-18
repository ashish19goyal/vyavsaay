<div id='report85' class='report_detail'>
	<form id='report85_header' autocomplete="off">
		<fieldset>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon'>
			</label>	
		</fieldset>
	</form>
	<br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report85_legend" style='display: block;'></div></div>
		<canvas id="report85_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
		
	function report85_header_ini()
	{	
		var form=document.getElementById('report85_header');
		var start_date=form.elements[1];
		var end_date=form.elements[2];
	
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			report85_ini();
		});
		
		$(start_date).datepicker();
		$(end_date).datepicker();
		start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
		end_date.value=get_my_date();	
	}

	function report85_ini()
	{
		show_loader();
		var form=document.getElementById('report85_header');
		var start_date=form.elements[1].value;
		var end_date=form.elements[2].value;
		
		var canvas_parent=$("#report85_canvas").parent();
		$("#report85_canvas").remove();
		$(canvas_parent).append("<canvas id='report85_canvas' class='report_sizing'></canvas>");
		
		var ctx = document.getElementById("report85_canvas").getContext("2d");
		
		if_data_read_access('store_areas',function(accessible_data)
		{
			console.log(accessible_data);
			var branches_array=[];
			var branch_object={index:'branch',array:branches_array};
			
			for(var x in accessible_data)
			{
				branches_array.push(accessible_data[x].name);
				if(accessible_data[x].record_id=='all')
				{
					branch_object={index:'branch'};
					break;
				}
			}
	
			var drs_data=new Object();
				drs_data.count=0;
				drs_data.start_index=0;
				drs_data.data_store='drs';		
				
				drs_data.indexes=[{index:'id'},
								{index:'drs_num'},
								{index:'drs_time',lowerbound:(get_raw_time(start_date)-1),upperbound:(get_raw_time(end_date)+86399999)},
								branch_object];		
		
			read_json_rows('report85',drs_data,function(orders)
			{
				var drs_num_array=[];
				for(var i=0;i<orders.length;i++)
				{
					drs_num_array.push(orders[i].drs_num);
				}
		
				for(var i=0;i<orders.length;i++)
				{
					orders[i].drs_count=1;
					for(var j=i+1;j<orders.length;j++)
					{
						if(orders[i].drs_time==orders[j].drs_time)
						{
							orders[i].drs_count+=1;
							orders.splice(j,1);
							j-=1;
						}
					}
				}
		
				orders.sort(function(a,b)
				{
					if(parseFloat(a.drs_time)<parseFloat(b.drs_time))
						return -1;
					else
						return 1;
				});
		
				for(var i=0;i<orders.length;i++)
				{
					orders[i].drs_time=get_my_past_date(orders[i].drs_time);
				}
		
				var result=transform_to_bar_sum(orders,'# DRS','drs_count','drs_time');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report85_legend").innerHTML=mybarchart.generateLegend();
		
				var print_button=form.elements[4];
				print_graphical_report('report85','# DRS',print_button,mybarchart);
				
				var csv_button=form.elements[5];
				$(csv_button).off("click");
				$(csv_button).on("click", function(event)
				{
					var columns=new Object();
					columns.count=0;
					columns.start_index=0;
					columns.data_store='logistics_orders';		
					
					columns.indexes=[{index:'id'},
									{index:'awb_num'},
									{index:'drs_time'},
									{index:'order_num'},
									{index:'weight'},
									{index:'pieces'},
									{index:'status'},
									{index:'delivery_person'},
									{index:'collectable_value'},
									{index:'manifest_type'},
									{index:'merchant_name'},
									{index:'ship_to'},
									{index:'address1'},
									{index:'address2'},
									{index:'address3'},
									{index:'city'},
									{index:'phone'},
									{index:'sku'},
									{index:'return_address1'},
									{index:'return_address2'},
									{index:'return_address3'},
									{index:'drs_num',array:drs_num_array}];		
		
					get_export_data_restructured(columns,'drs_details',function(new_results)
					{
						var sorted_array=[];
						new_results.forEach(function(new_result)
						{
							var sorted_element=new Object();
							sorted_element['DRS No']=new_result.drs_num;
							if(new_result.drs_time!="" && new_result.drs_time!="NULL")
							{	
								sorted_element['DRS Date']=get_my_datetime(new_result.drs_time);
							}
							else 
							{
								sorted_element['DRS Date']="";
							}					
							sorted_element['Order Id']=new_result.order_num;
							sorted_element['AWB No']=new_result.awb_num;
							sorted_element['Wt']=new_result.weight;
							sorted_element['Pcs']=new_result.pieces;
							sorted_element['COD Amount']=new_result.collectable_value;
							sorted_element['Status']=new_result.status;
							sorted_element['Delivery Boy']=new_result.delivery_person;
							sorted_element['AWB Type']=new_result.manifest_type;
							sorted_element['Customer Name']=new_result.merchant_name;
							sorted_element['Customer Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
							sorted_element['Consignee Name']=new_result.ship_to;
							sorted_element['Consignee Address']=new_result.address1+", "+new_result.address2+", "+new_result.address3+", "+new_result.city;
							sorted_element['Mobile No']=new_result.phone;
							sorted_element['Product Name']=new_result.sku;
							
							if(new_result.drs_num!="")
							{
								sorted_array.push(sorted_element);
							}
						});
						return sorted_array;
					});
				});
				hide_loader();		
			});
		});
	};

	</script>>
</div>