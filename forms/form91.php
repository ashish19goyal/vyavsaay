<div id='form91' class='function_detail'>
	<form id='form91_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form91_add_customer'><br>
			<input type='text' required></label>
			<label id='form91_customer_info'></label>
			<label>Bill Type<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form91_print_form();'></label>
			<label>	<input type='button' id='form91_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form91_header'></form>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Total</th>
				<th><input type='button' title='Add item' class='add_icon' onclick='form91_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form91_body'>
		</tbody>
		<tfoot id='form91_foot'>
		</tfoot>
	</table>
</div>