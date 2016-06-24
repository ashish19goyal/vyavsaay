<?php

namespace RetailingEssentials;
use \PDO;

include_once 'config.php';

class vDB
{
	private static $conn;
  	private static $instance;

	private function __construct($db_name)
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
		self::$conn = new \PDO($dsn, $dbuser, $dbpass, $options);
	}

	//returns a singleton instance of the class
	public static function getInstance()
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new vDB();
    	}
    	return self::$instance;
	}

	//db level functions
	private static function dbSelect($query,$values)
	{
		$stmt=self::$conn->prepare($query);
		$stmt->execute($values);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	private static function dbExecute($query,$values)
	{
		$stmt=self::$conn->prepare($query);
		return $stmt->execute($values);
	}

	//generic functions in the context of vyavsaay
	public function vDelete($indexes)
	{
		$whereArray=self::getWhereClause($indexes);
		$query=self::getQuery('delete','',$whereArray['query']);
		return self::dbExecute($query,$whereArray['values']);
	}

	public function vUpdate($indexes,$data)
	{
		$setArray=self::getSetClause($data);
		$whereArray=self::getWhereClause($indexes);
		$query=self::getQuery('update',$setArray['query'],$whereArray['query']);
		$values=array_merge($setArray['values'],$whereArray['values']);
		return self::dbExecute($query,$values);
	}

	public function vCreate($data)
	{
		$valuesArray=self::getValuesClause($data);
		$query=self::getQuery('create',$valuesArray['query']);
		return self::dbExecute($query,$valuesArray['values']);
	}

	public function vRead($indexes)
	{
		$whereArray=self::getWhereClause($indexes);
		$query=self::getQuery('read','',$whereArray['query']);
		return self::dbSelect($query,$whereArray['values']);
	}

	public function __destruct()
	{
		unset(self::$conn);
	}
}
?>
