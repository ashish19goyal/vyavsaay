<div id='form82' class='function_detail'>
	<form id='form82_master'>
		<fieldset>
			Customer<input type='text' required>
			Bill Date<input type='text' required>
			Amount<input readonly='readonly' type='number'>
			Discount <input readonly='readonly' type='number'>
			Tax <input readonly='readonly' type='number'>
			Total Amount<input readonly='readonly' type='number'>
			<input type='hidden' name='bill_id'>
			<input type='submit' title='Save Bill' class='save_icon'>
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
	</table>
</div>