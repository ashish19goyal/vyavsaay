<div id='form165' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form165_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form165_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form165_header'></th>
					<th>Quantity </th>
					<th>Storage </th>
					<th>
						<input type='button' form='form165_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form165_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form165_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form165_prev' class='prev_icon' data-index='-25' onclick="$('#form165_index').attr('data-index',$(this).attr('data-index')); form165_ini();">
		<div style='display:hidden;' id='form165_index' data-index='0'></div>
		<img src='./images/next.png' id='form165_next' class='next_icon' data-index='25' onclick="$('#form165_index').attr('data-index',$(this).attr('data-index')); form165_ini();">
	</div>
</div>