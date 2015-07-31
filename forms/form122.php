<div id='form122' class='function_detail'>
	<form id='form122_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form122_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Order #<br><input type='text' readonly='readonly' name='po_num'></label>
			<label>Bill #<br><input type='text' name='bill_num' required></label>
			<label>Bill Date<br><input type='text' name='bill_date' required></label>
			<label>Entry Date<br><input type='text' name='entry_date' required></label>
			<label>Challan Items<br><input readonly='readonly' type='number' name='unbilled'></label>
			<label>
				<input type='hidden' name='order_id'>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' value='Select unbilled items' class='generic_icon' name='unbilled_button'></label>
			<label>	<input type='button' title='Save Bill' class='save_icon' name='save'></label>
			<label> <input type='button' title='Print GRN' class='print_icon' name='print' onclick='form122_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form122_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Amount</th>
					<th>Storage</th>
					<th>Check</th>
					<th><input type='button' form='form122_header' title='Add item' class='add_icon' onclick='form122_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form122_body'>
		</tbody>
		<tfoot id='form122_foot'>
		</tfoot>
	</table>
</div>