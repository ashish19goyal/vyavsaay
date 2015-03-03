<div id='form140' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form140_header'></form>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form140_header'></th>
					<th>Asset Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form140_header'></th>
					<th>Description </th>
					<th>Location <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form140_header'></th>
					<th>Notes</th>
					<th><input type="button" value='Add new' class='add_icon' form='form140_header' onclick="form140_add_item();">
						<input type='button' form='form140_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form140_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form140_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form140_prev' class='prev_icon' data-index='-25' onclick="$('#form140_index').attr('data-index',$(this).attr('data-index')); form140_ini();">
		<div style='display:hidden;' id='form140_index' data-index='0'></div>
		<img src='./images/next.png' id='form140_next' class='next_icon' data-index='25' onclick="$('#form140_index').attr('data-index',$(this).attr('data-index')); form140_ini();">
	</div>
</div>