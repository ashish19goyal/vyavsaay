<!DOCTYPE html>
<html manifest="vyavsaay.appcache">
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
			
			<!-- share box -->
		<div id="share_box" data-url="http://vyavsaay.com" data-text="Latest technology for your business" title='Share'>
			<div class="box">
				<div class="count"><img src='./images/share.png' style='width:40px;height:40px'></div>
				<div class="share">share</div>
			</div>
			<div class="social_buttons">
				<div class="button">
					<a href='https://www.google.com/+Vyavsaayindia' target='_blank'>
						<img src='./images/google.png' title="+1">
					</a>
					<a href="https://plus.google.com/share?url=http%3A%2F%2Fvyavsaay.com" target='_blank'>Share</a>
				</div>
				<div class="button">
					<a href="https://twitter.com/VyavsaayIndia" target='_blank'><img src='./images/twitter.jpeg' title="Follow @VyavsaayIndia"></a>
					 <!-- <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://vyavsaay.com" data-text="Latest technology for your business" data-via="ashish_18goyal" data-count="horizontal">Tweet</a> -->
					<a href="https://twitter.com/intent/tweet?text=Latest%20technology%20for%20your%20business&url=http%3A%2F%2Fvyavsaay.com&via=ashish_18goyal" target='_blank'>Tweet</a>
				</div>
				<div class="button">
					<a href="https://www.facebook.com/vyavsaayindia" target='_blank'><img src='./images/fb.png' title="Like"></a>
					<!-- <div class="fb-share-button" data-href="http://vyavsaay.com" data-layout="button"></div> -->
					<a href="http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fvyavsaay.com&t=Latest%20technology%20for%20your%20business" target='_blank'>Share</a>
				</div>
				<div class="button">
					<div onclick='modal34_action();'>
						<img src='./images/whatsapp.jpeg' title="Connect">
						<div>Connect</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="modal_forms">
			<div id="modal34" title="Subscribe to Vyavsaay on whatsapp">
				<form id='modal34_form'>
					<fieldset>
						<label>Name<input type="text"></label>
						<label>Contact Number<input type="number" required></label>
						<input type="submit" value="Subscribe">
					</fieldset>
				</form>
			</div>
		</div>
		
		<!-- end share box -->
		
 		<script>
			!function()
			{
				$("#modal34").dialog({
			   		autoOpen: false,
			   		width: 300,
			   		modal: true,
			   		show: "slide",
			   		closeOnEscape: true,
				});
			}();	

			function modal34_action()
			{
				var form=document.getElementById("modal34_form");
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					var name=form.elements[1].value;
					var contact=form.elements[2].value;
					var post_data="name="+name+"&contact="+contact;
					
					ajax_with_custom_func("./ajax/whatsapp.php",post_data,function(e)
					{
						console.log(e.responseText);
						$("#modal34").dialog("close");
					});		
				});
				$("#modal34").dialog("open");
			}
						
	
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

		/////display social media buttons
	    $('#share_box').on('click',function(event)
	   	{
		   	$(this).find('.social_buttons').show();
		});
	    $('#share_box').on('mouseleave',function(event)
    	{
    	   	$(this).find('.social_buttons').hide();
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
			