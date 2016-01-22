<div id='form135' class='tab-pane'>
	<form id='form135_master' autocomplete="off">
		<fieldset>
			<label>Project Name<br><input type='text'></label>
			<label>Description<br><textarea readonly="readonly"></textarea></label>
			<label>Status<br><input type='text' readonly="readonly"></label>
			<label>	<input type='hidden' name='id'>	</label>
			<label>	<input type='button' title='Save' class='save_icon'></label>
			<label>	<input type='button' title='Add project phase' class='add_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<br>
	<b>Tasks</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_task_header'></form>
					<th>Phase</th>
					<th>Task</th>
					<th>Assignee </th>
					<th>Due By </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form135_task_header' title='Add task' onclick='form135_add_task();'></th>
			</tr>
		</thead>
		<tbody id='form135_task_body'>
		</tbody>
	</table>
	
	<br>
	<b>Documents</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_document_header'></form>
					<th>Document Name</th>
					<th>File </th>
					<th><input type='button' class='add_icon' form='form135_document_header' title='Add document' onclick='form135_add_document();'></th>			
			</tr>
		</thead>
		<tbody id='form135_document_body'>
		</tbody>
	</table>

	<br>
	<b>Team</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_team_header'></form>
					<th>Member</th>
					<th>Role</th>
					<th>Notes</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form135_team_header' title='Add member' onclick='form135_add_team();'></th>
			</tr>
		</thead>
		<tbody id='form135_team_body'>
		</tbody>
	</table>

	<br>
	<b>Schedule</b>
	<div id='form135_gantt' style="height:400px;"></div>

</div>