<div id='form21' class='function_detail'>
	<form id='form21_master'>
		<fieldset>
			Supplier<input type='text' required>
			Bill Number<input type='text' required>
			Bill Date<input type='text' required>
			Entry Date<input type='text' required>
			Discount <input required type='number' value='0' step='any'>
			Total Amount<input readonly='readonly' type='number' step='any' value='0' required>
			Notes<textarea></textarea>
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