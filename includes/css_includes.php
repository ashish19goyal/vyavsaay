<link rel="stylesheet" type="text/css" href="./CSS/default_theme.css"/>
<script type="text/javascript">
	!function changeCSS() {
		var oldlink = document.getElementsByTagName("link").item(0);
		var theme=get_theme();
		var newlink = document.createElement("link");
			newlink.setAttribute("rel", "stylesheet");
			newlink.setAttribute("type", "text/css");
			newlink.setAttribute("href", theme);
		//console.log("changeCSS was run");	
		document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
	}();
</script>
<link rel="stylesheet" type="text/css" href="./CSS/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="./CSS/leaflet.css"/>

<link rel="stylesheet" type="text/css" href="./CSS/index_style.css"/>
<link rel="stylesheet" type="text/css" href="./CSS/bootstrap.css"/>
