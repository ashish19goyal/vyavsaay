<div id='report90' class='tab-pane'>
	<form id='report90_header' autocomplete="off">
		<fieldset>
			<!--<label style='background-color:#555;color:#fff;padding:5px;'>Pending Quantity<br><input type='number' step='any' style='font-weight:bold;' readonly='readonly' name='pending_count'></label>-->
			<!--<label>Channel<br><input type='text' name='channel'></label>-->
			<label>Order #<br><input type='text' name='order'></label>
			<label>Invoice #<br><input type='text' name='bill'></label>
			<label><input type='submit' name='refresh' value='Refresh' class='generic_icon'></label>
			<label><input type='button' name='print' title='Print visible data' class='print_icon'></label>
			<label><input type='button' title='Download Visible Data' class='csv_icon' name='csv'></label>			
			<label><input type='button' title='Download All Data' class='csv_red_icon' name='all_csv'></label>			
			</label>	
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report90_head'>
			<tr>
				<th style='width:40px;'>
					<input type='checkbox' id='report90_select_all'>
				</th>
				<th>Order</th>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th style='width:160px;'>Storage</th>
				<th><div class='report_result_count_selected'>20</div><div class='report_result_count'>50</div><div class='report_result_count'>100</div>
					<input type='button' class='generic_icon' title='Close Selected Pickings' value='Close All' id='report90_close_all_picks'>				
				</th>
			</tr>
		</thead>
		<tbody id='report90_body'>
		</tbody>
	</table>

	<div class='form_nav'>
		<img src='./images/previous.png' id='report90_prev' class='prev_icon' data-index='-25' onclick="$('#report90_index').attr('data-index',$(this).attr('data-index')); report90_ini();">
		<div style='display:hidden;' id='report90_index' data-index='0'></div>
		<img src='./images/next.png' id='report90_next' class='next_icon' data-index='25' onclick="$('#report90_index').attr('data-index',$(this).attr('data-index')); report90_ini();">
	</div>

</div>