<div class='forms'><b>Create pamphlets</b>
	<form id='form2_master'>
		<fieldset>
			Pamphlet Name<input type='text'>
			<input type='hidden' name='pamphlet_id' form='form2_master' value=''>
			<input type='button' value='Save Pamphlet' onclick='form2_save_form($(this));'>
			<input type='button' value='Discard Pamphlet' onclick='form2_delete_form($(this));'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form2_header'></form>
					<th>Product Name</th>
					<th>Offer ID</th>
					<th>Offer Details</th>
					<th>Price</th>
					<th><input type='button' form='form2_header' value='Add item' onclick='form2_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form2_body'>
		</tbody>
	</table>
</div>