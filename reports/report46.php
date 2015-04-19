<div id='report46' class='function_detail'>
	<form id='report46_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Min balance amount </br><input type='number' value='0' required title='Suppliers with balance more than this amount will be shown'></label>
			<label>Supplier </br><input type='text' title='If this field is blank, all applicable suppliers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Supplier </th>
				<th>Account Balance </th>
				<th>Bill Ids </th>
			</tr>
		</thead>
		<tbody id='report46_body'>
		</tbody>
		<tfoot id='report46_foot'>
		</tfoot>
	</table>
</div>