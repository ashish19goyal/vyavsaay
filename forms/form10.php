<div id='form10' class='function_detail'><b>Generate service receipt</b>
	<form id='form10_master'>
		<fieldset>
			Customer <input type='text' required>
			Bill Date <input type='text' required>
			Total Amount<input type='text' required>
			<input type='hidden' value=''>
			<input type='submit' value='Save receipt'>
			<input type='button' value='Discard receipt' onclick='form10_delete_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form10_header'></form>
					<th>Service</th>
					<th>Estimated Cost</th>
					<th>Actual Cost</th>
					<th>Instructions</th>
					<th>Assigned To</th>
					<th><input type='button' form='form10_header' value='Add service' onclick='form10_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form10_body'>
		</tbody>
	</table>
</div>