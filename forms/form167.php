<div id='form167' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form167_header'></form>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form167_header'></th>
					<th>Parent <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form167_header'></th>
					<th>Default Dimensions</th>
					<th>Unit</th>
					<th><input type='button' form='form167_header' title='Add new' class='add_icon' onclick='form167_add_item();'>
						<input type='button' form='form167_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form167_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form167_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form167_prev' class='prev_icon' data-index='-25' onclick="$('#form167_index').attr('data-index',$(this).attr('data-index')); form167_ini();">
		<div style='display:hidden;' id='form167_index' data-index='0'></div>
		<img src='./images/next.png' id='form167_next' class='next_icon' data-index='25' onclick="$('#form167_index').attr('data-index',$(this).attr('data-index')); form167_ini();">
	</div>
</div>