<div id='form106' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form106_header'></form>
					<th>Form No <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form106_header'></th>
					<th>Form Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form106_header'></th>
					<th>Export <input type='submit' form='form106_header' style='visibility: hidden;'></th>
			</tr>
		</thead>
		<tbody id='form106_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form106_prev' class='prev_icon' data-index='-25' onclick="$('#form106_index').attr('data-index',$(this).attr('data-index')); form106_ini();">
		<div style='display:hidden;' id='form106_index' data-index='0'></div>
		<img src='./images/next.png' id='form106_next' class='next_icon' data-index='25' onclick="$('#form106_index').attr('data-index',$(this).attr('data-index')); form106_ini();">
	</div>
</div>