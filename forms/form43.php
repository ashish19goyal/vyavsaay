<div id='form43' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form43_header'></form>
					<th>Order #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header'></th>
					<th>Order Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header'></th>
					<th>Quantity</th>
					<th>
						<input type='button' form='form43_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form43_header' value='IMPORT' name='import' class='import_icon'>
						<input type='submit' form='form43_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form43_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form43_prev' class='prev_icon' data-index='-25' onclick="$('#form43_index').attr('data-index',$(this).attr('data-index')); form43_ini();">
		<div style='display:hidden;' id='form43_index' data-index='0'></div>
		<img src='./images/next.png' id='form43_next' class='next_icon' data-index='25' onclick="$('#form43_index').attr('data-index',$(this).attr('data-index')); form43_ini();">
	</div>
</div>