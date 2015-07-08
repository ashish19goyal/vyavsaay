<div id='form179' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form179_header'></form>
					<th>Order #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form179_header'></th>
					<th>Order Date</th>
					<th>Score</th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form179_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form179_header'></th>
					<th><input type='button' form='form179_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form179_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form179_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form179_prev' class='prev_icon' data-index='-25' onclick="$('#form179_index').attr('data-index',$(this).attr('data-index')); form179_ini();">
		<div style='display:hidden;' id='form179_index' data-index='0'></div>
		<img src='./images/next.png' id='form179_next' class='next_icon' data-index='25' onclick="$('#form179_index').attr('data-index',$(this).attr('data-index')); form179_ini();">
	</div>
</div>