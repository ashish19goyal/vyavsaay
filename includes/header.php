<!DOCTYPE html>
<!-- <html manifest="vyavsaay.appcache"> -->
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=500 user-scalable=no" id="viewport-meta">
		<meta name="description" content="Find industry standard and customizable automation solutions for your business. Setup is fast and easy. The range of solutions include Billing, Inventory management, Accounting, Project management, Task force management and CRM.">
		<title data-i18n="master.vyavsaay">Vyavsaay ERP</title>
		<?php
			session_start();			
			include "js_includes.php";
			include "css_includes.php";
		?>
		<link rel="icon" href="./images/favicon.png">
		<script>

			// Store the meta element
			var viewport_meta = document.getElementById('viewport-meta');
	
			// Define our viewport meta values
			var viewports = {
					default: viewport_meta.getAttribute('content'),
					landscape: 'width=1000 user-scalable=no'
				};
	
			// Change the viewport value based on screen.width
			var viewport_set = function() {
					if ( screen.width > 768 )
						viewport_meta.setAttribute( 'content', viewports.landscape );
					else
						viewport_meta.setAttribute( 'content', viewports.default );
				}
	
			// Set the correct viewport value on page load
			viewport_set();
	
			// Set the correct viewport after device orientation change or resize
			window.onresize = function() { 
				viewport_set(); 
			}
		
		</script>
		
	</head>
	<body onload="default_load();">
			<div id="loading_icon"><img src="./images/loader.gif"></div>
			<div id="transparent_layer"></div>
			