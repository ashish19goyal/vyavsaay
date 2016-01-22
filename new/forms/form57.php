<div id='form57' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form57_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form57_header'></th>
					<th>Description </th>
					<th>Price</th>
					<th>Tax (in %)</th>
					<th><input type="button" value='Add new service' form='form57_header' class='add_icon' onclick="modal20_action();">
						<input type='button' form='form57_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form57_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form57_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form57_prev' class='prev_icon' data-index='-25' onclick="$('#form57_index').attr('data-index',$(this).attr('data-index')); form57_ini();">
		<div style='display:hidden;' id='form57_index' data-index='0'></div>
		<img src='./images/next.png' id='form57_next' class='next_icon' data-index='25' onclick="$('#form57_index').attr('data-index',$(this).attr('data-index')); form57_ini();">
	</div>
</div>