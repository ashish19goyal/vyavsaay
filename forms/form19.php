<div id='form19' class='function_detail'>
	<form id='form19_master'>
		<fieldset>
			Supplier<input type='text' required>
			Return Date<input type='text' required>
			Total Refund<input readonly='readonly' type='number' step='any'>
			<input type='hidden' name='id'>
			<input type='hidden' name='transaction'>
			<input type='button' title='New Bill' class='add_icon' onclick='form19_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form19_print_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form19_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Notes (Add reason for return)</th>
					<th>Quantity</th>
					<th>Return Amount</th>
					<th><input type='button' form='form19_header' title='Add item' class='add_icon' onclick='form19_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form19_body'>
		</tbody>
	</table>
</div>