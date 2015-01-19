<div id='form120' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form120_header'></form>
					<th>Program Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form120_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form120_header'></th>
					<th>Tier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form120_header'></th>
					<th>Points</th>
					<th><input type='button' form='form120_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form120_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form120_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form120_prev' class='prev_icon' data-index='-25' onclick="$('#form120_index').attr('data-index',$(this).attr('data-index')); form120_ini();">
		<div style='display:hidden;' id='form120_index' data-index='0'></div>
		<img src='./images/next.png' id='form120_next' class='next_icon' data-index='25' onclick="$('#form120_index').attr('data-index',$(this).attr('data-index')); form120_ini();">
	</div>
</div>