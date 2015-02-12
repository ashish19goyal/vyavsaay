<div id='form95' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form95_header'></form>
					<th>Form No <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form95_header'></th>
					<th>Form Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form95_header'></th>
					<th>Import <input type='submit' form='form95_header' style='visibility: hidden;'></th>
			</tr>
		</thead>
		<tbody id='form95_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form95_prev' class='prev_icon' data-index='-25' onclick="$('#form95_index').attr('data-index',$(this).attr('data-index')); form95_ini();">
		<div style='display:hidden;' id='form95_index' data-index='0'></div>
		<img src='./images/next.png' id='form95_next' class='next_icon' data-index='25' onclick="$('#form95_index').attr('data-index',$(this).attr('data-index')); form95_ini();">
	</div>
</div>