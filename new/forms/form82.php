<div id='form82' class='function_detail'>
	<form id='form82_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form82_add_customer'><br>
			<input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='offer'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form82_print_form();'></label>
			<label>	<input type='button' id='form82_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form82_header'></form>
					<th>Barcode</th>
					<th>Product</th>
					<th>Batch</th>
					<th>Unit Price</th>
					<th><input type='button' form='form82_header' title='Add item' class='add_icon' onclick='form82_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form82_body'>
		</tbody>
		<tfoot id='form82_foot'>
		</tfoot>
	</table>
</div>