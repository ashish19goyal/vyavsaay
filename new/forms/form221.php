<div id='form221' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form221_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form221_header'></th>
					<th>Project <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form221_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form221_header'></th>
					<th>Hours </th>
					<th><input type="button" value='Add new' class='add_icon' form='form221_header' onclick="form221_add_item();">
						<input type='submit' form='form221_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form221_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form221_prev' class='prev_icon' data-index='-25' onclick="$('#form221_index').attr('data-index',$(this).attr('data-index')); form221_ini();">
		<div style='display:hidden;' id='form221_index' data-index='0'></div>
		<img src='./images/next.png' id='form221_next' class='next_icon' data-index='25' onclick="$('#form221_index').attr('data-index',$(this).attr('data-index')); form221_ini();">
	</div>
</div>