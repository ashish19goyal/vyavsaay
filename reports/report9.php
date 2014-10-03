<div class='reports'>
	<form id='report9_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Product Name <input type='text'>
			Product Make <input type='text'>
			Product Type <input type='text'>
			Customer Name<input type='text'>
			Date Since <input type='text'>
			<input type='button' value='Refresh' onclick='report9_ini();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Product Make</th>
				<th>Product Type</th>
				<th>Customer</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody id='report9_body'>
		</tbody>
	</table>
</div>