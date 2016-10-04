<?php

namespace RetailingEssentials;
use \MongoDB;

include_once 'config.php';

class mongoDb
{
	public $conn=null;

	public function __construct($db_name)
	{
		$config = config::getInstance();
		$dbhost = $config->get('mongo_host');
		$dbuser = $config->get('mongo_user');
		$dbpass = $config->get('mongo_password');

		if($db_name===0 || $db_name=='0')
		 	$dbname= $config->get("database");
		else
		 	$dbname=$db_name;

		$m = new MongoClient();
    $this->conn = $m->mydb;
	}

	public function __destruct()
	{
		unset($this->conn);
	}
}
?>
