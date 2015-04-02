<div id='form87' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form87_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form87_header'></th>
					<th>Make <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form87_header'></th>
					<th>Description</th>
					<th>Tax</th>
					<th><input type='button' form='form87_header' title='Add new product' class='add_icon' onclick='modal14_action();'>
						<input type='button' form='form87_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form87_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form87_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form87_prev' class='prev_icon' data-index='-25' onclick="$('#form87_index').attr('data-index',$(this).attr('data-index')); form87_ini();">
		<div style='display:hidden;' id='form87_index' data-index='0'></div>
		<img src='./images/next.png' id='form87_next' class='next_icon' data-index='25' onclick="$('#form87_index').attr('data-index',$(this).attr('data-index')); form87_ini();">
	</div>
</div>