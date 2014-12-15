<div id='form56' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form56_header'></form>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form56_header' onblur="form56_ini('');"></th>
					<th>Account <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form56_header' onblur="form56_ini('');"></th>
					<th>Amount</th>
					<th>Notes</th>
					<th><input type="button" value='Add expense item' form='form56_header' class='add_icon' onclick="form56_add_item();">
						<input type='button' form='form56_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form56_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form56_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form56_prev' class='prev_icon' data-index='-25' onclick="$('#form56_index').attr('data-index',$(this).attr('data-index')); form56_ini();">
		<div style='display:hidden;' id='form56_index' data-index='0'></div>
		<img src='./images/next.png' id='form56_next' class='next_icon' data-index='25' onclick="$('#form56_index').attr('data-index',$(this).attr('data-index')); form56_ini();">
	</div>
</div>