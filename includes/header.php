<!DOCTYPE html>
<!-- <html manifest="vyavsaay.appcache"> -->
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title data-i18n="master.vyavsaay">Vyavsaay ERP</title>
		<?php
			session_start();			
			include "js_includes.php";
			include "css_includes.php";
		?>
	</head>
	<body onload="default_load();">
			<div id="loading_icon"><img src="./images/loader.gif"></div>
			<div id="transparent_layer"></div>
			