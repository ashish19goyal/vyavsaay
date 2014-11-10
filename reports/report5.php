<div id='report5' class='function_detail'>
	<form id='report5_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Min balance amount <input type='text'>
			Customer <input type='text'>
			<input type='button' value='Refresh' onclick='report5_ini();'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer </th>
				<th>Account Balance </th>
				<th>Bill Ids </th>
			</tr>
		</thead>
		<tbody id='report5_body'>
		</tbody>
	</table>
</div>