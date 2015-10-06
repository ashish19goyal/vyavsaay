<div id='form249' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form249_header'></form>
					<th>Bag # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>MTS</th>
					<th>
						<input type='button' form='form249_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form249_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form249_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form249_prev' class='prev_icon' data-index='-25' onclick="$('#form249_index').attr('data-index',$(this).attr('data-index')); form249_ini();">
		<div style='display:hidden;' id='form249_index' data-index='0'></div>
		<img src='./images/next.png' id='form249_next' class='next_icon' data-index='25' onclick="$('#form249_index').attr('data-index',$(this).attr('data-index')); form249_ini();">
	</div>
</div>