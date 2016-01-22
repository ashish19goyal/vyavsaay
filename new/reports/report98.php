<div id='report98' class='tab-pane'>
	<form id='report98_header' autocomplete="off">
		<fieldset>
			<label>Source<br><input type='text' name='source'></label>
			<label>Status<br><input type='text' name='status'></label>
			<label>Keyword<br><input type='text' name='keyword'></label>
			<br><label>Start Date<br><input type='text' name='start'></label>
			<label>End Date<br><input type='text' name='end'></label>
			<label><input type='submit' class='generic_icon' value='Refresh'></label>
			<label><input type='button' title='Download data' class='csv_icon' name='csv'></label>			
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Source</th>
				<th>Data</th>
				<th>Date</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody id='report98_body'>
		</tbody>
	</table>

	<div class='form_nav'>
		<img src='./images/previous.png' id='report98_prev' class='prev_icon' data-index='-25' onclick="$('#report98_index').attr('data-index',$(this).attr('data-index')); report98_ini();">
		<div style='display:hidden;' id='report98_index' data-index='0'></div>
		<img src='./images/next.png' id='report98_next' class='next_icon' data-index='25' onclick="$('#report98_index').attr('data-index',$(this).attr('data-index')); report98_ini();">
	</div>

</div>