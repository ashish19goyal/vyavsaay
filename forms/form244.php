<div id='form244' class='function_detail'>
	<form id='form244_master' autocomplete="off">
		<fieldset>
			<label>Storage:	<input type='text' required name='storage'></label>
			<label><input type='button' name='save' class='generic_icon' value='Add to Stock'></label>
			<!--<label><input type='button' name='barcode' title='Click to print a randomly generated barcode' class='generic_red_icon' value='Generate Barcode'></label>-->
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form244_head'>
			<tr>
				<form id='form244_header'></form>
					<th>Barcode</th>
					<th>Item</th>
					<th>Batch</th>					
					<th>Quantity</th>					
					<th><input type='button' form='form244_header' title='Add item' class='add_icon' onclick='form244_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form244_body'>
		</tbody>
	</table>
</div>