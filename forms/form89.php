<div id='form89' class='function_detail'>
	<input type='button' value='Switch view' class='generic_icon' onclick='form89_switch_view();'>
	<div id="form89_calendar" style="max-width:900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form89_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header'></th>
					<th>Assignee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header'></th>
					<th>Schedule</th>
					<th>Notes</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header'></th>
					<th><input type='button' form='form89_header' title='Add appointment' class='add_icon' onclick='form89_add_item();'>
						<input type='button' form='form89_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form89_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form89_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form89_prev' class='prev_icon' data-index='-25' onclick="$('#form89_index').attr('data-index',$(this).attr('data-index')); form89_ini();">
		<div style='display:hidden;' id='form89_index' data-index='0'></div>
		<img src='./images/next.png' id='form89_next' class='next_icon' data-index='25' onclick="$('#form89_index').attr('data-index',$(this).attr('data-index')); form89_ini();">
	</div>
</div>