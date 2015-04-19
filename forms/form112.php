<div id='form112' class='function_detail'>
	<form id='form112_master'>
		<fieldset>	    
		   <label>Customer <img src='./images/add_image.png' class='add_image' id='form112_add_customer'><br>
			<input type='text' required></label>
			<label>Date<br><input type='text' required></label>
			<label>
				<input type='button' class='save_icon'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form112_header'></form>
					<th>Item Name</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form112_header' title='Add item' onclick='form112_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form112_body'>
		</tbody>
	</table>
</div>