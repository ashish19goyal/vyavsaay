<div id='form153' class='function_detail'>
	<form id='form153_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form153_add_customer'><br>
					<input type='text' required></label>
			<label id='form153_customer_info'></label>
			<label>Type<br><input type='text' required></label>
			<label>Date<br><input type='text' required></label>
			<label>Introductory Notes<br><textarea></textarea></label>
			<label>
				<input type='hidden' name='quot_id'>
				<input type='hidden' name='offer'>
			</label>
			<label>	<input type='button' title='Save Quotation' class='save_icon'></label>
			<label>	<input type='button' title='Print Quotation' class='print_icon'></label>
			<label>	<input type='button' id='form153_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form153_header'></form>
				<th>Item</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Amount</th>
				<th><input type='button' title='Add Product' class='add_icon' onclick='form153_add_product();'>
					<input type='button' title='Add Service' class='add_red_icon' onclick='form153_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form153_body'>
		</tbody>
		<tfoot id='form153_foot'>
		</tfoot>
	</table>
</div>