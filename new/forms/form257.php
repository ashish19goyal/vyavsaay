<div id='form257' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form257_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Username <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Password</th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th><input type='button' form='form257_header' title='Add new' class='add_icon' onclick='form257_add_item();'>
						<input type='button' form='form257_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form257_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form257_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form257_prev' class='prev_icon' data-index='-25' onclick="$('#form257_index').attr('data-index',$(this).attr('data-index')); form257_ini();">
		<div style='display:hidden;' id='form257_index' data-index='0'></div>
		<img src='./images/next.png' id='form257_next' class='next_icon' data-index='25' onclick="$('#form257_index').attr('data-index',$(this).attr('data-index')); form257_ini();">
	</div>
</div>