<div id='form297' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form297_header'></form>
					<th>Order #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form297_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form297_header'></th>
					<th>Order Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form297_header'></th>
					<th>
						<input type='button' form='form297_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form297_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form297_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form297_prev' class='prev_icon' data-index='-25' onclick="$('#form297_index').attr('data-index',$(this).attr('data-index')); form297_ini();">
		<div style='display:hidden;' id='form297_index' data-index='0'></div>
		<img src='./images/next.png' id='form297_next' class='next_icon' data-index='25' onclick="$('#form297_index').attr('data-index',$(this).attr('data-index')); form297_ini();">
	</div>
</div>