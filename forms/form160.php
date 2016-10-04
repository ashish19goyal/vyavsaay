<div id='form160' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form160_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form160_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form160_header'></th>
					<th><input type="button" value='Add new mapping' form='form160_header' class='add_icon' onclick="form160_add_item();">
						<input type='button' form='form160_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form160_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form160_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form160_prev' class='prev_icon' data-index='-25' onclick="$('#form160_index').attr('data-index',$(this).attr('data-index')); form160_ini();">
		<div style='display:hidden;' id='form160_index' data-index='0'></div>
		<img src='./images/next.png' id='form160_next' class='next_icon' data-index='25' onclick="$('#form160_index').attr('data-index',$(this).attr('data-index')); form160_ini();">
	</div>
</div>