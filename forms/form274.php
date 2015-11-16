<div id='form274' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form274_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form274_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form274_header' value='EXPORT' name='export' class='export_icon'>
						<input type='submit' form='form274_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form274_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form274_prev' class='prev_icon' data-index='-25' onclick="$('#form274_index').attr('data-index',$(this).attr('data-index')); form274_ini();">
		<div style='display:hidden;' id='form274_index' data-index='0'></div>
		<img src='./images/next.png' id='form274_next' class='next_icon' data-index='25' onclick="$('#form274_index').attr('data-index',$(this).attr('data-index')); form274_ini();">
	</div>
</div>