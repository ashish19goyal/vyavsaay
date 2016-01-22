<div id='form60' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form60_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new attribute' form='form60_header' class='add_icon' onclick="form60_add_item();">
						<input type='button' form='form60_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form60_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form60_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form60_prev' class='prev_icon' data-index='-25' onclick="$('#form60_index').attr('data-index',$(this).attr('data-index')); form60_ini();">
		<div style='display:hidden;' id='form60_index' data-index='0'></div>
		<img src='./images/next.png' id='form60_next' class='next_icon' data-index='25' onclick="$('#form60_index').attr('data-index',$(this).attr('data-index')); form60_ini();">
	</div>
</div>