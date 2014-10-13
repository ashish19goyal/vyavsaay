<div id='form12' class='function_detail'><b>Create bills</b>
	<form id='form12_master'>
		<fieldset>
			Customer<input type='text' required>
			Bill Date<input type='text' required>
			Amount<input readonly='readonly' type='number'>
			Discount <input readonly='readonly' type='number'>
			Tax <input readonly='readonly' type='number'>
			Total Amount<input readonly='readonly' type='text'>
			<input type='hidden' name='bill_id' value=''>
			<input type='hidden' name='offer' value=''>
			<input type='button' value='New Bill' onclick='form12_new_form();'>
			<input type='submit' value='new'>
			<input type='button' value='new' onclick='form12_delete_form();'>
			<input type='button' value='Print Bill' onclick='form12_print_form();'>
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
					<th><input type='button' form='form12_header' value='Add item' onclick='form12_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form12_body'>
		</tbody>
	</table>
</div>