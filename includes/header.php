<!DOCTYPE html>
<!-- <html manifest="vyavsaay.appcache"> -->
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title data-i18n="master.vyavsaay">Vyavsaay</title>
		<?php
			session_start();			
			include "js_includes.php";
			include "css_includes.php";
		?>
		<link rel="icon" href="./images/favicon.png">
<!-- 		
		<script>
		(function()
		{
		    var webappCache=window.applicationCache;
		
		    webappCache.addEventListener("updateready", function(event)
			{
		    	//webappCache.swapCache();
		        console.log("Cache has been updated");
			}, false);
		    webappCache.addEventListener("error", function(event)
			{
				console.log('error in caching');
				console.log(event);
			}, false);
		})();
		</script>
-->		
	</head>
	<body onload="default_load();">
			<div id="loading_icon"><img src="./images/loader.gif"></div>
			<div id="transparent_layer"></div>
			