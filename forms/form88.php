<div id='form88' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form88_header'></form>
					<th>Product <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form88_header'></th>
					<th>Process Notes </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form88_header'></th>
					<th>Schedule</th>
					<th>Iteration Notes</th>
					<th><input type='button' form='form88_header' value='Add new product' class='add_icon' onclick='form88_add_item();'>
						<input type='button' form='form88_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form88_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form88_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form88_prev' class='prev_icon' data-index='-25' onclick="$('#form88_index').attr('data-index',$(this).attr('data-index')); form88_ini();">
		<div style='display:hidden;' id='form88_index' data-index='0'></div>
		<img src='./images/next.png' id='form88_next' class='next_icon' data-index='25' onclick="$('#form88_index').attr('data-index',$(this).attr('data-index')); form88_ini();">
	</div>
</div>