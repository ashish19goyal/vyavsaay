<div id='form183' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form183_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form183_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form183_header'></th>
					<th>Manufacturing</th>
					<th>Quantity</th>
					<th><input type='button' form='form183_header' value='Add Batch' class='add_icon' onclick='modal22_action(function(){});'>
						<input type='button' form='form183_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form183_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form183_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form183_prev' class='prev_icon' data-index='-25' onclick="$('#form183_index').attr('data-index',$(this).attr('data-index')); form183_ini();">
		<div style='display:hidden;' id='form183_index' data-index='0'></div>
		<img src='./images/next.png' id='form183_next' class='next_icon' data-index='25' onclick="$('#form183_index').attr('data-index',$(this).attr('data-index')); form183_ini();">
	</div>
</div>