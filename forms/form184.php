<div id='form184' class='tab-pane'>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form184_header'></form>
					<th>Order </th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form184_header'></th>
					<th>Details </th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form184_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form184_header'></th>
					<th>
						<input type='button' form='form184_header' title='Add new step' class='add_icon' onclick='form184_add_item();'>
						<input type='button' form='form184_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form184_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form184_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form184_prev' class='prev_icon' data-index='-25' onclick="$('#form184_index').attr('data-index',$(this).attr('data-index')); form184_ini();">
		<div style='display:hidden;' id='form184_index' data-index='0'></div>
		<img src='./images/next.png' id='form184_next' class='next_icon' data-index='25' onclick="$('#form184_index').attr('data-index',$(this).attr('data-index')); form184_ini();">
	</div>
</div>