<div id='form238' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form238_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form238_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form238_header'></th>
					<th>Manufacturing</th>
					<th>Quantity</th>
					<th><input type='button' form='form238_header' value='Add Batch' class='add_icon' onclick="modal156_action('raw material');">
						<input type='button' form='form238_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form238_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form238_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form238_prev' class='prev_icon' data-index='-25' onclick="$('#form238_index').attr('data-index',$(this).attr('data-index')); form238_ini();">
		<div style='display:hidden;' id='form238_index' data-index='0'></div>
		<img src='./images/next.png' id='form238_next' class='next_icon' data-index='25' onclick="$('#form238_index').attr('data-index',$(this).attr('data-index')); form238_ini();">
	</div>
</div>