<div id='form262' class='tab-pane'>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form262_header'></form>
					<th style='width:60px'>Order </th>
					<th>Grid <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form262_header'></th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form262_header'></th>
					<th>Color </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form262_header'></th>
					<th><input type='button' form='form262_header' title='Add Grid' class='add_icon' onclick='form262_add_item();'>
						<input type='button' form='form262_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form262_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form262_body'>
		</tbody>
	</table>
</div>