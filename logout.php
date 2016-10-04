<?php
	session_start();
	$logout_page = $_GET['p'];

	echo "redirecting";
	$SERVER_ROOT="";
	$_SESSION=array();
	session_unset();

	$params=session_get_cookie_params();
	setcookie(session_name(),'',time()-42000,$params["path"], $params["domain"],$params["secure"], $params["httponly"]);

	session_destroy();

	header("Location: ".$SERVER_ROOT.$logout_page);

?>
