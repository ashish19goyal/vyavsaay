<?php

use \PDO;

		$dbhost='localhost';
		$dbname= '';
		$dbuser = '';
		$dbpass = '';
		$dsn="mysql:host=$dbhost;dbname=$dbname;charset=utf8";
		$options=array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		$conn = new \PDO($dsn, $dbuser, $dbpass, $options);
		
		$stmt=$conn->prepare('select * from accounts');
		$stmt->execute();
		$res=$stmt->fetch(PDO::FETCH_NUM);
		echo $res[1];
				
?>