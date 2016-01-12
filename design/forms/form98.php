<div id='form98' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form98_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form98_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form98_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form98_header' class='add_icon' onclick="form98_add_item();">
						<input type='button' form='form98_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form98_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form98_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form98_prev' class='prev_icon' data-index='-25' onclick="$('#form98_index').attr('data-index',$(this).attr('data-index')); form98_ini();">
		<div style='display:hidden;' id='form98_index' data-index='0'></div>
		<img src='./images/next.png' id='form98_next' class='next_icon' data-index='25' onclick="$('#form98_index').attr('data-index',$(this).attr('data-index')); form98_ini();">
	</div>
</div>