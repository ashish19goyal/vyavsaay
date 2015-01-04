<div id='form111' class='function_detail'>
	<form id='form111_master'>
		<fieldset>
			<label>Report Name</br><input type='text' required></label>
			<label>Description</br><textarea></textarea></label>
			<input type='hidden' name='report_id'>
			<input type='button' title='New Report' class='add_icon' onclick='form111_new_form();'>
			<input type='submit' title='Save Report' class='save_icon'>
			<input type='button' value='Generate' class='generic_icon' onclick="form111_generate(document.getElementById('form111_master').elements[3].value);">
			</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form111_header'></form>
				<th>Table</th>
				<th>Field</th>
				<th>Condition</th>
				<th>Condition Table</th>
				<th>Condition Field</th>
				<th>Condition Value</th>
				<th><input type='button' form='form111_header' title='Add item' class='add_icon' onclick='form111_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form111_body'>
		</tbody>
	</table>
</div>