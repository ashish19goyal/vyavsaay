<div id='form244' class='tab-pane'>
	<form id='form244_master' autocomplete="off">
		<fieldset>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000' required name='storage'></label>
			<label>Total Quantity Scanned:	<input type='number' step='1' readonly='readonly' name='q_scanned'></label>
			<label><input type='button' name='save' class='generic_icon' value='Add to Stock'></label>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form244_head'>
			<tr>
				<form id='form244_header'></form>
					<th>Barcode</th>
					<th>Item</th>
					<th>Batch</th>					
					<th>Quantity</th>					
					<th><input type='button' form='form244_header' title='Add item' class='add_icon' onclick='form244_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form244_body'>
		</tbody>
	</table>
</div>