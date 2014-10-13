<div id='form2' class='function_detail'><b>Create pamphlets</b>
	<form id='form2_master'>
		<fieldset>
			Pamphlet Name<input type='text' required>
			<input type='hidden' name='pamphlet_id' form='form2_master' value=''>
			<input type='submit' value='Save Pamphlet'>
			<input type='button' value='Discard Pamphlet' onclick='form2_delete_form($(this));'>
			<input type='button' value='Print Bill' onclick='form2_print_form($(this));'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form2_header'></form>
					<th>Product Name</th>
					<th>Offer Name</th>
					<th>Offer Details</th>
					<th><input type='button' form='form2_header' value='Add item' onclick='form2_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form2_body'>
		</tbody>
	</table>
</div>