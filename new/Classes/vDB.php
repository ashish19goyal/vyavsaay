<?php

namespace RetailingEssentials;
use \PDO;

include_once 'config.php';

class vDB
{
	private $conn;

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

	//db level functions
	public function dbSelect($query,$values)
	{
		$stmt=$this->conn->prepare($query);
		$stmt->execute($values);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function dbExecute($query,$values)
	{
		$stmt=$this->conn->prepare($query);
		return $stmt->execute($values);
	}

	//generic functions in the context of vyavsaay
	public function vDelete($table,$indexes)
	{
		$whereArray=$this->getWhereClause($indexes);
		$query=$this->getQuery($table,'delete','',$whereArray['query']);
		return $this->dbExecute($query,$whereArray['values']);
	}

	public function vUpdate($table,$indexes,$data)
	{
		$setArray=$this->getSetClause($data);
		$whereArray=$this->getWhereClause($indexes);
		$query=$this->getQuery($table,'update',$setArray['query'],$whereArray['query']);
		$values=array_merge($setArray['values'],$whereArray['values']);
		return $this->dbExecute($query,$values);
	}

	public function vCreate($table,$data)
	{
		$valuesArray=$this->getValuesClause($data);
		$query=$this->getQuery($table,'create',$valuesArray['query']);
		return $this->dbExecute($query,$valuesArray['values']);
	}

	public function vRead($table,$indexes)
	{
		$whereArray=$this->getWhereClause($indexes);
		$query=$this->getQuery($table,'read','',$whereArray['query']);
		return $this->dbSelect($query,$whereArray['values']);
	}

	public function vPut($table,$data)
	{
		$result=$this->vCreate($table,$data);
		if(!$result)
		{
			$result=$this->vUpdate($table,array(),$data);
		}
		return $result;
	}

	public function __destruct()
	{
		unset($this->conn);
	}
}
?>
