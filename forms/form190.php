<div id='form190' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form190_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form190_header'></th>
					<th>Details </th>
					<th>Total </th>
					<th>Order Time </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form190_header'></th>
					<th>
						<input type='button' class='add_icon' form='form190_header' title='Add new order' onclick="modal118_action();">
						<input type='button' form='form190_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form190_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form190_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form190_prev' class='prev_icon' data-index='-25' onclick="$('#form190_index').attr('data-index',$(this).attr('data-index')); form190_ini();">
		<div style='display:hidden;' id='form190_index' data-index='0'></div>
		<img src='./images/next.png' id='form190_next' class='next_icon' data-index='25' onclick="$('#form190_index').attr('data-index',$(this).attr('data-index')); form190_ini();">
	</div>
</div>