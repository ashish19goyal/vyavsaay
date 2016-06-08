<?php

namespace RetailingEssentials;
use \PDO;

include_once 'config.php';

class db_connect
{
	public $conn=null;

	public function __construct($db_name)
	{
		$config = config::getInstance();
		$dbhost = $config->get('host');
		$dbuser = $config->get('user');
		$dbpass = $config->get('password');

		if($db_name===0 || $db_name=='0')
		 	$dbname= $config->get("database");
		else
		 	$dbname=$db_name;

		$dsn="mysql:host=".$dbhost.";dbname=".$dbname.";charset=utf8";
		$options=array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		$this->conn = new \PDO($dsn, $dbuser, $dbpass, $options);
	}

	public function __destruct()
	{
		unset($this->conn);
	}
}
?>
