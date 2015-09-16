<div id='form243' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form243_header'></form>
					<th>Receipt Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form243_header'></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form243_header'></th>
					<th>Amount</th>
					<th><input type="button" value='Add Receipt' form='form243_header' class='add_icon' onclick="modal30_action();">
						<input type="button" value='Delete Receipt' form='form243_header' class='delete_icon' onclick="modal31_action();">
						<input type='button' form='form243_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form243_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form243_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form243_prev' class='prev_icon' data-index='-25' onclick="$('#form243_index').attr('data-index',$(this).attr('data-index')); form243_ini();">
		<div style='display:hidden;' id='form243_index' data-index='0'></div>
		<img src='./images/next.png' id='form243_next' class='next_icon' data-index='25' onclick="$('#form243_index').attr('data-index',$(this).attr('data-index')); form243_ini();">
	</div>
</div>