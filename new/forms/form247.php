<div id='form247' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form247_header'></form>
					<th>Pincode <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form247_header'></th>
					<th>Zone <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form247_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form247_header'></th>
					<th><input type="button" value='Add pincode' form='form247_header' class='add_icon' onclick="form247_add_item();">
						<input type='button' form='form247_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form247_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form247_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form247_prev' class='prev_icon' data-index='-25' onclick="$('#form247_index').attr('data-index',$(this).attr('data-index')); form247_ini();">
		<div style='display:hidden;' id='form247_index' data-index='0'></div>
		<img src='./images/next.png' id='form247_next' class='next_icon' data-index='25' onclick="$('#form247_index').attr('data-index',$(this).attr('data-index')); form247_ini();">
	</div>
</div>