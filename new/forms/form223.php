<div id='form223' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form223_header'></form>
					<th>Order #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form223_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form223_header'></th>
					<th>Order Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form223_header'></th>
					<th>
						<input type='button' form='form223_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form223_header' value='Import' name='import' class='export_icon' style='background:#DB0000;border: 2px solid #8B0000;'>
						<input type='submit' form='form223_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form223_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form223_prev' class='prev_icon' data-index='-25' onclick="$('#form223_index').attr('data-index',$(this).attr('data-index')); form223_ini();">
		<div style='display:hidden;' id='form223_index' data-index='0'></div>
		<img src='./images/next.png' id='form223_next' class='next_icon' data-index='25' onclick="$('#form223_index').attr('data-index',$(this).attr('data-index')); form223_ini();">
	</div>
</div>