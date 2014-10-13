<div id='form24' class='function_detail'><b>Create purchase orders</b>
	<form id='form24_master'>
		<fieldset>
			Supplier: <input type='text'>
			Order Date: <input type='text'>
			Estimated Amount: <input type='text'>
			<input type='hidden' value=''>
			<input type='submit' value='Save Order'>
			<input type='button' value='Discard Order' onclick='form24_delete_form();'>
		</fieldset>
	</form>
	<table>
		<thead>
			<tr>
				<form id='form24_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form24_header' onblur="form24_ini('');"></th>
					<th>Quantity</th>
					<th><input type='button' form='form24_header' value='Add item' onclick='form24_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form24_body'>
		</tbody>
	</table>
</div>