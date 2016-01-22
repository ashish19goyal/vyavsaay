<div id='form92' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form92_header'></form>
					<th>Bill No. <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form92_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form92_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form92_header'></th>
					<th>Bill Date</th>
					<th>Bill Amount</th>
					<th><input type='button' form='form92_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form92_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form92_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form92_prev' class='prev_icon' data-index='-25' onclick="$('#form92_index').attr('data-index',$(this).attr('data-index')); form92_ini();">
		<div style='display:hidden;' id='form92_index' data-index='0'></div>
		<img src='./images/next.png' id='form92_next' class='next_icon' data-index='25' onclick="$('#form92_index').attr('data-index',$(this).attr('data-index')); form92_ini();">
	</div>
</div>