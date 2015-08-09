<div id='form208' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form208_header'></form>
					<th>Plan #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form208_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form208_header'></th>
					<th>Details</th>
					<th>Start Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form208_header'></th>
					<th>
						<input type='button' form='form208_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form208_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form208_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form208_prev' class='prev_icon' data-index='-25' onclick="$('#form208_index').attr('data-index',$(this).attr('data-index')); form208_ini();">
		<div style='display:hidden;' id='form208_index' data-index='0'></div>
		<img src='./images/next.png' id='form208_next' class='next_icon' data-index='25' onclick="$('#form208_index').attr('data-index',$(this).attr('data-index')); form208_ini();">
	</div>
</div>