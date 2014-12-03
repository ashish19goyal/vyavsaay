<div id='form88' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form88_header'></form>
					<th>Product <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form88_header' onblur="form88_ini();"></th>
					<th>Process Notes </th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form88_header' onblur="form88_ini();"></th>
					<th>Schedule</th>
					<th>Iteration Notes</th>
					<th><input type='button' form='form88_header' value='Add new product' class='add_icon' onclick='form88_add_item();'>
						<input type='button' form='form88_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form88_header' value='IMPORT' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form88_body'>
		</tbody>
	</table>
</div>