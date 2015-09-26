<div id='form172' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form172_header'></form>
					<th style='width:100px;'>Channel <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form172_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form172_header'></th>
					<th>Price</th>
					<th>Channel Charges</th>
					<th>Profit</th>
					<th><input type='button' form='form172_header' value='Add new item' class='add_icon' onclick='form172_add_item();'>
						<input type='button' form='form172_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form172_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form172_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form172_prev' class='prev_icon' data-index='-25' onclick="$('#form172_index').attr('data-index',$(this).attr('data-index')); form172_ini();">
		<div style='display:hidden;' id='form172_index' data-index='0'></div>
		<img src='./images/next.png' id='form172_next' class='next_icon' data-index='25' onclick="$('#form172_index').attr('data-index',$(this).attr('data-index')); form172_ini();">
	</div>
</div>