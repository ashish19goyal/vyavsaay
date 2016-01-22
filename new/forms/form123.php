<div id='form123' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form123_header'></form>
					<th>Object <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form123_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form123_header'></th>
					<th>Values </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form123_header'></th>
					<th><input type="button" value='Add new Attribute' form='form123_header' class='add_icon' onclick="form123_add_item();">
						<input type='button' form='form123_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form123_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form123_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form123_prev' class='prev_icon' data-index='-25' onclick="$('#form123_index').attr('data-index',$(this).attr('data-index')); form123_ini();">
		<div style='display:hidden;' id='form123_index' data-index='0'></div>
		<img src='./images/next.png' id='form123_next' class='next_icon' data-index='25' onclick="$('#form123_index').attr('data-index',$(this).attr('data-index')); form123_ini();">
	</div>
</div>