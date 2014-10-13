<div id='form5' class='function_detail'><b>Manage Assets</b>
	<table>
		<thead>
			<tr>
				<form id='form5_header'></form>
					<th>Asset Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Date Incorporated</th>
					<th>Owner <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Value</th>
					<th>Maintenance</th>
					<th><input type='button' form='form5_header' value='Add item' onclick='form5_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form5_body'>
		</tbody>
	</table>
</div>