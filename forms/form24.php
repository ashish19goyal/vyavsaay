<div id='form24' class='function_detail'>
	<form id='form24_master'>
		<fieldset>
			Supplier<input type='text' required>
			Order Date<input type='text' required>
			Order Status<input type='text' required>
			<input type='hidden' name='order_id' value=''>
			<input type='button' title='New Order' class='add_icon' onclick='form24_new_form();'>
			<input type='submit' title='Save order' class='save_icon'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form24_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Make</th>
					<th>Price</th>
					<th><input type='button' form='form24_header' title='Add item' class='add_icon' onclick='form24_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form24_body'>
		</tbody>
	</table>
</div>