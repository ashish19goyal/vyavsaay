<div class='modal_forms'>
	<div id="modal1" title="Enter password again">
		<form>
			<input type="password" id="modal1_pass" required>
			<input type="submit" class='modal_submit' tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>


	<div id="modal8" title="Add new Offer">
		<form id='modal8_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>End Date: <input type='text'></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Product name: <input type="text"></label><br>
				<label>Batch: <input type="text"></label>
				<label><input type='checkbox'>Select All batches</label><br>
				<label>Service: <input type="text"></label><br>
				<label>Applicability Criteria: <input type="text" required></label><br>
				<label>Criteria Amount: Rs. <input type="number"></label><br>
				<label>Criteria Quantity: <input type="number"></label><br>
				<label>Incentive: <input type="text" required></label><br>
				<label>%: <input type="number"></label>
				<label>Rs: <input type="number"></label><br>
				<label>%: <input type="number"></label>
				<label>Quantity: <input type="number"></label><br>
				<label>Free product name: <input type="text"></label><br>
				<label>Free product quantity: <input type="number"></label><br>
				<label>Free service name: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal9" title="Add document">
		<form id='modal9_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" required></label><br>
				<label>Document Name: <input type="text"></label><br>
				<label>File: <a id='modal9_url'>link</a>
						<input type="file"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal10" title="Add new asset">
		<form id='modal10_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label id='modal10_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal11' data-toggle="modal" id='modal11_link'></a>
	<div id="modal11" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal11_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add New Customer</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal11_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Phone</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal11_form' name='phone'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Email</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal11_form' name='email'></div>
					     		</div>
		              <div class="row">
								   <div class="col-sm-12 col-md-4">Address</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal11_form' name='address'></textarea></div>
					     		</div>
		              <div id='modal11_attributes'></div>
		              </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal11_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal11_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal12' data-toggle="modal" id='modal12_link'></a>
	<div id="modal12" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal12_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new account</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal12_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal12_form' name='desc'></textarea></div>
					     		</div>
		                  <div id='modal12_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal12_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal12_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal13' data-toggle="modal" id='modal13_link'></a>
	<div id="modal13" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal13_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Supplier</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal13_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Phone</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal13_form' name='phone'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Email</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal13_form' name='email'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Address</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal13_form' name='address'></textarea></div>
					     		</div>
		                  <div id='modal13_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal13_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal13_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal14' data-toggle="modal" id='modal14_link'></a>
	<div id="modal14" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal14_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Product</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal14_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Make</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal14_form' name='make'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal14_form' name='desc'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Tax Rate (%)</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal14_form' name='tax'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Barcode</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal14_form' name='barcode'><br>
                                        <input type='checkbox' name='generate'> Auto Generate
                                    </div>
					     		</div>
		                  <div id='modal14_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal14_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal14_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal15" title="Provide feedback">
		<form id='modal15_form' autocomplete="off">
			<fieldset>
				<label>Feedback provider: <input type='text' required></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<label>Type: <input type="text" required></label><br>
				<label>Rating: <input type="text" required></label><br>
				<label>Date: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal16' data-toggle="modal" id='modal16_link'></a>
	<div id="modal16" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal16_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Staff</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal16_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Phone</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal16_form' name='phone'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Email</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal16_form' name='email'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Address</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal16_form' name='address'></textarea></div>
					     		</div>
		                  <div id='modal16_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal16_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal16_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal17" title="Add staff details">
		<form id='modal17_form' autocomplete="off">
			<fieldset>
				<label>Address: <input type="text"></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal18" title="Add task type">
		<form id='modal18_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Estimated Hours: <input type="number" step='any' required></label><br>
				<label id='modal18_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal19" title="Copy product">
		<form id='modal19_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Bar Code: <input type="text" required></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal20' data-toggle="modal" id='modal20_link'></a>
	<div id="modal20" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal20_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Service</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal20_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal20_form' name='desc'></textarea></div>
					       </div>
						   <div class="row">
 								   <div class="col-sm-12 col-md-4">Tax (in %)</div>
                                     <div class="col-sm-12 col-md-8"><input type='number' step='any' required form='modal20_form' name='tax'></div>
 					    	</div>
 		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal20_form' required name='price'></div>
					    	</div>
		                </div>
						<div id='modal20_attributes'></div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal20_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal20_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal21" title="Copy service">
		<form id='modal21_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Price: <input type="number"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal22' data-toggle="modal" id='modal22_link'></a>
	<div id="modal22" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal22_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Batch</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Product Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal22_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Batch</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal22_form' required name='batch'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Manufacturing Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal22_form' name='manu_date'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Expiry Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal22_form' name='ex_date'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">MRP</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal22_form' name='mrp'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Purchase Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal22_form' name='pprice'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Default Sale Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal22_form' name='sprice'></div>
					     		</div>
		                  <div id='modal22_billings'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal22_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal22_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal23' data-toggle="modal" id='modal23_link'></a>
	<div id="modal23" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal23_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Data Import</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								  <div class='col-md-6 pull-right'><button type="button" name='download' class='btn green-jungle pull-right'>Download Import Template</button></div>
					     		</div>
		                  <div class="row" style='margin-bottom:10px;margin-top:10px;'>
					     			<div class='col-md-6'><input type="radio" style='float:left;' name='upload_option' value='new'>  &nbsp;&nbsp;Create New Records</div>
						  </div>
				          <div class='row' style='margin-bottom:10px;'>
									<div class='col-md-6'><input type="radio" style='float:left;' name='upload_option' value='existing' checked> &nbsp;&nbsp;Update existing Records</div>
					      </div>
		                  <div class="row">
								   <div class='col-md-6'>
								   	<input type="file" required name='file' value='Select file' accept=".csv" style='display:none'>
										<button type='button' name='file_dummy' class='btn red-sunglo'>Select File</button>
									</div>
				          </div>
		                  <div class="row">
									<div class='col-md-6'><output name='selected_file'></output></div>
					      </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal23_form' name='save'>Import</button>
	               	<button type="button" class="btn red" form='modal23_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal24" title="Update Customer Address">
		<form id='modal24_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal25" title="Update Supplier Address">
		<form id='modal25_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal26' data-toggle="modal" id='modal26_link'></a>
	<div id="modal26" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal26_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Payment Details</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
						  		<div class="col-sm-12 col-md-4">Paid By</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal26_form' required name='by'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Total Amount</div>
					     		<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal26_form' required name='total'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Paid Amount</div>
					     		<div class="col-sm-12 col-md-8"><input type='number' step='any' required form='modal26_form' name='paid'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Mode</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal26_form' name='mode'></div>
					      </div>
		            	</div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal26_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal26_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal27" title="Order product">
		<form id='modal27_form' autocomplete="off">
			<fieldset>
				<label>Product Name: <input type='text' required readonly='readonly'></label><br>
				<label>Make: <input type="text" required readonly='readonly'></label><br>
				<label>Cost Price: Rs. <input type="number" step='any' readonly='readonly'></label><br>
				<label>Quantity: <input type="number" step='any' requried></label><br>
				<label>Supplier: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal28' data-toggle="modal" id='modal28_link'></a>
	<div id="modal28" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal28_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Payment Details</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Paid To</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal28_form' readonly='readonly' required name='to'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Total Amount</div>
					     		<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal28_form' required name='total'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Amount Paid</div>
					     		<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal28_form' name='paid' required></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Mode of Payment</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal28_form' name='mode'></div>
					      </div>
                         </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal28_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal28_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal29" title="Payment Details">
		<form id='modal29_form' autocomplete="off">
			<fieldset>
				<label>Bill Id: <input type='text' readonly='readonly'></label><br>
				<label>Date: <input type="text" readonly='readonly'></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal30" title="Add Receipt">
		<form id='modal30_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Receipt Amount: Rs. <input type="number" min='0' step='any' required></label><br>
				<label>Balance <input type="text" readonly='readonly'></label><br>
				<input type="hidden" name='type'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal31' data-toggle="modal" id='modal31_link'></a>
	<div id="modal31" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal31_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Delete Receipt</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Receipt Id</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal31_form' required name='receipt'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Account</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal31_form' required name='account'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Balance</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal31_form' name='balance' readonly='readonly'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Receipt Amount</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' readonly='readonly' form='modal31_form' name='amount' required></div>
					     		</div>
                        </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal31_form' name='save'>Delete</button>
	               	<button type="button" class="btn red" form='modal31_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal32" title="Add task">
		<form id='modal32_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type='hidden'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal33' data-toggle="modal" id='modal33_link'></a>
	<div id="modal33" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal33_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Task</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;min-height:390px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Task</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal33_form' required readonly='readonly' name='task'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal33_form' name='notes'></textarea></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Assignee</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal33_form' name='assignee'></div>
					       </div>
                           <div class="row">
								   <div class="col-sm-12 col-md-4">Status</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal33_form' required name='status'></div>
					       </div>
		              </div>
                    </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal33_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal33_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal35' data-toggle="modal" id='modal35_link'></a>
	<div id="modal35" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal35_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Storage</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal35_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Owner</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal35_form' name='owner'></div>
					     		</div>
		                  <div id='modal35_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal35_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal35_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal36' data-toggle="modal" id='modal36_link'></a>
	<div id="modal36" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal36_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Appointment</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:400px;" data-always-visible="1" data-rail-visible1="1">
		                  	<div class="row">
								<div class="col-sm-12 col-md-4">Customer</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal36_form' required name='customer'></div>
					     	</div>
		                  	<div class="row">
								<div class="col-sm-12 col-md-4">Schedule</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal36_form' required name='schedule'></div>
					     	</div>
		                  	<div class="row">
								<div class="col-sm-12 col-md-4">Notes</div>
								<div class="col-sm-12 col-md-8"><textarea form='modal36_form' name='notes'></textarea></div>
					     	</div>
						   <div class="row">
								<div class="col-sm-12 col-md-4">Assignee</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal36_form' name='assignee'></div>
					     	</div>
						</div>
					 </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal36_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal36_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal37' data-toggle="modal" id='modal37_link'></a>
	<div id="modal37" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal37_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Appointment</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  	<div class="row">
								<div class="col-sm-12 col-md-4">Customer</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal37_form' name='customer'></div>
					     	</div>
		                  	<div class="row">
								<div class="col-sm-12 col-md-4">Notes</div>
								<div class="col-sm-12 col-md-8"><textarea form='modal37_form' name='notes'></textarea></div>
					     	</div>
						   <div class="row">
								<div class="col-sm-12 col-md-4">Assignee</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal37_form' name='assignee'></div>
					     	</div>
						   	<div class="row">
								<div class="col-sm-12 col-md-4">Status</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' required form='modal37_form' name='status'></div>
						   </div>
						   <div class="row">
							   <div class="col-sm-12 col-md-8 pull-right"><button type='button' class='btn grey' form='modal37_form' name='notify' title='An Email and SMS will be sent to the customer to remind them of the appointment'>Notify Customer</button></div>
						   </div>
		             	</div>
					</div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal37_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal37_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal38" title="Update sale price">
		<form id='modal38_form' autocomplete="off">
			<fieldset>
				<label>Default Sale Price: Rs. <input type="number" step='any' required></label><br>
				<label id='modal38_billings'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal39" title="Add loan">
		<form id='modal39_form' autocomplete="off">
			<fieldset>
				<label>Type: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Loan amount: Rs. <input type='number' min='0' required step='any'></label><br>
				<label>Date initiated: <input type="text" required></label><br>
				<label>Repayment method: <input type="text" required></label><br>
				<label>Interest rate(%): <input type="number" step='any' min='0'></label><br>
				<label>Interest period(in days): <input type="number" min='0'></label><br>
				<label>Interest is: <input type="text"></label><br>
				<label>EMI: Rs. <input type="number" step='any' min='0'></label><br>
				<label>EMI period(in days): <input type="number" min='0'></label><br>
				<label>Number of EMIs: <input type="number" min='0'></label><br>
				<label id='modal39_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal40" title="Discard item">
		<form id='modal40_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type='text' required></label><br>
				<label>Batch: <input type="text" required></label><br>
				<label>Quantity: <input type='number' required></label><br>
				<label>Storage: <input type='text'></label><br>
				<label>Reason: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal41" title="Close Payments">
		<form id='modal41_form' autocomplete="off">
			<fieldset>
				<label>Account: <input type='text' readonly='readonly' required></label><br>
				<label>Balance: Rs. <input type="text" readonly='readonly' required></label><br>
				<label>Counter Payment <input type='number' step='2' value='0' required></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal42" title="Bill Type">
		<form id='modal42_form' autocomplete="off">
			<fieldset>
				<label>Bill Type: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal43' data-toggle="modal" id='modal43_link'></a>
	<div id="modal43" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal43_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Task</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;min-height:390px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Task</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal43_form' required name='task'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Due Time</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal43_form' required name='due'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal43_form' name='desc'></textarea></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Project</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal43_form' required name='project'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Assignee</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal43_form'  name='assignee'></div>
					       </div>
		              </div>
                    </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal43_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal43_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal44" title="Share">
		<form id='modal44_form' autocomplete="off">
			<fieldset>
				<label>Choose Client: <input type='text' required value='gmail'></label><br>
				<label>Recipient Email: <input type="text"></label><br>
				<label>Recipient Name: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal45" title="Add new loyalty program">
		<form id='modal45_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Tier: <input type='text' required></label><br>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<label id='modal45_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal46" title="Update loyalty program">
		<form id='modal46_form' autocomplete="off">
			<fieldset>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal47" title="Add service request">
		<form id='modal47_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" readonly='readonly'></label><br>
				<label>Customer: <input type='text' required></label><br>
				<label>Reported By: <textarea required readonly="readonly"></textarea></label><br>
				<label>Problem Type: <input type='text'></label><br>
				<label>Problem Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal48" title="Add solution">
		<form id='modal48_form' autocomplete="off">
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Solution Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal49" title="Add issue">
		<form id='modal49_form'>
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Short Description: <textarea required></textarea></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal50" title="Sending Mails">
		<a href='' id='modal50_sendmail'>Send mails through Gmail</a>
	</div>

	<div id="modal53" title="Scheme to customer">
		<table id='modal53_table'>
		</table>
	</div>

	<div id="modal54" title="Scheme from supplier">
		<table id='modal54_table'>
		</table>
	</div>

	<a href='#modal55' data-toggle="modal" id='modal55_link'></a>
	<div id="modal55" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal55_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Database Backup</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="button" class="btn green" name='no' form="modal55_form" data-dismiss='modal'>Ok</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal57" title="Pricing History">
		Previous Bills
		<table id='modal57_bill_table'>
		</table>
		<br>
		Previous Quotations
		<table id='modal57_quot_table'>
		</table>
	</div>

	<div id="modal83" title="Store Inventory">
		<table id='modal83_inventory_table' class="plain_table">
		</table>
	</div>

	<div id="modal84" title="Design Preview">
		<div id='modal84_preview'></div>
	</div>

    <a href='#modal101' data-toggle="modal" id='modal101_link'></a>
	<div id="modal101" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal101_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Email Document</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	  <div class="row">
									<div class="col-sm-12 col-md-4">To</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal101_form' name='to' readonly='readonly'></div>
					      </div>
		                  <div class="row">
									<div class="col-sm-12 col-md-4">Email</div>
                              <div class="col-sm-12 col-md-8"><textarea required form='modal101_form' name='email' title='Separate Email Ids with semicolon(;)'></textarea></div>
					      </div>
		                  <div class="row">
									<div class="col-sm-12 col-md-4">Subject</div>
                              <div class="col-sm-12 col-md-8"><textarea required form='modal101_form' name='subject'></textarea></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
                    <input type='hidden' form='modal101_form' name='acc_name'>
	               	<button type="submit" class="btn green" form='modal101_form' name='save'>Send</button>
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal101_form' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal102" title="Re-assign">
		<form id='modal102_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Assignee: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal103" title="Close service request">
		<form id='modal103_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal104" title="Close machine service">
		<form id='modal104_form' autocomplete="off">
			<fieldset>
				<label>Machine: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal105" title="Add Schedule">
		<form id='modal105_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required value='inactive'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal107" title="Update Schedule">
		<form id='modal107_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal108" title="Workflow Assignees (Record Level)">
		<form id='modal108_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal109" title="Workflow Assignees">
		<form id='modal109_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal110" title="Add to Inventory">
		<form id='modal110_form' autocomplete="off">
			<fieldset>
				<label>Manufacturing Date: <input type='text'></label><br>
				<label>Expiry Date: <input type='text'></label><br>
				<label>Cost Price: <input type='text'></label><br>
				<label>Sales Price: <input type='text'></label><br>
				<label>Store: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal111" title="Log location">
		<form id='modal111_form' autocomplete="off">
			<fieldset>
				<label>Location: <textarea></textarea></label><br>
				<label>Name: <textarea readonly='readonly'></textarea></label><br>
				<label>Time: <input type="text" readonly='readonly'></label><br>
				<label>Latitude: <input type="text" readonly='readonly'></label><br>
				<label>Longitude: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

  <a href='#modal112' data-toggle="modal" id='modal112_link'></a>
	<div id="modal112" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal112_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Product</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal112_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Make</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal112_form' name='make'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal112_form' name='desc'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Tax Rate (%)</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal112_form' name='tax'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Cost Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal112_form' name='cost'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Sale Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal112_form' name='sale'></div>
					     		</div>
		                  <div id='modal112_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal112_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal112_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal113" title="Add Store Area">
		<form id='modal113_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Parent: <input type="text"></label><br>
				<label>Owner: <input type="text"></label><br>
				<label>Length: <input type="number"></label><br>
				<label>Breadth: <input type="number"></label><br>
				<label>Height: <input type="number"></label><br>
				<label>Unit: <input type="text"></label><br>
				<label id='modal113_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal114" title="Add new product">
		<form id='modal114_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type="text" required></label><br>
				<label>Name: <textarea></textarea></label><br>
				<label>Brand: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Length: <input type="number" step='any'></label><br>
				<label>Breadth: <input type="number" step='any'></label><br>
				<label>Height: <input type="number" step='any'></label><br>
				<label>Volume: <input type="number" step='any'></label><br>
				<label>Unit: <input type="text"></label><br>
				<label>Weight(in gms): <input type="number" step='any'></label><br>
				<label>Packing: <textarea></textarea></label><br>
				<label>Bar Code: <input type="text"></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<label id='modal114_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal115' data-toggle="modal" id='modal115_link'></a>
	<div id="modal115" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal115_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Delete Confirmation</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
		         			Are you sure, you want to delete this record?
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn red" form='modal115_form' name='yes'>Yes</button>
	               	<button type="button" class="btn green" name='no' form="modal115_form" data-dismiss='modal'>No</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal116" title="Map Barcode">
		<form id='modal116_form' autocomplete="off">
			<fieldset>
				<label>Barcode: <input type='text' readonly='readonly' required name='barcode'>
				<img src='./images/barcode.png' id='modal116_barcode_img' class='barcode_icon'>
				</label><br>
				<label>SKU: <input type="text" required name='sku'></label><br>
				<label>Name: <textarea name='name'></textarea></label><br>
				<input type='hidden' name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal117' data-toggle="modal" id='modal117_link'></a>
	<div id="modal117" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal117_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Task</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;min-height:390px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Task</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal117_form' required name='task'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal117_form' name='notes'></textarea></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Assignee</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal117_form' name='assignee'></div>
					       </div>
                           <div class="row">
								   <div class="col-sm-12 col-md-4">Status</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal117_form' required name='status'></div>
					       </div>
		              </div>
                    </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal117_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal117_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal118" title="New order">
		<form id='modal118_form' autocomplete="off">
			<fieldset>
				<label>Phone: <input type='text' name='phone'></label><br>
				<label>Name: <input type='text' name='name' required></label><br>
				<label>Credit: Rs. <input type="number" name='credit' step='any' readonly="readonly"></label><br>
				<label>Address: <input type='text' name='address'></label><br>
				<label>Notes: <textarea name='notes'></textarea></label><br>
				<label>Email: <textarea name='email'></textarea></label><br>
				<input type='hidden' name='new_old'>
				<input type='hidden' name='acc_name'>
				<input type='hidden' name='customer_id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal119" title="Assignee">
		<form id='modal119_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal120" title="Add new batch">
		<form id='modal120_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Expiry: <input type="text" required></label><br>
				<label>MRP: Rs. <input type="number" step='any' required min=".1"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal122" title="Update Inventory">
		<form id='modal122_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required readonly="readonly"></label><br>
				<label>Fresh: <input type='number' step='any' required></label><br>
				<label>Hireable: <input type="number" step='any' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal123" title="Add LetterHead">
		<form id='modal123_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Date: <input type="text"></label><br>
				<label>To: <textarea></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<label>Salutation: <textarea></textarea></label><br>
				<label>Content: <textarea></textarea></label><br>
				<label>Signature: <textarea></textarea></label><br>
				<label>Footer: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal124" title="Send SMS">
		<form id='modal124_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' name='to' readonly="readonly"></label><br>
				<label>Phone: <input type='text' name='phone' required></label><br>
				<label>SMS: <textarea name='sms'></textarea></label><br>
				<input type='hidden'>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal125" title="List of suppliers">
		<form id='modal125_form' autocomplete="off">
			<fieldset>
				<label id='modal125_suppliers'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal126' data-toggle="modal" id='modal126_link'></a>
	<div id="modal126" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal126_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Priority Suppliers</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12">Applicable Suppliers</div>
					       </div>
                           <br>
                          <div id='modal126_suppliers'></div>
		                </div>
                        <input type='hidden' form='modal126_form' name='type'>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal126_form' name='save'>Assign</button>
	               	<button type="button" class="btn red" form='modal126_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal127" title="Print Laundry Tags">
		Do you want to print tags?
		<br>
		<br>
		<br>
		<form id='modal127_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal128" title="Add Order">
		<form id='modal128_form' autocomplete="off">
			<fieldset>
				<label>AWB #: <input name='awb' type="text" required></label><br>
				<label>Type: <input name='type' type="text"></label><br>
				<label>Order #: <input name='order' type='text'></label><br>
				<label>Channel: <input name='channel' type='text'></label><br>
				<label>Customer Name: <input name='merchant' type='text'></label><br>
				<label>Consignee: <input name='shipto' type='text'></label><br>
				<label>Address: <textarea name='address'></textarea></label><br>
				<label>City: <input name='city' type='text'></label><br>
				<label>Pincode: <input name='pincode' type='text'></label><br>
				<label>Phone: <input name='phone' type='text'></label><br>
				<label>Weight: <input name='weight' type='text'></label><br>
				<label>Declared Value: <input name='d_value' type='number'></label><br>
				<label>Collectable Value: <input name='c_value' type='number'></label><br>
				<label>Return Address: <input name='raddress' type='text'></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal130" title="Delete Cache">
		Do you want to cleared browser cache? (There will be no impact on your saved data.)
		<br>
		<b>Please refresh the browser again after the cache is cleared.</b>
		<br>
		<form id='modal130_form' autocomplete="off">
			<input type="submit" class='modal_submit' value='Delete'>
		</form>
	</div>

	<div id="modal131" title="Issue GRN without QC">
		<form id='modal131_form' autocomplete="off">
			<fieldset>
				<label>Order #: <input readonly='readonly' name='order_num' type="text"></label><br>
				<label>Order Quantity: <input readonly='readonly' name='o_quantity' type="number" step='any'></label><br>
				<label>Received Quantity: <input name='r_quantity' required type='number' step='any'></label><br>
				<input type="button" value='Print & Save' name='print' class='modal_submit'>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal132" title="Refresh Tab">
		Any unsaved data will be lost. Do you want to carry on?
		<br>
		<form id='modal132_form' autocomplete="off">
			<input type="submit" class='modal_submit' value='Yes'>
			<input type="button" class='modal_submit' value='No'>
		</form>
	</div>

	<div id="modal133" title="Analyze Order">
		<label id='modal133_order_id'>Order #:</label><br>
		<table id='modal133_item_table'>
		</table>
		<br>
		<br>
		<form id='modal133_form' autocomplete="off">
			<label>Bill Type: <input type='text' required></label><br>
			<input type="submit" class='modal_submit' value='Bill'>
			<input type="button" class='modal_submit' value='Cancel'>
		</form>
	</div>

	<a href='#modal134' data-toggle="modal" id='modal134_link'></a>
	<div id="modal134" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal134_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Follow up</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;min-height:390px;" data-always-visible="1" data-rail-visible1="1">
		               	<div class="row">
									<div class="col-sm-12 col-md-4">Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal134_form' name='date'></div>
					     		</div>
		                  <div class="row">
									<div class="col-sm-12 col-md-4">Response</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal134_form' name='response'></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Details</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal134_form' name='details'></textarea></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Next Follow-up Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal134_form' name='next_date'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal134_form' name='save'>Save</button>
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal134_form' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal135' data-toggle="modal" id='modal135_link'></a>
	<div id="modal135" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal135_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Setting</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	<div class="row">
									<div class="col-sm-12 col-md-4">Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal135_form' name='type' class='dblclick_editable'></div>
					     		</div>
		                  <div class="row">
									<div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal135_form' name='name'></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Display Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal135_form' name='display_name'></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Value</div>
					     			<div class="col-sm-12 col-md-8"><textarea required form='modal135_form' name='value'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal135_form' name='save'>Save</button>
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal135_form' name='save'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal136' data-toggle="modal" id='modal136_link'></a>
	<div id="modal136" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal136_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Tab</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	<div class="row">
									<div class="col-sm-12 col-md-4">Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal136_form' name='type' class='dblclick_editable'></div>
					     		</div>
		                  <div class="row">
									<div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal136_form' name='name'></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Display Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal136_form' name='disp'></div>
					     		</div>
					     		<div class="row">
									<div class="col-sm-12 col-md-4">Tables</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal136_form' name='tables'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal136_form' name='save'>Save</button>
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal136_form' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal137' data-toggle="modal" id='modal137_link'></a>
	<div id="modal137" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal137_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">View Bills</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	  <div class="row">
							 <div class="col-sm-12">
                                <table class='table table-striped table-bordered table-hover dt-responsive no-more-tables' id='modal137_item_table'></table>
                              </div>
					       </div>
		                 </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal137_form' name='cancel'>Close</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal138" title="Import Sale Orders">
		<form id='modal138_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				Channel: <input type="text" required><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal139" title="Assign Barcode">
		<form id='modal139_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type="text" readonly="readonly" name='sku'></label><br>
				<label>Name: <textarea name='name' readonly="readonly"></textarea></label><br>
				<label>Barcode: <input type='text' required name='barcode'>
				<img src='./images/barcode.png' id='modal139_barcode_img' class='barcode_icon'>
				</label><br>
				<label>Auto-generate: <input type='checkbox' name='check'></label>
				<input type='hidden' name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal140" title="Import Purchase Orders">
		<form id='modal140_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal141" title="Product Ready">
		<form id='modal141_form' autocomplete="off">
			<fieldset>
				<label>Quantity: <input type='number' step='any' name='quantity' readonly="readonly"></label><br>
				<label>Storage: <input type='text' name='storage' required></label><br>
				<label>Batch: <input type='text' name='batch' required></label><br>
				<label>Sale Price: <input type='text' name='price' required></label><br>
				<label id='modal141_raw'></label><br>
				<input type='hidden' name='new_batch'>
				<input type="submit" class='modal_submit' name='save' value='Save'>
				<input type="button" class='modal_submit' name='cancel' value='Cancel'>
			</fieldset>
		</form>
	</div>

	<a href='#modal142' data-toggle="modal" id='modal142_link'></a>
  	<div id="modal142" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <form id='modal142_form' autocomplete="off">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						  <h4 class="modal-title">Add Batch</h4>
					  </div>
					  <div class="modal-body">
						  <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Item</div>
								  <div class="col-sm-12 col-md-8"><input type='text' form='modal142_form' required name='name'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Batch</div>
								  <div class="col-sm-12 col-md-8"><input type='text' form='modal142_form' required name='batch'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Expiry</div>
								  <div class="col-sm-12 col-md-8"><input type='text' form='modal142_form' name='expiry'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">MRP</div>
								  <div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal142_form' name='mrp'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Cost Price</div>
								  <div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal142_form' name='cost'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Sale Price</div>
								  <div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal142_form' name='sale'></div>
							  </div>
  		                  </div>
  		             </div>
					 <div class="modal-footer">
						 <button type="submit" class="btn green" form='modal142_form' name='save'>Add</button>
						 <button type="button" class="btn red" form='modal142_form' data-dismiss="modal" name='cancel'>Cancel</button>
  	             	</div>
				</form>
			</div>
		</div>
	</div>

	<a href='#modal143' data-toggle="modal" id='modal143_link'></a>
  	<div id="modal143" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <form id='modal143_form' autocomplete="off">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						  <h4 class="modal-title">Update Inventory</h4>
					  </div>
					  <div class="modal-body">
						  <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Item</div>
								  <div class="col-sm-12 col-md-8"><input type='text' form='modal143_form' readonly='readonly' required name='name'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Batch</div>
								  <div class="col-sm-12 col-md-8"><input type='text' form='modal143_form' readonly='readonly' required name='batch'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Fresh Quantity</div>
								  <div class="col-sm-12 col-md-8"><input type='number' step='any' required form='modal143_form' name='fresh'></div>
							  </div>
							  <div class="row">
								  <div class="col-sm-12 col-md-4">In-use Quantity</div>
								  <div class="col-sm-12 col-md-8"><input type='number' step='any' required form='modal143_form' name='inuse'></div>
							  </div>
  		                  </div>
  		             </div>
					 <div class="modal-footer">
						 <button type="submit" class="btn green" form='modal143_form' name='save'>Update</button>
						 <button type="button" class="btn red" form='modal143_form' data-dismiss="modal" name='cancel'>Cancel</button>
  	             	</div>
				</form>
			</div>
		</div>
	</div>

  <a href='#modal144' data-toggle="modal" id='modal144_link'></a>
	<div id="modal144" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal144_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Document</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal144_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Picture</div>
					     			<div class="col-sm-12 col-md-8">
                                        <a id='modal144_url'>link</a>
					     				<input type='file' style='display:none' name='fi'>
										<button type='button' class='btn yellow' name='dummy'>Select File</button>
					     			</div>
					     		</div>
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal144_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal144_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal145" title="Update Contact">
		<form id='modal145_form' autocomplete="off">
			<fieldset>
				<label>Name: <input readonly='readonly' type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label id='modal145_attributes'></label><br>
				<input type="hidden" name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal146' data-toggle="modal" id='modal146_link'></a>
	<div id="modal146" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal146_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Test Results</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
							<div class="col-sm-12 col-md-4">Date</div>
					     	<div class="col-sm-12 col-md-8"><input type='text' form='modal146_form' required readonly='readonly' name='date'></div>
					     </div>
		                 <div class="row">
							<div class="col-sm-12 col-md-4">Next Due</div>
					     	<div class="col-sm-12 col-md-8"><input type='text' form='modal146_form' required name='due'></div>
					     </div>
                        <div class="row">
							<div class="col-sm-12 col-md-4">Result</div>
					     	<div class="col-sm-12 col-md-8"><input type='text' form='modal146_form' required name='result'></div>
					     </div>
		                 <div class="row">
							<div class="col-sm-12 col-md-4">Notes</div>
                             <div class="col-sm-12 col-md-8"><textarea form='modal146_form' name='notes'></textarea></div>
					     </div>
		                 <div class="row">
				            <div class="col-sm-12 col-md-4">Document</div>
					     	<div class="col-sm-12 col-md-8">
                                <a id='modal146_url'>link</a>
					     		<input type='file' style='display:none' name='fi'>
								<button type='button' class='btn yellow' name='dummy'>Select File</button>
					     	</div>
					     </div>
                       </div>
                    </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal146_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal146_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal147" title="Return Items">
		<form id='modal147_form' autocomplete="off">
			<fieldset>
				<label>Date: <input type="text" required readonly='readonly'></label><br>
				<label>Item: <input type="text" required></label><br>
				<label>Quantity: <input type='number' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal148' data-toggle="modal" id='modal148_link'></a>
	<div id="modal148" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal148_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Import Outstation Orders</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class='col-md-6 pull-right'><button type="button" name='download' class='btn green-jungle pull-right'>Download Import Template</button></div>
					       </div>
                           <br>
                           <br>
		                  <div class="row">
								<div class='col-md-6'>
								   	<input type="file" required name='file' value='Select file' accept=".csv" style='display:none'>
									<button type='button' name='file_dummy' class='btn red-sunglo'>Select Import File</button>
								</div>
				          </div>
		                  <div class="row">
									<div class='col-md-6'><output name='selected_file'></output></div>
					      </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal148_form' name='save'>Import</button>
	               	<button type="button" class="btn red" form='modal148_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>


    <a href='#modal149' data-toggle="modal" id='modal149_link'></a>
	<div id="modal149" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal149_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Data Import</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class='col-md-6 pull-right'><button type="button" name='download' class='btn green-jungle pull-right'>Download Import Template</button></div>
					       </div>
                           <br>
                           <br>
		                  <div class="row">
							<div class="col-sm-12 col-md-4">Channel</div>
					     	<div class="col-sm-12 col-md-8"><input type='text' form='modal149_form' required name='channel'></div>
					     </div>
                         <div class="row">
							<div class="col-sm-12 col-md-4">Type</div>
					     	<div class="col-sm-12 col-md-8"><input type='text' form='modal149_form' required name='type'></div>
					     </div>
                        <div class="row">
								<div class='col-md-6'>
								   	<input type="file" required name='file' value='Select file' accept=".csv" style='display:none'>
									<button type='button' name='file_dummy' class='btn red-sunglo'>Select File</button>
								</div>
				          </div>
		                  <div class="row">
									<div class='col-md-6'><output name='selected_file'></output></div>
					      </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal149_form' name='save'>Import</button>
	               	<button type="button" class="btn red" form='modal149_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal150" title="Scan Picked Items">
		<form id='modal150_form' autocomplete="off">
			<fieldset>
				<label>Scan Barcode: <input type="text" name='barcode' required></label>
				<input type="submit" class='submit_hidden'>
				<input type="button" value='Save Pickings' name='save' class='modal_submit'>
			</fieldset>
		</form>
		<table id='modal150_table' class='plain_table'>
		</table>
	</div>

	<div id="modal151" title="Bag Number">
		<form id='modal151_form' autocomplete="off">
			<fieldset>
				<label>Order #: <input type="text" name='order_num' readonly='readonly' required></label>
				<label>Bag #: <input type="text" name='bag_num' readonly='readonly' required></label>
				<input type="submit" value='Close' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal152" title="Scan item to place">
		<form id='modal152_form' autocomplete="off">
			<fieldset>
				<label>Scan Barcode: <input type="text" name='barcode' required></label>
				<input type="submit" class='submit_hidden'>
				<input type="button" value='Save Placements' name='save' class='modal_submit'>
			</fieldset>
		</form>
		<table id='modal152_table' style='display:none;'>
		<table id='modal152_table2' class='plain_table'>
		</table>
	</div>

	<a href='#modal153' data-toggle="modal" id='modal153_link'></a>
	<div id="modal153" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal153_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Close Sale lead</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	Are you sure you want to close this lead?
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal153_form' name='yes'>Yes</button>
	               	<button type="button" data-dismiss='modal' class="btn red" form='modal153_form' name='no'>No</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal154" title="View Invoices">
		<br>
		<table id='modal154_item_table'>
		</table>
		<br>
		<br>
		<form id='modal154_form'>
			<input type="button" class='modal_submit' id='modal154_cancel' value='Cancel' onclick="$('#modal154').dialog('close');">
		</form>
	</div>

    <a href='#modal155' data-toggle="modal" id='modal155_link'></a>
	<div id="modal155" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal155_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Receipt</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Receipt Id</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal155_form' required name='receipt_id' readonly='readonly'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal155_form' name='date'></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Account</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal155_form' required name='account'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Narration</div>
                                    <div class="col-sm-12 col-md-8"><textarea form='modal155_form' name='narration'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Receipt Amount</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' min='0' form='modal155_form' name='amount' required></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Balance</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal155_form' name='balance' readonly='readonly'></div>
					     		</div>
                        </div>

		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal155_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal155_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal156' data-toggle="modal" id='modal156_link'></a>
	<div id="modal156" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal156_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add New Batch</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Item</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal156_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Batch</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal156_form' name='batch' required></div>
					       </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Manufacturing Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal156_form' name='date'></div>
					     		</div>
                        </div>
                        <input type='hidden' form='modal156_form' name='type'>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal156_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal156_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal157" title="Item Rejection">
		Are you sure, you want to reject this item?
		<br>
		<br>
		<form id='modal157_form' autocomplete="off">
			<fieldset>
				<label>Reason for Rejection: <input type="text" name='reason' required></label>
				<input type="submit" value='Yes' name='yes' class='modal_submit'>
				<input type="button" value='No' name='no' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal158" title="Update Invoice">
		Are you sure, you want to update the invoice to proceed with the dispatch of packed items?
		<br>
		<br>
		<br>
		<form id='modal158_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal159" title="Analyze Order">
		<label id='modal159_order_id'>Order #:</label><br>
		<table id='modal159_item_table'>
		</table>
		<br>
		<br>
		<form id='modal159_form' autocomplete="off">
			<input type="submit" class='modal_submit' name='bill' value='Bill'>
			<input type="button" class='modal_submit' name='cancel' value='Cancel'>
		</form>
	</div>

	<div id="modal160" title="Import Unsynced Data">
		<form id='modal160_form' autocomplete="off">
			<fieldset>
				<br>
				<br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal161" title="Add new customer">
		<form id='modal161_form' autocomplete="off">
			<fieldset>
				<label>Category: <input type='text' class='modal161_attributes' name='Category'></label><br>
				<label>Sub-Category: <input type='text' class='modal161_attributes' name='Sub-Category'></label><br>
				<label>Organization Name: <input type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>Website: <input type="text" class='modal161_attributes' name='Website'></label><br>
				<label>Contact Person: <input type="text" class='modal161_attributes' name='Contact'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal162" title="Close Picking">
		<form id='modal162_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type='text' readonly='readonly' name='sku'></label><br>
				<label>Item Name: <textarea readonly='readonly' name='item_name'></textarea></label><br>
				<label>Batch: <input type='text' readonly='readonly' required name='batch'></label><br>
				<label>Storage: <input type="text" readonly='readonly' required name='storage'></label><br>
				<label>To Pick: <input type="text" readonly='readonly' name='topick'></label><br>
				<label>Picked: <input type="text" name='picked'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal163" title="Mass Put-away">
		<form id='modal163_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type='text' readonly='readonly' name='sku'></label><br>
				<label>Batch: <input type='text' readonly='readonly' required name='batch'></label><br>
				<label>Storage: <input type="text" required name='storage'></label><br>
				<label>To Place: <input type="text" readonly='readonly' name='toplace'></label><br>
				<label>Placed: <input type="text" name='placed'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal164' data-toggle="modal" id='modal164_link'></a>
	<div id="modal164" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal164_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Import Aborted</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		               	<div id='modal164_div'></div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal165' data-toggle="modal" id='modal165_link'></a>
	<div id="modal165" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal165_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal165_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal165_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal165_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>


	<div id="modal166" title="Follow-up Details">
		<form id='modal166_form' autocomplete="off">
			<fieldset>
				<label>Date: <input readonly='readonly' name='date' required type="text"></label><br>
				<label>Response: <input name='response' autofocus required type="text"></label><br>
				<label>Details: <textarea name='details'></textarea></label><br>
				<label>Valid Upto Date: <input name='next_date' type="text"></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal167" title="Update Contact">
		<form id='modal167_form' autocomplete="off">
			<fieldset>
				<label>Name: <input readonly='readonly' type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label id='modal167_attributes'></label><br>
				<input type="hidden" name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal168" title="Close Purchase Lead">
		Are you sure you want to close this lead?
		<br>
		<br>
		<form id='modal168_form' autocomplete="off">
			<fieldset>
				<input type="submit" class='modal_submit' name='yes' value='Yes'>
				<input type="button" class='modal_submit' name='no' value='No'>
			</fieldset>
		</form>
	</div>

	<a href='#modal169' data-toggle="modal" id='modal169_link'></a>
	<div id="modal169" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal169_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Search Return Columns</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <form id='modal169_form' autocomplete="off">
									<fieldset>
										<button type="button" class='btn green' name='add_button'><i class='fa fa-plus'></i></button>
										<button type="button" class='btn red' name='delete_button'><i class='fa fa-trash'></i></button>
										<div id='modal169_columns'></div><br>
									</fieldset>
								</form>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal169_form' name='save'>Save</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal170" title="Import Disaptch Information">
		<form id='modal170_form' autocomplete="off">
			<fieldset>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal171' data-toggle="modal" id='modal171_link'></a>
	<div id="modal171" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<form id='modal171_form' autocomplete="off">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Email Document</h4>
					</div>
					<div class="modal-body">
					   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
						  <div class="row">
							   <div class="col-sm-12 col-md-4">To</div>
							   <div class="col-sm-12 col-md-8"><input type='text' form='modal171_form' readonly='readonly' name='to'></div>
						  </div>
						  <div class="row">
							   <div class="col-sm-12 col-md-4">Email</div>
							   <div class="col-sm-12 col-md-8"><textarea required form='modal171_form' name='email' title='Use semicolon(;) to spearate multiple email Ids'></textarea></div>
						  </div>
						  <div class="row">
								<div class="col-sm-12 col-md-4">Subject</div>
								<div class="col-sm-12 col-md-8"><textarea form='modal171_form' required name='subject'></textarea></div>
						  </div>
						  <div class="row">
								<div class="col-sm-12 col-md-4">Body</div>
								<div class="col-sm-12 col-md-8"><textarea form='modal171_form' name='body' required></textarea></div>
								<input type='hidden' name='hid'>
						  </div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn green" form='modal171_form' name='save'>Send</button>
						<button type="button" class="btn red" form='modal171_form' data-dismiss='modal' name='cancel'>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>

    <a href='#modal172' data-toggle="modal" id='modal172_link'></a>
	<div id="modal172" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal172_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Payment</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
							   <div class="col-sm-12 col-md-4">Payment Id</div>
					     	   <div class="col-sm-12 col-md-8"><input type='text' form='modal172_form' required name='receipt_id'></div>
					      </div>
		                  <div class="row">
							   <div class="col-sm-12 col-md-4">Date</div>
					     	   <div class="col-sm-12 col-md-8"><input type='text' form='modal172_form' required name='date'></div>
					      </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Account</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal172_form' required name='account'></div>
					      </div>
						  <div class="row">
								<div class="col-sm-12 col-md-4">Heading</div>
								<div class="col-sm-12 col-md-8"><input type='text' form='modal172_form' name='heading'></div>
						  </div>
						  <div class="row">
						        <div class="col-sm-12 col-md-4">Narration</div>
                                <div class="col-sm-12 col-md-8"><textarea form='modal172_form' name='narration'></textarea></div>
					      </div>
		                  <div class="row">
						        <div class="col-sm-12 col-md-4">Amount</div>
					     		<div class="col-sm-12 col-md-8"><input type='number' step='any' min='0' form='modal172_form' name='amount' required></div>
					      </div>
		                  <div class="row">
						        <div class="col-sm-12 col-md-4">Balance</div>
					    		<div class="col-sm-12 col-md-8"><input type='text' form='modal172_form' name='balance' readonly='readonly'></div>
					      </div>
                		</div>
                	</div>
	             	<div class="modal-footer">
	               		<button type="submit" class="btn green" form='modal172_form' name='save'>Add</button>
	               		<button type="button" class="btn red" form='modal172_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal173" title="Inventory">
		<form id='modal173_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type='text' readonly='readonly' name='item_name'></label><br>
				<label>Stock Qty: <input type="number" step='any' readonly='readonly' name='stock'></label><br>
				<label>Seller Qty: <input type="number" step='any' readonly='readonly' name='seller'></label><br>
				<label>Buyer Qty: <input type="number" step='any' readonly='readonly' name='buyer'></label><br>
				<input type="button" value='Ok' name='ok' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal174" title="Add new product">
		<form id='modal174_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>MRP: <input type="number" step='any'></label><br>
				<label>Discount: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label id='modal174_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal175' data-toggle="modal" id='modal175_link'></a>
	<div id="modal175" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal175_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Newsletter Component</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Component Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal175_form' required name='nname'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-4">Template</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal175_form' required name='tname'></div>
					     		</div>
					     		<div id='modal175_markers'></div>
					     		<input type="hidden" name='html_code'>
								<input type="hidden" name='t_id'>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal175_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal175_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal176' data-toggle="modal" id='modal176_link'></a>
	<div id="modal176" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal176_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Image</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal176_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Picture</div>
					     			<div class="col-sm-12 col-md-8">
					     				<output name='picture'></output>
										<input type='file' style='display:none' name='file'>
										<button type='button' class='btn yellow' name='dummy'>Select Image</button>
					     			</div>
					     		</div>
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal176_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal176_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal177" title="Add new product">
		<form id='modal177_form' autocomplete="off">
			<fieldset>
				<label>Model: <input type="text" required></label><br>
				<label>Company: <input type="text"></label><br>
				<label>Category: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>MRP: <input type="number" step='any'></label><br>
				<label>Discount: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label id='modal177_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal178' data-toggle="modal" id='modal178_link'></a>
	<div id="modal178" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal178_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Notification Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal178_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal178_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal178_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal179' data-toggle="modal" id='modal179_link'></a>
	<div id="modal179" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal179_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Newsletter Component</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Component Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal179_form' required name='nname'></div>
					     		</div>
		                  <div id='modal179_markers'></div>
					     		<input type="hidden" name='html_code'>
								<input type="hidden" name='t_id'>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal179_form' name='save'>Update</button>
	               	<button type="button" class="btn red" form='modal179_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal180' data-toggle="modal" id='modal180_link'></a>
	<div id="modal180" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal180_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">HTML Code</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
								    <div class="col-sm-12 col-md-12">Code</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal180_form' name='code'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal180_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal181' data-toggle="modal" id='modal181_link'></a>
	<div id="modal181" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
     <div class="modal-dialog modal-full">
         <div class="modal-content">
            <form id='modal181_form' autocomplete="off">
	            <div class="modal-header">
                  	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                 	<h4 class="modal-title">Preview</h4>
               </div>
	            <div class="modal-body">
		            <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		               	Preview <br><output name='picture'></output>
								<input type='file' style='display:none;' name='file_hidden'>
								<br><button type='button' class='btn red' name='dummy'>Select Image</button>
					   </div>
		         </div>
	            <div class="modal-footer">
	            	<input type="submit" class="btn green" form='modal181_form' name='save' value='Save'>
	         	</div>
         	</form>
      	</div>
   	</div>
	</div>

	<a href='#modal182' data-toggle="modal" id='modal182_link'></a>
	<div id="modal182" class="modal fade draggable-modal bs-modal-lg" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal182_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Change Password</h4>
                	</div>
                    <div class="modal-body">
	                    <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
	                  <div class="row">
								<div class="col-sm-12 col-md-4">Current Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='current_pass' required class="form-control"></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">New Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='new_pass' required class="form-control"></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">Retype Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='re_pass' required class="form-control" onkeyup="modal182_verify_password($(this));"></div>
				     		</div>
				     		<div class="row">
								<div class="verify col-md-12 col-lg-12" style='color:#c44030;'></div>
					     	</div>
	                    </div>
	                </div>
	                <div class="modal-footer">
	                    <input type="submit" class="btn green" form='modal182_form' name='save' value='Save' disabled="true">
	                </div>
                </form>
            </div>
        </div>
       <script>
		function modal182_verify_password(button)
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var new_pass=form.elements['new_pass'].value;
			var re_pass=form.elements['re_pass'].value;
			if(new_pass==re_pass)
			{
				$(form).find('.verify').html('Match!');
				form.elements['save'].disabled=false;
			}
			else
			{
				$(form).find('.verify').html('Passwords do not match!');
			}
		}
		</script>
    </div>


	<a href='#modal183' data-toggle="modal" id='modal183_link'></a>
	<div id="modal183" class="modal fade draggable-modal bs-modal-lg" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal183_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Email</h4>
                	</div>
                    <div class="modal-body">
	               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
	                 <div class="row">
								<div class="col-sm-12 col-md-4">Email</div>
				     			<div class="col-sm-12 col-md-8"><textarea form='modal183_form' name='email' required></textarea></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">Subject</div>
				     			<div class="col-sm-12 col-md-8"><textarea form='modal183_form' name='subject' required></textarea></div>
				     		</div>
	               </div>
	                </div>
	                <div class="modal-footer">
	                    <button type="submit" class="btn green" form='modal183_form' name='save'>Send</button>
	                </div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal184' data-toggle="modal" id='modal184_link'></a>
	<div id="modal184" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal184_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Box Content</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">HTML Content</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal184_form' name='content'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal184_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal185' data-toggle="modal" id='modal185_link'></a>
	<div id="modal185" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal185_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Box Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal185_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal185_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal185_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal186' data-toggle="modal" id='modal186_link'></a>
	<div id="modal186" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal186_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Overwrite Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal186_form' name='content'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal186_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal187' data-toggle="modal" id='modal187_link'></a>
	<div id="modal187" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal187_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add table</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal187_form' required name='table'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal187_form' name='save'>Create</button>
	               	<button type="button" class="btn red" form='modal187_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal188' data-toggle="modal" id='modal188_link'></a>
	<div id="modal188" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal188_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Column</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' readonly='readonly' name='table'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' required name='colname'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' required name='coltype'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal188_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal188_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal189' data-toggle="modal" id='modal189_link'></a>
	<div id="modal189" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal189_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Change Column Type</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' readonly='readonly' name='table'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' readonly="readonly" name='colname'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' required name='coltype'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal189_form' name='save'>Change</button>
	               	<button type="button" class="btn red" form='modal189_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal190' data-toggle="modal" id='modal190_link'></a>
	<div id="modal190" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal190_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Grid</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Display Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' name='disp'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Color</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' name='color'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Collapse</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' name='collapse'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Width</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' name='wid'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Height</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal190_form' name='hei'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal190_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal190_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal191' data-toggle="modal" id='modal191_link'></a>
	<div id="modal191" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal191_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Create Project</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal191_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Details</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal191_form' name='detail'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Status</div>
					     			<div class="col-sm-12 col-md-8"><select form='modal191_form' required name='status'></select></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal191_form' name='save'>Create</button>
	               	<button type="button" class="btn red" form='modal191_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal192' data-toggle="modal" id='modal192_link'></a>
	<div id="modal192" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal192_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Notification Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                	<div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal192_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal192_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal193' data-toggle="modal" id='modal193_link'></a>
	<div id="modal193" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal193_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Grid</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Display Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' name='disp'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Color</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' name='color'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Collapse</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' name='collapse'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Width</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' name='wid'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Height</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal193_form' name='hei'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal193_form' name='save'>Update</button>
	               	<button type="button" class="btn red" form='modal193_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal194' data-toggle="modal" id='modal194_link'></a>
	<div id="modal194" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal194_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Search Item</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Keywords</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal194_form' required name='keywords' autofocus></div>
					     		</div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Items</div>
                              <div class="col-sm-12 col-md-8"><select size='8' form='modal194_form' name='items'></select></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal194_form' name='save'>Select</button>
	               	<button type="button" class="btn red" form='modal194_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal195' data-toggle="modal" id='modal195_link'></a>
	<div id="modal195" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal195_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Create Delivery Challan</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Order #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal195_form' required name='order' readonly='readonly'></div>
					     		</div>
       		               <table id='modal195_item_table' class='table table-striped table-bordered table-hover dt-responsive no-more-tables'></table>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal195_form' name='save'>Create</button>
	               	<button type="button" class="btn red" form='modal195_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal196' data-toggle="modal" id='modal196_link'></a>
	<div id="modal196" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal196_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add New Letter</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Letter #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' required name='letter'></div>
					     		</div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Department</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' name='dep'></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Office</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' name='office'></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Brief Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal196_form' name='notes'></textarea></div>
					       </div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">DPO Section</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' name='dpo'></div>
					       </div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">File #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' name='file_num'></div>
                           </div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">Remarks</div>
                               <div class="col-sm-12 col-md-8"><textarea form='modal196_form' name='remarks'></textarea></div>
                           </div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">Assign To</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal196_form' name='staff'></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Due Date</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' required form='modal196_form' name='date'></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal196_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal196_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal197' data-toggle="modal" id='modal197_link'></a>
	<div id="modal197" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal197_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Close Letter</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Letter #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal197_form' required name='letter' readonly='readonly'></div>
					     		</div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Closing Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal197_form' name='notes'></textarea></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal197_form' name='save'>Close</button>
	               	<button type="button" class="btn red" form='modal197_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal198' data-toggle="modal" id='modal198_link'></a>
	<div id="modal198" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal198_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Follow-up</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Letter #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal198_form' required name='letter' readonly='readonly'></div>
					     		</div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Response</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal198_form' name='response' required></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal198_form' name='notes'></textarea></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Due Date</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' required form='modal198_form' name='date'></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal198_form' name='save'>Update</button>
	               	<button type="button" class="btn red" form='modal198_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal199' data-toggle="modal" id='modal199_link'></a>
	<div id="modal199" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal199_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Contact Assignee</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
								<div class="col-sm-12 col-md-4">Letter #</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal199_form' required name='letter' readonly='readonly'></div>
					     		</div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">Assignee</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal199_form' name='staff' readonly='readonly' required></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Message</div>
                              <div class="col-sm-12 col-md-8"><textarea required form='modal199_form' name='message'></textarea></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal199_form' name='save'>Contact</button>
	               	<button type="button" class="btn red" form='modal199_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal200' data-toggle="modal" id='modal200_link'></a>
	<div id="modal200" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal200_form' autocomplete='off'>
                    <div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Follow-up Details</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
                           <table id='modal200_table' class='table table-striped table-bordered table-hover dt-responsive no-more-tables'></table>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="button" class="btn red" form='modal200_form' data-dismiss='modal' name='cancel'>Close</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal201' data-toggle="modal" id='modal201_link'></a>
	<div id="modal201" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal201_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Task</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
								<div class="col-sm-12 col-md-4">List Name</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal201_form' required name='list'></div>
					     		</div>
                           <div class="row">
								<div class="col-sm-12 col-md-4">Task</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal201_form' name='task' required></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal201_form' name='desc'></textarea></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Assignee</div>
                              <div class="col-sm-12 col-md-8"><input type='text' form='modal201_form' name='assignee'></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal201_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal201_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal202' data-toggle="modal" id='modal202_link'></a>
	<div id="modal202" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal202_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Task</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
                           <div class="row">
								<div class="col-sm-12 col-md-4">Task</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' form='modal202_form' name='task' required></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Notes</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal202_form' name='desc'></textarea></div>
					       </div>
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Assignee</div>
                              <div class="col-sm-12 col-md-8"><input type='text' form='modal202_form' name='assignee'></div>
					       </div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal202_form' name='save'>Update</button>
	               	<button type="button" class="btn red" form='modal202_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal203' data-toggle="modal" id='modal203_link'></a>
	<div id="modal203" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal203_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Product</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal203_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Make</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal203_form' name='make'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Description</div>
                              <div class="col-sm-12 col-md-8"><textarea form='modal203_form' name='desc'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Tax Rate (%)</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal203_form' name='tax'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Sale Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal203_form' name='sale'></div>
					     		</div>
		                  <div id='modal203_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal203_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal203_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal204' data-toggle="modal" id='modal204_link'></a>
	<div id="modal204" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal204_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Batch</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Item</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal204_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Batch</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' required form='modal204_form' name='batch'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Manufacture Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal204_form' name='date'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Sale Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal204_form' name='sale'></div>
					     		</div>
		                  <div id='modal204_billings'></div>
                        </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal204_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal204_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal205' data-toggle="modal" id='modal205_link'></a>
	<div id="modal205" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal205_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Staff</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal205_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Phone</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal205_form' name='phone'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Unit</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal205_form' name='unit'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Designation</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal205_form' name='desig'></div>
					     		</div>
		                  <div id='modal205_attributes'></div>
		                  </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal205_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal205_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal206' data-toggle="modal" id='modal206_link'></a>
	<div id="modal206" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal206_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Document</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal206_form' required name='name'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Document</div>
					     			<div class="col-sm-12 col-md-8">
                                        <a id='modal206_url'>link</a>
					     				<input type='file' style='display:none;' form='modal206_form' name='file_hidden'/>
										<button type='button' class='btn yellow' name='dummy'>Select File</button>
					     			</div>
					     		</div>
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal206_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal206_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal207' data-toggle="modal" id='modal207_link'></a>
	<div id="modal207" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal207_form' autocomplete='off'>
                    <div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Test Results</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
                           <table id='modal207_table' class='table table-striped table-bordered table-hover dt-responsive no-more-tables'></table>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="button" class="btn red" form='modal207_form' data-dismiss='modal' name='cancel'>Close</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <div id="modal208" title="Import Manifest">
		<form id='modal208_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' name='template' class='modal_submit'>
				<br>
				<label>Manifest #: <input type="text" name='manifest' required readonly='readonly'></label><br>
				<label>Coloader: <input type="text" name='coloader'></label><br>
				<label>Vendor: <input type="text" name='vendor'></label><br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<input type="file" required value='Select file' name='fi' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' name='dummy' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' name='import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

    <a href='#modal209' data-toggle="modal" id='modal209_link'></a>
	<div id="modal209" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal209_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Email Document</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
				            <div class="col-sm-12 col-md-4">Email</div>
					     	<div class="col-sm-12 col-md-8"><textarea form='modal209_form' name='email' required title='Separate email Ids with semicolon(;)'></textarea></div>
                          </div>
		                  <div class="row">
				            <div class="col-sm-12 col-md-4">Subject</div>
					     	<div class="col-sm-12 col-md-8"><textarea form='modal209_form' name='subject' required></textarea></div>
                          </div>
		                  <div class="row">
				            <div class="col-sm-12 col-md-4">Body</div>
					     	<div class="col-sm-12 col-md-8"><textarea form='modal209_form' name='body' required></textarea></div>
                          </div>
		                  </div>
		              </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal209_form' name='save'>Send</button>
	               	<button type="button" class="btn red" form='modal209_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal210' data-toggle="modal" id='modal210_link'></a>
	<div id="modal210" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal210_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Document</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Description</div>
					     			<div class="col-sm-12 col-md-8"><textarea form='modal210_form' name='desc'></textarea></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Document</div>
					     			<div class="col-sm-12 col-md-8">
                                        <input type='file' style='display:none;' form='modal210_form' name='file_hidden'/>
										<button type='button' class='btn grey' name='dummy'>Select File</button>
					     			</div>
					     		</div>
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal210_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal210_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal211' data-toggle="modal" id='modal211_link'></a>
	<div id="modal211" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal211_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Mark as Bag</h4>
                	</div>
	                <div class="modal-body">
                        <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
				                <div class="col-sm-12 col-md-4">Manifest #</div>
                                <div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal211_form' name='manifest_num'></div>
                            </div>
                        </div>
                        <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
				                <div class="col-sm-12 col-md-4">Seal #</div>
                                <div class="col-sm-12 col-md-8"><input type='text' required form='modal211_form' name='seal'></div>
                            </div>
                        </div>
                        <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
				                <div class="col-sm-12 col-md-4">LBH</div>
                                <div class="col-sm-12 col-md-8"><input type='text' form='modal211_form' name='lbh'></div>
                            </div>
                        </div>
                        <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
                            <div class="row">
				                <div class="col-sm-12 col-md-4">Weight</div>
                                <div class="col-sm-12 col-md-8"><input type='number' form='modal211_form' name='weight'></div>
                            </div>
                        </div>
                    </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal211_form' name='save'>Save</button>
	               	<button type="button" class="btn red" form='modal211_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

    <a href='#modal212' data-toggle="modal" id='modal212_link'></a>
	<div id="modal212" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal212_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Configurations Backup</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="button" class="btn green" name='no' form="modal212_form" data-dismiss='modal'>Ok</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal213' data-toggle="modal" id='modal213_link'></a>
	<div id="modal213" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal213_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Import Configurations</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Document</div>
					     		<div class="col-sm-12 col-md-8">
                                   <input type='file' style='display:none;' form='modal213_form' name='file_hidden'/>
									<button type='button' class='btn grey' name='dummy'>Select File</button>
					     		</div>
					     	</div>
					    </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn red" form='modal213_form' name='save'>Import</button>
	               	<button type="button" class="btn green" form='modal213_form' data-dismiss="modal" name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

		<a href='#modal214' data-toggle="modal" id='modal214_link'></a>
		<div id="modal214" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <form id='modal214_form' autocomplete="off">
		            		<div class="modal-header">
	                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                    	<h4 class="modal-title">Add new Product</h4>
	                	</div>
		                <div class="modal-body">
			               	<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
			                  <div class="row">
									   			<div class="col-sm-12 col-md-4">Name</div>
						     					<div class="col-sm-12 col-md-8"><input type='text' form='modal214_form' required name='name'></div>
						     				</div>
					              <div class="row">
											   	<div class="col-sm-12 col-md-4">Make</div>
								     			<div class="col-sm-12 col-md-8"><input type='text' form='modal214_form' name='make'></div>
								     		</div>
					              <div class="row">
											   	<div class="col-sm-12 col-md-4">Description</div>
			                  	<div class="col-sm-12 col-md-8"><textarea form='modal214_form' name='desc'></textarea></div>
								     		</div>
					              <div id='modal214_attributes'></div>
					            </div>
										</div>
		             	<div class="modal-footer">
		               	<button type="submit" class="btn green" form='modal214_form' name='save'>Add</button>
		               	<button type="button" class="btn red" form='modal214_form' data-dismiss='modal' name='cancel'>Cancel</button>
		             	</div>
	                </form>
	            </div>
	        </div>
	    </div>

	<a href='#modal215' data-toggle="modal" id='modal215_link'></a>
	<div id="modal215" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal215_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Update Inventory</h4>
                	</div>
	                <div class="modal-body">
		               	<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								<div class="col-sm-12 col-md-4">Name</div>
					     		<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal215_form' name='name'></div>
					      </div>
				          <div class="row">
							   	<div class="col-sm-12 col-md-4">Current Inventory</div>
								<div class="col-sm-12 col-md-8"><input type='number' step='any' readonly='readonly' form='modal215_form' name='current'></div>
						  </div>
				          <div class="row">
							   	<div class="col-sm-12 col-md-4">Updated Inventory</div>
		                  		<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal215_form' required name='updated'></div>
						  </div>
						  <div class="row">
							   	<div class="col-sm-12 col-md-4">Particulars</div>
		                  		<div class="col-sm-12 col-md-8"><input type='text' form='modal215_form' required name='part'></div>
						  </div>
				    	</div>
					</div>
	             	<div class="modal-footer">
		               	<button type="submit" class="btn green" form='modal215_form' name='save'>Update</button>
		               	<button type="button" class="btn red" form='modal215_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal216' data-toggle="modal" id='modal216_link'></a>
	<div id="modal216" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-full">
			<div class="modal-content">
				<form id='modal216_form' autocomplete="off">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Add Policy Application</h4>
					</div>
					<div class="modal-body">
						<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							<div class="row">
								<div class="col-sm-12 col-md-2">Application Number</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' required name='app_number'></div>
								<div class="col-sm-12 col-md-2">Policy Type</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='policy_type'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Preferred</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='preferred'></div>
								<div class="col-sm-12 col-md-2">Issuing Company</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='company'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Policy Term</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='term'></div>
								<div class="col-sm-12 col-md-2">Policy Name</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='policy_name'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Policy Holder</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='holder'></div>
								<div class="col-sm-12 col-md-2">Sum Insured</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='sum'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Adults</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='adults'></div>
								<div class="col-sm-12 col-md-2">Children</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='children'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Age (oldset member)</div>
								<div class="col-sm-12 col-md-4"><input type='number' step='any' form='modal216_form' min='0' name='age'></div>
								<div class="col-sm-12 col-md-2">Premium</div>
								<div class="col-sm-12 col-md-4"><input type='number' required form='modal216_form' step='any' min='0' name='premium'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Received Amount</div>
								<div class="col-sm-12 col-md-4"><input type='number' form='modal216_form' step='any' name='received_amount' min='0'></div>
								<div class="col-sm-12 col-md-2">Discount</div>
								<div class="col-sm-12 col-md-4"><input type='text' readonly='readonly' form='modal216_form' name='discount'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Type</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='type'></div>
								<div class='col-sm-12 col-md-6'>
									<div class="col-sm-12 col-md-4">Ported From</div>
									<div class="col-sm-12 col-md-8"><input type='text' form='modal216_form' name='ported_from'></div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Source</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='source'></div>
								<div class="col-sm-12 col-md-2">Team Lead</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='lead'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Sales Manager</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='sales'></div>
								<div class="col-sm-12 col-md-2">Tele-Caller</div>
								<div class="col-sm-12 col-md-4"><input type='text' form='modal216_form' name='caller'></div>
							</div>
							<div class="row">
								<div class="col-sm-12 col-md-2">Agent</div>
								<div class="col-sm-12 col-md-4"><input type='text' required form='modal216_form' name='agent'></div>
								<div class="col-sm-12 col-md-2">Attachment</div>
								<div class="col-sm-12 col-md-4">
									<input type="file" form='modal216_form' name='file' style='display:none' multiple>
									<button type='button' name='file_dummy' form='modal216_form' class='btn yellow-saffron'>Select File</button>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn green" form='modal216_form' name='save'>Add</button>
						<button type="button" class="btn red" form='modal216_form' data-dismiss='modal' name='cancel'>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>


				<a href='#modal218' data-toggle="modal" id='modal218_link'></a>
				<div id="modal218" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
						<div class="modal-dialog">
								<div class="modal-content">
										<form id='modal218_form' autocomplete="off">
											<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
													<h4 class="modal-title">Add Commission</h4>
											</div>
											<div class="modal-body">
												<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Number</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal218_form' name='policy_number'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Name</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal218_form' name='name'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Holder</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal218_form' name='holder'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Agent</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal218_form' name='agent'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Commission #</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal218_form' name='commission_num'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Commission Amount</div>
														<div class="col-sm-12 col-md-8"><input type='number' required form='modal218_form' step='any' name='commission'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Issue Date</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal218_form' name='issue'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Type</div>
														<div class="col-sm-12 col-md-8"><input type='text' required form='modal218_form' name='type'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Notes</div>
														<div class="col-sm-12 col-md-8"><textarea type='text' form='modal218_form' name='notes'></textarea></div>
													</div>
												</div>
											</div>
										<div class="modal-footer">
											<button type="submit" class="btn green" form='modal218_form' name='save'>Add</button>
											<button type="button" class="btn red" form='modal218_form' data-dismiss='modal' name='cancel'>Cancel</button>
										</div>
										</form>
								</div>
						</div>
				</div>

				<a href='#modal219' data-toggle="modal" id='modal219_link'></a>
				<div id="modal219" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
						<div class="modal-dialog">
								<div class="modal-content">
										<form id='modal219_form' autocomplete="off">
											<div class="modal-header">
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
													<h4 class="modal-title">Add Claim</h4>
											</div>
											<div class="modal-body">
												<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Number</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal219_form' name='policy_number'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Name</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal219_form' name='name'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Policy Holder</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal219_form' name='holder'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Agent</div>
														<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal219_form' name='agent'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Claim #</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal219_form' name='claim_num'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Claim Amount</div>
														<div class="col-sm-12 col-md-8"><input type='number' required form='modal219_form' step='any' name='claim'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Request Date</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal219_form' name='request'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Issue Date</div>
														<div class="col-sm-12 col-md-8"><input type='text' form='modal219_form' name='issue'></div>
													</div>
													<div class="row">
														<div class="col-sm-12 col-md-4">Notes</div>
														<div class="col-sm-12 col-md-8"><textarea type='text' form='modal219_form' name='notes'></textarea></div>
													</div>
												</div>
											</div>
										<div class="modal-footer">
											<button type="submit" class="btn green" form='modal219_form' name='save'>Add</button>
											<button type="button" class="btn red" form='modal219_form' data-dismiss='modal' name='cancel'>Cancel</button>
										</div>
										</form>
								</div>
						</div>
				</div>

				<a href='#modal220' data-toggle="modal" id='modal220_link'></a>
				<div id="modal220" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			        <div class="modal-dialog">
			            <div class="modal-content">
			                <form id='modal220_form' autocomplete="off">
				            	<div class="modal-header">
			                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			                    	<h4 class="modal-title">Add Note</h4>
			                	</div>
				                <div class="modal-body">
					               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
					               	<div class="row">
												<div class="col-sm-12 col-md-4">Date</div>
								     			<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal220_form' name='date'></div>
								     		</div>
					              <div class="row">
												<div class="col-sm-12 col-md-4">Details</div>
								     			<div class="col-sm-12 col-md-8"><textarea form='modal220_form' name='details'></textarea></div>
								     		</div>
								     		 </div>
					             </div>
				             	<div class="modal-footer">
				               	<button type="submit" class="btn green" form='modal220_form' name='save'>Add</button>
				               	<button type="button" data-dismiss='modal' class="btn red" form='modal220_form' name='cancel'>Cancel</button>
				             	</div>
			                </form>
			            </div>
			        </div>
			    </div>

	<a href='#modal221' data-toggle="modal" id='modal221_link'></a>
	<div id="modal221" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal221_form' autocomplete="off">
	            		<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Data Import</h4>
                	</div>
	                <div class="modal-body">
		              	<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
							  <div class='col-md-6'>
									<button type="button" name='download' style='margin-bottom:10px;' class='btn green-jungle'>Download Import Template</button>
							  </div>
						  </div>
					      <div class="row">
							  <div class='col-md-6'>
							 		<input type="file" required name='file' value='Select file' accept=".csv" style='display:none'>
									<button type='button' name='file_dummy' class='btn red-sunglo'>Select File</button>
							  </div>
				          </div>
		              	  <div class="row">
						     <div class='col-md-6'><output name='selected_file'></output></div>
					      </div>
		            	</div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal221_form' name='save'>Import</button>
	               	<button type="button" class="btn red" form='modal221_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal222' data-toggle="modal" id='modal222_link'></a>
	<div id="modal222" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal222_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add new Product</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal222_form' required name='name'></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Make</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal222_form' name='make'></div>
					      </div>
		              	  <div class="row">
								   	<div class="col-sm-12 col-md-4">Description</div>
                    				<div class="col-sm-12 col-md-8"><textarea form='modal222_form' name='desc'></textarea></div>
					      </div>
						  <div class="row">
						   			<div class="col-sm-12 col-md-4">Manufactured</div>
                    				<div class="col-sm-12 col-md-8"><input type='text' value='yes' required form='modal222_form' name='manu'></div>
					      </div>
						  <div class="row">
								   	<div class="col-sm-12 col-md-4">Raw Material</div>
                    				<div class="col-sm-12 col-md-8"><input type='text' value='yes' required form='modal222_form' name='purchased'></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Cost Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal222_form' name='cost'></div>
					     </div>
		                 <div class="row">
								   <div class="col-sm-12 col-md-4">Sale Price</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal222_form' name='sale'></div>
					     </div>
						 <div class="row">
								   	<div class="col-sm-12 col-md-4">Tax Rate (%)</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal222_form' name='tax'></div>
					     </div>
		            </div>
				</div>
             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal222_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal222_form' data-dismiss='modal' name='cancel'>Cancel</button>
             	</div>
	            </form>
	        </div>
	    </div>
	</div>

	<a href='#modal223' data-toggle="modal" id='modal223_link'></a>
	<div id="modal223" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal223_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add To Inventory</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
			                 <div class="row">
								<div class="col-sm-12 col-md-4">Item</div>
						    	<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal223_form' required name='name'></div>
						     </div>
			                 <div class="row">
								  <div class="col-sm-12 col-md-4">Assign Batch</div>
						    	  <div class="col-sm-12 col-md-8"><input type='text' required form='modal223_form' name='batch'></div>
						     </div>
			              	<div class="row">
							   	<div class="col-sm-12 col-md-4">Produced Quantity</div>
						     	<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal223_form' required name='quantity'></div>
							</div>
						</div>
		            </div>
	             	<div class="modal-footer">
		               	<button type="submit" class="btn green" form='modal223_form' name='save'>Add</button>
		               	<button type="button" class="btn red" form='modal223_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal224' data-toggle="modal" id='modal224_link'></a>
	<div id="modal224" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal224_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">COD Collection</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
			                 <div class="row">
								<div class="col-sm-12 col-md-4">Operator</div>
						    	<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='modal224_form' required name='operator'></div>
						     </div>
			                 <div class="row">
								  <div class="col-sm-12 col-md-4">Total Expected Collection</div>
						    	  <div class="col-sm-12 col-md-8"><input type='number' readonly='readonly' required form='modal224_form' name='expected' step='any'></div>
						     </div>
							 <div class="row">
 							   	<div class="col-sm-12 col-md-4">Already Collected</div>
 						     	<div class="col-sm-12 col-md-8"><input type='number' readonly='readonly' step='any' form='modal224_form' required name='already'></div>
 							</div>
							<div class="row">
							   	<div class="col-sm-12 col-md-4">Additional Collection</div>
						     	<div class="col-sm-12 col-md-8"><input type='number' step='any' form='modal224_form' required name='updated'></div>
							</div>
						</div>
		            </div>
	             	<div class="modal-footer">
		               	<button type="submit" class="btn green" form='modal224_form' name='save'>Add</button>
		               	<button type="button" class="btn red" form='modal224_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal225' data-toggle="modal" id='modal225_link'></a>
	<div id="modal225" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal225_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Receipt</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
							    <div class="col-sm-12 col-md-4">Receipt Id</div>
					        	<div class="col-sm-12 col-md-8"><input type='text' form='modal225_form' required name='receipt_id'></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Date</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal225_form' name='date'></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Account</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal225_form' required name='account'></div>
					      </div>
						  <div class="row">
								   <div class="col-sm-12 col-md-4">Heading</div>
                                    <div class="col-sm-12 col-md-8"><input type='text' form='modal225_form' name='heading'></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Narration</div>
                                    <div class="col-sm-12 col-md-8"><textarea form='modal225_form' name='narration'></textarea></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Receipt Amount</div>
					     			<div class="col-sm-12 col-md-8"><input type='number' step='any' min='0' form='modal225_form' name='amount' required></div>
					      </div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Balance</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal225_form' name='balance' readonly='readonly'></div>
					     		</div>
                        </div>

		             </div>
	             	<div class="modal-footer">
	               		<button type="submit" class="btn green" form='modal225_form' name='save'>Add</button>
	               		<button type="button" class="btn red" form='modal225_form' data-dismiss='modal' name='cancel'>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<a href='#modal226' data-toggle="modal" id='modal226_link'></a>
	<div id="modal226" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal226_form' autocomplete="off">
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Edit Accounts</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
		                 <form id='modal226_form' autocomplete="off">
							<fieldset>
								<button type="button" class='btn green' name='add_button'><i class='fa fa-plus'></i></button>
								<button type="button" class='btn red' name='delete_button'><i class='fa fa-trash'></i></button>
								<div id='modal226_columns'></div><br>
							</fieldset>
						 </form>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal226_form' name='save'>Save</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal227' data-toggle="modal" id='modal227_link'></a>
	<div id="modal227" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<form id='modal227_form' autocomplete="off">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Rename</h4>
					</div>
					<div class="modal-body">
					   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
						  <div class="row">
							   <div class="col-sm-12 col-md-4">Current Name</div>
							   <div class="col-sm-12 col-md-8"><input type='text' form='modal227_form' required name='old'></div>
						  </div>
						  <div class="row">
								<div class="col-sm-12 col-md-4">New Name</div>
								<div class="col-sm-12 col-md-8"><input type='text' form='modal227_form' required name='new'></div>
						   </div>
						</div>
					 </div>
					<div class="modal-footer">
						<button type="submit" class="btn green" form='modal227_form' name='save'>Rename</button>
						<button type="button" class="btn red" form='modal227_form' data-dismiss='modal' name='cancel'>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>

</div>
