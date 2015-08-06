<div id='report69' class='function_detail'>
	<form id='report69_header' autocomplete="off">
		<fieldset>
			<legend>Select Filters</legend>
			<label>Project<br><input type='text' name='project'></label>
			<label>Staff<br><input type='text' name='staff'></label>
			<label>Keywords<br><input type='text' name='key'></label>
			<label>From Date<br><input type='text' name='from' required></label>
			<label>To Date<br><input type='text' name='to' required></label>
			<label>
				<input type='hidden' name='project_id'>
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Staff</th>
				<th>Detail</th>
				<th>Amount</th>
				<th>Date</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody id='report69_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report69_prev' class='prev_icon' data-index='-25' onclick="$('#report69_index').attr('data-index',$(this).attr('data-index')); report69_ini();">
		<div style='display:hidden;' id='report69_index' data-index='0'></div>
		<img src='./images/next.png' id='report69_next' class='next_icon' data-index='25' onclick="$('#report69_index').attr('data-index',$(this).attr('data-index')); report69_ini();">
	</div>
</div>