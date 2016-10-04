<div id='report36' class='tab-pane'>
	<form id='report36_header' autocomplete="off">
		<fieldset>
			<label>Product supplied <input type='text' required></label>
			<label><input type='submit' value='Refresh' class='generic_icon'></label>
		</fieldset>
	</form>
	</br>
	<div id="report36_map" style="height: 350px"></div>
	
	<script>
function report36_header_ini()
{	
	var form=document.getElementById('report36_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report36_ini();
	});

	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_filter(product_data,product_filter);
}

function report36_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report36_header');
		var product_name=form.elements[1].value;
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map36 != 'undefined')
			map36.remove();
	
		map36 = L.map('report36_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map36);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map36).bindPopup(title);
		///////////////////////////////////		
			
		var product_data="<supplier_bill_items>" +
				"<bill_id></bill_id>" +
				"<product_name exact='yes'>"+product_name+"</product_name>" +
				"</supplier_bill_items>";
		
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			//optimise this query
			var supplier_data="<supplier_bills>" +
					"<supplier></supplier>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"</supplier_bills>";
			
			get_single_column_data(function(suppliers)
			{
				var suppliers_array="--";
				for(var x in suppliers)
				{
					suppliers_array+=suppliers[x]+"--";
				}	
				var suppliers_data="<suppliers>" +
						"<id></id>" +
						"<name></name>" +
						"<lat></lat>" +
						"<lng></lng>" +
						"<acc_name array='yes'>"+suppliers_array+"</acc_name>" +
						"<address></address>" +
						"<pincode></pincode>" +
						"<city></city>" +
						"<state></state>" +
						"<country></country>" +
						"<address_status exact='yes'>confirmed</address_status>" +
						"</suppliers>";
	
				fetch_requested_data('report36',suppliers_data,function(addresses)
				{
					for(var i in addresses)
					{
						var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
						var marker=L.marker(latlng).addTo(map36).bindPopup(addresses[i].acc_name);	
					}
					hide_loader();
				});
			},supplier_data);
		},product_data);
	}
	else
	{
		$("#modal6_link").click();
	}
}
	
	</script>
</div>
