<div id='form40' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form40_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form40_header'></th>
					<th>Contact </th>
					<th>Address</th>
					<th>Details</th>
					<th><input type='button' form='form40_header' value='Add new supplier' class='add_icon' onclick='modal13_action();'>
						<input type='button' form='form40_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form40_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form40_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form40_prev' class='prev_icon' data-index='-25' onclick="$('#form40_index').attr('data-index',$(this).attr('data-index')); form40_ini();">
		<div style='display:hidden;' id='form40_index' data-index='0'></div>
		<img src='./images/next.png' id='form40_next' class='next_icon' data-index='25' onclick="$('#form40_index').attr('data-index',$(this).attr('data-index')); form40_ini();">
	</div>
</div>