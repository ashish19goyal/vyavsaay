<div id='form109' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form109_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form109_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form109_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new attribute' form='form60_header' class='add_icon' onclick="form109_add_item();">
						<input type='button' form='form60_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form60_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form109_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form109_prev' class='prev_icon' data-index='-25' onclick="$('#form109_index').attr('data-index',$(this).attr('data-index')); form109_ini();">
		<div style='display:hidden;' id='form109_index' data-index='0'></div>
		<img src='./images/next.png' id='form109_next' class='next_icon' data-index='25' onclick="$('#form109_index').attr('data-index',$(this).attr('data-index')); form109_ini();">
	</div>
</div>