<div id='form93' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form93_header'></form>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form93_header' onblur="form93_ini();"></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form93_header' onblur="form93_ini();"></th>
					<th>Loan Amount</th>
					<th>Details</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form93_header' onblur="form93_ini();"></th>
					<th><input type='button' form='form93_header' value='Add new loan' class='add_icon' onclick='modal39_action();'>
						<input type='button' form='form93_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form93_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form93_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form93_prev' class='prev_icon' data-index='-25' onclick="$('#form93_index').attr('data-index',$(this).attr('data-index')); form93_ini();">
		<div style='display:hidden;' id='form93_index' data-index='0'></div>
		<img src='./images/next.png' id='form93_next' class='next_icon' data-index='25' onclick="$('#form93_index').attr('data-index',$(this).attr('data-index')); form93_ini();">
	</div>
</div>