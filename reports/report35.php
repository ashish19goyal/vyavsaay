<div id='report35' class='tab-pane'>
	<form id='report35_header' autocomplete="off">
		<fieldset>
			<label>Product bought <input type='text' required></label>
			<label><input type='submit' value='Refresh' class='generic_icon'></label>
		</fieldset>
	</form>
	</br>
	<div id="report35_map" style="height: 350px"></div>	
	
	<script>

function report35_header_ini()
{	
	var form=document.getElementById('report35_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report35_ini();
	});

	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_filter(product_data,product_filter);
}

function report35_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report35_header');
		var product_name=form.elements[1].value;
		
	
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map35 != 'undefined')
			map35.remove();
	
		map35 = L.map('report35_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map35);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map35).bindPopup(title);
		///////////////////////////////////		
	
		var product_data="<bill_items>" +
				"<bill_id></bill_id>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"</bill_items>";
		
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			//optimise this query
			var customer_data="<bills>" +
					"<customer_name></customer_name>" +
					"<id array='yes'>"+bill_id_array+"</id>" +
					"</bills>";
			
			get_single_column_data(function(customers)
			{
				var customers_array="--";
				for(var x in customers)
				{
					customers_array+=customers[x]+"--";
				}	
				
				var customers_data="<customers>" +
						"<id></id>" +
						"<name></name>" +
						"<lat></lat>" +
						"<lng></lng>" +
						"<acc_name array='yes'>"+customers_array+"</acc_name>" +
						"<address></address>" +
						"<pincode></pincode>" +
						"<city></city>" +
						"<state></state>" +
						"<country></country>" +
						"<address_status exact='yes'>confirmed</address_status>" +
						"</customers>";
				
				fetch_requested_data('report35',customers_data,function(addresses)
				{
					for(var i in addresses)
					{
						var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
						var marker=L.marker(latlng).addTo(map35).bindPopup(addresses[i].acc_name);	
					}
					hide_loader();
				});
			},customer_data);
		},product_data);
	}
	else
	{
		$("#modal6_link").click();
	}
}
	
	</script>
</div>
