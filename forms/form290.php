<div id='form290' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form290_header'></form>
					<th>City <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form290_header'></th>
					<th>State <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form290_header'></th>
					<th>Country <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form290_header'></th>
					<th><input type='button' form='form290_header' title='Add new' class='add_icon' onclick='form290_add_item();'>
						<input type='button' form='form290_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form290_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form290_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form290_prev' class='prev_icon' data-index='-25' onclick="$('#form290_index').attr('data-index',$(this).attr('data-index')); form290_ini();">
		<div style='display:hidden;' id='form290_index' data-index='0'></div>
		<img src='./images/next.png' id='form290_next' class='next_icon' data-index='25' onclick="$('#form290_index').attr('data-index',$(this).attr('data-index')); form290_ini();">
	</div>
</div>