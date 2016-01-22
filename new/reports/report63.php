<div id='report63' class='tab-pane'>
	<form id='report63_header' autocomplete="off">
		<fieldset>
			<label>SKU<br><input type='text' name='sku'></label>
			<label>Item Name<br><input type='text' name='item_name'></label>
			<label>	
				<input type='submit' name='refresh' value='Refresh' class='generic_icon'>
				<input type='button' name='print' title='Print' class='print_icon'>
			</label>
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report63_head'>
			<tr>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th style='width:250px;'>Storage</th>
			</tr>
		</thead>
		<tbody id='report63_body'>
		</tbody>
	</table>
</div>