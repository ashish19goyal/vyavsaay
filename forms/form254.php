<div id='form254' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form254_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form254_header'></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form254_header'></th>
					<th><input type='button' form='form254_header' title='Add new' class='add_icon' onclick='form254_add_item();'>
						<input type='button' form='form254_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form254_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form254_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form254_prev' class='prev_icon' data-index='-25' onclick="$('#form254_index').attr('data-index',$(this).attr('data-index')); form254_ini();">
		<div style='display:hidden;' id='form254_index' data-index='0'></div>
		<img src='./images/next.png' id='form254_next' class='next_icon' data-index='25' onclick="$('#form254_index').attr('data-index',$(this).attr('data-index')); form254_ini();">
	</div>
</div>