<div id='form220' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form220_header'></form>
					<th>Project Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form220_header'></th>
					<th>Details</th>
					<th>Priority</th>
					<th>Start Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form220_header'></th>
					<th><input type="button" value='Add new project' class='add_icon' form='form220_header' onclick="form220_add_item();">
						<input type='button' form='form220_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form220_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form220_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form220_prev' class='prev_icon' data-index='-25' onclick="$('#form220_index').attr('data-index',$(this).attr('data-index')); form220_ini();">
		<div style='display:hidden;' id='form220_index' data-index='0'></div>
		<img src='./images/next.png' id='form220_next' class='next_icon' data-index='25' onclick="$('#form220_index').attr('data-index',$(this).attr('data-index')); form220_ini();">
	</div>
</div>