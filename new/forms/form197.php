<div id='form197' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form197_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form197_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form197_header'></th>
					<th><input type="button" value='Add new mapping' form='form197_header' class='add_icon' onclick="form197_add_item();">
						<input type='button' form='form197_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form197_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form197_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form197_prev' class='prev_icon' data-index='-25' onclick="$('#form197_index').attr('data-index',$(this).attr('data-index')); form197_ini();">
		<div style='display:hidden;' id='form197_index' data-index='0'></div>
		<img src='./images/next.png' id='form197_next' class='next_icon' data-index='25' onclick="$('#form197_index').attr('data-index',$(this).attr('data-index')); form197_ini();">
	</div>
</div>