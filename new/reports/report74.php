<div id='report74' class='tab-pane'>
	<form id='report74_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' name='customer'></label>
			<label>Start Date<br><input type='text' required name='start'></label>
			<label>End Date<br><input type='text' required name='end'></label>
			<label>
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Order #</th>
				<th>Rating</th>
				<th>Comments</th>
			</tr>
		</thead>
		<tbody id='report74_body'>
		</tbody>
	</table>
</div>