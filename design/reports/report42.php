<div id='report42' class='function_detail'>
	<form id='report42_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' name='customer'></label>
			<label>Start Date<br><input type='text' name='start'></label>
			<label>End Date<br><input type='text' name='end'></label>
			<label>
				<input type='button' value='Refresh' name='refresh' onclick='report42_ini();' class='generic_icon'>
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
		<tbody id='report42_body'>
		</tbody>
	</table>
</div>