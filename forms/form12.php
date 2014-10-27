<div id='form12' class='function_detail'><b>Create bills</b>
	<form id='form12_master'>
		<fieldset>
			Customer<input type='text' required>
			Bill Date<input type='text' required>
			Amount<input readonly='readonly' type='number'>
			Discount <input readonly='readonly' type='number'>
			Tax <input readonly='readonly' type='number'>
			Total Amount<input readonly='readonly' type='number'>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<input type='button' title='New Bill' class='add_icon' onclick='form12_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form12_print_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form12_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Unit Price</th>
					<th>Quantity</th>
					<th>Total</th>
					<th><input type='button' form='form12_header' title='Add item' class='add_icon' onclick='form12_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form12_body'>
		</tbody>
	</table>
</div>