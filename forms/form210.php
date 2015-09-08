<div id='form210' class='function_detail'>
	<form id='form210_master' autocomplete="off">
		<fieldset>
			<label>Bag #: <input type='text' class='widebox' name='bag'></label>
			<label>Order #: <input type='text' class='widebox' name='order' required></label>
			<label><input type='submit' name='refresh' class='generic_icon' value='Refresh'></label>
			<label><input type='button' name='print' class='generic_icon' value='Print Barcode'></label>		
			<br>			
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Item<br><input type='text' placeholder='Scan item to accept' style='color:#000;' name='accepted'></label>
		</fieldset>
	</form>

	<br>
	<div id='form210_body' style='display:block;width:100%'>
		<div id='form210_invoice' style='display:block;width:95%;height:auto;'></div>
		<br><br>
		<div id='form210_image' style='display:block;margin:5px;width:95%;height:auto;'></div>
	</div>
</div>