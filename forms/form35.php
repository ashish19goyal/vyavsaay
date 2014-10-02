<div class='forms'><b>Manage and create offers</b>
	<table>
		<thead>
			<tr>
				<form id='form35_header'></form>
					<th>Offer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header' onblur="form35_ini('');"></th>
					<th>Offer Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header' onblur="form35_ini('');"></th>
					<th>End Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header' onblur="form35_ini('');"></th>
					<th>Offer Detail</th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form35_header' onblur="form35_ini('');"></th>
					<th><input type='button' form='form35_header' value='Add new offer' onclick='form35_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form35_body'>
		</tbody>
	</table>
</div>