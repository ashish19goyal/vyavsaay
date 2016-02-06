<div id='form286' class='tab-pane'>

	<div class='portlet box'>	
		<div class="portlet-title">
		</div>
		
		<div class="portlet-body">
			<form id='form286_master' autocomplete="off">
				<fieldset id='form286_fieldset'>
				</fieldset>
			</form>
		</div>
	</div>

	<div class='portlet box red'>	
		<div class="portlet-title">
			<div class='caption'>Pending Invoices</div>
		</div>
		
		<div class="portlet-body">
			<table id='form286_pending_payments' class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
				<thead>
					<tr>
						<form id='form286_pending_header'></form>
							<th><input type='text' placeholder="Invoice #" readonly='readonly' name='invoice' form='form286_header'></th>
							<th><input type='text' placeholder="Period" readonly="readonly" name='desc' form='form286_header'></th>
							<th><input type='text' placeholder="Remarks" readonly='readonly' name='remarks' form='form286_header'></th>
							<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form286_header'></th>
							<th><input type='submit' form='form286_header' style='visibility: hidden;'></th>
					</tr>
				</thead>
				<tbody id='form286_pending_body'>
				</tbody>			
			</table>
		</div>
	</div>

	<div class='portlet box green'>	
		<div class="portlet-title">
			<div class='caption'>Paid Invoices</div>
		</div>
		
		<div class="portlet-body">
			<table id='form286_all_payments' class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
				<thead>
					<tr>
						<form id='form286_all_header'></form>
							<th><input type='text' placeholder="Invoice #" readonly='readonly' name='invoice' form='form286_header'></th>
							<th><input type='text' placeholder="Period" readonly="readonly" name='desc' form='form286_header'></th>
							<th><input type='text' placeholder="Remarks" readonly='readonly' name='remarks' form='form286_header'></th>
							<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form286_header'></th>
							<th><input type='submit' form='form286_header' style='visibility: hidden;'></th>
					</tr>
				</thead>
				<tbody id='form286_all_body'>
				</tbody>
			</table>
		</div>
	</div>
	
	<script>
		function form286_header_ini()
		{
			var fields=document.getElementById('form286_master');
			$('#form286_fieldset').html("");
			$('#form286_pending_body').html("");
			$('#form286_all_body').html("");
		}

		function form286_ini()
		{
			show_loader();	
		
			var new_columns=new Object();
				new_columns.count=0;
				new_columns.start_index=0;
				new_columns.data_store='system_billing';		
				
				new_columns.indexes=[{index:'id'},
									{index:'order_id'},
									{index:'narration'},
									{index:'account_name'},
									{index:'user_accounts'},
									{index:'amount'},
									{index:'tax'},
									{index:'total'},
									{index:'currency'},
									{index:'period_start'},
									{index:'period_end'},
									{index:'display',exact:'show'},
									{index:'payment_status'}];		
		
			read_json_rows('form286',new_columns,function(results)
			{
				var due_amount=0;
				var currency="";
				results.forEach(function(result)
				{
					currency=result.currency;
					if(result.payment_status=='pending')
					{
						due_amount+=parseFloat(result.total);
					}	
				});

				var rowsHTML="<div class='row'>"+
								"<div class='col-md-4 col-sm-8 col-xs-8'><b>Active User Accounts</b></div>"+
								"<div class='col-md-2 col-sm-4 col-xs-4'><input type='text' readonly='readonly' name='user_accounts'></div>"+
								"<div class='col-md-4 col-sm-8 col-xs-8'><b>Credit Period</b></div>"+
								"<div class='col-md-2 col-sm-4 col-xs-4'><input type='text' readonly='readonly' name='credit_period' value='45 Days'></div>"+
								"<div class='col-md-4 col-sm-8 col-xs-8'><b>Business Id</b></div>"+
								"<div class='col-md-2 col-sm-4 col-xs-4'><input type='text' readonly='readonly' value='"+get_session_var('domain')+"' name='user_id'></div>"+
								"<div class='col-md-4 col-sm-8 col-xs-8'><b>Payment Due</b></div>"+
								"<div class='col-md-2 col-sm-4 col-xs-4'><input type='text' readonly='readonly' name='payment_due' value='"+currency+" "+due_amount+"'></div>"+
								"</div>";
				$('#form286_fieldset').html(rowsHTML);
						
				var pending_table_HTML="";
				results.forEach(function(result)
				{
					if(result.payment_status=='pending')
					{
						pending_table_HTML+="<tr><td>"+result.order_id+"</td><td>"+get_my_past_date(result.period_start)+"-"+get_my_past_date(result.period_end)+"</td><td>"+result.narration+"</td><td title='User Accounts:"+result.user_accounts+"\nAmount:"+result.amount+"\nTax:"+result.tax+"'>"+result.currency+" "+result.total+"</td><td>";
		
						pending_table_HTML+="<form method='post' action='./ajax_json/payment_request.php' target='_blank'>"+
											"<input type='hidden' name='order_id' value='"+result.order_id+"'>"+
											"<input type='hidden' name='currency' value='INR'>"+
											"<input type='hidden' name='amount' value='"+result.total+"'>"+
											"<input type='hidden' name='redirect_url' value='https://vyavsaay.com/ajax_json/payment_response.php'>"+
											"<input type='hidden' name='billing_name' value='"+result.account_name+"'>"+
											"<input type='hidden' name='billing_address' value='"+get_session_var('address')+"'>"+
											"<input type='hidden' name='billing_city' value='Delhi'>"+
											"<input type='hidden' name='billing_state' value='Delhi'>"+
											"<input type='hidden' name='billing_country' value='India'>"+
											"<input type='hidden' name='billing_tel' value='"+get_session_var('phone')+"'>"+
											"<input type='hidden' name='billing_email' value='"+get_session_var('email')+"'>"+
											"<input type='hidden' name='merchant_param1' value='"+get_session_var('domain')+"'>"+
											"<button type='submit' class='btn yellow'>Make Payment</button></form>";
						
						pending_table_HTML+="</td></tr>";
					}
				});
				$('#form286_pending_body').html(pending_table_HTML);
				
				var all_table_HTML="";
				results.forEach(function(result)
				{
					if(result.payment_status=='paid')
					{
						all_table_HTML+="<tr><td>"+result.order_id+"</td><td>"+get_my_past_date(result.period_start)+"-"+get_my_past_date(result.period_end)+"</td><td>"+result.narration+"</td><td title='User Accounts:"+result.user_accounts+"\nAmount:"+result.amount+"\nTax:"+result.tax+"'>"+result.currency+" "+result.total+"</td><td><button type='button' class='btn blue' onclick=\"form286_print_form('"+result.account_name+"','"+get_my_past_date(result.period_start)+"','"+get_my_past_date(result.period_end)+"','"+result.order_id+"','"+result.narration+"','"+result.user_accounts+"','"+result.amount+"','"+result.tax+"','"+result.total+"');\">Print Invoice</button></td></tr>";
					} 
				});
		
				$('#form286_all_body').html(all_table_HTML);
				
				var master_form=document.getElementById('form286_master');
				var user_accounts_field=master_form.elements['user_accounts'];
				
				var new_columns=new Object();
				new_columns.data_store='accounts';		
					
				new_columns.indexes=[{index:'username',unequal:""},
									{index:'type',array:['master','staff']},
									{index:'status',value:'active'}];
			
				read_json_count(new_columns,function(item_count)
				{
					user_accounts_field.value=item_count;
				});
		
				$('#form286').formcontrol();
										
				hide_loader();
			});	
		};
		
		function form286_print_form(customer_name,bill_start,bill_end,bill_no,narration,bill_user_accounts,bill_amount,bill_tax,bill_total)
		{
			print_form286(customer_name,bill_start,bill_end,bill_no,narration,bill_user_accounts,bill_amount,bill_tax,bill_total,function(container)
			{
				$.print(container);
				container.innerHTML="";	
			});	
		}
		
		/**
		* This function prepares the printing template for the documents like bills and purchase orders
		*/
		function print_form286(customer_name,bill_start,bill_end,bill_no,narration,bill_user_accounts,bill_amount,bill_tax,bill_total,func)
		{
			var form_id='form286';
			////////////setting up containers///////////////////////	
			var container=document.createElement('div');
			var header=document.createElement('div');
				var logo=document.createElement('div');
			
			var invoice_line=document.createElement('div');
			
			var info_section=document.createElement('div');	
				var customer_info=document.createElement('div');
				var business_info=document.createElement('div');
		
			var table_container=document.createElement('div');
			
			var footer=document.createElement('div');
				var jurisdiction=document.createElement('div');
				var business_contact=document.createElement('div');
			
		////////////setting styles for containers/////////////////////////
		
			header.setAttribute('style','width:100%;text-align:center');
				logo.setAttribute('style','width:100%;text-align:center;');
			
			info_section.setAttribute('style','width:100%;height:85px;font-size:14px;');
				customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
				business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
			
			footer.setAttribute('style','width:98%;min-height:100px;');
				jurisdiction.setAttribute('style','margin:10px;width:98%;min-height:20px;text-align:left;font-size:12px;');
				business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:12px;');
		
		///////////////getting the content////////////////////////////////////////
		
			var bt="Vyavsaay ERP";
			var logo_image="logo.png";
			var business_address="Ground Floor, Building #84, Sector-28, Gurgaon-122002";
			var business_phone="+91-9818005232";
			var business_email="info@vyavsaay.com";
			var domain=get_session_var('domain');
			
			var st_no='ALHPG2106RSD003';
			var pan='ALHPG2106R';
			////////////////filling in the content into the containers//////////////////////////
		
			logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
			
			invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='font-size:16px;'>Invoice</b></div><hr style='border: 1px solid #00f;'>";
			
			customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>Account Name: "+domain;
			business_info.innerHTML="Bill #: "+bill_no+"<br>Date: "+get_my_date()+"<br>ST #: "+st_no;
		
			jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated invoice.";
			business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";
		
			var table_element=document.getElementById(form_id+'_body');
		
			/////////////adding new table //////////////////////////////////////////////////////	
			var new_table=document.createElement('table');
			new_table.setAttribute('style','width:100%;font-size:14px;border:1px solid #00f;text-align:left;');
			new_table.setAttribute('class','plain_table');
			var table_header="<tr>"+
						"<td style='border: 1px solid #00f;text-align:left;width:6%;'>S.No.</td>"+
						"<td style='border: 1px solid #00f;text-align:left;width:24%;'>Item</td>"+
						"<td style='border: 1px solid #00f;text-align:left;width:25%'>Period</td>"+
						"<td style='border: 1px solid #00f;text-align:left;width:15%'>Amount</td>"+
						"<td style='border: 1px solid #00f;text-align:left;width:15%'>Tax</td>"+
						"<td style='border: 1px solid #00f;text-align:left;width:15%'>Total</td></tr>";
		
			var table_rows=table_header;
				
			table_rows+="<tr>"+
						"<td style='border: 1px solid #00f;text-align:left;'>1</td>"+
						"<td style='border: 1px solid #00f;text-align:left;'>"+narration+"</td>"+
						"<td style='border: 1px solid #00f;text-align:left;'>"+bill_start+" - "+bill_end+"</td>"+
						"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_amount+"</td>"+
						"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_tax+"</td>"+
						"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_total+"</td></tr>";
			
			var rows_to_add=10;
			for(var i=0;i<rows_to_add;i++)
			{
				table_rows+="<tr style='flex:2;border-right:1px solid #00f;border-left:1px solid #00f;height:30px;'><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td></tr>";
			}
		
			var wording_total=number2text(bill_total);
			
			var table_foot_row="<tr style='border-right: 1px solid #00f;border-left: 1px solid #00f;border-top: 1px solid #00f;a'>"+
						"<td colspan='3' style='border: 1px solid #00f;text-align:left;'>Total (in words): "+wording_total+"</td>"+
						"<td colspan='1' style='border: 1px solid #00f;text-align:left;'>Total</td>"+
						"<td colspan='2' style='border: 1px solid #00f;text-align:left;font-size:1.2em;font-weight:bold;'>Rs. "+bill_total+"</td></tr>";
				
			table_rows+=table_foot_row;
			new_table.innerHTML=table_rows;
			
			/////////////placing the containers //////////////////////////////////////////////////////	
			
			container.appendChild(header);
			container.appendChild(invoice_line);
			container.appendChild(info_section);
			
			container.appendChild(new_table);
			container.appendChild(footer);
			
			header.appendChild(logo);
			header.appendChild(business_contact);
			
			info_section.appendChild(customer_info);
			info_section.appendChild(business_info);
			
			footer.appendChild(jurisdiction);
			footer.appendChild(business_contact);
			
			func(container);
		}

	</script>
</div>