<div id='form258' class='function_detail'>
	<form id='form258_master' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' required name='customer'></label>
			<label>Quotation #<br><input type='text' readonly="readonly" required name='quot_num'></label>
			<label>Type<br><input type='text' name='type'></label>
			<br><label>Date<br><input type='text' name='date'></label>
			<label>Valid Upto<br><input type='text' name='valid'></label>
			<label>Issued By<br><input type='text' name='issued'></label>
			<br>
			<label>Status<br><input type='text' name='status'></label>
			<label>	
				<input type='hidden' name='id'>
				<input type='hidden' name='address'>	
			</label>
			<label>	<input type='button' title='Save' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' onclick='form258_print_form();'></label>
			<label>	<input type='button' title='Email' class='share_icon' name='share'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<br>
	<b>Items</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_item_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Item</th>
					<th>Quantity </th>
					<th>Price </th>
					<th>Amount </th>
					<th><input type='button' class='add_icon' form='form258_item_header' title='Add Item' onclick='form258_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form258_item_body'>
		</tbody>
		<tfoot id='form258_item_foot'>
		</tfoot>
	</table>
	
	<br>
	<b>Spare Parts</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_spare_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Part Name</th>
					<th>Description</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form258_spare_header' title='Add' onclick='form258_add_spare();'></th>
			</tr>
		</thead>
		<tbody id='form258_spare_body'>
		</tbody>
	</table>

	<br>
	<b>Specifications <input type='checkbox' id='checkbox_form258_spec' name='specs'></b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_spec_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Item </th>
					<th>Specification</th>
					<th>Detail</th>
					<th><input type='button' class='add_icon' form='form258_spec_header' title='Add Specification' onclick='form258_add_spec();'></th>			
			</tr>
		</thead>
		<tbody id='form258_spec_body'>
		</tbody>
	</table>

	<br>
	<b>Bank Accounts</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_bank_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Name</th>
					<th>Bank</th>
					<th>Account</th>
					<th><input type='button' class='add_icon' form='form258_bank_header' title='Add' onclick='form258_add_bank();'></th>
			</tr>
		</thead>
		<tbody id='form258_bank_body'>
		</tbody>
	</table>

	<br>
	<b>Terms & Conditions</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_tc_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Type</th>
					<th>T & C</th>
					<th><input type='button' class='add_icon' form='form258_tc_header' title='Add' onclick='form258_add_tc();'></th>
			</tr>
		</thead>
		<tbody id='form258_tc_body'>
		</tbody>
	</table>

</div>