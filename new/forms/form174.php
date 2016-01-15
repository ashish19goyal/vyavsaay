<div id='form174' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form174_header'></form>
					<th>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form174_header'></th>
					<th>Pincode <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form174_header'></th>
					<th>Minimum </th>
					<th>Maximum </th>
					<th>Weight Factor </th>
					<th><input type='button' form='form174_header' title='Add new mapping' class='add_icon' onclick='form174_add_item();'>
						<input type='button' form='form174_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form174_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form174_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form174_prev' class='prev_icon' data-index='-25' onclick="$('#form174_index').attr('data-index',$(this).attr('data-index')); form174_ini();">
		<div style='display:hidden;' id='form174_index' data-index='0'></div>
		<img src='./images/next.png' id='form174_next' class='next_icon' data-index='25' onclick="$('#form174_index').attr('data-index',$(this).attr('data-index')); form174_ini();">
	</div>
</div>