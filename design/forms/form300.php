<div id='form300' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form300_header'></form>
					<th>Model <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form300_header'></th>
					<th>Company <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form300_header'></th>
					<th>Category <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form300_header'></th>
					<th>Description</th>
					<th>Picture</th>
					<th><input type='button' form='form300_header' name='add' title='Add new product' class='add_icon'>
						<input type='button' form='form300_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form300_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form300_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form300_prev' class='prev_icon' data-index='-25' onclick="$('#form300_index').attr('data-index',$(this).attr('data-index')); form300_ini();">
		<div style='display:hidden;' id='form300_index' data-index='0'></div>
		<img src='./images/next.png' id='form300_next' class='next_icon' data-index='25' onclick="$('#form300_index').attr('data-index',$(this).attr('data-index')); form300_ini();">
	</div>
</div>