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
		//$this->fr=new file_reader("../../Config/config.prop");
		$root_folder="../../";
		if(isset($_SERVER['DOCUMENT_ROOT']) && $_SERVER['DOCUMENT_ROOT']!="")
		{
			$root_folder=$_SERVER['DOCUMENT_ROOT']."/";
		}
		$this->fr=new file_reader($root_folder."../Config/config.prop");
		$dbhost=$this->fr->attributes["host"];
		if($db_name===0 || $db_name=='0')
			$dbname= $this->fr->attributes["database"];
		else
			$dbname=$db_name;
		$dbuser = $this->fr->attributes["user"];
		$dbpass = $this->fr->attributes["password"];
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