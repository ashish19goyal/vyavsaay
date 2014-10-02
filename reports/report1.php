<div class='reports'>
	<form id='report1_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Date Since <input type='text'>
			Product <input type='text'>
			<input type='button' value='Refresh' onclick='report1_ini();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<th>Product </th>
				<th>Batch </th>
				<th>Store Area </th>
				<th>Type </th>
				<th>Detail</th>
			</tr>
		</thead>
		<tbody id='report1_body'>
		</tbody>
	</table>
</div>