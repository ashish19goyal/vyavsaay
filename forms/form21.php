<div id='form21' class='function_detail'>
	<form id='form21_master'>
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' onclick='modal13_action();'></br>
			<input type='text' required></label>
			<label>Bill Number</br><input type='text' required></label>
			<label>Bill Date</br><input type='text' required></label>
			<label>Entry Date</br><input type='text' required></label>
			<label>Amount</br>Rs. <input readonly='readonly' type='number' required></label>
			<label>Discount</br>Rs. <input required type='number' value='0' step='any'></label>
			<label>Tax</br>Rs. <input readonly='readonly' type='number' required></label>
			<label>Total</br>Rs. <input readonly='readonly' type='number' step='any' required></label>
			<label>Notes</br><textarea row='1'></textarea></label>
			<input type='hidden' value=''>
			<input type='hidden' name='transaction'>
			<input type='button' title='New Bill' class='add_icon' onclick='form21_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form21_print_form();'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form21_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Amount</th>
					<th>Batch</th>
					<th>Storage Area</th>
					<th><input type='button' form='form21_header' title='Add item' class='add_icon' onclick='form21_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form21_body'>
		</tbody>
	</table>
</div>