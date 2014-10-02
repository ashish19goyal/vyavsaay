<div class='forms'><b>manage staff information</b>
	<table>
		<thead>
			<tr>
				<form id='form8_header'></form>
					<th>Staff Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header' onblur="form8_ini('');"></th>
					<th>Skills</th>
					<th>Joining Date</th>
					<th>Variable compensation Rate</th>
					<th>Fixed Compensation</th>
					<th>Status</th>
					<th><input type='button' form='form8_header' value='Add new staff' onclick='form8_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form8_body'>
		</tbody>
	</table>
</div>