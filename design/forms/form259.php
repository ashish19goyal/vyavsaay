<div id='form259' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form259_header'></form>
					<th>Quotation # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form259_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form259_header'></th>
					<th>Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form259_header'></th>
					<th>
						<input type='button' form='form259_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form259_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form259_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form259_prev' class='prev_icon' data-index='-25' onclick="$('#form259_index').attr('data-index',$(this).attr('data-index')); form259_ini();">
		<div style='display:hidden;' id='form259_index' data-index='0'></div>
		<img src='./images/next.png' id='form259_next' class='next_icon' data-index='25' onclick="$('#form259_index').attr('data-index',$(this).attr('data-index')); form259_ini();">
	</div>
</div>