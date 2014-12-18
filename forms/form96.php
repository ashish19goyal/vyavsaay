<div id='form96' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form96_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form96_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form96_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form96_header' class='add_icon' onclick="form96_add_item();">
						<input type='button' form='form96_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form96_header' value='IMPORT' class='import_icon'>
						<input type='submit' form='form96_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form96_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form96_prev' class='prev_icon' data-index='-25' onclick="$('#form96_index').attr('data-index',$(this).attr('data-index')); form96_ini();">
		<div style='display:hidden;' id='form96_index' data-index='0'></div>
		<img src='./images/next.png' id='form96_next' class='next_icon' data-index='25' onclick="$('#form96_index').attr('data-index',$(this).attr('data-index')); form96_ini();">
	</div>
</div>