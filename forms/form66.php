<div id='form66' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form66_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header'></th>
					<th>Cross sold item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header'></th>
					<th><input type="button" value='Add item' form='form66_header' class='add_icon' onclick="form66_add_item();">
						<input type='button' form='form66_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form66_header' value='IMPORT' class='import_icon'>
						<input type='submit' form='form66_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form66_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form66_prev' class='prev_icon' data-index='-25' onclick="$('#form66_index').attr('data-index',$(this).attr('data-index')); form66_ini();">
		<div style='display:hidden;' id='form66_index' data-index='0'></div>
		<img src='./images/next.png' id='form66_next' class='next_icon' data-index='25' onclick="$('#form66_index').attr('data-index',$(this).attr('data-index')); form66_ini();">
	</div>
</div>