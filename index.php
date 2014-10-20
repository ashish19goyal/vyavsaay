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
							<li><a href="#demo" class="top-nav scroll">Demo</a></li>
							<li><a href="#d_register" class="top-nav scroll">Register</a></li>
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
				<div class="container">
					<div class="banner-info">
						<div class="col-md-6 appp">
							 <img src="images/mbl-app.png" alt="">
						</div>
						<div class="col-md-6 banner-text">
							<h1>Vyavsaay</h1>
							<p>Vyavsaay provides a cloud based, cross platform solution to manage all business processes and information.</p>
						</div>
					<!-- 	<div class="clearfix"> </div> -->
					</div>
			</div>
		</div>
			<!----- banner ---->
			<!----- /start-About---->
			<div id="about" class="about">
	       		<div class="container">
	       		   <div class="gallery-head text-center">
					  <h3>ABOUT</h3>
					  <p>Vyavsaay is best suited for small and medium enterprises that don't want to spend a lot of money in setting up and managing IT infrastructure. And you also don't need an active internet connection to use it.</p>
					 <p>Vyavsaay takes care of managing your business processes and information, so that you can focus on developing client relationships and optimizing business processes for the growth of your business.</p>
				    </div>
	       			<div class="row text-center">
	       				<div class="col-md-4 about_grid">
	       					 <img src="images/Screen1.png" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid">
	       					<img src="images/Screen2.png" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid">
	       					<img src="images/Screen3.png" alt="">
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
			       					 <img src="images/img-1.jpg" alt="">
			       				</div>
			       				<div class="col-md-8 review-text">
			       					<p>"Vyavsaay is very user friendly. Anybody can use it with ease. It took us only a few hours to setup and get started with Vyavsaay."</p>
			       					<span>Employee</span>
			       				</div>
			       				<div class="clearfix"> </div>
			       			</div>
		       				<div class="review_grid">
			       				<div class="col-md-4 review-img2">
			       					 <img src="images/img-2.jpg" alt="">
			       				</div>
			       				<div class="col-md-8 review-text">
			       					<p>"Now we can manage all our process with just one platform. We don't need to use multiple desktop and mobile solutions and worry about moving data between them."</p>
			       					<span>Business owner</span>
			       				</div>
			       				<div class="clearfix"> </div>
			       			</div>
		       			</div>
		       			<div class="clearfix"> </div>
		       		</div>
		       	</div>
	  <!---//End-Reviews----->
<!----- /start-demo---->
		<div id="demo" class="demo">
       		<div class="container">
       		   <div class="demo-head text-center">
				  <h3>Demo</h3>
			    </div>
       			<div class="row Demo text-center">
       				<div class="demo-grid">
	       				<div class="col-md-5 demo-img1">
	       					 <img src="images/ab-1.png" alt="">
	       				</div>
	       				<div class="col-md-7 Demo-text">
	       					<p>Here is a quick introduction video for vyavsaay</p>
	       				</div>
	       				<div class="clearfix"> </div>
	       			</div>
       			</div>
       			<div class="clearfix"> </div>
       		</div>
		</div>
	  <!---//End-Reviews----->
	  <!----- /strat-Download---->
		<div id="d_register" class="download">
       		<div class="container">
       			<div class="Downloads">
       				<div class="download_left">
       					<h3>Register</h3>
       					<div class="Demo-text">
       						<p>Click the following link to register for a new account. The subscription is free for first 3 months.</p>
       					</div>
       					<a class="Down-btn" href="register.php">Register</a>
       				</div>
       				
       				<div class="clearfix"> </div>
       			</div>		
			</div>
		</div>
	  <!---//End-Download----->
	    <!---/start-contact----->
	    <div class="contact" id="contact">
	      	<div class="container">
	      		  <h3>CONTACT</h3>
      			  <div class="contact-form">
		  	        <form>
			    	    <p class="comment-form-author"><label for="author"> Name</label>
			    	    	<input type="text" class="textbox" placeholder="Enter your name...">
				    	</p>
				        <p class="comment-form-author"><label for="author">Email</label>
				     	   <input type="text" class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label for="author">Message</label>
				    	  <textarea placeholder='Enter your message...'></textarea>
				        </p>
				        <input name="submit" type="submit" id="submit" value="Submit">
			        </form>
		          </div>
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
		
		
</script>
