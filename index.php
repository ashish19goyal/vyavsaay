<?php
	include "includes/header.php";
?>
		<!----- start-header---->
			<div id="home" class="header">
				<div class="top-header">
					<div class="logo">
						  <a href="#"><img src="images/logo.png" alt=""></a>
					</div>
					<a href="#" id='login_pull'>Login</a>
					
					<!----start-top-nav---->
					 <nav class="top-nav">
					 	<ul class="top-nav">
							<li><a href="#home" class="top-nav scroll">Home</a></li>
							<li><a href="#about" class="top-nav scroll">About</a></li>
							<li><a href="#reviews" class="top-nav scroll">Reviews</a></li>
							<li><a href="#pricing" class="top-nav scroll">Pricing</a></li>
							<li><a href="#register" class="top-nav scroll">Register</a></li>
							<li><a href="#contact" class="top-nav scroll">Contact</a></li>
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
		<!----- banner ---->
			<div class="banner">
			<!-- 	<div class="container"> -->
					<div class="banner-info">
						<div class="col-md-6 appp">
							 <img src="images/mbl-app.png" alt="">
						</div>
						<div class="col-md-6 banner-text">
							<h1>Vyavsaay</h1>
							<p>Vyavsaay provides a cloud based, cross platform solution to manage your business processes and information.</p>
							<p>Email: info@vyavsaay.com <br> Phone: 9818005232</p>
						</div>
					<!-- 	<div class="clearfix"> </div> -->
					</div>
		<!-- 	</div> -->
		</div>
			<!----- banner ---->
			<!----- /start-About---->
			<div id="about" class="about">
	       		<div class="container">
	       		   <div class="gallery-head text-center">
					  <h3>ABOUT</h3>
					  <p>Vyavsaay is best suited for small and medium enterprises that don't want to spend a lot of money in setting up and managing IT infrastructure and availing a speedy internet connection.</p>
					 <p>Vyavsaay takes care of managing your business processes and information, so that you can focus on developing client relationships and optimizing business processes for the growth of your business.</p>
				    </div>
	       			<div class="row text-center">
	       				<div class="col-md-4 about_grid screenshots">
	       					 <img src="images/Screen1.jpeg" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid screenshots">
	       					<img src="images/Screen2.jpeg" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid screenshots">
	       					<img src="images/Screen3.jpeg" alt="">
	       				</div>
	       				<div class="clearfix"> </div>
	       			</div>
	       		</div>
	       	</div>
	  <!---//End-About----->
	 	<!----- /strat-Reviews---->
				<div id="reviews" class="Reviews">
		       		<div class="container">
		       		   <div class="review-head text-center">
						  <h3>Reviews</h3>
					    </div>
		       			<div class="row revies-content text-center">
		       				<div class="review_grid">
			       				<div class="col-md-4 review-img1">
			       					 <img src="images/img-1.JPG" alt="">
			       				</div>
			       				<div class="col-md-8 review-text">
			       					<p>"Vyavsaay is very user friendly. Anybody can use it with ease. It took us only a few hours to setup and get started with Vyavsaay."</p>
			       					<span>Business Owner,<br>Professional Services Industry</span>
			       				</div>
			       				<div class="clearfix"> </div>
			       			</div>
		       				<div class="review_grid">
			       				<div class="col-md-4 review-img2">
			       					 <img src="images/img-2.JPG" alt="">
			       				</div>
			       				<div class="col-md-8 review-text">
			       					<p>"Now we can manage all our process with just one platform. We don't need to use multiple desktop and mobile solutions and worry about moving data between them."</p>
			       					<span>Business owner,<br>HealthCare Industry</span>
			       				</div>
			       				<div class="clearfix"> </div>
			       			</div>
		       			</div>
		       			<div class="clearfix"> </div>
		       		</div>
		       	</div>
	  <!---//End-Reviews----->
<!----- /start-demo---->
		<div id="pricing" class="demo">
       		<div class="container">
       		   <div class="demo-head text-center">
				  <h3>Pricing</h3>
			    </div>
       			<div class="row Demo text-center">
       				<div class="demo-grid">
	       				<div class="col-md-7 Demo-text pricing_grid">
	       					<p style='text-align:center;'><b>Single User</b></p>
	       					Ideal for small businesses with only one business owner. All the features of Vyavsaay are available under this package.
	       					<br>Free subscription for first four months.
	       					<p style='position:absolute;bottom:0;text-align:center;'><b>Rs. 500/month</b></p>
	       				</div>
	       				<div class="col-md-7 Demo-text pricing_grid">
	       					<p style='text-align:center;'><b>Multi-User</b></p>
	       					Suitable for diverse businesses with upto 10 business owners and users. All the features of Vyavsaay are available under this package.
	       					<br>Free subscription for first three months.
	       					<p style='position:absolute;bottom:0;text-align:center;'><b>Rs. 2000/month</b></p>
	       				</div>
	       				<div class="col-md-7 Demo-text pricing_grid">
	       					<p style='text-align:center;'><b>Enterprise Level</b></p>
	       					Customized solutions for medium sized enterprises with specific business requirements. You can also pick and choose existing implementations.
	       					<p style='position:absolute;bottom:0;text-align:center;'><b><a href="#contact">Ask for a quote</a></b></p>
	       				</div>
	       				<div class="clearfix"></div>
	       			</div>
       			</div>
       			<div class="clearfix"></div>
       		</div>
		</div>
	  <!---//End-Reviews----->
	  <!----- /strat-Download---->
		<div id="register" class="contact">
       		<div class="container">
       			<div class="demo-head text-center">
				  <h3>Register</h3>
			    </div>
       			<div class="gallery-head text-center">
       				<p>Fill in the following form to register for a new account.</p>
       			</div>
       					
       					<div id="r_register" class="contact-form">
							<div id="failed_register"></div>
							<form id="registeration">
								<fieldset>
									 <p class="comment-form-author">
									<label>User ID</label><input class='textbox' type="text" placeholder='user id...' onblur="userid_validation()" required><label id="userid_validation"></label>
									</p></br>
									 <p class="comment-form-author">
									<label>Email</label><input class='textbox' type="email" placeholder='email id...' onblur="emailid_validation()" required><label id="emailid_validation"></label>
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
															<option value="clothing">Clothing & Apparels</option>
															<option value="pharmacy">Pharmacy (medicine store)</option>
															<option value="clinic">Nursing Home & clinics</option>
															<option value="food">Bakery & food joints</option>
															<option value="restaurant">Restaurant</option>
															<option value="hotel">Hotel & Guest house</option>
															<option value="opticals">Opticals</option>
															<option value="lawyer">Lawyer or law firm</option>
															<option value="ca">CA or CA firm</option>
															<option value="events">Event Management (Marriages,Parties,Performances)</option>
														</select>
									</p></br>
									<input type="submit" value='Submit'>
								</fieldset>
							</form>
							</div>
							<div class="Demo-text"><p id="r_complete"></p></div>			
       					
       		</div>       				
		</div>
	  <!---//End-Download----->
	    <!---/start-contact----->
	    <div class="contact" id="contact">
	      	<div class="container">
	      		  <h3>CONTACT</h3>
      			  <div class="gallery-head text-center">
       			  </div>
       			
      			  <div class="contact-form">
		  	        <form id='index_contact'>
			    	    <p class="comment-form-author"><label>Name</label>
			    	    	<input type="text" name='userName' required class="textbox" placeholder="Enter your name...">
				    	</p>
				        <p class="comment-form-author"><label>Email</label>
				     	   <input type="email" name='userEmail' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Phone</label>
				     	   <input type="tel" name='userPhone' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Message</label>
				    	  <textarea name='userMsg' placeholder='Enter your message...'></textarea>
				        </p>
				        <input type="submit" value="Submit">
			        </form>
		          </div>
		          <div class="Demo-text"><p id="contact_complete"></p></div>
	      	</div>
		</div>

	 <!---//end-contact----->
	<a href="#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>


<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		
<script>
		$(document).ready(function() {										
			$().UItoTop({ easingType: 'easeOutQuart' });
		});						

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

			var login_pull = $('#login_pull');
			var	login_box = $('.login_box');
			$(login_pull).on('click', function(e) {
				e.preventDefault();
				login_box.slideToggle();
				$(login_box).css("display","inline");
				var user=document.getElementById('login').elements[1];
				$(user).focus();
			});

		});

		$('#registeration').on('submit',function(event)
		{
			event.preventDefault();
			register_click();
		});

		$('#index_contact').on('submit',function(event)
		{
			event.preventDefault();
			contact_click();
		});
				
</script>
