<div id='form137' class='tab-pane'>
	<form id='form137_master' autocomplete="off">
		<fieldset>
			<label>Project Name<br><input type='text' name='name' required></label>
			<label>Total Expense<br><input type='text' name='expense' required></label>
			<label>Total Approved<br><input type='text' name='approved' required></label>
			<label>	<input type='hidden' name='id' form='form137_master'></label>
			<label>	<input type='button' onclick='form137_ini();' value='Refresh' name='refresh' class='generic_icon'></label>
			<label>	<input type='button' onclick='form137_print();' title='Print' name='print' class='print_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>			
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form137_header'></form>
					<th>Person </th>
					<th>Amount</th>
					<th>Details</th>
					<th>Date </th>
					<th>Status </th>
					<th><input type="button" value='Add new expense' class='add_icon' form='form137_header' onclick="form137_add_item();">
						<input type='button' form='form137_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form137_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form137_body'>
		</tbody>
	</table>
</div>