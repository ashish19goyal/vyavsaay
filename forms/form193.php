<div id='form193' class='function_detail'>
	<form id='form193_master' autocomplete="off">
		<fieldset>
			<label>Storage:	<input type='text' required name='storage'></label>
			<label><input type='button' name='save' class='generic_icon' value='Update Inventory'></label>
			<!--<label><input type='button' name='barcode' title='Click to print a randomly generated barcode' class='generic_red_icon' value='Generate Barcode'></label>-->
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form193_head'>
			<tr>
				<form id='form193_header'></form>
					<th>Barcode</th>
					<th>Item</th>
					<th>Batch</th>					
					<th>Quantity</th>					
					<th><input type='button' form='form193_header' title='Add item' class='add_icon' onclick='form193_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form193_body'>
		</tbody>
	</table>
</div>