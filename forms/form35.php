<div id='form35' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form35_header'></form>
					<th>Offer Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header'></th>
					<th>Offer Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header'></th>
					<th>End Date</th>
					<th>Offer Detail</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header' onblur="form35_ini('');"></th>
					<th><input type='button' form='form35_header' value='Add new offer' class='add_icon' onclick='modal8_action();'>
						<input type='button' form='form35_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form35_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form35_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form35_prev' class='prev_icon' data-index='-25' onclick="$('#form35_index').attr('data-index',$(this).attr('data-index')); form35_ini();">
		<div style='display:hidden;' id='form35_index' data-index='0'></div>
		<img src='./images/next.png' id='form35_next' class='next_icon' data-index='25' onclick="$('#form35_index').attr('data-index',$(this).attr('data-index')); form35_ini();">
	</div>
</div>