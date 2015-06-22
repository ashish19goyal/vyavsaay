<div id='form185' class='function_detail'>
<input type='button' value='Switch view' class='generic_icon' onclick='form185_switch_view();'>
	<div id="form185_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form185_header'></form>
					<th>Task</th>
					<th>Details</th>
					<th>Assignee</th>
					<th>Due Time</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form185_header' title='Add task' onclick="modal117_action('production');">
					</th>
			</tr>
		</thead>
		<tbody id='form185_body'>
		</tbody>
	</table>
	<div id='form185_nav' class='form_nav'>
		<img src='./images/previous.png' id='form185_prev' class='prev_icon' data-index='-25' onclick="$('#form185_index').attr('data-index',$(this).attr('data-index')); form185_ini();">
		<div style='display:hidden;' id='form185_index' data-index='0'></div>
		<img src='./images/next.png' id='form185_next' class='next_icon' data-index='25' onclick="$('#form185_index').attr('data-index',$(this).attr('data-index')); form185_ini();">
	</div>
</div>