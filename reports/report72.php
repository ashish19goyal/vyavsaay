<div id='report72' class='function_detail'>
	<form id='report72_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Customer<br><input type='text'></label>
			<label>Address<br><input type='text'></label>
			<label>Status<br><input type='text'></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Details</th>
				<th>Amount</th>
				<th>Address</th>
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id='report72_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report72_prev' class='prev_icon' data-index='-25' onclick="$('#report72_index').attr('data-index',$(this).attr('data-index')); report72_ini();">
		<div style='display:hidden;' id='report72_index' data-index='0'></div>
		<img src='./images/next.png' id='report72_next' class='next_icon' data-index='25' onclick="$('#report72_index').attr('data-index',$(this).attr('data-index')); report72_ini();">
	</div>
</div>