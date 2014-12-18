<div id='form61' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form61_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form61_header' class='add_icon' onclick="form61_add_item();">
						<input type='button' form='form61_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form61_header' value='IMPORT' class='import_icon'>
						<input type='submit' form='form61_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form61_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form61_prev' class='prev_icon' data-index='-25' onclick="$('#form61_index').attr('data-index',$(this).attr('data-index')); form61_ini();">
		<div style='display:hidden;' id='form61_index' data-index='0'></div>
		<img src='./images/next.png' id='form61_next' class='next_icon' data-index='25' onclick="$('#form61_index').attr('data-index',$(this).attr('data-index')); form61_ini();">
	</div>
</div>