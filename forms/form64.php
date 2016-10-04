<div id='form64' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form64_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header'></th>
					<th>Cross sold item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header'></th>
					<th><input type="button" value='Add item' form='form64_header' class='add_icon' onclick="form64_add_item();">
						<input type='button' form='form64_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form64_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form64_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form64_prev' class='prev_icon' data-index='-25' onclick="$('#form64_index').attr('data-index',$(this).attr('data-index')); form64_ini();">
		<div style='display:hidden;' id='form64_index' data-index='0'></div>
		<img src='./images/next.png' id='form64_next' class='next_icon' data-index='25' onclick="$('#form64_index').attr('data-index',$(this).attr('data-index')); form64_ini();">
	</div>
</div>