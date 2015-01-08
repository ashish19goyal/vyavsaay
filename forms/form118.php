<div id='form118' class='function_detail'>
	<form id='form118_master'>
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' onclick='modal11_action();'></br>
			<input type='text' required></label>
			<label>Bill Date</br><input type='text' required></label>
			<label>Amount</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Discount</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Tax</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Total</br>Rs. <input readonly='readonly' type='number' required></label>
			<label>Loyalty points</br><input readonly='readonly' type='number' required></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form118_print_form();'>
			<input type='button' id='form118_share' class='share_icon' style='display:none;'>
			</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form118_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form118_header' title='Add item' class='add_icon' onclick='form118_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form118_body'>
		</tbody>
	</table>
</div>