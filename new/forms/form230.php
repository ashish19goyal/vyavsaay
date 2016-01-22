<div id='form230' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form230_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form230_header'></th>
					<th>Quantity</th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form230_header'></th>
					<th>For/From <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form230_header'></th>
					<th>To/From <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form230_header'></th>
					<th>Details</th>
					<th><input type='button' form='form230_header' class='add_icon' title='Add record' onclick='form230_add_item();'>
						<input type='button' form='form230_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form230_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form230_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form230_prev' class='prev_icon' data-index='-25' onclick="$('#form230_index').attr('data-index',$(this).attr('data-index')); form230_ini();">
		<div style='display:hidden;' id='form230_index' data-index='0'></div>
		<img src='./images/next.png' id='form230_next' class='next_icon' data-index='25' onclick="$('#form230_index').attr('data-index',$(this).attr('data-index')); form230_ini();">
	</div>
</div>