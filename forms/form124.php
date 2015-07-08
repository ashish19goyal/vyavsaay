<div id='form124' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form124_header'></form>
					<th>Receipt Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form124_header'></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form124_header'></th>
					<th>Amount</th>
					<th><input type="button" value='Add Receipt' form='form124_header' class='add_icon' onclick="modal30_action();">
						<input type="button" value='Delete Receipt' form='form124_header' class='delete_icon' onclick="modal31_action();">
						<input type='button' form='form124_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form124_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form124_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form124_prev' class='prev_icon' data-index='-25' onclick="$('#form124_index').attr('data-index',$(this).attr('data-index')); form124_ini();">
		<div style='display:hidden;' id='form124_index' data-index='0'></div>
		<img src='./images/next.png' id='form124_next' class='next_icon' data-index='25' onclick="$('#form124_index').attr('data-index',$(this).attr('data-index')); form124_ini();">
	</div>
</div>