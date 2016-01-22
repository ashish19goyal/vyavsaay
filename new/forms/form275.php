<div id='form275' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form275_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form275_header'></th>
					<th>Quantity</th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form275_header'></th>
					<th>To/From <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form275_header'></th>
					<th>Details</th>
					<th><input type='button' form='form275_header' class='add_icon' title='Add record' onclick='form275_add_item();'>
						<input type='button' form='form275_header' value='EXPORT' class='export_icon' name='export'>
						<input type='submit' form='form275_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form275_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form275_prev' class='prev_icon' data-index='-25' onclick="$('#form275_index').attr('data-index',$(this).attr('data-index')); form275_ini();">
		<div style='display:hidden;' id='form275_index' data-index='0'></div>
		<img src='./images/next.png' id='form275_next' class='next_icon' data-index='25' onclick="$('#form275_index').attr('data-index',$(this).attr('data-index')); form275_ini();">
	</div>
</div>