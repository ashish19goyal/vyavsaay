<div id='form178' class='function_detail'>
	<form id='form178_master' autocomplete="off">
		<fieldset>
			<label>Supplier<br><input type='text' name='supplier'></label>
			<label>Order Date<br><input type='text' name='date' readonly='readonly' required></label>
			<label>Order #<br><input type='text' name='order_num' readonly='readonly' required></label>
			<label>Priority<br><input type='text' name='priority' readonly='readonly'></label>
			<label>Order Status<br><input type='text' name='status' required></label>
			<label>	<input type='hidden' name='order_id' value=''></label>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>	<input type='button' id='form178_share' name='share' class='share_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' name='print' onclick='form178_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form178_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Make</th>
					<th>Price</th>
					<th><input type='button' form='form178_header' title='Add item' class='add_icon' onclick='form178_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form178_body'>
		</tbody>
		</tfoot>
		<tfoot id='form178_foot'>
	</table>
</div>