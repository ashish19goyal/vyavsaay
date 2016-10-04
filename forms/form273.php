<div id='form273' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form273_header'></form>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form273_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form273_header'></th>
					<th>Price </th>
					<th>Comments <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form273_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form273_header'></th>
					<th><input type='button' form='form273_header' title='Add new' class='add_icon' onclick='form273_add_item();'>
						<input type='button' form='form273_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form273_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form273_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form273_prev' class='prev_icon' data-index='-25' onclick="$('#form273_index').attr('data-index',$(this).attr('data-index')); form273_ini();">
		<div style='display:hidden;' id='form273_index' data-index='0'></div>
		<img src='./images/next.png' id='form273_next' class='next_icon' data-index='25' onclick="$('#form273_index').attr('data-index',$(this).attr('data-index')); form273_ini();">
	</div>
</div>