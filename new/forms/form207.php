<div id='form207' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form207_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form207_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form207_header'></th>
					<th>Expiry</th>
					<th>Pricing</th>
					<th>Quantity</th>
					<th><input type='button' form='form207_header' value='Add Batch' class='add_icon' onclick='modal142_action();'>
						<input type='button' form='form207_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form207_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form207_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form207_prev' class='prev_icon' data-index='-25' onclick="$('#form207_index').attr('data-index',$(this).attr('data-index')); form207_ini();">
		<div style='display:hidden;' id='form207_index' data-index='0'></div>
		<img src='./images/next.png' id='form207_next' class='next_icon' data-index='25' onclick="$('#form207_index').attr('data-index',$(this).attr('data-index')); form207_ini();">
	</div>
</div>