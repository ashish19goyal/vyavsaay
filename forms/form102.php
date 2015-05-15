<div id='form102' class='function_detail'>
	<form id='form102_master'>
		<fieldset>
			<label>Project Name<br><input type='text' required></label>
			<label>	<input type='hidden' name='project_id' form='form102_master'></label>
			<label>	<input type='button' onclick='form102_ini();' value='Refresh' class='generic_icon'></label>
			<label>	<input type='button' title='Print' class='print_icon' onclick='form102_print_form($(this));'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form102_header'></form>
					<th>Member</th>
					<th>Role</th>
					<th>Notes</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form102_header' title='Add member' onclick='form102_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form102_body'>
		</tbody>
	</table>
</div>