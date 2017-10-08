<?php

	session_start();

	include_once "../Classes/vUtil.php";
	include_once "../Classes/vElastic.php";

	use RetailingEssentials\vElastic;
	use RetailingEssentials\vUtil;

	$domain=$_GET['domain'];
	
	if(vUtil::isMasterSession())
	{
		$vES = vElastic::getInstance($domain);
		$vES->setup();
		echo "Setup done";
	}
	else
	{
		echo "Invalid session";
	}

?>
