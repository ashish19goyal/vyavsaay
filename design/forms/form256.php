<div id='form256' class='function_detail'>
	<form id='form256_master' autocomplete="off">
		<fieldset>
		   <label>Item: <input type='text' required name='item_name'></label>
		   <label>Batch: <input type='text' required name='batch'></label>
		   	<label>	<input type='button' class='save_icon' name='save'></label>
			<br>
			<label>Quantity: <input type='text' readonly='readonly' name='quantity'></label>
		   <label>Production Plan: <input type='text' readonly='readonly' name='pplan' value'Go To Prodcution Plan'></label>
		   <label>Brand: <input type='text' readonly='readonly' name='brand'></label>
		   <label>	
			   <input type='hidden' name='id'>
			   <input type='submit' class='submit_hidden'>			
			</label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form256_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form256_header' title='Add item' onclick='form256_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form256_body'>
		</tbody>
	</table>
</div>