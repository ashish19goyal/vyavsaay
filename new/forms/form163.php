<div id='form163' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form163_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form163_header'></th>
					<th>Size </th>
					<th>Weight</th>
					<th>Dead Weights</th>
					<th>Packing</th>
					<th>
						<input type='button' form='form163_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form163_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form163_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form163_prev' class='prev_icon' data-index='-25' onclick="$('#form163_index').attr('data-index',$(this).attr('data-index')); form163_ini();">
		<div style='display:hidden;' id='form163_index' data-index='0'></div>
		<img src='./images/next.png' id='form163_next' class='next_icon' data-index='25' onclick="$('#form163_index').attr('data-index',$(this).attr('data-index')); form163_ini();">
	</div>
</div>