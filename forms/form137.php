<div id='form137' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form137_header'></form>
					<th>Project Code <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form137_header'></th>
					<th>Person <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form137_header'></th>
					<th>Amount</th>
					<th>Details</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form137_header'></th>
					<th><input type="button" value='Add new expense' class='add_icon' form='form137_header' onclick="form137_add_item();">
						<input type='button' form='form137_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form137_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form137_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form137_prev' class='prev_icon' data-index='-25' onclick="$('#form137_index').attr('data-index',$(this).attr('data-index')); form137_ini();">
		<div style='display:hidden;' id='form137_index' data-index='0'></div>
		<img src='./images/next.png' id='form137_next' class='next_icon' data-index='25' onclick="$('#form137_index').attr('data-index',$(this).attr('data-index')); form137_ini();">
	</div>
</div>