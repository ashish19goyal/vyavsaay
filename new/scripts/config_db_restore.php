<?php

include_once '../Classes/config.php';
use RetailingEssentials\config;

	session_start();

	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$input_data=$_POST['data'];

	$response_object=[];

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $domain=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
			$input_object=json_decode($input_data,true);
			$dbname=$input_object['db'];
			$sql=preg_replace('/data:application\/sql;base64,/',"",$input_object['sql'],1);
			$decoded_sql=base64_decode($sql,true);

			$config = config::getInstance();
			$dbhost = $config->get('host');
			$dbuser = $config->get('user');
			$dbpass = $config->get('password');
			
			try
			{
				$filename="dummy/$dbname.sql";
				$file_open = fopen($filename,"w");
				fwrite($file_open,$decoded_sql);
				fclose($file_open);

				$command = "mysql -h $dbhost -u $dbuser -p$dbpass $dbname < $filename";
				exec($command);

				$delete_command = "rm dummy/$dbname.sql";
				exec($delete_command);

				$response_object['status']='config updated';
			}
			catch(Exception $e)
			{
				$response_object['status']='Error occured';
			}
		}
		else
		{
			$response_object['status']='Invalid session';
		}
	}
	else
	{
		$response_object['status']='Invalid session';
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
