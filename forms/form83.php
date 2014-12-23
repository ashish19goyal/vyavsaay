<div id='form83' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form83_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form83_header'></th>
					<th>Dimensions </th>
					<th>Location </th>
					<th>Facing </th>
					<th><input type='button' form='form83_header' value='Add item' class='add_icon' onclick='modal35_action();'>
						<input type='button' form='form83_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form83_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form83_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form83_prev' class='prev_icon' data-index='-25' onclick="$('#form83_index').attr('data-index',$(this).attr('data-index')); form83_ini();">
		<div style='display:hidden;' id='form83_index' data-index='0'></div>
		<img src='./images/next.png' id='form83_next' class='next_icon' data-index='25' onclick="$('#form83_index').attr('data-index',$(this).attr('data-index')); form83_ini();">
	</div>
</div>