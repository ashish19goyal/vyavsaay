<div id='form242' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form242_header'></form>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form242_header'></th>
					<th>Total Amount</th>
					<th>Paid Amount</th>
					<th>Due Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form242_header'></th>
					<th><input type='button' form='form242_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form242_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form242_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form242_prev' class='prev_icon' data-index='-25' onclick="$('#form242_index').attr('data-index',$(this).attr('data-index')); form242_ini();">
		<div style='display:hidden;' id='form242_index' data-index='0'></div>
		<img src='./images/next.png' id='form242_next' class='next_icon' data-index='25' onclick="$('#form242_index').attr('data-index',$(this).attr('data-index')); form242_ini();">
	</div>
</div>