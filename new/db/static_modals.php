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