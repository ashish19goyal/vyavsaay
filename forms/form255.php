<div id='form255' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form255_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form255_header'></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form255_header'></th>
					<th><input type='button' form='form255_header' title='Add new' class='add_icon' onclick='form255_add_item();'>
						<input type='button' form='form255_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form255_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form255_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form255_prev' class='prev_icon' data-index='-25' onclick="$('#form255_index').attr('data-index',$(this).attr('data-index')); form255_ini();">
		<div style='display:hidden;' id='form255_index' data-index='0'></div>
		<img src='./images/next.png' id='form255_next' class='next_icon' data-index='25' onclick="$('#form255_index').attr('data-index',$(this).attr('data-index')); form255_ini();">
	</div>
</div>