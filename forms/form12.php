<div class='forms'><b>Create bills</b>
	<form id='form12_master'>
		<fieldset>
			Customer<input type='text'>
			Bill Date<input type='text'>
			Amount<input readonly='readonly' type='number'>
			Discount <input readonly='readonly' type='number'>
			Tax <input readonly='readonly' type='number'>
			Total Amount<input readonly='readonly' type='text'>
			<input type='hidden' name='bill_id' value=''>
			<input type='hidden' name='offer' value=''>
			<input type='button' value='New Bill' onclick='form12_new_form();'>
			<input type='button' value='Save Bill' onclick='form12_save_form();'>
			<input type='button' value='Discard Bill' onclick='form12_delete_form();'>
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