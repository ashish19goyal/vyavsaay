<div id='form225' class='function_detail'>
	<form id='form225_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form225_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Bill Date<br><input type='text' name='date' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>			
			<label>Bill Type<br><input type='text' required name='bill_type'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form225_print_form();'></label>
			<label>	<input type='button' id='form225_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form225_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
					<th><input type='button' form='form225_header' title='Add item' class='add_icon' onclick='form225_add_item();'>
					</th>
			</tr>
		</thead>
		<tbody id='form225_body'>
		</tbody>
		<tfoot id='form225_foot'>
		</tfoot>
	</table>
</div>