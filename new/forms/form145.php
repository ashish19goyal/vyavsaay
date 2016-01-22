<div id='form145' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form145_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form145_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form145_header'></th>
					<th>Quantity </th>
					<th>Store </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form145_header'></th>
					<th><input type="button" value='Add new' class='add_icon' form='form145_header' onclick="form145_add_item();">
						<input type='button' form='form145_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form145_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form145_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form145_prev' class='prev_icon' data-index='-25' onclick="$('#form145_index').attr('data-index',$(this).attr('data-index')); form145_ini();">
		<div style='display:hidden;' id='form145_index' data-index='0'></div>
		<img src='./images/next.png' id='form145_next' class='next_icon' data-index='25' onclick="$('#form145_index').attr('data-index',$(this).attr('data-index')); form145_ini();">
	</div>
</div>