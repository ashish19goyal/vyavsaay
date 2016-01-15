<div id='form17' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form17_header'></form>
					<th>Return ID <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form17_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form17_header'></th>
					<th>Return Date</th>
					<th>Return Amount</th>
					<th><input type='button' form='form17_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form17_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form17_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form17_prev' class='prev_icon' data-index='-25' onclick="$('#form17_index').attr('data-index',$(this).attr('data-index')); form17_ini();">
		<div style='display:hidden;' id='form17_index' data-index='0'></div>
		<img src='./images/next.png' id='form17_next' class='next_icon' data-index='25' onclick="$('#form17_index').attr('data-index',$(this).attr('data-index')); form17_ini();">
	</div>
</div>