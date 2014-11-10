<div id='form15' class='function_detail'><b>Enter Returns</b>
	<form id='form15_master'>
		<fieldset>
			Customer<input type='text' required>
			Return Date<input type='text' required>
			Total Refund<input readonly='readonly' type='number' step='any'>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='transaction'>
			<input type='hidden' name='tax'>
			<input type='button' title='New Bill' class='add_icon' onclick='form15_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form15_print_form();'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form15_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Notes</th>
					<th>Quantity</th>
					<th>Exchange/Refund</th>
					<th>Refund Amount/Exchanged Batch</th>
					<th><input type='button' form='form15_header' title='Add item' class='add_icon' onclick='form15_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form15_body'>
		</tbody>
	</table>
</div>