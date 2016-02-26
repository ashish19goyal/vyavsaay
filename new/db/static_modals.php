/*box_id*:*modal2
*@*box_title*:*Access Denied
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal2' data-toggle="modal" id='modal2_link'></a>
<div id="modal2" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal2_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Access Denied</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						You don't have permissions to perform this operation.
						To allow this operation, ask your administrator to update your access control.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal5
*@*box_title*:*Duplicate Entry
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal5' data-toggle="modal" id='modal5_link'></a>
<div id="modal5" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal5_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Duplicate Entry</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This operation will result in a duplicate entry. Operation aborted.
						Please validate whether the required record already exists or try again with different parameters (e.g. different name).
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal6
*@*box_title*:*Get Online
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal6' data-toggle="modal" id='modal6_link'></a>
<div id="modal6" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal6_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Get Online</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This operation can be performed in online mode only. 
						Please make sure you are connected to internet and change to online mode.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal7
*@*box_title*:*Offer Finished
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal7' data-toggle="modal" id='modal7_link'></a>
<div id="modal7" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal7_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Offer Finished</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Offer will not be applicable on this purchase as the offered product is out of stock.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal52
*@*box_title*:*Offline Data Deleted
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal52' data-toggle="modal" id='modal52_link'></a>
<div id="modal52" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
     <div class="modal-dialog">
         <div class="modal-content">
             <form id='modal52_form'>                               
            	<div class="modal-header">
                 	<button type="button" class="close" data-dismiss="modal" onclick='delete_session();' aria-hidden="true"></button>
                 	<h4 class="modal-title">Offline Data Deleted</h4>
             	</div>
               <div class="modal-body">
                  <div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
                     Local storage on this system has been cleared. 
							You will be logged out now. Login again to access the system in online mode.	
               	</div>
               </div>
            	<div class="modal-footer">
            	<input type="button" class="btn green" data-dismiss='modal' onclick='delete_session();' name='close' value='Ok'>
         	</div>
      	</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal56
*@*box_title*:*Location Not Available
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal56' data-toggle="modal" id='modal56_link'></a>
<div id="modal56" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal56_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Location Not Available</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Oops! your location can't be determined at the moment. Please try in a few moments.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal58
*@*box_title*:*Promotions Sent
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal58' data-toggle="modal" id='modal58_link'></a>
<div id="modal58" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal58_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Sent</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						All selected customers have been sent the news Letter and SMS on their email-ids and phone numbers respectively.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal59
*@*box_title*:*Emails Disabled
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal59' data-toggle="modal" id='modal59_link'></a>
<div id="modal59" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal59_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Emails Disabled</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Emails are disabled for this account.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal60
*@*box_title*:*SMS Disabled
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal60' data-toggle="modal" id='modal60_link'></a>
<div id="modal60" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal60_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">SMS Disabled</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						SMS are disabled for this account.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal61
*@*box_title*:*Updating Order Status
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal61' data-toggle="modal" id='modal61_link'></a>
<div id="modal61" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal61_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Updating Order Status</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Please wait while we update the status of the processed orders.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal62
*@*box_title*:*Thanks
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal62' data-toggle="modal" id='modal62_link'></a>
<div id="modal62" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal62_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Thanks</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Thanks! Your details have been saved. We will reach out to you on the suggested follow-up date.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal63
*@*box_title*:*Billing Aborted
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal63' data-toggle="modal" id='modal63_link'></a>
<div id="modal63" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal63_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Billing Aborted</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Bill could not be generated as none of the items were found billable.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal64
*@*box_title*:*Partial Billing Not Allowed
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal64' data-toggle="modal" id='modal64_link'></a>
<div id="modal64" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal64_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Partial Billing Not Allowed</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Bill could not be generated as partial billing of items is disabled.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal65
*@*box_title*:*Repeated Entry
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal65' data-toggle="modal" id='modal65_link'></a>
<div id="modal65" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal65_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Repeated Entry</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This is a repeated entry. Please check again and continue.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal66
*@*box_title*:*Incorrect Barcode
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal66' data-toggle="modal" id='modal66_link'></a>
<div id="modal66" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal66_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Incorrect Barcode</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Sorry, we could not find any item corresponding to this bar code. Please try again.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal67
*@*box_title*:*Wrong Pick
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal67' data-toggle="modal" id='modal67_link'></a>
<div id="modal67" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal67_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Wrong Pick</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This item is not desired to be picked. Please put it back.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal68
*@*box_title*:*Change DRS number
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal68' data-toggle="modal" id='modal68_link'></a>
<div id="modal68" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal68_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Change DRS number</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This DRS number has already been taken. Please use a different number.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal69
*@*box_title*:*Item packed
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal69' data-toggle="modal" id='modal69_link'></a>
<div id="modal69" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal69_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Item packed</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Item packed and ready for dispatch.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal70
*@*box_title*:*Item rejected
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal70' data-toggle="modal" id='modal70_link'></a>
<div id="modal70" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal70_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Item rejected</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Item rejected. Please put it in the rejected section.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal71
*@*box_title*:*Item mismatch
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal71' data-toggle="modal" id='modal71_link'></a>
<div id="modal71" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal71_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Item mismatch</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						<p style='color:#A00'>Scanned item doesn't match the list.</p>
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal72
*@*box_title*:*Wrong Placement
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal72' data-toggle="modal" id='modal72_link'></a>
<div id="modal72" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal72_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Wrong Placement</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This item is designated to be placed somewhere else.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal73
*@*box_title*:*Import Aborted
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal73' data-toggle="modal" id='modal73_link'></a>
<div id="modal73" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal73_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Import Aborted</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This import will be aborted as all the required criteria are not being met.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal74
*@*box_title*:*Netwrok Error
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal74' data-toggle="modal" id='modal74_link'></a>
<div id="modal74" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal74_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Netwrok Error</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Operation could not be completed because of network error. Please try again.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal75
*@*box_title*:*SKU in Inventory
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal75' data-toggle="modal" id='modal75_link'></a>
<div id="modal75" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal75_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">SKU in Inventory</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Inventory is listed against this SKU. Are you sure, you want to list this as a combo pack?
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal76
*@*box_title*:*Pincode not serviced
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal76' data-toggle="modal" id='modal76_link'></a>
<div id="modal76" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal76_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Pincode not serviced</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						<p style='color:#a00'>The pincode for this order is not being serviced</p>
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal77
*@*box_title*:*Change Bag Number
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal77' data-toggle="modal" id='modal77_link'></a>
<div id="modal77" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal77_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Change Bag Number</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This bag number is already taken. Please use another number.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal78
*@*box_title*:*Change MTS Number
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal78' data-toggle="modal" id='modal78_link'></a>
<div id="modal78" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal78_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Change MTS Number</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						This MTS number is already taken. Please use another number.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal79
*@*box_title*:*Questionnaire Submitted
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal79' data-toggle="modal" id='modal79_link'></a>
<div id="modal79" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal79_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Questionnaire Submitted</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Your responses have been captured. Thanks!
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal80
*@*box_title*:*API Sync Success
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal80' data-toggle="modal" id='modal80_link'></a>
<div id="modal80" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal80_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Data Sync Success!</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						All order status have been updated on partner sites.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal81
*@*box_title*:*API Sync Failed
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal81' data-toggle="modal" id='modal81_link'></a>
<div id="modal81" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal81_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Data Sync Failed!</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Something wrong happened. Please try again.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal82
*@*box_title*:*Incorrect AWB
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal82' data-toggle="modal" id='modal82_link'></a>
<div id="modal82" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal82_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Incorrect</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						Selected AWB # is not marked for delivery. Please check again.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal85
*@*box_title*:*QR Data Conversion
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal85' data-toggle="modal" id='modal85_link'></a>
<div id="modal85" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal85_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">QR Data Conversion</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						QR Scan data conversion has been completed.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal86
*@*box_title*:*QR Scan Saved
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal86' data-toggle="modal" id='modal86_link'></a>
<div id="modal86" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal86_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">QR Scan Saved</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						QR scan was successfully saved.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>

/***function limiter***/

/*box_id*:*modal87
*@*box_title*:*No Phone Numbers
*@*box_type*:*static
*@*function_name*:*
*@*function_def*:*
*@*status*:*active
*@*last_updated*:*1
*@*box_content*:*
*/
<a href='#modal87' data-toggle="modal" id='modal58_link'></a>
<div id="modal87" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id='modal87_form'>                               
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">No Contact Information</h4>
				</div>
				<div class="modal-body">
					<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
						System doesn't have the contact information of this staff.
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
				</div>
			</form>
		</div>
	</div>
</div>