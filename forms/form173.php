<div id='form173' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form173_header'></form>
					<th>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form173_header'></th>
					<th>Channel SKU <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form173_header'></th>
					<th>Channel-business SKU <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form173_header'></th>
					<th>System SKU <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form173_header'></th>
					<th><input type='button' form='form173_header' title='Add new mapping' class='add_icon' onclick='form173_add_item();'>
						<input type='button' form='form173_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form173_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form173_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form173_prev' class='prev_icon' data-index='-25' onclick="$('#form173_index').attr('data-index',$(this).attr('data-index')); form173_ini();">
		<div style='display:hidden;' id='form173_index' data-index='0'></div>
		<img src='./images/next.png' id='form173_next' class='next_icon' data-index='25' onclick="$('#form173_index').attr('data-index',$(this).attr('data-index')); form173_ini();">
	</div>
</div>