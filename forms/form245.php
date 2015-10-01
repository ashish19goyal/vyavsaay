<div id='form245' class='function_detail'>
	<form id='form245_master' autocomplete="off">
		<fieldset>
		   <label>Item: <input type='text' required name='item_name'></label>
		   	<label>	<input type='button' class='save_icon' name='save'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form245_header'></form>
					<th style='width:50px'>S.No.</th>
					<th>SKU</th>
					<th>Item Name</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form245_header' title='Add item' onclick='form245_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form245_body'>
		</tbody>
	</table>
</div>