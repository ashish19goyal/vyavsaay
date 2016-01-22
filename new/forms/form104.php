<div id='form104' class='tab-pane'>
<input type='button' value='Switch view' class='generic_icon' onclick='form104_switch_view();'>
	<form id='form104_master' autocomplete="off">
		<fieldset>
			<label>Project Name <input type='text' required></label>
				<input type='hidden' name='project_id'>
				<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<div id="form104_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form104_header'></form>
					<th>Phase</th>
					<th>Task</th>
					<th>Assignee</th>
					<th>Due Time</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form104_header' title='Add task' onclick="modal43_action('',document.getElementById('form104_master').elements[2].value);"></th>
			</tr>
		</thead>
		<tbody id='form104_body'>
		</tbody>
	</table>
</div>