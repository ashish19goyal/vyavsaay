<div id='form291' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form291_header'></form>
					<th>Receipt Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form291_header'></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form291_header'></th>
					<th>Amount</th>
					<th>Narration</th>
					<th>Documents</th>
					<th><input type="button" value='Add Receipt' form='form291_header' class='add_icon' onclick="modal155_action();">
						<input type="button" value='Delete Receipt' form='form291_header' class='delete_icon' onclick="modal31_action();">
						<input type='button' form='form291_header' value='EXPORT' class='export_icon' name='export'>
						<input type='submit' form='form291_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form291_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form291_prev' class='prev_icon' data-index='-25' onclick="$('#form291_index').attr('data-index',$(this).attr('data-index')); form291_ini();">
		<div style='display:hidden;' id='form291_index' data-index='0'></div>
		<img src='./images/next.png' id='form291_next' class='next_icon' data-index='25' onclick="$('#form291_index').attr('data-index',$(this).attr('data-index')); form291_ini();">
	</div>
</div>