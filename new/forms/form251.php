<div id='form251' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form251_header'></form>
					<th>MTS # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form251_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form251_header'></th>
					<th>Branch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form251_header'></th>
					<th>Details</th>
					<th>
						<input type='button' form='form251_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form251_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form251_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form251_prev' class='prev_icon' data-index='-25' onclick="$('#form251_index').attr('data-index',$(this).attr('data-index')); form251_ini();">
		<div style='display:hidden;' id='form251_index' data-index='0'></div>
		<img src='./images/next.png' id='form251_next' class='next_icon' data-index='25' onclick="$('#form251_index').attr('data-index',$(this).attr('data-index')); form251_ini();">
	</div>
</div>