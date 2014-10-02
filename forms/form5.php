<div class='forms'><b>Manage and add assets</b>
	<table>
		<thead>
			<tr>
				<form id='form5_header'></form>
					<th>Asset Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Date of incorporation</th>
					<th>Owner <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Value</th>
					<th><input type='button' form='form5_header' value='Add item' onclick='form5_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form5_body'>
		</tbody>
	</table>
	<script>
		function form5_add_maintenance(button)
		{}
	</script>
	
</div>