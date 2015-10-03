<div id='report90' class='function_detail'>
	<form id='report90_header' autocomplete="off">
		<fieldset>
			<label>Channel<br><input type='text' name='channel'></label>
			<label>Order #<br><input type='text' name='order'></label>
			<label>Invoice #<br><input type='text' name='bill'></label>
			<label>
				<input type='submit' name='refresh' value='Refresh' class='generic_icon'>
				<input type='button' name='print' title='Print' class='print_icon'>
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