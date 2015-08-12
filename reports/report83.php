<div id='report83' class='function_detail'>
	<form id='report83_header' autocomplete="off">
		<fieldset>
			<legend>Select Filters</legend>
			<label>Test ID<br><input type='text' name='test'></label>
			<label>Item<br><input type='text' name='name'></label>
			<label>Result<br><input type='text' name='result'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Test ID</th>
				<th>Item</th>
				<th>Result</th>
				<th>Details</th>
				<th>Documents</th>
			</tr>
		</thead>
		<tbody id='report83_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report83_prev' class='prev_icon' data-index='-25' onclick="$('#report83_index').attr('data-index',$(this).attr('data-index')); report83_ini();">
		<div style='display:hidden;' id='report83_index' data-index='0'></div>
		<img src='./images/next.png' id='report83_next' class='next_icon' data-index='25' onclick="$('#report83_index').attr('data-index',$(this).attr('data-index')); report83_ini();">
	</div>
</div>