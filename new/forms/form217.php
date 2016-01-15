<div id='form217' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form217_header'></form>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form217_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form217_header'></th>
					<th>Supplier SkU <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form217_header'></th>
					<th>Margin</th>
					<th><input type="button" value='Add new mapping' form='form217_header' class='add_icon' onclick="form217_add_item();">
						<br><input type='button' form='form217_header' value='EXPORT' class='export_icon'>
						<br><input type='button' form='form217_header' value='Import' name='import' class='import_icon' style='background:#DB0000;border: 2px solid #8B0000;'>
						<input type='submit' form='form217_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form217_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form217_prev' class='prev_icon' data-index='-25' onclick="$('#form217_index').attr('data-index',$(this).attr('data-index')); form217_ini();">
		<div style='display:hidden;' id='form217_index' data-index='0'></div>
		<img src='./images/next.png' id='form217_next' class='next_icon' data-index='25' onclick="$('#form217_index').attr('data-index',$(this).attr('data-index')); form217_ini();">
	</div>
</div>