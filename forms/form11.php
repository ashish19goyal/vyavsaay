<div id='form11' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form11_header'></form>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header'></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header'></th>
					<th>Total Amount</th>
					<th>Paid Amount</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header'></th>
					<th>Details </th>
					<th><input type='button' form='form11_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form11_header' value='Balance Out' title='Balance out pending payments' class='generic_head_icon' onclick='balance_out_payments();'>
						<input type='submit' form='form11_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form11_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form11_prev' class='prev_icon' data-index='-25' onclick="$('#form11_index').attr('data-index',$(this).attr('data-index')); form11_ini();">
		<div style='display:hidden;' id='form11_index' data-index='0'></div>
		<img src='./images/next.png' id='form11_next' class='next_icon' data-index='25' onclick="$('#form11_index').attr('data-index',$(this).attr('data-index')); form11_ini();">
	</div>
</div>