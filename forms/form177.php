<div id='form177' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form177_header'></form>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form177_header'></th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form177_header'></th>
					<th>Values </th>
					<th>Threshold </th>
					<th><input type="button" value='Add new parameter' class='add_icon' form='form177_header' onclick="form177_add_item();">
						<input type='button' form='form177_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form177_header' class='submit_hidden'>
					</th>
			</tr>
		</thead>
		<tbody id='form177_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form177_prev' class='prev_icon' data-index='-25' onclick="$('#form177_index').attr('data-index',$(this).attr('data-index')); form177_ini();">
		<div style='display:hidden;' id='form177_index' data-index='0'></div>
		<img src='./images/next.png' id='form177_next' class='next_icon' data-index='25' onclick="$('#form177_index').attr('data-index',$(this).attr('data-index')); form177_ini();">
	</div>
</div>