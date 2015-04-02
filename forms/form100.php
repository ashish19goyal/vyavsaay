<div id='form100' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form100_header'></form>
					<th>Form Name<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form100_header'></th>
					<th>Select for syncing</th>
					<th><input type="button" title="Save All" class='save_icon' form='form100_header'>
					<input type='submit' form='form100_header' style='visibility: hidden;'></th>
					
			</tr>
		</thead>
		<tbody id='form100_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form100_prev' class='prev_icon' data-index='-25' onclick="$('#form100_index').attr('data-index',$(this).attr('data-index')); form100_ini();">
		<div style='display:hidden;' id='form100_index' data-index='0'></div>
		<img src='./images/next.png' id='form100_next' class='next_icon' data-index='25' onclick="$('#form100_index').attr('data-index',$(this).attr('data-index')); form100_ini();">
	</div>
</div>