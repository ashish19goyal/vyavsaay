<div class='modal_forms'>
	<div id="modal1" title="Please type your password again">
		<form>
			<input type="password" id="modal1_pass">
			<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>
	
	<div id="modal2" title="Access denied">
		Your don't have permissions to perform this operation.
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
	
	<div id="modal8" title="Specify offer details">
		<form id='modal8_form'>
			<fieldset>
				<label>Offer Applicability <input type='text'></label><br/>
				<label>Product name <input type="text"></label><br/>
				<label>Batch <input type="text"></label><br/>
				<label>Service <input type="text"></label><br/>
				<label>Multiplicity <input type="text"></label><br/>
				<label>Applicability Criteria <input type="text"></label><br/>
				<label>Criteria Amount <input type="number"></label><br/>
				<label>Criteria Quantity <input type="number"></label><br/>
				<label>Incentive <input type="text"></label><br/>
				<label>% <input type="number"></label>
				<label>Rs: <input type="number"></label><br/>
				<label>% <input type="number"></label>
				<label>Quantity <input type="number"></label><br/>
				<label>Free product name <input type="text"></label><br/>
				<label>Free product quantity <input type="number"></label><br/>			
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal9" title="Update asset valuation">
		<form id='modal9_form'>
			<fieldset>
				<label>Date <input type='text'></label><br/>
				<label>Updated Value (in Rs.)<input type="number"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	<div id="modal10" title="Update asset maintenance">
		<form id='modal10_form'>
			<fieldset>
				<label>Date <input type='text'></label><br/>
				<label>Maintenance Activity<input type="textarea"></label><br/>
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
				<label>Type <input type="text"></label><br/>
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
				<label>Name <input type="text"></label><br/>
				<label>Make <input type="text"></label><br/>
				<label>Tags <input type="text"></label><br/>
				<label>Categories <output></output><input type="text"></label><br/>
				<label>Picture <output></output>
								<input type="file"></label><br/>
				<label>Taxable <input type="text"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Estimated Price <input type="text"></label><br/>
				<label>Unit <input type="text"></label><br/>
				<label>Weight (in g) <input type="number"></label><br/>
				<label>Length (in cm) <input type="number"></label><br/>
				<label>Width (in cm) <input type="number"></label><br/>
				<label>Height (in cm) <input type="number"></label><br/>
				<label>Description <input type="textarea"></label><br/>
				<label>Manufactured <input type="text"></label><br/>
				Pre-requisites</br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<label>Tasks <output></output><input type="text"></label><br/>
				Cross-sells</br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
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
	</div>
	
	<div id="modal19" title="Copy product">
		<form id='modal19_form'>
			<fieldset>
				<label>Name <input type="text"></label><br/>
				<label>Make <input type="text"></label><br/>
				<label>Tags <input type="text"></label><br/>
				<label>Categories <output></output><input type="text"></label><br/>
				<label>Picture <output></output>
								<input type="file"></label><br/>
				<label>Taxable <input type="text"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Estimated Price <input type="text"></label><br/>
				<label>Unit <input type="text"></label><br/>
				<label>Weight (in g) <input type="number"></label><br/>
				<label>Length (in cm) <input type="number"></label><br/>
				<label>Width (in cm) <input type="number"></label><br/>
				<label>Height (in cm) <input type="number"></label><br/>
				<label>Description <input type="textarea"></label><br/>
				<label>Manufactured <input type="text"></label><br/>
				Pre-requisites</br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<label>Tasks <output></output><input type="text"></label><br/>
				Cross-sells</br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal20" title="Add new service">
		<form id='modal20_form'>
			<fieldset>
				<label>Name <input type="text"></label><br/>
				<label>Description <input type="textarea"></label><br/>
				<label>Warranty <input type="textarea"></label><br/>
				<label>Tags <input type="text"></label><br/>
				<label>Categories <output></output><input type="text"></label><br/>
				<label>Taxable <input type="text"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Price <input type="text"></label><br/>
				<label>Duration (in min) <input type="number"></label><br/>
				<b>Pre-requisites</b></br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<label>Tasks <output></output><input type="text"></label><br/>
				<label>Assets <output></output><input type="text"></label><br/>
				<b>Cross-sells</b></br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal21" title="Copy service">
		<form id='modal21_form'>
			<fieldset>
				<label>Name <input type="text"></label><br/>
				<label>Description <input type="textarea"></label><br/>
				<label>Warranty <input type="textarea"></label><br/>
				<label>Tags <input type="text"></label><br/>
				<label>Categories <output></output><input type="text"></label><br/>
				<label>Taxable <input type="text"></label><br/>
				<label>Tax (%) <input type="number"></label><br/>
				<label>Price <input type="text"></label><br/>
				<label>Duration (in min) <input type="number"></label><br/>
				<b>Pre-requisites</b></br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<label>Tasks <output></output><input type="text"></label><br/>
				<label>Assets <output></output><input type="text"></label><br/>
				<b>Cross-sells</b></br>
				<label>Products <output></output><input type="text"></label><br/>
				<label>Services <output></output><input type="text"></label><br/>
				<input type="submit" value='Save'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal22" title="Disable offer">
		<form id='modal22_form'>
			<fieldset>
				<label><input type="button" value='Disable all applicable offers'></label><br/>
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
				<input type="file" value='Select file'></br>
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
	
</div>