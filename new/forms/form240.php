<div id='form240' class='tab-pane'>
	<form id='form240_master' autocomplete="off">
		<fieldset>	    
		   <label>Item: <input type='text' required name='item_name'></label>
		   <label># of raw materials: <input type='number' readonly='readonly' name='num'></label>
			<label>	<input type='button' class='save_icon' name='save'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form240_header'></form>
					<th style='width:50px'>S.No.</th>
					<th>Raw Material</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form240_header' title='Add item' onclick='form240_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form240_body'>
		</tbody>
	</table>
</div>