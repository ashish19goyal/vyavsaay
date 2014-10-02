<div class='forms'><b>Generate service receipt</b>
	<form id='form10_master'>
		<fieldset>
			Customer <input type='text'>
			Bill Date <input type='text'>
			Total Amount<input type='text'>
			<input type='hidden' value=''>
			<input type='button' value='Save receipt' onclick='form10_save_form();'>
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