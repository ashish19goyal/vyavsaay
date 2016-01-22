<div id='report58' class='tab-pane'>
	<form id='report58_header' autocomplete="off">
		<fieldset>
			<label>Account<br><input type='text' required></label>
			<label>Start Date<br><input type='text' required></label>
			<label>End Date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Add ledger entry' class='generic_icon' value='Add Ledger Entry' onclick='modal106_action();'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Date</th>
				<th>Particulars</th>
				<th>Debit</th>
				<th>Credit</th>
				<th>Balance</th>
			</tr>
		</thead>
		<tbody id='report58_body'>
		</tbody>
	</table>
</div>