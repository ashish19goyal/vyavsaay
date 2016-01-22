<div id='form201' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form201_header'></form>
					<th>DRS # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form201_header'></th>
					<th>Employee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form201_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form201_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form201_header'></th>
					<th>
						<input type='button' form='form201_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form201_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form201_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form201_prev' class='prev_icon' data-index='-25' onclick="$('#form201_index').attr('data-index',$(this).attr('data-index')); form201_ini();">
		<div style='display:hidden;' id='form201_index' data-index='0'></div>
		<img src='./images/next.png' id='form201_next' class='next_icon' data-index='25' onclick="$('#form201_index').attr('data-index',$(this).attr('data-index')); form201_ini();">
	</div>
</div>