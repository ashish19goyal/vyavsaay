<div id='form42' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form42_header'></form>
					<th>Bill No. <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form42_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form42_header'></th>
					<th>Bill Date</th>
					<th>Bill Amount</th>
					<th><input type='button' form='form42_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form42_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form42_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form42_prev' class='prev_icon' data-index='-25' onclick="$('#form42_index').attr('data-index',$(this).attr('data-index')); form42_ini();">
		<div style='display:hidden;' id='form42_index' data-index='0'></div>
		<img src='./images/next.png' id='form42_next' class='next_icon' data-index='25' onclick="$('#form42_index').attr('data-index',$(this).attr('data-index')); form42_ini();">
	</div>
</div>