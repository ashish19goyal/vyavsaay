<div id='report32' class='tab-pane'>
		<form id='report32_header' autocomplete="off">
			<fieldset>
				<label><input type='submit' value='Refresh' class='generic_icon'></label>
			</fieldset>
		</form>
		</br>
	<div id="report32_map" style="height: 350px"></div>
	
	<script>
function report32_header_ini()
{	
	var form=document.getElementById('report32_header');
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report32_ini();
	});
}

function report32_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report32_header');
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map32 != 'undefined')
			map32.remove();
	
		map32 = L.map('report32_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map32);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map32).bindPopup(title);
		///////////////////////////////////		
		
		var address_data="<staff>" +
				"<id></id>" +
				"<name></name>" +
				"<lat></lat>" +
				"<lng></lng>" +
				"<acc_name></acc_name>" +
				"<address></address>" +
				"<pincode></pincode>" +
				"<city></city>" +
				"<state></state>" +
				"<country></country>" +
				"<status exact='yes'>active</status>" +
				"<address_status exact='yes'>confirmed</address_status>" +
				"</staff>";
		fetch_requested_data('report32',address_data,function(addresses)
		{
			for(var i in addresses)
			{
				var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
				var marker=L.marker(latlng).addTo(map32).bindPopup(addresses[i].acc_name);	
			}
			hide_loader();
		});
	}
	else
	{
		$("#modal6_link").click();
	}
}
	
	</script>
</div>
