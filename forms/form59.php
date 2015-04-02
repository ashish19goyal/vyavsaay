<div id='form59' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form59_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header'></th>
					<th>Requisite Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header'></th>
					<th>Requisite Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form59_header'></th>
					<th>Quantity</th>
					<th><input type="button" value='Add new requisite' form='form59_header' class='add_icon' onclick="form59_add_item();">
						<input type='button' form='form59_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form59_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form59_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form59_prev' class='prev_icon' data-index='-25' onclick="$('#form59_index').attr('data-index',$(this).attr('data-index')); form59_ini();">
		<div style='display:hidden;' id='form59_index' data-index='0'></div>
		<img src='./images/next.png' id='form59_next' class='next_icon' data-index='25' onclick="$('#form59_index').attr('data-index',$(this).attr('data-index')); form59_ini();">
	</div>
</div>