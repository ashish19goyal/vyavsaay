<div class='modal_forms'>
	<div id="modal1" title="Please type your password again">
		<form>
			<input type="password" id="modal1_pass" required>
			<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>
	
	<div id="modal2" title="Access denied">
		You don't have permissions to perform this operation.
		To allow this operation, ask your administrator to update your access control.
	</div>
	
	<div id="modal3" title="Saved">
		Saved Successfully!
	</div>
	
	<div id="modal4" title="Deleted">
		Deleted successfully!
	</div>
	
	<div id="modal5" title="Duplicate Entry">
		This operation will result in a duplicate entry. Operation aborted.
		Please validate whether the required record already exists or try again with different parameters (e.g. different name).
	</div>
	<div id="modal6" title="Required fields missing">
		One or more required fields are missing. Operation aborted.
	</div>
	
	<div id="modal7" title="Offer finished">
		Offer will not be applicable on this purchase as the offered product is out of stock.
	</div>
	
	<div id="modal8" title="Add new Offer">
		<form id='modal8_form'>
			<fieldset>
				<label>Name<input type='text' required></label><br/>
				<label>End Date<input type='text'></label><br/>
				<label>Type<input type='text' required></label><br/>
				<label>Product name <input type="text"></label><br/>
				<label>Batch <input type="text"></label>
				<label><input type='checkbox'>Select All batches</label><br/>
				<label>Service <input type="text"></label><br/>
				<label>Applicability Criteria <input type="text" required></label><br/>
				<label>Criteria Amount <input type="number"></label><br/>
				<label>Criteria Quantity <input type="number"></label><br/>
				<label>Incentive <input type="text" required></label><br/>
				<label>% <input type="number"></label>
				<label>Rs: <input type="number"></label><br/>
				<label>% <input type="number"></label>
				<label>Quantity <input type="number"></label><br/>
				<label>Free product name <input type="text"></label><br/>
				<label>Free product quantity <input type="number"></label><br/>			
				<label>Free service name <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal9" title="Update asset details">
		<form id='modal9_form'>
			<fieldset>
				<label>Name <input type='text' required></label><br/>
				<label>Type <input type='text' required></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Date of incorporation <input type='text'></label><br/>
				<label>Make <input type='text'></label><br/>
				<label>Ownership Type <input type='text'></label><br/>
				<label>Ownership Contract <textarea></textarea></label><br/>
				<label>Maintained By <input type='text'></label><br/>
				<label>Maintenance Contract <input type='text'></label><br/>
				<label>Maintenance Activities <input type='text'></label><br/>
				<label>Initial Value (in Rs.)<input type='number'></label><br/>
				<label>Current Value (in Rs.)<input type='text'></label><br/>
				<label>Asset Location <input type='text'></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal10" title="Add new asset">
		<form id='modal10_form'>
			<fieldset>
				<label>Name <input type='text' required></label><br/>
				<label>Type <input type='text' required></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Date of incorporation <input type='text'></label><br/>
				<label>Make <input type='text'></label><br/>
				<label>Ownership Type <input type='text'></label><br/>
				<label>Ownership Contract <textarea></textarea></label><br/>
				<label>Maintained By <input type='text'></label><br/>
				<label>Maintenance Contract <textarea></textarea></label><br/>
				<label>Maintenance Contact <input type='text'></label><br/>
				<label>Maintenance Activities <textarea></textarea></label><br/>
				<label>Initial Value (in Rs.)<input type='number'></label><br/>
				<label>Current Value (in Rs.)<input type='number'></label><br/>
				<label>Asset Location <textarea></textarea></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal11" title="Add new customer">
		<form id='modal11_form'>
			<fieldset>
				<label>Name <input type='text' required></label><br/>
				<label>Phone <input type="tel"></label><br/>
				<label>Email <input type="email"></label><br/>
				<label>Address <textarea></textarea></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text"></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<label>Notes <textarea></textarea></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal12" title="Add new account">
		<form id='modal12_form'>
			<fieldset>
				<label>Name <input type='text'></label><br/>
				<label>Description <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal13" title="Add new supplier">
		<form id='modal13_form'>
			<fieldset>
				<label>Name <input type='text' required></label><br/>
				<label>Phone <input type="text"></label><br/>
				<label>Email <input type="text"></label><br/>
				<label>Address <textarea></textarea></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text"></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<label>Notes <textarea></textarea></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal14" title="Add new product">
		<form id='modal14_form'>
			<fieldset>
				<label>Name <input type="text" required></label><br/>
				<label>Make <input type="text"></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Picture <output></output>
								<input type="file"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Bar Code <input type="text" required></label>
				<label><input type='checkbox' checked>Auto generate</label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal15" title="Provide feedback">
		<form id='modal15_form'>
			<fieldset>
				<label>Feedback provider <input type='text'></label><br/>
				<label>Detail <input type="text"></label><br/>
				<label>Type <input type="text"></label><br/>
				<label>Rating <input type="text"></label><br/>
				<label>Date <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal16" title="Add new staff">
		<form id='modal16_form'>
			<fieldset>
				<label>Name <input type='text' required></label><br/>
				<label>Phone <input type="text"></label><br/>
				<label>Email <input type="text"></label><br/>
				<label>Address <textarea></textarea></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text"></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<label>Joining Date <input type="text" required></label><br/>
				<label>Qualification <textarea></textarea></label><br/>
				<label>Skills <textarea></textarea></label><br/>
				<label>Fixed Compensation (Rs./month)<input type="number" value='10000' required></label><br/>
				<label>Variable Compensation Rate (Rs./hour)<input type="number" value='50' required></label><br/>
				<label>Monthly work hours <input type="number" required value='180'></label><br/>
				<label>PTOs Allowed <input type="text" required value='0'></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal17" title="Add staff details">
		<form id='modal17_form'>
			<fieldset>
				<label>Address <input type="text"></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text"></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<label>Joining Date <input type="text"></label><br/>
				<label>Qualification <textarea></textarea></label><br/>
				<label>Skills <textarea></textarea></label><br/>
				<label>Fixed Compensation (Rs./month)<input type="number"></label><br/>
				<label>Variable Compensation Rate (Rs./hour)<input type="number"></label><br/>
				<label>Monthly work hours <input type="number"></label><br/>
				<label>PTOs Allowed <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal18" title="Add task type">
		<form id='modal18_form'>
			<fieldset>
				<label>Name <input type="text" required></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Estimated Hours <input type="number" step='any' required></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal19" title="Copy product">
		<form id='modal19_form'>
			<fieldset>
				<label>Name <input type="text" required></label><br/>
				<label>Make <input type="text"></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Picture <output></output>
								<input type="file"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Bar Code <input type="text" required></label>
				<label><input type='checkbox' checked>Auto generate</label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal20" title="Add new service">
		<form id='modal20_form'>
			<fieldset>
				<label>Name <input type="text" required></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Price <input type="number"></label><br/>
				<label>Duration (in min) <input type="number"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal21" title="Copy service">
		<form id='modal21_form'>
			<fieldset>
				<label>Name <input type="text"></label><br/>
				<label>Description <textarea></textarea></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Price <input type="number"></label><br/>
				<label>Duration (in min) <input type="number"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal22" title="Add new batch">
		<form id='modal22_form'>
			<fieldset>
				<label>Product Name <input type="text" required></label><br/>
				<label>Batch <input type='text' required></label><br/>
				<label>Cost price <input type="number" required></label><br/>
				<label>Sale Price <input type="number" required></label><br/>
				<label>Expiry Date <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal23" title="Data Import">
		<form id='modal23_form'>
			<fieldset>
				<input type="button" value='Download import template'><br/>
				<b>Import pre-filled template</b></br>
				<label><input type="radio" name='upload_option' value='new'>Create New Records</label></br>
				<label><input type="radio" name='upload_option' value='existing' checked>Update existing Records</label></br>
				<input type="file" value='Select file' accept=".csv|.txt"></br>
				<output name='selected_file'></output></br>
				<input type="submit" value='Import'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal24" title="Update Customer Address">
		<form id='modal24_form'>
			<fieldset>
				<label>Address <textarea></textarea></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text" required></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal25" title="Update Supplier Address">
		<form id='modal25_form'>
			<fieldset>
				<label>Address <textarea></textarea></label><br/>
				<label>Street <input type="text"></label><br/>
				<label>City <input type="text" required></label><br/>
				<label>State <input type="text"></label><br/>
				<label>Country <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal26" title="Payment Details">
		<form id='modal26_form'>
			<fieldset>
				<label>Customer <input type='text' required readonly='readonly'></label><br/>
				<label>Total Amount <input type="number" required readonly='readonly' step='any'></label><br/>
				<label>Amount Paid<input type="number" required step='any'></label><br/>
				<label>Due Date <input type="text"></label><br/>
				<label>Mode of Payment <input type="text"></label><br/>
				<label>Status<input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal27" title="Order product">
		<form id='modal27_form'>
			<fieldset>
				<label>Product Name <input type='text' required readonly='readonly'></label><br/>
				<label>Make <input type="text" required readonly='readonly'></label><br/>
				<label>Cost Price <input type="number" step='any' readonly='readonly'></label><br/>
				<label>Quantity <input type="number" step='any' requried></label><br/>
				<label>Supplier <input type="text" required></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>

	<div id="modal28" title="Payment Details">
		<form id='modal28_form'>
			<fieldset>
				<label>Supplier <input type='text' required readonly='readonly'></label><br/>
				<label>Total Amount <input type="number" required readonly='readonly' step='any'></label><br/>
				<label>Amount Paid<input type="number" required step='any'></label><br/>
				<label>Due Date <input type="text"></label><br/>
				<label>Mode of Payment <input type="text"></label><br/>
				<label>Status<input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal29" title="Payment Details">
		<form id='modal29_form'>
			<fieldset>
				<label>Bill Id <input type='text' readonly='readonly'></label><br/>
				<label>Date Closed<input type="text" readonly='readonly'></label><br/>
				<label>Mode of Payment <input type="text"></label><br/>
				<label>Due Date <input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal30" title="Add user">
		<form id='modal30_form'>
			<fieldset>
				<label>Login Id <input type='text' required></label><br/>
				<label>Name <input type="text" required></label><br/>
				<label>Password <input type="password" required></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal31" title="Delete user">
		<form id='modal31_form'>
			<fieldset>
				<label>Login Id <input type='text' required></label><br/>
				<input type="submit" value='Delete'>
			</fieldset>
		</form>
	</div>

	<div id="modal32" title="Add task">
		<form id='modal32_form'>
			<fieldset>
				<label>Task <input type='text' required></label><br/>
				<label>Assignee <input type="text"></label><br/>
				<label>Due time <input type="text"></label><br/>
				<label>Status <input type="text" required value='pending'></label><br/>
				<input type='hidden'>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>

	<div id="modal33" title="Update task">
		<form id='modal33_form'>
			<fieldset>
				<label>Task <input type='text' readonly="readonly" required></label><br/>
				<label>Assignee <input type="text"></label><br/>
				<label>Due time <input type="text"></label><br/>
				<label>Status <input type="text" required value='pending'></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal50" title="Sending Mails">
		<a href='' id='modal50_sendmail'>Send mails through Gmail</a>
	</div>
	
	<div id="modal51" title="Merging Records">
		Merging records. 
		You can close this window at any time. The process will continue in the background.
	</div>
	
		
</div>
