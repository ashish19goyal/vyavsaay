<div id='form134' class='function_detail'>
	<form id='form134_master'>
		<fieldset>
			<label>Request Id<br><input type='text'></label>
			<label>Customer<br><textarea readonly="readonly"></textarea></label>
			<label>Status<br><input type='text' readonly="readonly"></label>
			<label><input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form134_detail_header'></form>
					<th>Reported By</th>
					<th>Reported Time</th>
					<th>Problem Type</th>
					<th>Problem </th>
					<th>Closing Notes </th>
			</tr>
		</thead>
		<tbody id='form134_detail_body'>
		</tbody>
	</table>

	<br>
	<b>Assigned tasks</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form134_task_header'></form>
					<th>Task</th>
					<th>Assignee </th>
					<th>Due By </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form134_task_header' title='Add task' onclick='form134_add_task();'></th>
			</tr>
		</thead>
		<tbody id='form134_task_body'>
		</tbody>
	</table>

	<br>
	<b>Affected Devices</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form134_machine_header'></form>
					<th>Machine Type</th>
					<th>Machine</th>
					<th>Problem</th>
					<th>Closing Notes</th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form134_machine_header' title='Add machine' onclick='form134_add_machine();'></th>
			</tr>
		</thead>
		<tbody id='form134_machine_body'>
		</tbody>
	</table>

	<br>
	<b>Servicing Documentation</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form134_document_header'></form>
					<th>Document Name</th>
					<th>File </th>
					<th><input type='button' class='add_icon' form='form134_document_header' title='Add document' onclick='form134_add_document();'></th>			
			</tr>
		</thead>
		<tbody id='form134_document_body'>
		</tbody>
	</table>

	<br>
	<b>Servicing Team</b>		
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form134_team_header'></form>
					<th>Assignee</th>
					<th>Phone</th>
					<th>Email</th>
					<th><input type='button' class='add_icon' form='form134_team_header' title='Add assignee' onclick='form134_add_team();'></th>
			</tr>
		</thead>
		<tbody id='form134_team_body'>
		</tbody>
	</table>
	
</div>