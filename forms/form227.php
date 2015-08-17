<div id='form227' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form227_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form227_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form227_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form227_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form227_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form227_prev' class='prev_icon' data-index='-25' onclick="$('#form227_index').attr('data-index',$(this).attr('data-index')); form227_ini();">
		<div style='display:hidden;' id='form227_index' data-index='0'></div>
		<img src='./images/next.png' id='form227_next' class='next_icon' data-index='25' onclick="$('#form227_index').attr('data-index',$(this).attr('data-index')); form227_ini();">
	</div>
</div>