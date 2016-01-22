<div id='form264' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form264_header'></form>
					<th>Id </th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form264_header'></th>
					<th>Grid <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form264_header'></th>
					<th>Function </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form264_header'></th>
					<th><input type='button' form='form264_header' title='Add Metric' class='add_icon' onclick='form264_add_item();'>
						<input type='button' form='form264_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form264_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form264_body'>
		</tbody>
	</table>
</div>