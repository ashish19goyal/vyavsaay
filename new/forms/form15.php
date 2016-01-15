<div id='form15' class='function_detail'>
	<form id='form15_master' autocomplete="off">
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form15_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Order #<br><input type='text' name='order_num' required></label>
			<label>Channel<br><input type='text' name='channel' required></label>
			<label>Return Date<br><input type='text' name='date' required></label>
			<label>
				<input type='hidden' name='order_id'>
				<input type='hidden' name='return_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form15_print_form();'></label>
			<label>	<input type='button' id='form15_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form15_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Type</th>
					<th>Details</th>
					<th><input type='button' form='form15_header' title='Add item' class='add_icon' onclick='form15_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form15_body'>
		</tbody>
		<tfoot id='form15_foot'>
		</tfoot>
	</table>
</div>