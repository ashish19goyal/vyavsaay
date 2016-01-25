<div id='report84' class='tab-pane'>
	<form id='report84_header' autocomplete="off">
		<fieldset>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
		</fieldset>
	</form>
	<br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report84_legend" style='display: block;'></div></div>
		<canvas id="report84_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
function report84_header_ini()
{	
	var form=document.getElementById('report84_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report84_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
	end_date.value=get_my_date();
}

function report84_ini()
{
	show_loader();
	var form=document.getElementById('report84_header');
	var start_date=get_raw_time(form.elements[1].value);
	var end_date=get_raw_time(form.elements[2].value)+86399999;
	
	var canvas_parent=$("#report84_canvas").parent();
	$("#report84_canvas").remove();
	$(canvas_parent).append("<canvas id='report84_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report84_canvas").getContext("2d");
	
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

		var columns=new Object();
		columns.count=0;
		columns.start_index=0;
		columns.data_store='logistics_orders';		
		
		columns.indexes=[{index:'id'},
						{index:'awb_num'},
						{index:'import_date',lowerbound:start_date,upperbound:end_date},
						{index:'drs_time'},
						{index:'order_num'},
						{index:'weight'},
						{index:'pieces'},
						{index:'status',exact:'delivered'},
						{index:'delivery_person'},
						{index:'manifest_type'},
						{index:'merchant_name'},
						{index:'phone'},
						{index:'sku'},
						{index:'return_address1'},
						{index:'return_address2'},
						{index:'return_address3'},
						{index:'drs_num'},
						branch_object];		
	
		read_json_rows('report84',columns,function(orders)
		{
			for(var i=0;i<orders.length;i++)
			{
				orders[i].deliveries=1;
				for(var j=i+1;j<orders.length;j++)
				{
					if(orders[i].delivery_person==orders[j].delivery_person)
					{
						orders[i].deliveries+=1;
						orders.splice(j,1);
						j-=1;
					}
				}
			}
	
			for(var i=0;i<orders.length;i++)
			{
				if(orders[i].delivery_person=="")
				{
					orders[i].delivery_person="Unknown";
					break;
				}
			}
	
			var result=transform_to_bar_sum(orders,'# Deliveries','deliveries','delivery_person');
			var mybarchart = new Chart(ctx).Bar(result,{});
			document.getElementById("report84_legend").innerHTML=mybarchart.generateLegend();
	
			var print_button=form.elements[4];
			print_graphical_report('report84','# Deliveries',print_button,mybarchart);
			
			var csv_button=form.elements['csv'];
			$(csv_button).off("click");
			$(csv_button).on("click", function(event)
			{
				var sorted_array=[];
				orders.forEach(function(new_result)
				{
					var sorted_element=new Object();
					sorted_element['AWB No']=new_result.awb_num;
					sorted_element['Order Id']=new_result.order_num;
					sorted_element['status']=new_result.status;
					sorted_element['Manifest Import Date']=get_my_past_date(new_result.import_date);
					sorted_element['Delivery Boy']=new_result.delivery_person;
					sorted_element['Wt']=new_result.weight;
					sorted_element['Pcs']=new_result.pieces;
					sorted_element['AWB Type']=new_result.manifest_type;
					sorted_element['Merchant']=new_result.merchant_name;
					sorted_element['Merchant Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
					sorted_element['Mobile No']=new_result.phone;
					sorted_element['Product Name']=new_result.sku;
					
					sorted_array.push(sorted_element);
				});
				csv_download_report(sorted_array,'Delivery Report');
			});
			
			hide_loader();
		});
	});
};
	
	</script>
</div>