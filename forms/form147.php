<div id='form147' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form147_header'></form>
					<th>Role <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form147_header'></th>
					<th>Description </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form147_header'></th>
					<th><input type='button' form='form147_header' value='Add new role' class='add_icon' onclick='form147_add_item();'>
						<input type='button' form='form147_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form147_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form147_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form147_prev' class='prev_icon' data-index='-25' onclick="$('#form147_index').attr('data-index',$(this).attr('data-index')); form147_ini();">
		<div style='display:hidden;' id='form147_index' data-index='0'></div>
		<img src='./images/next.png' id='form147_next' class='next_icon' data-index='25' onclick="$('#form147_index').attr('data-index',$(this).attr('data-index')); form147_ini();">
	</div>
</div>