<div id='report9' class='function_detail'>
	<form id='report9_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Product Name <input type='text'>
			Make <input type='text'>
			Type <input type='text'>
			Customer <input type='text'>
			Date Since <input type='text'>
			<input type='button' value='Refresh' onclick='report9_ini();'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Make</th>
				<th>Type</th>
				<th>Customer</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody id='report9_body'>
		</tbody>
	</table>
</div>