<div id='form72' class='function_detail'>
	<form id='form72_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form72_add_customer'><br>
			<input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>			
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
				<input type='button' title='Save Bill' class='save_icon'>
				<input type='button' title='Print Bill' class='print_icon' onclick='form72_print_form();'>
				<input type='button' id='form72_share' class='share_icon' style='display:none;'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form72_header'></form>
					<th>Item Name</th>
					<th>Batch/Person</th>
					<th>Quantity/Notes</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form72_header' value='Add product' class='generic_icon' onclick='form72_add_product();'>
						<input type='button' form='form72_header' value='Add Service' class='generic_icon' onclick='form72_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form72_body'>
		</tbody>
		<tfoot id='form72_foot'>
		</tfoot>
	</table>
</div>