<div id='report87' class='tab-pane'>
	<form id='report87_header' autocomplete="off">
		<fieldset>
			<label>Person<br><input type='text' name='person'></label>
			<label>Start Date<br><input type='text' name='start' required></label>
			<label>End Date<br><input type='text' name='end' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Person</th>
				<th>Date</th>
				<th>Kms</th>
			</tr>
		</thead>
		<tbody id='report87_body'>
		</tbody>
		<tbody id='report87_foot'>
		</tbody>
	</table>
</div>