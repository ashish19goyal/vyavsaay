<div id='form10' class='function_detail'>
	<form id='form10_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form10_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Order #<br><input type='text' name='order_num'></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>Bill Date<br><input type='text' name='bill_date' required></label>
			<label>Due Date<br><input type='text' name='due_date' required></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='order_id'>
				<input type='hidden' name='t_id'>
				<input type='hidden' name='payment'>				
			</label>
			<label><input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label><input type='button' title='Print Bill' name='print' class='print_icon' onclick='form10_print_form();'></label>
			<label><input type='button' id='form10_share' class='share_icon' style='display:none;'><label>
			<label><input type='submit' class='submit_hidden'>
					<input type='hidden' name='customer_address'>
			</label>
			</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form10_header'></form>
					<th>Item</th>
					<th>Remark</th>
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