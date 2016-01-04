<div id='form148' class='function_detail'>
	<form id='form148_master' autocomplete="off">
		<fieldset>
			<label>Role<br><input type='text' required name='role'></label>
			<label>	<input type='hidden' name='id'></label>
			<label>	<input type='button' title='Save Role' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Add permission' class='add_icon' name='add' onclick='form148_add_item();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>	
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
		<tbody id='form148_body'>
		</tbody>
	</table>
</div>