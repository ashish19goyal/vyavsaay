<div id='form266' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form266_header'></form>
					<th>RTO # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form266_header'></th>
					<th>Employee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form266_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form266_header'></th>
					<th>
						<input type='button' form='form266_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form266_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form266_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form266_prev' class='prev_icon' data-index='-25' onclick="$('#form266_index').attr('data-index',$(this).attr('data-index')); form266_ini();">
		<div style='display:hidden;' id='form266_index' data-index='0'></div>
		<img src='./images/next.png' id='form266_next' class='next_icon' data-index='25' onclick="$('#form266_index').attr('data-index',$(this).attr('data-index')); form266_ini();">
	</div>
</div>