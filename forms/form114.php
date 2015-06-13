<div id='form114' class='function_detail'>
	<form id='form114_master'>
		<fieldset>	    
		    <label>Supplier	<img src='./images/add_image.png' class='add_image' id='form114_add_supplier'><br>
			<input type='text' required></label>
			<label>Date<br><input type='text' required></label>
			<label>	<input type='button' class='save_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form114_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Amount</th>
					<th>Storage</th>
					<th><input type='button' class='add_icon' form='form114_header' title='Add item' onclick='form114_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form114_body'>
		</tbody>
	</table>
</div>