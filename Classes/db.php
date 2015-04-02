<?php

namespace RetailingEssentials;
use \PDO;

include_once 'file_reader.php';

class db_connect
{
	public $fr=null;
	public $conn=null;
	
	public function __construct($db_name)
	{
		$this->fr=new file_reader("../Config/config.prop");
		$dbhost=$this->fr->attributes["host"];
		if($db_name===0)
			$dbname= $this->fr->attributes["database"];
		else
			$dbname=$db_name;
		$dbuser = $this->fr->attributes["user"];
		$dbpass = $this->fr->attributes["password"];
		$dsn="mysql:host=$dbhost;dbname=$dbname;charset=utf8";
		$options=array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		$this->conn = new \PDO($dsn, $dbuser, $dbpass, $options);		
	}

	public function __destruct()
	{
		unset($this->conn);
	}
}

?>