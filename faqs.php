<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="CSS/index_style.css"> <!-- CSS reset -->
	<link rel="stylesheet" href="CSS/faq_reset.css"> <!-- CSS reset -->
	<link rel="stylesheet" href="CSS/faq_style.css"> <!-- Resource style -->
	<link rel="stylesheet" href="CSS/bootstrap.css">
	<script src='./JavaScripts/open/jquery-1.11.1.min.js'></script>
	<script src='./JavaScripts/open/jquery-ui.min.js'></script>
	<script src="./JavaScripts/prop/faq_main.js"></script> <!-- Resource jQuery -->
	<meta name="description" content="Find industry standard and customizable automation solutions for your business. Setup is fast and easy. The range of solutions include Billing, Inventory management, Accounting, Project management, Task force management and CRM.">
	<title data-i18n="master.vyavsaay">Vyavsaay ERP</title>
	<link rel="icon" href="./images/favicon.png">
</head>
<body>
			
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
							</ul>
						<a href="#" id="pull"><img src="images/menu-icon.png" title="menu" /></a>
					</nav>
					<div class="clearfix"> </div>
				</div>
			</div>
				
			<!----- start-header-menu---->
			
		
 		<script>
		 		
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
		
	</script>

	<div class="cd-faq-items">
		<ul id="basics" class="cd-faq-group">
			<li class="cd-faq-title"><h2>About Service</h2></li>
			<li>
				<a class="cd-faq-trigger" href="#0">How is Vyavsaay better than other ERP solutions?</a>
				<div class="cd-faq-content">
				<p>
					Vyavsaay is the next generation of ERP solutions.
					It blurs the line between terminal based solution and a mobile based app. It works seamlessly on every platform. 
					Furthermore, it is designed to be robust, while retaining the capability to scale up as per business' requirements. 
					It integrates (or plans to) with all the leading online services that can be used for customer, supplier and employee interactions. 
				</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">How do I get started?</a>
				<div class="cd-faq-content">
					<p>Go to the <a href='register.php'>register</a> section and fill out the form for registration as a user. You can login and start using the solution right after registration. For initial setup guidance, refer to the <a>get started</a> documentation.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">Which service plan will best suit my needs?</a>
				<div class="cd-faq-content">
					<p>If you are not sure about which service plan to use, start with the basic plan. You can upgrade whenever you want.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">Can this solution be hosted on my servers?</a>
				<div class="cd-faq-content">
					<p>Absolutely. Please <a href='contact.php'>contact</a> us.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">I am using another solution, how do I migrate to Vyavsaay?</a>
				<div class="cd-faq-content">
					<p>Its simple. Vyavsaay team will help sanitize your existing data and import it into the new Vyavsaay solution.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">How would I conduct my business if this service is unavailable?</a>
				<div class="cd-faq-content">
					<p>Vyavsaay uses the most trusted AWS cloud for hosting its server. However, in the unlikely scenario of a service outage, you can still carry out your business. You can use the offline mode of Vyavsaay to carry out you bussiness. And when the service is up again, you can sync back your data to the server.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">If I am not using everything, do I still pay for it?</a>
				<div class="cd-faq-content">
					<p>You can start from the basic plan. If you feel the need for more advanced features, you can switch over to the premium or multi-user plans. You can also as Vyavsaay to create a custom plan for you based on your volume of transactions.</p>
				</div> <!-- cd-faq-content -->
			</li>
		</ul> <!-- cd-faq-group -->
</br>
		<ul id="mobile" class="cd-faq-group">
			<li class="cd-faq-title"><h2>About Technology</h2></li>
			<li>
				<a class="cd-faq-trigger" href="#0">What hardware would I need to install?</a>
				<div class="cd-faq-content">
					<p>You would only need an internet connection and compture systems/mobile devices. Vyavsaay is hosted on the cloud and accessible from anywhere through an internet connection. Even, if you don't have a consistent internet connection, you can still access it.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">What if I don't have a good quality internet connection?</a>
				<div class="cd-faq-content">
					<p>You can crry out normal business processes without an internet connection. However, it would be required for initial setup and further for data backups. You can plan setup and backup activities as per the availability of internet.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">Where is my data stored?</a>
				<div class="cd-faq-content">
					<p>Your data is stored on Vyavsaay servers. You can also selectively download your data to your computer systems/mobile devices.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">Is my data secure?</a>
				<div class="cd-faq-content">
					<p>All data is sent or received over a secure HTTP channel. This means your data is first encrypted and then sent over the internet. This makes it very hard for any person with malicious intent to steal it. Frequent backups are taken to ensure continuous availability of data.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">What if my systems crash?</a>
				<div class="cd-faq-content">
					<p>Your data is safe on Vyavsaay servers in case your systems crash. However, any unsynced data might be lost. Thus, we recommend frequent sync-ups online.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">What happens if there is a power outage?</a>
				<div class="cd-faq-content">
					<p>Even during a power outage, you can keep using the service through your mobile or other portable devices.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">How do I backup my data?</a>
				<div class="cd-faq-content">
					<p>Vyavsaay provides a single click button to backup your data on the server.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">Can I control access to my information by different employees?</a>
				<div class="cd-faq-content">
					<p>Absolutely. You can control the access of your employees to different types of information.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			
		</ul> <!-- cd-faq-group -->
	</br>
		<ul id="account" class="cd-faq-group">
			<li class="cd-faq-title"><h2>About Processes</h2></li>
			<li>
				<a class="cd-faq-trigger" href="#0">What out-of-box solutions are provided by Vyavsaay?</a>
				<div class="cd-faq-content">
					<p>Vyavsaay provides solutions around billing, accounting, inventory management, project management, customer relationship management and task force management. It also provides integration with leading online and e-commerce services.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
			<li>
				<a class="cd-faq-trigger" href="#0">How are your out-of-box processes benchmarked?</a>
				<div class="cd-faq-content">
					<p>We have designed out-of-box processes based on the standards in the retail and manufacturing industry. Furthermore, these have been tested and trusted by other businesses.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">What if I want to scope out some of the out-of-box processes?</a>
				<div class="cd-faq-content">
					<p>Vyavsaay is customizable to a great extent. You can yourself customize the solution using a easy select/de-select menu. Our recommendation will be, get in touch with us for such requests.</p>
				</div> <!-- cd-faq-content -->
			</li>

			<li>
				<a class="cd-faq-trigger" href="#0">I follow this particular set of business process, can you set them up for me?</a>
				<div class="cd-faq-content">
					<p>Yes, ofcourse. We can set up your business processes on Vyavsaay. We also provide consultation on optimization. <a hreaf='contact.php'>Conact</a> us.</p>
				</div> <!-- cd-faq-content -->
			</li>
			
		</ul> <!-- cd-faq-group -->

	</div> <!-- cd-faq-items -->
	<a href="#0" class="cd-close-panel">Close</a>


</body>
</html>