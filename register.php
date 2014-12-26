<?php
	include "includes/index_header.php";
?>
		<!----- start-header---->
			<div id="home" class="header">
				<div class="top-header">
					<div class="logo">
						  <a href="#"><img src="images/logo.png" alt=""></a>
					</div>
					<a href="#" id='login_pull' onclick="display_login_box();">Login</a>
					
					<!----start-top-nav---->
					 <nav class="top-nav">
					 	<ul class="top-nav">
							<li><a href="index.php#home" class="top-nav">Home</a></li>
							<li><a href="index.php#about" class="top-nav">About</a></li>
							<li><a href="index.php#reviews" class="top-nav">Reviews</a></li>
							<li><a href="index.php#pricing" class="top-nav">Pricing</a></li>
							<li><a href="index.php#contact" class="top-nav">Contact</a></li>
							<li><a href="" class="top-nav scroll">Register</a></li>
						</ul>
						<a href="#" id="pull"><img src="images/menu-icon.png" title="menu" /></a>
					</nav>
					<div class="clearfix"> </div>
				</div>
			</div>
				
				<div class='login_box'>
       				<div id="failed_auth"></div>
					<form id='login'>
						<fieldset>
							Login ID: <input type="text" autocomplete="on" autofocus="autofocus" required></br>
							Password: <input type="password" required></br>
							<a href="pass_reset.php">Forgot password?</a></br>
							<input type="submit" value='Login'>
						</fieldset>
					</form>
       			</div>
		<!----- //End-header---->
		
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

		addEventListener("load", function()
		{
			setTimeout(hideURLbar, 0);
		}, false); 

		function hideURLbar()
		{
			window.scrollTo(0,1); 
		}

		$('#login').on('submit',function(event)
		{
			event.preventDefault();
			login_action();
		});

		 		
		jQuery(document).ready(function($) {
			$(".scroll").click(function(event){		
				event.preventDefault();
				$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
			});
		});

		$(function() {
			var pull = $('#pull');
			var	menu = $('nav ul');
			var	menuHeight	= menu.height();
			$(pull).on('click', function(e) {
				e.preventDefault();
				menu.slideToggle();
			});
			$(window).resize(function(){
        		var w = $(window).width();
        		if(w > 320 && menu.is(':hidden')) {
        			menu.removeAttr('style');
        		}
    		});

		});

		function display_login_box()
		{
			var	login_box = $('.login_box');
			login_box.slideToggle();
			$(login_box).css("display","inline");
			var user=document.getElementById('login').elements[1];
			$(user).focus();
		}
		
		
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
