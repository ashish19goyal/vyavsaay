<?php

	session_start();
	include_once "../Classes/geoCoding.php";
	use RetailingEssentials\geoCoding;
	
		$domain=$_POST['domain'];
		$username=$_POST['username'];
		$read_access=$_POST['re'];
		$type=$_POST['type'];
		
/*		$domain='ashish';
		$username='master';
		$type='customers';
		$geocoder=new geoCoding($domain,$type);
		echo "coding done";
*/		
		if(isset($_SESSION['session']))
		{
			if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
			{
				$geocoder=new geoCoding($domain,$type);
				echo "coding done";
			}
			else
			{
				echo "Invalid session";
			}
		}
		else
		{
			echo "Invalid session";
		}

?>