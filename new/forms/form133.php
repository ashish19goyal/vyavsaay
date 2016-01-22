<div id='form133' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form133_header'></form>
					<th>Request Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form133_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form133_header'></th>
					<th>File</th>
					<th><input type='button' form='form133_header' title='Add new document' class='add_icon' onclick='modal9_action();'>
						<input type='submit' form='form133_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form133_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form133_prev' class='prev_icon' data-index='-25' onclick="$('#form133_index').attr('data-index',$(this).attr('data-index')); form133_ini();">
		<div style='display:hidden;' id='form133_index' data-index='0'></div>
		<img src='./images/next.png' id='form133_next' class='next_icon' data-index='25' onclick="$('#form133_index').attr('data-index',$(this).attr('data-index')); form133_ini();">
	</div>
</div>