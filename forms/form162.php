<div id='form162' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form162_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form162_header'></th>
					<th>Checkpoint <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form162_header'></th>
					<th>Desired Result </th>
					<th><input type="button" value='Add new' class='add_icon' form='form162_header' onclick="form162_add_item();">
						<input type='button' form='form162_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form162_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form162_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form162_prev' class='prev_icon' data-index='-25' onclick="$('#form162_index').attr('data-index',$(this).attr('data-index')); form162_ini();">
		<div style='display:hidden;' id='form162_index' data-index='0'></div>
		<img src='./images/next.png' id='form162_next' class='next_icon' data-index='25' onclick="$('#form162_index').attr('data-index',$(this).attr('data-index')); form162_ini();">
	</div>
</div>