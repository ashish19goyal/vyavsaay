<div id='form151' class='function_detail'>
	<form id='form151_master'>
		<fieldset>
			<label>Request Id<br><input type='text'></label>
			<label>Customer<br><textarea readonly="readonly"></textarea></label>
			<label>Expense Estimate<br>Rs. <input type='number' value='0' readonly="readonly"></label>
			<label>Total Expense<br>Rs. <input type='number' value='0' readonly="readonly"></label>
			<input type='button' title='Print' class='print_icon' onclick='form151_print_form($(this));'>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>

	<br>
	<b>Tasks</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form151_task_header'></form>
					<th>Task</th>
					<th>Est. Amount </th>
					<th>Actual Amount </th>
					<th>Status </th>
					<th></th>
			</tr>
		</thead>
		<tbody id='form151_task_body'>
		</tbody>
	</table>

	<br>
	<b>Service components</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form151_item_header'></form>
					<th>Item Name </th>
					<th>Quantity </th>
					<th>Amount </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form151_item_header' title='Add item' onclick='form151_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form151_item_body'>
		</tbody>
	</table>

	<br>
	<b>Other Expenses</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form151_expense_header'></form>
					<th>Person </th>
					<th>Amount </th>
					<th>Detail </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form151_expense_header' title='Add expense' onclick='form151_add_expense();'></th>
			</tr>
		</thead>
		<tbody id='form151_expense_body'>
		</tbody>
	</table>

</div>