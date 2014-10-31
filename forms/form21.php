<div id='form21' class='function_detail'><b>Enter goods received</b>
	<form id='form21_master'>
		<fieldset>
			Supplier<input type='text'>
			Bill Number<input type='text'>
			Bill Date<input type='text'>
			Entry Date<input type='text'>
			Discount <input readonly='readonly' type='number'>
			Total Amount<input readonly='readonly' type='number'>
			<input type='hidden' value=''>
			<input type='hidden' name='transaction'>
			<input type='button' title='New Bill' class='add_icon' onclick='form21_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form21_print_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form21_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Expiry</th>
					<th>Cost Price</th>
					<th>Quantity</th>
					<th><input type='button' form='form21_header' value='Add item' onclick='form21_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form21_body'>
		</tbody>
	</table>
</div>