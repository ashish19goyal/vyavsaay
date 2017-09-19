<?php
session_start();

include_once "../Classes/login.php";
use RetailingEssentials\login;

	$login = login::getInstance($_POST);
	try
	{
		if(!$login->isAccountActive())
		{
			$login->failInactive();
		}
		else
		{
			$passwordHash = $login->getPasswordHash();
			if($passwordHash=="")
			{
				$login->failAuth("Username doesn't exist or inactive");
			}
			else
			{
				if(!$login->passVerified($passwordHash))
				{
					$login->failAuth("Invalid password");
				}
				else
				{
					$login->setOutput();
				}
			}
			$login->log();
		}
	}
	catch(Exception $ex)
	{
		$login->failAuth($ex);
	}

	$jsonresponse=$login->getResponse();
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
