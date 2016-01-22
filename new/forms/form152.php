<div id='form152' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form152_header'></form>
					<th>Quot #<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form152_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form152_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form152_header'></th>
					<th>Date</th>
					<th>Amount</th>
					<th><input type='button' form='form152_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form152_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form152_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form152_prev' class='prev_icon' data-index='-25' onclick="$('#form152_index').attr('data-index',$(this).attr('data-index')); form152_ini();">
		<div style='display:hidden;' id='form152_index' data-index='0'></div>
		<img src='./images/next.png' id='form152_next' class='next_icon' data-index='25' onclick="$('#form152_index').attr('data-index',$(this).attr('data-index')); form152_ini();">
	</div>
</div>