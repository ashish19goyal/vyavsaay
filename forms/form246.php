<div id='form246' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form246_header'></form>
					<th>Zone <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form246_header'></th>
					<th>Description</th>
					<th><input type="button" value='Add Zone' form='form246_header' class='add_icon' onclick="form246_add_item();">
						<input type='button' form='form246_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form246_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form246_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form246_prev' class='prev_icon' data-index='-25' onclick="$('#form246_index').attr('data-index',$(this).attr('data-index')); form246_ini();">
		<div style='display:hidden;' id='form246_index' data-index='0'></div>
		<img src='./images/next.png' id='form246_next' class='next_icon' data-index='25' onclick="$('#form246_index').attr('data-index',$(this).attr('data-index')); form246_ini();">
	</div>
</div>