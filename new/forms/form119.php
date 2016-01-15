<div id='form119' class='function_detail'>
	<form id='form119_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form119_add_customer'><br>
			<input type='text' required></label>
			<label id='form119_customer_info'></label>
			<label>Bill Type<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label id='form119_payment_info'></label>
			<label>Unbilled Items<br><input readonly='readonly' type='number'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' value='Select unbilled items' class='generic_icon'></label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form119_print_form();'></label>
			<label>	<input type='button' id='form119_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form119_header'></form>
				<th>Product Name</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th>Unit Price</th>
				<th>Total</th>
				<th><input type='button' title='Add item' class='add_icon' onclick='form119_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form119_body'>
		</tbody>
		<tfoot id='form119_foot'>
		</tfoot>
	</table>
</div>