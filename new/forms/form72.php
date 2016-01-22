<div id='form72' class='tab-pane'>
	<form id='form72_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form72_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Bill Date<br><input type='text' name='date' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>			
			<label>Show Sub-totals: <input type='checkbox' checked name='sub_totals'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form72_print_form();'></label>
			<label>	<input type='button' id='form72_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form72_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
					<th><input type='button' form='form72_header' title='Add product' class='add_icon' onclick='form72_add_product();'>
						<input type='button' form='form72_header' title='Add Service' class='add_red_icon' onclick='form72_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form72_body'>
		</tbody>
		<tfoot id='form72_foot'>
		</tfoot>
	</table>
</div>