<div id='form153' class='function_detail'>
	<form id='form153_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form153_add_customer'><br>
					<input type='text' required name='customer'></label>
			<label id='form153_customer_info'></label>
			<label>Type<br><input type='text' required name='type'></label>
			<label>Date<br><input type='text' required name='date'></label>
			<br>
			<label>Quotation #<br><input type='text' readonly='readonly' name='quot_num' required></label>
			<label>Introductory Notes<br><textarea style='width:300px' name='notes'></textarea></label>
			<label>
				<input type='hidden' name='quot_id'>
			</label>
			<label>	<input type='button' title='Save Quotation' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print Quotation' class='print_icon' name='print'></label>
			<label>	<input type='button' id='form153_share' class='share_icon' style='display:none;' name='share'></label>
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