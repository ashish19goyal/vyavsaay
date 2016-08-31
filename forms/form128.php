<div id='form128' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form128_header'></form>
					<th>Request Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form128_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form128_header'></th>
					<th>Detail</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form128_header'></th>
					<th>
						<input type='button' class='add_icon' form='form128_header' title='Add Service Request'>
						<input type='button' form='form128_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form128_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form128_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form128_prev' class='prev_icon' data-index='-25' onclick="$('#form128_index').attr('data-index',$(this).attr('data-index')); form128_ini();">
		<div style='display:hidden;' id='form128_index' data-index='0'></div>
		<img src='./images/next.png' id='form128_next' class='next_icon' data-index='25' onclick="$('#form128_index').attr('data-index',$(this).attr('data-index')); form128_ini();">
	</div>
</div>