<div id='report92' class='tab-pane'>
	<form id='report92_header' autocomplete="off">
		<fieldset>
			<label>Order #<br><input type='text' name='awb'></label>
			<label>	
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Order #</th>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Order Qty</th>
				<th>Pending Qty</th>
			</tr>
		</thead>
		<tbody id='report92_body'>
		</tbody>
	</table>
</div>