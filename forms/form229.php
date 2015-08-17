<div id='form229' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form229_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form229_header'></th>
					<th>Quantity</th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form229_header'></th>
					<th>Date</th>
					<th>
						<input type='button' form='form229_header' class='add_icon' title='Add record' onclick='form229_add_item();'>
						<input type='button' form='form229_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form229_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form229_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form229_prev' class='prev_icon' data-index='-25' onclick="$('#form229_index').attr('data-index',$(this).attr('data-index')); form229_ini();">
		<div style='display:hidden;' id='form229_index' data-index='0'></div>
		<img src='./images/next.png' id='form229_next' class='next_icon' data-index='25' onclick="$('#form229_index').attr('data-index',$(this).attr('data-index')); form229_ini();">
	</div>
</div>