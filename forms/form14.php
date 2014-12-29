<div id='form14' class='function_detail'>
	<input type='button' value='Switch view' class='generic_icon' onclick='form14_switch_view();'>
	<div id="form14_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form14_header'></form>
					<th>Task <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header'></th>
					<th>Assignee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header'></th>
					<th>Due Time </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header'></th>
					<th><input type='button' form='form14_header' value='Add task' class='add_icon' onclick='form14_add_item();'>
						<input type='button' form='form14_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form14_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form14_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form14_prev' class='prev_icon' data-index='-25' onclick="$('#form14_index').attr('data-index',$(this).attr('data-index')); form14_ini();">
		<div style='display:hidden;' id='form14_index' data-index='0'></div>
		<img src='./images/next.png' id='form14_next' class='next_icon' data-index='25' onclick="$('#form14_index').attr('data-index',$(this).attr('data-index')); form14_ini();">
	</div>
</div>