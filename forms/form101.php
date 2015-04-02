<div id='form101' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form101_header'></form>
					<th>Project Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form101_header'></th>
					<th>Details</th>
					<th>Start Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form101_header'></th>
					<th><input type="button" value='Add new project' class='add_icon' form='form101_header' onclick="form101_add_item();">
						<input type='button' form='form101_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form101_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form101_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form101_prev' class='prev_icon' data-index='-25' onclick="$('#form101_index').attr('data-index',$(this).attr('data-index')); form101_ini();">
		<div style='display:hidden;' id='form101_index' data-index='0'></div>
		<img src='./images/next.png' id='form101_next' class='next_icon' data-index='25' onclick="$('#form101_index').attr('data-index',$(this).attr('data-index')); form101_ini();">
	</div>
</div>