<div id='form203' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form203_header'></form>
					<th>AWB # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Order # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Customer </th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Type </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th><input type="button" value='Add new order' class='add_icon' form='form203_header' onclick="modal128_action();">
						<br><input type='button' form='form203_header' value='Import' name='import' class='import_icon'>
						<br><input type='button' form='form203_header' value='EXPORT' name='export' class='export_icon'>
						<input type='submit' form='form203_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form203_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form203_prev' class='prev_icon' data-index='-25' onclick="$('#form203_index').attr('data-index',$(this).attr('data-index')); form203_ini();">
		<div style='display:hidden;' id='form203_index' data-index='0'></div>
		<img src='./images/next.png' id='form203_next' class='next_icon' data-index='25' onclick="$('#form203_index').attr('data-index',$(this).attr('data-index')); form203_ini();">
	</div>
</div>