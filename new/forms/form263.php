<div id='form263' class='tab-pane'>
	<form id='form263_master' autocomplete="off">
		<fieldset>	    
		   <label>Grid Name: <input type='text' required name='grid'></label>
		   	<label>	<input type='hidden' name='id'>
		   			<input type='button' class='save_icon' name='save'>
		   	</label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>	
	</form>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form263_header'></form>
					<th style='width:50px'>Order</th>
					<th>Type</th>
					<th>Name</th>
					<th>Display Name</th>
					<th>Onclick</th>
					<th><input type='button' class='add_icon' form='form263_header' title='Add item' onclick='form263_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form263_body'>
		</tbody>
	</table>
</div>