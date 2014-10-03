<div class='forms'><b>Manage Services</b>
	<table>
		<thead>
			<tr>
				<form id='form57_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form57_header' onblur="form57_ini('');"></th>
					<th>Description </th>
					<th>Estimated Cost </th>
					<th><input type="button" value='Add new service' form='form57_header' onclick="form57_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form57_body'>
		</tbody>
	</table>
</div>