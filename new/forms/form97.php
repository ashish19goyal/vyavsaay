<div id='form97' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form97_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form97_header'></th>
					<th>Attribute <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form97_header'></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form97_header' class='add_icon' onclick="form97_add_item();">
						<input type='button' form='form97_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form97_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form97_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form97_prev' class='prev_icon' data-index='-25' onclick="$('#form97_index').attr('data-index',$(this).attr('data-index')); form97_ini();">
		<div style='display:hidden;' id='form97_index' data-index='0'></div>
		<img src='./images/next.png' id='form97_next' class='next_icon' data-index='25' onclick="$('#form97_index').attr('data-index',$(this).attr('data-index')); form97_ini();">
	</div>
</div>