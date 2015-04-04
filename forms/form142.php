<div id='form142' class='function_detail'>
	<form id='form142_master'>
		<fieldset>
			<label>Name<br><input type='text' required></label>
			<label>Display Name<br><input type='text' required></label>
			<label>Grid<br><input type='text' required></label>
			<label>Status<br><input type='text' required></label>
			<input type='hidden' name='id'>
			<input type='button' title='Save Questionnaire' class='save_icon'>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form142_header'></form>
					<th>Name</th>
					<th>Description</th>
					<th>Type</th>
					<th>Order</th>
					<th>Required</th>
					<th><input type='button' form='form142_header' title='Add item' class='add_icon' onclick='form142_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form142_body'>
		</tbody>
	</table>
</div>