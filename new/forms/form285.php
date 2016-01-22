<div id='form285' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form285_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form285_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form285_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form285_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form285_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form285_prev' class='prev_icon' data-index='-25' onclick="$('#form285_index').attr('data-index',$(this).attr('data-index')); form285_ini();">
		<div style='display:hidden;' id='form285_index' data-index='0'></div>
		<img src='./images/next.png' id='form285_next' class='next_icon' data-index='25' onclick="$('#form285_index').attr('data-index',$(this).attr('data-index')); form285_ini();">
	</div>
</div>