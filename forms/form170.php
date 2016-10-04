<div id='form170' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form170_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form170_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form170_header'></th>					
					<th>Parent <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form170_header'></th>
					<th>Details </th>
					<th><input type='button' form='form170_header' value='Add Storage' class='add_icon' onclick='modal113_action();'>
						<input type='button' form='form170_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form170_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form170_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form170_prev' class='prev_icon' data-index='-25' onclick="$('#form170_index').attr('data-index',$(this).attr('data-index')); form170_ini();">
		<div style='display:hidden;' id='form170_index' data-index='0'></div>
		<img src='./images/next.png' id='form170_next' class='next_icon' data-index='25' onclick="$('#form170_index').attr('data-index',$(this).attr('data-index')); form170_ini();">
	</div>
</div>