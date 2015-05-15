<div id='form130' class='function_detail'>
	<form id='form130_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form130_add_customer'><br>
			<input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form130_print_form();'></label>
			<label>	<input type='button' id='form130_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form130_header'></form>
					<th>Item Name</th>
					<th>Batch/Person</th>
					<th>Quantity/Notes</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form130_header' value='Add product' class='generic_icon' onclick='form130_add_product();'>
						<input type='button' form='form130_header' value='Add Service' class='generic_icon' onclick='form130_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form130_body'>
		</tbody>
		<tfoot id='form130_foot'>
		</tfoot>
	</table>
</div>