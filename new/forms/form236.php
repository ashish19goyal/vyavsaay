<div id='form236' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form236_header'></form>
					<th>Manifest # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form236_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form236_header'></th>
					<th># orders</th>
					<th>
						<input type='button' form='form236_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form236_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form236_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form236_prev' class='prev_icon' data-index='-25' onclick="$('#form236_index').attr('data-index',$(this).attr('data-index')); form236_ini();">
		<div style='display:hidden;' id='form236_index' data-index='0'></div>
		<img src='./images/next.png' id='form236_next' class='next_icon' data-index='25' onclick="$('#form236_index').attr('data-index',$(this).attr('data-index')); form236_ini();">
	</div>
</div>