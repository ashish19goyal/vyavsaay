<div id='report9' class='tab-pane'>
	<form id='report9_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text'></label>
			<label>Brand<br><input type='text'></label>
			<label>Customer<br><input type='text'></label>
			<label>Start Date<br><input type='text' required></label>
			<label>End Date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Item</th>
				<th>Brand</th>
				<th>Customer</th>
				<th>Quantity</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody id='report9_body'>
		</tbody>
		<tfoot id='report9_foot'>
		</tfoot>
	</table>
</div>