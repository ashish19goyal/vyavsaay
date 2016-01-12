<div id='form121' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form121_header'></form>
					<th>Program Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form121_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form121_header'></th>
					<th>Points</th>
					<th>Date</th>
					<th>Source</th>
					<th><input type='button' form='form121_header' value='Add points' class='generic_head_icon' onclick='form121_add_item();'>
						<input type='button' form='form121_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form121_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form121_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form121_prev' class='prev_icon' data-index='-25' onclick="$('#form121_index').attr('data-index',$(this).attr('data-index')); form121_ini();">
		<div style='display:hidden;' id='form121_index' data-index='0'></div>
		<img src='./images/next.png' id='form121_next' class='next_icon' data-index='25' onclick="$('#form121_index').attr('data-index',$(this).attr('data-index')); form121_ini();">
	</div>
</div>