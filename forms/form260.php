<div id='form260' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form260_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form260_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form260_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form260_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form260_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form260_prev' class='prev_icon' data-index='-25' onclick="$('#form260_index').attr('data-index',$(this).attr('data-index')); form260_ini();">
		<div style='display:hidden;' id='form260_index' data-index='0'></div>
		<img src='./images/next.png' id='form260_next' class='next_icon' data-index='25' onclick="$('#form260_index').attr('data-index',$(this).attr('data-index')); form260_ini();">
	</div>
</div>