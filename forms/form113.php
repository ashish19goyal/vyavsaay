<div id='form113' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form113_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form113_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form113_header'></th>
					<th>Quantity</th>
					<th>Total</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form113_header'></th>
					<th><input type='button' form='form113_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form113_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form113_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form113_prev' class='prev_icon' data-index='-25' onclick="$('#form113_index').attr('data-index',$(this).attr('data-index')); form113_ini();">
		<div style='display:hidden;' id='form113_index' data-index='0'></div>
		<img src='./images/next.png' id='form113_next' class='next_icon' data-index='25' onclick="$('#form113_index').attr('data-index',$(this).attr('data-index')); form113_ini();">
	</div>
</div>