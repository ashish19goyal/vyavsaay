<div id='report90' class='function_detail'>
	<form id='report90_header' autocomplete="off">
		<fieldset>
			<label style='background-color:#555;color:#fff;padding:5px;'>Pending Quantity<br><input type='number' step='any' style='font-weight:bold;' readonly='readonly' name='pending_count'></label>
			<label>Channel<br><input type='text' name='channel'></label>
			<label>Order #<br><input type='text' name='order'></label>
			<label>Invoice #<br><input type='text' name='bill'></label>
			<label>
				<input type='submit' name='refresh' value='Refresh' class='generic_icon'>
				<input type='button' name='print' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report90_head'>
			<tr>
				<th>Order</th>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th style='width:160px;'>Storage</th>
				<th></th>
			</tr>
		</thead>
		<tbody id='report90_body'>
		</tbody>
	</table>
</div>