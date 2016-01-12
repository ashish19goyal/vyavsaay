<div id='form165' class='function_detail'>
	<form id='form165_master' autocomplete="off">
		<fieldset>
			<label style='background-color:#555;color:#fff;padding:5px;'>Pending Quantity<br><input type='number' step='any' style='font-weight:bold;' readonly='readonly' name='pending_count'></label>
			<label>SKU<br><input type='text' name='sku'></label>
			<label>Batch<br><input type='text' name='batch'></label>
			<label>	
				<input type='submit' name='refresh' value='Refresh' class='generic_icon'>
				<input type='button' name='print' title='Print' class='print_icon'>
			</label>
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>

	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form165_header'></form>
					<th>SKU </th>
					<th>Batch </th>
					<th>Quantity </th>
					<th>Storage </th>
					<th></th>
			</tr>
		</thead>
		<tbody id='form165_body'>
		</tbody>
	</table>
</div>