<div id='form293' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form293_header'></form>
					<th>Username <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form293_header'></th>
					<th>Contact Person <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form293_header'></th>
					<th>Contact Details</th>
					<th>DB <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form293_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form293_header'></th>
					<th><input type='button' form='form293_header' title='Add new' class='add_icon' onclick='form293_add_item();'>
						<input type='button' form='form293_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form293_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form293_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form293_prev' class='prev_icon' data-index='-25' onclick="$('#form293_index').attr('data-index',$(this).attr('data-index')); form293_ini();">
		<div style='display:hidden;' id='form293_index' data-index='0'></div>
		<img src='./images/next.png' id='form293_next' class='next_icon' data-index='25' onclick="$('#form293_index').attr('data-index',$(this).attr('data-index')); form293_ini();">
	</div>
</div>