<div id='form2' class='function_detail'>
	<form id='form2_master'>
		<fieldset>
			<label>Pamphlet Name</br><input type='text' required></label>
			<input type='hidden' name='pamphlet_id' form='form2_master' value=''>
			<input type='submit' title='Save' class='save_icon'>
			<input type='button' title='Print' class='print_icon' onclick='form2_print_form($(this));'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form2_header'></form>
					<th>Item Name</th>
					<th>Offer Name</th>
					<th>Offer Details</th>
					<th><input type='button' class='add_icon' form='form2_header' title='Add item' onclick='form2_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form2_body'>
		</tbody>
	</table>
</div>