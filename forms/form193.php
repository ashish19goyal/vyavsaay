<div id='form193' class='tab-pane'>
	<form id='form193_master' autocomplete="off">
		<fieldset>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000' required name='storage'></label>
			<label>Total Quantity Scanned:	<input type='number' step='1' readonly='readonly' name='q_scanned'></label>
			<label><input type='button' name='save' class='generic_icon' value='Update Stock'></label>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form193_head'>
			<tr>
				<form id='form193_header'></form>
					<th>Barcode</th>
					<th>Item</th>
					<th>Batch</th>					
					<th>Quantity</th>					
					<th><input type='button' form='form193_header' title='Add item' class='add_icon' onclick='form193_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form193_body'>
		</tbody>
	</table>
</div>