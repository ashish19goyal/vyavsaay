<?php
	include "includes/index_header.php";
?>
		
		<!----- /start-About---->
			<div class='contact' style='height:450px;'>
				<div class="container" style='margin-top:100px;'>
	       		   <div class="row text-center">
	       			<a href='#register' class='option_icon'>Register as user</a>
	       			<a href='#reseller_register' class='option_icon'>Register as re-seller</a>
	       			</div>
	       		</div>
	       	</div>
	  <!---//End-About----->
		
	  <!----- /start-register---->
		<div id="register" class="contact">
       		<div class="container">
       			<div class="gallery-head text-center">
       				<p>Fill in the following form to register for a new account.</p>
       			</div>
       					
       					<div id="r_register" class="contact-form">
							<div id="failed_register"></div>
							<form id="registeration">
								<fieldset>
									 <p class="comment-form-author">
									<label>User ID</label><input id='register_user_id' class='textbox' type="text" placeholder='user id...' onblur="userid_validation($(this).val())" required><label id="userid_validation"></label>
								</p></br>
								 <p class="comment-form-author">
								<label>Email</label><input class='textbox' type="email" placeholder='email id...' onblur="emailid_validation($(this).val())" required><label id="emailid_validation"></label>
								</p></br>
								 <p class="comment-form-author">
								 <label>Full Name</label><input class='textbox' type="text" placeholder='full name...' required>
								  <p class="comment-form-author"></br>
								 <p class="comment-form-author">
								 <label>Contact No</label><input class='textbox' type="tel" required placeholder='contact no...'>
								  </p></br>
								 <p class="comment-form-author">
								 <label>Password</label><input class='textbox' type="password" required placeholder='*********'>
								  </p></br>
								 <p class="comment-form-author">
								 <label>Retype Password</label><input class='textbox' type="password" onkeyup="match_password()" required placeholder='*********'><label id="password_match_validation"></label>
								 </p></br>
								 <p class="comment-form-author">
								 <label>Select your industry</label><select class='textbox' id="r_industry" required>
														<option value="general" selected="selected">General Store</option>
														<option value="clothing">Clothing & Footwear</option>
														<option value="pharmacy">Pharmacy (medicine store)</option>
														<option value="wholesale">Wholesale or Distributor</option>
														<option value="clinic">Nursing Home & clinics</option>
														<option value="food">Restaurant, Bakery & food joints</option>
														<option value="hotel">Hotel & Guest house</option>
														<option value="opticals">Opticals</option>
														<option value="lawyer">Lawyer or law firm</option>
														<option value="ca">CA or CA firm</option>
														<option value="events">Event Management (Marriages,Parties,Performances)</option>
														<option value="all">Contributor</option>
													</select>
								</p></br>
								<input type="submit" value='Submit'>
							</fieldset>
						</form>
				</div>
				<div class="Demo-text"><p id="r_complete"></p></div>			
       		</div>       				
		</div>
	  <!---//End-register----->

	
	<div id="reseller_register" class="contact">
       		<div class="container">
       			<div class="gallery-head text-center">
       				<p>Fill in the following form to register as a re-seller.</p>
       			</div>
       					<div id='reseller_r_register' class="contact-form">
							<div id="reseller_failed_register"></div>
							<form id="reseller_registeration">
								<fieldset>
									 <p class="comment-form-author">
									<label>User ID</label><input class='textbox' type="text" placeholder='user id...' onblur="reseller_id_validation($(this).val())" required><label id="reseller_id_validation"></label>
									</p></br>
									 <p class="comment-form-author">
									<label>Email</label><input class='textbox' type="email" placeholder='email id...' onblur="reseller_emailid_validation($(this).val())" required><label id="reseller_emailid_validation"></label>
									</p></br>
									 <p class="comment-form-author">
									 <label>Full Name</label><input class='textbox' type="text" placeholder='full name...' required>
									  <p class="comment-form-author"></br>
									 <p class="comment-form-author">
									 <label>Contact No</label><input class='textbox' type="tel" required placeholder='contact no...'>
									  </p></br>
									 <p class="comment-form-author">
								<input type="submit" value='Submit'>
							</fieldset>
						</form>
				</div>	
				<div class="Demo-text"><p id="reseller_r_complete"></p></div>		
       		</div>       				
		</div>
	  <!---//End-register----->
	
		
	<script>
		 		
		
		$('#registeration').on('submit',function(event)
		{
			event.preventDefault();
			register_click();
		});

		$('#reseller_registeration').on('submit',function(event)
		{
			event.preventDefault();
			reseller_register_click();
		});
				
	</script>
</body>
</html>