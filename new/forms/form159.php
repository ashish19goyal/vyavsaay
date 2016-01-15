<div id='form159' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form159_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form159_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form159_header'></th>
					<th><input type="button" value='Add new mapping' form='form159_header' class='add_icon' onclick="form159_add_item();">
						<input type='button' form='form159_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form159_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form159_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form159_prev' class='prev_icon' data-index='-25' onclick="$('#form159_index').attr('data-index',$(this).attr('data-index')); form159_ini();">
		<div style='display:hidden;' id='form159_index' data-index='0'></div>
		<img src='./images/next.png' id='form159_next' class='next_icon' data-index='25' onclick="$('#form159_index').attr('data-index',$(this).attr('data-index')); form159_ini();">
	</div>
</div>