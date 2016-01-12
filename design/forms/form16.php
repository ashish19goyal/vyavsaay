<div id='form16' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form16_header'></form>
					<th>Order # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form16_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form16_header'></th>
					<th>Return Date</th>
					<th>Return Amount</th>
					<th><input type='button' form='form16_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form16_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form16_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form16_prev' class='prev_icon' data-index='-25' onclick="$('#form16_index').attr('data-index',$(this).attr('data-index')); form16_ini();">
		<div style='display:hidden;' id='form16_index' data-index='0'></div>
		<img src='./images/next.png' id='form16_next' class='next_icon' data-index='25' onclick="$('#form16_index').attr('data-index',$(this).attr('data-index')); form16_ini();">
	</div>
</div>