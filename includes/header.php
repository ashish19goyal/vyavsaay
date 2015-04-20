<!DOCTYPE html>
<html> <!--manifest="vyavsaay.appcache">-->
	<head>
		<meta charset="UTF-8">
		
		<meta name="viewport" content="width=500 user-scalable=no" id="viewport-meta">
		<meta name="description" content="Find industry standard and customizable automation solutions for your business. Setup is fast and easy. The range of solutions include Billing, Inventory management, Accounting, Project management, Task force management and CRM.">
		<title id='master_title'>Vyavsaay ERP</title>
		<?php
			session_start();			
			include "js_includes.php";
			include "css_includes.php";
		?>
		<link rel="icon" href="./images/favicon.png">
	</head>
	<body onload="default_load();">
			<div id="loading_icon"><img src="./images/loader.gif"></div>
			<div id="transparent_layer"></div>