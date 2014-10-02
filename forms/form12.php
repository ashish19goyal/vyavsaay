<div class='forms'><b>Create bills</b>
	<form id='form12_master'>
		<fieldset>
			Customer<input type='text'>
			Bill Date<input type='text'>
			Total Amount<input type='text'>
			<input type='hidden' value=''>
			<input type='button' value='New Bill' onclick='form12_new_form();'>
			<input type='button' value='Save Bill' onclick='form12_save_form();'>
			<input type='button' value='Discard Bill' onclick='form12_delete_form();'>
			<input type='button' value='Print Bill' onclick='form12_print_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form12_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form12_header' onblur="form12_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form12_header' onblur="form12_ini('');"></th>
					<th>Price</th>
					<th>Quantity</th>
					<th><input type='button' form='form12_header' value='Add item' onclick='form12_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form12_body'>
		</tbody>
	</table>
</div>