<div id='form72' class='function_detail'><b>Create bills</b>
	<form id='form72_master'>
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
			<input type='button' title='New Bill' class='add_icon' onclick='form72_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form72_print_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form72_header'></form>
					<th>Item Name</th>
					<th>Batch/Person</th>
					<th>Quantity/Notes</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form72_header' title='Add product' class='add_icon' onclick='form72_add_product();'>
						<input type='button' form='form72_header' title='Add service' class='add_icon' onclick='form72_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form72_body'>
		</tbody>
	</table>
</div>