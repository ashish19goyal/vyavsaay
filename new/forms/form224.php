<div id='form224' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form224_header'></form>
					<th>Test Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form224_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form224_header'></th>
					<th>Details </th>
					<th>Next Due Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form224_header'></th>
					<th><input type="button" value='Add new test' class='add_icon' form='form224_header' onclick="form224_add_item();">
						<input type='button' form='form224_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form224_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form224_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form224_prev' class='prev_icon' data-index='-25' onclick="$('#form224_index').attr('data-index',$(this).attr('data-index')); form224_ini();">
		<div style='display:hidden;' id='form224_index' data-index='0'></div>
		<img src='./images/next.png' id='form224_next' class='next_icon' data-index='25' onclick="$('#form224_index').attr('data-index',$(this).attr('data-index')); form224_ini();">
	</div>
</div>