<div id='form283' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form283_header'></form>
					<th>Invoice # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form283_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form283_header'></th>
					<th>Date</th>
					<th>Amount</th>
					<th><input type='button' form='form283_header' value='EXPORT' name='export' class='export_icon'>
						<input type='submit' form='form283_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form283_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form283_prev' class='prev_icon' data-index='-25' onclick="$('#form283_index').attr('data-index',$(this).attr('data-index')); form283_ini();">
		<div style='display:hidden;' id='form283_index' data-index='0'></div>
		<img src='./images/next.png' id='form283_next' class='next_icon' data-index='25' onclick="$('#form283_index').attr('data-index',$(this).attr('data-index')); form283_ini();">
	</div>
</div>