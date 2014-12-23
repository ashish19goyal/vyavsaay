<div id='form30' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form30_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header'></th>
					<th>Phone <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header'></th>
					<th>Email <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header'></th>
					<th>Address</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header'></th>
					<th><input type='button' form='form30_header' value='Add item' class='add_icon' onclick='modal11_action();'>
						<input type='button' form='form30_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form30_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form30_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form30_prev' class='prev_icon' data-index='-25' onclick="$('#form30_index').attr('data-index',$(this).attr('data-index')); form30_ini();">
		<div style='display:hidden;' id='form30_index' data-index='0'></div>
		<img src='./images/next.png' id='form30_next' class='next_icon' data-index='25' onclick="$('#form30_index').attr('data-index',$(this).attr('data-index')); form30_ini();">
	</div>
</div>