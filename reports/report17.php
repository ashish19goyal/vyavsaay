<div class='reports'>
	<form id='report17_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			From date <input type='text'>
			To date <input type='text'>
			Staff Name <input type='text'>
			<input type='button' value='Refresh' onclick='report17_ini();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<th>Staff Name</th>
				<th>Number of Tasks</th>
				<th>Number of Task Hours</th>
				<th>Number of Absence</th>
				<th>Number of hours worked</th>
			</tr>
		</thead>
		<tbody id='report17_body'>
		</tbody>
	</table>
</div>