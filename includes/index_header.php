<!DOCTYPE html>
<!-- <html manifest="vyavsaay.appcache"> -->
<html>
	 <head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Find industry standard and customizable automation solutions for your business. Setup is fast and easy. The range of solutions include Billing, Inventory management, Accounting, Project management, Task force management and CRM.">
		<title data-i18n="master.vyavsaay">Vyavsaay ERP</title>
		<?php
			session_start();			
			include "js_includes_index.php";
			include "css_includes_index.php";
		?>
		<link rel="icon" href="./images/favicon.png">
	</head>
	<body onload="default_load();">
		<div id="loading_icon"><img src="./images/loader.gif"></div>
		<div id="transparent_layer"></div>
		
			
			<!----- start-header-menu---->
			<div id="home" class="header">
				<div class="top-header">
					<div class="logo">
						  <a href="#"><img src="images/logo.png" alt=""></a>
					</div>
					
					<!----start-top-nav---->
					 <nav class="top-nav">
					 	<ul class="top-nav">
							<li><a href="index.php" class="top-nav">Home</a></li>
							<li><a href="register.php" class="top-nav">Register</a></li>
							<li><a href="faqs.php" class="top-nav">FAQs</a></li>
							<li><a href="http://vyavsaaydiaries.blogspot.in/" target='_blank' class="top-nav">Diaries</a></li>
							<li><a href="contact.php" class="top-nav">Contact</a></li>
							<li><a href="#" id='login_pull' onclick='display_login_box();' class="top-nav">Login</a></li>
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
			<!----- start-header-menu---->
			
		
		<!-- end share box -->
		
 		<script>
	
		addEventListener("load", function()
		{
			setTimeout(hideURLbar, 0);
		}, false); 

		function hideURLbar()
		{
			window.scrollTo(0,1); 
		}
		
		$(document).ready(function(){										
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

		});

		function display_login_box()
		{
			var	login_box = $('.login_box');
			login_box.slideToggle();
			$(login_box).css("display","inline");
			var user=document.getElementById('login').elements[1];
			$(user).focus();
		}
		
	</script>
			