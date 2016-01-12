<div id='form282' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form282_header'></form>
					<th>Receipt Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form282_header'></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form282_header'></th>
					<th>Amount</th>
					<th>Narration</th>
					<th>Documents</th>
					<th><input type="button" value='Add Receipt' form='form282_header' class='add_icon' onclick="modal172_action();">
						<input type="button" value='Delete Receipt' form='form282_header' class='delete_icon' onclick="modal31_action();">
						<input type='button' form='form282_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form282_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form282_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form282_prev' class='prev_icon' data-index='-25' onclick="$('#form282_index').attr('data-index',$(this).attr('data-index')); form282_ini();">
		<div style='display:hidden;' id='form282_index' data-index='0'></div>
		<img src='./images/next.png' id='form282_next' class='next_icon' data-index='25' onclick="$('#form282_index').attr('data-index',$(this).attr('data-index')); form282_ini();">
	</div>
</div>