<div id='form231' class='function_detail'>
	<form id='form231_master' autocomplete="off">
		<fieldset>
			<label>Patient <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form231_add_customer'><br>
			<input type='text' required name='patient'></label>
			<label>Doctor<br><input type='text' required name='doctor'></label>
			<label>Pres #<br><input type='text' name='p_num' required readonly='readonly'></label>
			<label>Date<br><input type='text' name='date' required readonly='readonly'></label>
			<label>Next Visit<br><input type='text' name='next'></label>			
			<label>
				<input type='hidden' name='pres_id'>
				<input type='hidden' name='age'>
				<input type='hidden' name='sex'>
			</label>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print' name='print' class='print_icon' onclick='form231_print_form();'></label>
			<label>	<input type='button' id='form231_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form231_header'></form>
					<th>Type</th>
					<th>Medicine</th>
					<th>Strength</th>
					<th>Frequency</th>
					<th>Days</th>
					<th><input type='button' form='form231_header' title='Add item' class='add_icon' onclick='form231_add_item();'>
					</th>
			</tr>
		</thead>
		<tbody id='form231_body'>
		</tbody>
		<tfoot id='form231_foot'>
		</tfoot>
	</table>
</div>