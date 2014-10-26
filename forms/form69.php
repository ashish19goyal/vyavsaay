<div id='form69' class='function_detail'><b>Add sale order</b>
	<form id='form69_master'>
		<fieldset>
			Customer<input type='text' required>
			Order Date<input type='text' required>
			<input type='hidden' name='order_id' value=''>
			<input type='button' value='New Order' onclick='form12_new_form();'>
			<input type='submit' value='new' class='save_icon'>
			<input type='button' value='new' class='delete_icon' onclick='form69_delete_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form69_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Notes</th>
					<th><input type='button' form='form69_header' value='Add item' onclick='form69_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form69_body'>
		</tbody>
	</table>
</div>