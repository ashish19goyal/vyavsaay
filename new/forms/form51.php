<div id='form51' class='tab-pane'>
	<form id='form51_master' autocomplete="off">
		<fieldset>
			<label>User Name<br><input type='text' name='username'></label>
			<label>Password<br><input type='password' name='pass'></label>
			<label>	<input type='hidden' name='user_id'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
			<label>	<input type='button' title="Save Access" class='save_icon' name='save'></label>	
			<label>	<input type='button' title='Add permission' class='add_icon' name='add' onclick='form51_add_item();'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Report/Form</th>
				<th>Read</th>
				<th>Create</th>
				<th>Update</th>
				<th>Delete</th>
				<th></th>
			</tr>
		</thead>
		<tbody id='form51_body'>
		</tbody>
	</table>
</div>