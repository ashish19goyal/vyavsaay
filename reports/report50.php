<div id='report50' class='tab-pane'>
	<form id='report50_header' autocomplete="off">
		<fieldset>
			<label>Make</br><input type='text' title='If this field is blank, all applicable makes will be shown'></label>
			<label>Product</br><input type='text' title='If this field is blank, all applicable products will be shown'></label>
			<label>Margin</br><input type='text' name='margin' readonly='readonly'></label>
			<div style="width: auto;margin:10px;" id="report50_slider"></div>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product</th>
				<th>Highest Margin</th>
				<th>Lowest Margin</th>
			</tr>
		</thead>
		<tbody id='report50_body'>
		</tbody>
	</table>
	
	<script>

function report50_header_ini()
{	
	var form=document.getElementById('report50_header');
	var make_filter=form.elements[1];
	var product_filter=form.elements[2];
	var margin_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report50_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,make_filter);
	
	$("#report50_slider").slider(
	{
		range: true,
		min: 0,
		max: 100,
		values: [5,15],
		slide: function(event,ui){
			$(margin_filter).val(ui.values[0]+"% - "+ui.values[1]+"%");
	}});
	$(margin_filter).val($("#report50_slider").slider("values",0)+"% - "+$("#report50_slider").slider("values",1)+"%");
}

function report50_ini()
{
	show_loader();
	var form=document.getElementById('report50_header');
	var make=form.elements[1].value;
	var product=form.elements[2].value;
	var margin_start=parseFloat($("#report50_slider").slider("values",0));
	var margin_end=parseFloat($("#report50_slider").slider("values",1));
	
	$('#report50_body').html('');

	var product_data="<product_master>" +
		"<name>"+product+"</name>" +
		"<make>"+make+"</make>" +
		"</product_master>";
	
	get_single_column_data(function(products)
	{
		var product_string="--";
		for(var i in products)
		{
			product_string+=products[i]+"--";
		}
		
		var margin_data="<product_instances>" +
				"<id></id>" +
				"<product_name array='yes'>"+product_string+"</product_name>" +
				"<batch></batch>" +
				"<sale_price></sale_price>" +
				"<cost_price></cost_price>" +
				"</product_instances>";
		
		fetch_requested_data('report50',margin_data,function(product_instances)
		{
			var margins=[];
			for(var j=0;j<product_instances.length;j++)
			{	
				var margin=new Object();
				margin.product=product_instances[j].product_name;
				margin.highest=((parseFloat(product_instances[j].sale_price)/parseFloat(product_instances[j].cost_price))-1)*100;
				margin.lowest=margin.highest;
				
				for(var k=j+1;k<product_instances.length;k++)
				{
					if(product_instances[j].product_name==product_instances[k].product_name)
					{
						var new_margin=((parseFloat(product_instances[k].sale_price)/parseFloat(product_instances[k].cost_price))-1)*100;
						if(new_margin>margin.highest)
						{
							margin.highest=new_margin;
						}
						else if(new_margin<margin.lowest)
						{
							margin.lowest=new_margin;
						}
						product_instances.splice(k,1);
						k-=1;
					}
				}
				
				if(margin.lowest>margin_start && margin.highest<margin_end)
				{
					margin.highest=Math.round(margin.highest*100)/100;
					margin.lowest=Math.round(margin.lowest*100)/100;
					
					margins.push(margin);
				}
			}
			
			margins.forEach(function(margin)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+=margin.product;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Highest Margin'>";
						rowsHTML+=margin.highest;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Lowest Margin'>";
						rowsHTML+=margin.lowest;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
				
				$('#report50_body').append(rowsHTML);
			});
			
			var print_button=form.elements[5];
			print_tabular_report('report50','Margin by Products',print_button);
			hide_loader();
		});
	},product_data);
};
	
	</script>
</div>