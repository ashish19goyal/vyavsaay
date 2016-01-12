<div id='report81' class='function_detail'>
	<form id='report81_header' autocomplete="off">
		<fieldset>
			<label>Staff<br><input type='text' name='staff' required></label>
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
				<th>Requirement</th>
				<th>Follow-ups</th>
				<th>Next Follow up</th>
			</tr>
		</thead>
		<tbody id='report81_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report81_prev' class='prev_icon' data-index='-25' onclick="$('#report81_index').attr('data-index',$(this).attr('data-index')); report81_ini();">
		<div style='display:hidden;' id='report81_index' data-index='0'></div>
		<img src='./images/next.png' id='report81_next' class='next_icon' data-index='25' onclick="$('#report81_index').attr('data-index',$(this).attr('data-index')); report81_ini();">
	</div>
</div>