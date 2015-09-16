<div id='form241' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form241_header'></form>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form241_header'></th>
					<th>Total Amount</th>
					<th>Paid Amount</th>
					<th>Due Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form241_header'></th>
					<th><input type='button' form='form241_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form241_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form241_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form241_prev' class='prev_icon' data-index='-25' onclick="$('#form241_index').attr('data-index',$(this).attr('data-index')); form241_ini();">
		<div style='display:hidden;' id='form241_index' data-index='0'></div>
		<img src='./images/next.png' id='form241_next' class='next_icon' data-index='25' onclick="$('#form241_index').attr('data-index',$(this).attr('data-index')); form241_ini();">
	</div>
</div>