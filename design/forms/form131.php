<div id='form131' class='function_detail'>
	<input type='button' value='Switch view' class='generic_icon' onclick='form131_switch_view();'>
	<div id="form131_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form131_header'></form>
					<th>Task <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form131_header'></th>
					<th>Assignee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form131_header'></th>
					<th>Due Time </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form131_header'></th>
					<th><input type='button' form='form131_header' value='Add task' class='add_icon' onclick='modal32_action();'>
						<input type='button' form='form131_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form131_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form131_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form131_prev' class='prev_icon' data-index='-25' onclick="$('#form131_index').attr('data-index',$(this).attr('data-index')); form131_ini();">
		<div style='display:hidden;' id='form131_index' data-index='0'></div>
		<img src='./images/next.png' id='form131_next' class='next_icon' data-index='25' onclick="$('#form131_index').attr('data-index',$(this).attr('data-index')); form131_ini();">
	</div>
</div>