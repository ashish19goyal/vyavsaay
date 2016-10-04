<div id='form116' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form116_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form116_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form116_header'></th>
					<th>Tier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form116_header'></th>
					<th>Details</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form116_header'></th>
					<th><input type='button' form='form116_header' value='Add item' class='add_icon' onclick='modal45_action();'>
						<input type='button' form='form116_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form116_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form116_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form116_prev' class='prev_icon' data-index='-25' onclick="$('#form116_index').attr('data-index',$(this).attr('data-index')); form116_ini();">
		<div style='display:hidden;' id='form116_index' data-index='0'></div>
		<img src='./images/next.png' id='form116_next' class='next_icon' data-index='25' onclick="$('#form116_index').attr('data-index',$(this).attr('data-index')); form116_ini();">
	</div>
</div>