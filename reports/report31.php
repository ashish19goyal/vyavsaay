<div id='report31' class='tab-pane'>
	<form id='report31_header' autocomplete="off">
		<fieldset>
			<label>Credit<br><input type='text' name='credit' readonly='readonly'></label>
			<div style="width: auto;margin:10px;" id="report31_slider"></div>
			<label><input type='submit' class='generic_icon' value='Refresh'></label>
		</fieldset>
	</form>
	<br>
	<div id="report31_map" style="height:350px"></div>
	
	<script>
function report31_header_ini()
{	
	var form=document.getElementById('report31_header');
	var amount=form.elements[1];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report31_ini();
	});

	$("#report31_slider").slider({
		range: true,
		min: 0,
		max: 1000000,
		values: [75,3000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#report31_slider").slider("values",0)+" - Rs. "+$("#report31_slider").slider("values",1));
	
}
function report31_ini()
{	
	if(is_online())
	{
		show_loader();
		//console.log('running report 31');
		var form=document.getElementById('report31_header');
		var min_amount=parseFloat($("#report31_slider").slider("values",0));
		var max_amount=parseFloat($("#report31_slider").slider("values",1));
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map31 != 'undefined')
			map31.remove();
	
		map31 = L.map('report31_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map31);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map31).bindPopup(title);
		///////////////////////////////////		
		
		var customers_data="<customers>" +
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
				"<address_status exact='yes'>confirmed</address_status>" +
				"</customers>";
		
		fetch_requested_data('report31',customers_data,function(accounts)
		{
			var payments_data="<payments>" +
					"<id></id>" +
					"<acc_name></acc_name>" +
					"<type></type>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<bill_id></bill_id>" +
					"<status exact='yes'>pending</status>" +
					"</payments>";
			fetch_requested_data('report31',payments_data,function(payments)
			{
				accounts.forEach(function(result)
				{	
					var balance_amount=0;
					
					payments.forEach(function(payment)
					{
						if(payment.acc_name==result.acc_name)
						{
							if(payment.type=='received')
							{
								balance_amount+=parseFloat(payment.total_amount);
								balance_amount-=parseFloat(payment.paid_amount);
							}
							else if(payment.type=='paid')
							{
								balance_amount-=parseFloat(payment.total_amount);
								balance_amount+=parseFloat(payment.paid_amount);
							}
						}
					});
					
					if(balance_amount>=min_amount && balance_amount<=max_amount)
					{
						var latlng=L.latLng(result.lat,result.lng);
						var marker=L.marker(latlng).addTo(map31).bindPopup(result.acc_name+"\nBalance: "+balance_amount);	
					}
				});
				
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6_link").click();
	}
}
	
	</script>
</div>
