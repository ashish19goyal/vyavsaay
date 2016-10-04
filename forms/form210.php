<div id='form210' class='tab-pane'>
	<form id='form210_master' autocomplete="off">
		<fieldset>
			<label>Bag #: <input type='text' class='widebox' name='bag'></label>
			<label>Order #: <input type='text' class='widebox' name='order'></label>
			<label>Bill #: <input type='text' class='widebox' name='bill' required></label>
			<label><input type='submit' name='refresh' class='generic_icon' value='Refresh'></label><br>
			<label><input type='button' name='print' class='generic_icon' value='Print Barcode'></label>		
			<label><input type='button' name='print_invoice' class='generic_icon' value='Print Invoice'></label>		
			<label><input type='button' name='edit_invoice' class='generic_icon' value='Update Invoice for dispatch'></label>		
			<br>			
			<label style='background-color:#027536;color:#fff;padding:3px;'>Scan Item<br><input type='text' placeholder='Scan item to accept' style='color:#000;' name='accepted'></label>
		</fieldset>
	</form>

	<br>
	<div id='form210_body' style='display:block;width:100%'>
		<div id='form210_invoice_line' style='display:block;width:99%;min-height:40px;font-size:1em;background-color:#bbbbbb;font-weight:600;'></div>
		<div style='display:inline-block;width:99%;'><label style='float:right;background-color:#B93C42;color:#fff;padding:3px;margin:10px;'>Scan Item<br><input type='text' placeholder='Scan item to reject' style='color:#000;' form='form210_master' name='rejected'></label></div>
		<div id='form210_invoice' style='display:block;width:99%;height:auto;'></div>
		<br><br>
		<div id='form210_image' style='display:block;margin:5px;width:95%;height:auto;'></div>
	</div>
</div>