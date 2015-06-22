<div id='form10' class='function_detail'>
	<form id='form10_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form10_add_customer'><br>
			<input type='text' required></label>
			<label>Order #<br><input type='text' name='order_num'></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='order_id'>
				<input type='hidden' name='transaction'>
			</label>
			<label><input type='button' title='Save Bill' class='save_icon'></label>
			<label><input type='button' title='Print Bill' class='print_icon' onclick='form10_print_form();'></label>
			<label><input type='button' id='form10_share' class='share_icon' style='display:none;'><label>
			<label><input type='submit' class='submit_hidden'>	</label>
			</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form10_header'></form>
					<th>Item</th>
					<th>Notes</th>
					<th>Quantity</th>
					<th>Price</th>
					<th><input type='button' form='form10_header' title='Add item' class='add_icon' onclick='form10_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form10_body'>
		</tbody>
		<tfoot id='form10_foot'>
		</tfoot>
	</table>
</div>