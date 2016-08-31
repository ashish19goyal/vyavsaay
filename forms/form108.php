<div id='form108' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form108_header'></form>
					<th>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form108_header'></th>
					<th>Order # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form108_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form108_header'></th>
					<th>Order Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form108_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form108_header'></th>
					<th><input type='button' form='form108_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form108_header' name='import' value='Import' class='generic_icon' style='background:#DB0000;border: 2px solid #8B0000;'>
						<input type='button' form='form108_header' name='update_orders' value='Update Orders' class='generic_icon' style='background:#DBDB00;border: 2px solid #8B8B00;'>
						<input type='submit' form='form108_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form108_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form108_prev' class='prev_icon' data-index='-25' onclick="$('#form108_index').attr('data-index',$(this).attr('data-index')); form108_ini();">
		<div style='display:hidden;' id='form108_index' data-index='0'></div>
		<img src='./images/next.png' id='form108_next' class='next_icon' data-index='25' onclick="$('#form108_index').attr('data-index',$(this).attr('data-index')); form108_ini();">
	</div>
</div>