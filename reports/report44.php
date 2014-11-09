<div id='report44' class='function_detail'>
	<form id='report44_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Product Name <input type='text' required>
			Maximum results<input type='number' required value='5'>
			<input type='button' value='Refresh' onclick='report44_ini();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Description</th>
				<th>Picture</th>
				<th>Price</th>
				<th>Link</th>
			</tr>
		</thead>
		<tbody id='report44_body'>
		</tbody>
	</table>
</div>