<div id='form79' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form79_header'></form>
					<th>Task <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form79_header'></th>
					<th>Description </th>
					<th>Estimated Hours </th>
					<th><input type='button' form='form79_header' value='Add task' class='add_icon' onclick='modal18_action();'>
						<input type='button' form='form79_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form79_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form79_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form79_prev' class='prev_icon' data-index='-25' onclick="$('#form79_index').attr('data-index',$(this).attr('data-index')); form79_ini();">
		<div style='display:hidden;' id='form79_index' data-index='0'></div>
		<img src='./images/next.png' id='form79_next' class='next_icon' data-index='25' onclick="$('#form79_index').attr('data-index',$(this).attr('data-index')); form79_ini();">
	</div>
</div>