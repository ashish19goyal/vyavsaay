<div id='form180' class='function_detail'>
	<form id='form180_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form180_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Order #<br><input type='text' required name='order_num' readonly="readonly"></label>
			<label>Order Date<br><input type='text' required name='order_date'></label>
			<label>Status<br><input type='text' required name='status'></label>
			<label><input type='hidden' name='order_id' name='order_id'></label>
			<label>	<input type='button' title='Save order' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form180_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form180_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Pricing</th>
					<th><input type='button' form='form180_header' title='Add item' class='add_icon' onclick='form180_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form180_body'>
		</tbody>
		<tfoot id='form180_foot'>
		</tfoot>
	</table>
</div>