<div id='form261' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form261_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form261_header'></th>
					<th>Bank <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form261_header'></th>
					<th>Account</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form261_header'></th>
					<th><input type='button' form='form261_header' title='Add new' class='add_icon' onclick='form261_add_item();'>
						<input type='button' form='form261_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form261_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form261_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form261_prev' class='prev_icon' data-index='-25' onclick="$('#form261_index').attr('data-index',$(this).attr('data-index')); form261_ini();">
		<div style='display:hidden;' id='form261_index' data-index='0'></div>
		<img src='./images/next.png' id='form261_next' class='next_icon' data-index='25' onclick="$('#form261_index').attr('data-index',$(this).attr('data-index')); form261_ini();">
	</div>
</div>