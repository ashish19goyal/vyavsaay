<div id='form69' class='function_detail'>
	<form id='form69_master'>
		<fieldset>
			Customer<input type='text' required>
			Order Date<input type='text' required>
			Billing Status<input type='text' required>
			<input type='hidden' name='order_id' value=''>
			<input type='button' title='New Order' class='add_icon' onclick='form69_new_form();'>
			<input type='submit' title='Save order' class='save_icon'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form69_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Notes</th>
					<th><input type='button' form='form69_header' title='Add item' class='add_icon' onclick='form69_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form69_body'>
		</tbody>
	</table>
</div>