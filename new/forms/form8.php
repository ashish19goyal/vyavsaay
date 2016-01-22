<div id='form8' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form8_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header'></th>
					<th>Contact </th>
					<th>Address </th>
					<th>Details </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header'></th>
					<th><input type='button' form='form8_header' value='Add new staff' class='add_icon' onclick='modal16_action();'>
						<input type='button' form='form8_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form8_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form8_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form8_prev' class='prev_icon' data-index='-25' onclick="$('#form8_index').attr('data-index',$(this).attr('data-index')); form8_ini();">
		<div style='display:hidden;' id='form8_index' data-index='0'></div>
		<img src='./images/next.png' id='form8_next' class='next_icon' data-index='25' onclick="$('#form8_index').attr('data-index',$(this).attr('data-index')); form8_ini();">
	</div>
</div>