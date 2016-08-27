<div id='report64' class='tab-pane'>
	<form id='report64_header' autocomplete="off">
		<fieldset>
			<label>Scan Item Barcode: <input type='text'></label>	
		</fieldset>
	</form>
	<br>
	<div id='report64_body' style='display:block;width:100%'>
		<div id='report64_invoice' style='display:block;width:95%;height:auto;'></div>
		<div id='report64_image' style='display:block;margin:5px;width:45%;height:auto;'></div>
		<div style='display:block;width:98%'>
			<form id='report64_form'>
				<input type='button' value='Reject' name='reject' class='generic_icon'>
				<input type='button' value='Accept' name='accept' class='generic_icon'>
				<input type='button' value='Print Barcode' name='print' class='generic_icon'>		
			</form>
		</div>	
	</div>
	
	<script>

function report64_header_ini()
{	
	var master_form=document.getElementById('report64_header');
	var item_filter=master_form.elements[1];
	
	$('#report64_image').html('');
	$('#report64_packing').html('');
	$('#report64_invoice').html('');

	$(item_filter).focus();

	$(master_form).off('submit');
	$(master_form).on('submit',function(event)
	{
		event.preventDefault();
		report64_ini();
	});
	
	var form=document.getElementById('report64_form');
	var reject_button=form.elements['reject'];
	var accept_button=form.elements['accept'];
	var print_button=form.elements['print'];
	
	$(reject_button).off('click');
	$(accept_button).off('click');
	$(print_button).off('click');
	
	$(reject_button).hide();
	$(accept_button).hide();
	$(print_button).hide();
	
	$(reject_button).on('click',function () 
	{
		var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"</product_master>";
		fetch_requested_data('',columns,function (products) 
		{
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+
					"<batch></batch>"+
					"<quantity></quantity>"+
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				var items_xml="<bill_items>"+
						"<id>"+items[0].id+"</id>"+					
						"<picked_status>pending</picked_status>"+
						"<packing_status>pending</packing_status>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+						
						"</bill_items>";
				update_simple(items_xml);

				var discarded_xml="<discarded>"+
						"<id>"+vUtil.newKey()+"</id>"+					
						"<batch>"+items[0].batch+"</batch>"+
                        "<quantity>"+items[0].quantity+"</quantity>"+
                        "<product_name>"+items[0].item_name+"</product_name>"+
                        "<source>manual</source>"+
                        "<source_link></source_link>"+
                        "<source_id></source_id>"+
                        "<put_away_status></put_away_status>"+
                        "<storage>"+get_session_var('discard_items_store')+"</storage>"+
                        "<status>pending approval</status>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+						
						"</discarded>";
				create_simple(discarded_xml);
				
				report64_header_ini();
				$("#modal70_link").click();
			});		
		});
	});

	$(accept_button).on('click',function () 
	{
		var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"</product_master>";
		fetch_requested_data('',columns,function (products) 
		{
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+					
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				var items_xml="<bill_items>"+
						"<id>"+items[0].id+"</id>"+					
						"<packing_status>packed</packing_status>"+
						"<dispatch_status>pending</dispatch_status>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+						
						"</bill_items>";
				update_simple(items_xml);
				
				report64_header_ini();
				$("#modal69_link").click();				
			});		
		});
	});
}

function report64_ini()
{
	var master_form=document.getElementById('report64_header');
	var item_filter=master_form.elements[1];
	
	var form=document.getElementById('report64_form');
	var reject_button=form.elements['reject'];
	var accept_button=form.elements['accept'];
	var print_button=form.elements['print'];
	
	$('#report64_invoice').html('');

	show_loader();

	var report64_count=0;
	
	var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"<packing></packing>"+
			"</product_master>";
	fetch_requested_data('',columns,function (products) 
	{
		if(products.length>0)
		{
			report64_count+=1;
			/////////get product image////////////
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type exact='yes'>product_master</doc_type>" +
					"<target_id exact='yes'>"+products[0].id+"</target_id>" +
					"</documents>";
			fetch_requested_data('',picture_column,function(pic_results)
			{
				var pic_results_url="";
				var pic_results_id="";
				if(pic_results.length>0)
				{
					pic_results_id=pic_results[0].id;
					pic_results_url=pic_results[0].url;
				}
				updated_url=pic_results_url.replace(/ /g,"+");
				var imgHTML="<img style='width:98%;height:auto;' src='"+updated_url+"'>";
				
				$('#report64_image').html(imgHTML);	
				
				$('#report64_form').show();			
				
				$(accept_button).show();			
				$(reject_button).show();			
				report64_count-=1;
			});
			
			report64_count+=1;
			//////////provide a preview of the invoice//////////////////////
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+
					"<bill_id></bill_id>"+		
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<total></total>"+
					"<mrp></mrp>"+
					"<batch></batch>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				report64_count-=1;
			
				if(items.length>0)
				{
					report64_count+=1;
							
					var bills_xml="<bills>"+
								"<id>"+items[0].bill_id+"</id>"+
								"<customer_name></customer_name>"+
	                        	"<bill_num></bill_num>"+
	                       		"<order_num></order_num>"+
	                       		"<order_id></order_id>"+
	                        	"<bill_date></bill_date>"+
	                        	"</bills>";
	                fetch_requested_data('',bills_xml,function (bills) 
					{
						report64_count-=1;
			
						//console.log(bills);
						$(print_button).off('click'); 
						$(print_button).on('click',function () 
						{
							print_product_barcode(bills[0].order_id,"Order # "+bills[0].order_num,"Invoice # "+bills[0].bill_num);
						});
						
        				$(print_button).show();

							////////////setting up containers///////////////////////	
						var container=document.getElementById('report64_invoice');
												
						var invoice_line=document.createElement('div');
						var table_container=document.createElement('div');
						var packing_box=document.createElement('div');
						
						////////////setting styles for containers/////////////////////////
					
						invoice_line.setAttribute('style','padding:10px;font-size:1em;width:100%;min-height:50px;background-color:#bbbbbb;font-weight:600;');
						packing_box.setAttribute('style','border:1px solid #000;margin:10px;width:100%;min-height:50px;font-weight:600;');
					
						///////////////getting the content////////////////////////////////////////
						var date=get_my_past_date(bills[0].bill_date);				
						var invoice_no=bills[0].bill_num;
						var order_no=bills[0].order_num;
						
						invoice_line.innerHTML="<div style='float:left;width:50%;text-align:left'>Invoice #: "+invoice_no+"<br>Order #: "+order_no+"</div><div style='float:right;text-align:right;width:50%'>Invoice Date: "+date+"</div>";
												
								////////populate packing instructions and invoice template///////
						if(products[0].packing!='undefined')
						{
							packing_box.innerHTML="Packing Instructions:<br><b>"+products[0].packing+"</b>";
						}			
						else 
						{
							packing_box.innerHTML="Packing Instructions not available";
						}

						var table_copy=document.createElement('table');
						
						table_copy.setAttribute('width','100%');
						//table_copy.setAttribute('height','100px');
						$(table_copy).append("<tr><th>SKU</th><th>Item</th><th>Batch</th><th>Quantity</th><th>MRP</th><th>Total</th></tr>");
		
						items.forEach(function (item) 
						{
							$(table_copy).append("<tr><th>"+item.item_name+"</th><th>"+item.item_desc+"</th><th>"+item.batch+"</th><th>"+item.quantity+"</th><th>"+item.mrp+	"</th><th>"+item.total+"</th></tr>");	
						});

						$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:1em");
						$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:1em");
						$(table_copy).find("tr").attr('style','flex:1;height:30px');
											
						container.appendChild(invoice_line);
						
						container.appendChild(table_copy);
						container.appendChild(packing_box);
						
					});
				}
				else 
				{
					var container=document.getElementById('report64_invoice');
					container.innerHTML='<b>This item is not pending for packing. Put it back in the warehouse.<b>';	
				}
			});
			
			var report64_complete=setInterval(function()
			{
		  	   if(report64_count===0)
		  	   {
					clearInterval(report64_complete);
					$('textarea').autosize();
					hide_loader();   
		  	   }
			},200);
			////////////////////////////////////////////////////////////////
		}
		else 
		{
			var container=document.getElementById('report64_invoice');
			container.innerHTML='<b>Incorrect Barcode.<b>';	
			hide_loader();
		}		
	});		
};
	
	</script>
</div>