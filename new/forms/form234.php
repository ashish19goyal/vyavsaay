<div id='form234' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form234_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form234_header'></th>
					<th>Make <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form234_header'></th>
					<th>Description</th>
					<th>Details</th>
					<th><input type='button' form='form234_header' title='Add new product' class='add_icon'>
						<input type='button' form='form234_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form234_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form234_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form234_prev' class='prev_icon' data-index='-25' onclick="$('#form234_index').attr('data-index',$(this).attr('data-index')); form234_ini();">
		<div style='display:hidden;' id='form234_index' data-index='0'></div>
		<img src='./images/next.png' id='form234_next' class='next_icon' data-index='25' onclick="$('#form234_index').attr('data-index',$(this).attr('data-index')); form234_ini();">
	</div>
</div>