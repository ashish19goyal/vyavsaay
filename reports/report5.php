<div id='report5' class='function_detail'>
	<form id='report5_header'>
		<fieldset>
			<legend>Select Filters</legend>
			Min balance amount <input type='number' value='0' required title='Customers with balance more than this amount will be shown'>
			Customer <input type='text' title='If this field is blank, all applicable customers will be shown'>
			<input type='submit' value='Refresh'>
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