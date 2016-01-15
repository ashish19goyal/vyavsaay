<div id='form175' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form175_header'></form>
					<th>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form175_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form175_header'></th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form175_header'></th>
					<th>Parent <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form175_header'></th>
					<th>Commission </th>
					<th><input type='button' form='form175_header' title='Add new' class='add_icon' onclick='form175_add_item();'>
						<input type='button' form='form175_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form175_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form175_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form175_prev' class='prev_icon' data-index='-25' onclick="$('#form175_index').attr('data-index',$(this).attr('data-index')); form175_ini();">
		<div style='display:hidden;' id='form175_index' data-index='0'></div>
		<img src='./images/next.png' id='form175_next' class='next_icon' data-index='25' onclick="$('#form175_index').attr('data-index',$(this).attr('data-index')); form175_ini();">
	</div>
</div>