<div id='form141' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form141_header'></form>
					<th>Order No. <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form141_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form141_header'></th>
					<th>Schedule</th>
					<th>Assignee</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form141_header'></th>
					<th>
						<input type='button' form='form141_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form141_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form141_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form141_prev' class='prev_icon' data-index='-25' onclick="$('#form141_index').attr('data-index',$(this).attr('data-index')); form141_ini();">
		<div style='display:hidden;' id='form141_index' data-index='0'></div>
		<img src='./images/next.png' id='form141_next' class='next_icon' data-index='25' onclick="$('#form141_index').attr('data-index',$(this).attr('data-index')); form141_ini();">
	</div>
</div>