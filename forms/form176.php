<div id='form176' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form176_header'></form>
					<th>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form176_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form176_header'></th>
					<th>Category <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form176_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form176_header'></th>
					<th>
						<input type='button' form='form176_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form176_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form176_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form176_prev' class='prev_icon' data-index='-25' onclick="$('#form176_index').attr('data-index',$(this).attr('data-index')); form176_ini();">
		<div style='display:hidden;' id='form176_index' data-index='0'></div>
		<img src='./images/next.png' id='form176_next' class='next_icon' data-index='25' onclick="$('#form176_index').attr('data-index',$(this).attr('data-index')); form176_ini();">
	</div>
</div>