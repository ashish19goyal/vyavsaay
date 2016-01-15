<div id='form296' class='function_detail'>
	<form id='form296_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' title='Add new supplier' id='form296_add_supplier'><br>
			<input type='text' name='supplier' required></label>
			<label>Order Date<br><input type='text' name='date' required></label>
			<label>Order #<br><input type='text' name='order_num' readonly='readonly' required></label>
			<label>Order Status<br><input type='text' name='status' required></label>
			<br>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>	<input type='button' id='form296_share' name='share' class='share_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form296_print_form();'></label>
			<label>	<input type='hidden' name='order_id'>
					<input type='hidden' name='tin'>
					<input type='hidden' name='address'>
					<input type='submit' class='submit_hidden'>	
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form296_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Brand</th>
					<th>Price</th>
					<th><input type='button' form='form296_header' title='Add item' class='add_icon' onclick='form296_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form296_body'>
		</tbody>
		</tfoot>
		<tfoot id='form296_foot'>
	</table>
</div>