<div id='form1' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form1_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header'></th>
					<th>Manufacturing</th>
					<th>Expiry</th>
					<th>Quantity</th>
					<th><input type='button' form='form1_header' value='Add Batch' class='add_icon' onclick='modal120_action();'>
						<input type='button' form='form1_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form1_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form1_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form1_prev' class='prev_icon' data-index='-25' onclick="$('#form1_index').attr('data-index',$(this).attr('data-index')); form1_ini();">
		<div style='display:hidden;' id='form1_index' data-index='0'></div>
		<img src='./images/next.png' id='form1_next' class='next_icon' data-index='25' onclick="$('#form1_index').attr('data-index',$(this).attr('data-index')); form1_ini();">
	</div>
</div>