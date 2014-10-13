<div id='form51' class='function_detail'><b>Manage Access Control</b>
	<form id='form51_master'>
		<fieldset>
			<input type='button' value='Add User' onclick='form51_add_form();'>
			<input type='button' value='Modify User' onclick="form51_modify_form()">
			User Name<input type='text'>
			Name<input type='text'>
			Password<input type='password'>
			<input type='hidden' name='user_id'>
			<input type='hidden' name='pass_hash'>
			<input type='submit' value='Save Access'>
			<input type='button' value='Delete User' onclick='form51_delete_form();'>
		</fieldset>
	<table>
		<thead>
			<tr>
					<th>Report/Form Name </th>
					<th>Read</th>
					<th>Create</th>
					<th>Update</th>
					<th>Delete</th>
			</tr>
		</thead>
		<tbody id='form51_body'>
		</tbody>
	</table>
</div>