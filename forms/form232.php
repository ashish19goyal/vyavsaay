<div id='form232' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form232_header'></form>
					<th>Pres # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form232_header'></th>
					<th>Doctor <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form232_header'></th>
					<th>Patient <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form232_header'></th>
					<th>Date</th>
					<th>Next Visit</th>
					<th><input type='button' form='form232_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form232_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form232_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form232_prev' class='prev_icon' data-index='-25' onclick="$('#form232_index').attr('data-index',$(this).attr('data-index')); form232_ini();">
		<div style='display:hidden;' id='form232_index' data-index='0'></div>
		<img src='./images/next.png' id='form232_next' class='next_icon' data-index='25' onclick="$('#form232_index').attr('data-index',$(this).attr('data-index')); form232_ini();">
	</div>
</div>