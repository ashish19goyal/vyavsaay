<div id='form269' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form269_header'></form>
					<th>Challan # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form269_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form269_header'></th>
					<th>Date</th>
					<th>Details</th>
					<th>
						<input type='button' form='form269_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form269_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form269_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form269_prev' class='prev_icon' data-index='-25' onclick="$('#form269_index').attr('data-index',$(this).attr('data-index')); form269_ini();">
		<div style='display:hidden;' id='form269_index' data-index='0'></div>
		<img src='./images/next.png' id='form269_next' class='next_icon' data-index='25' onclick="$('#form269_index').attr('data-index',$(this).attr('data-index')); form269_ini();">
	</div>
</div>