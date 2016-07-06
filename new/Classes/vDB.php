<?php

namespace RetailingEssentials;
use \PDO;

include_once 'config.php';

class vDB
{
	private $conn;
	private $table;
	/**
	* Constructor initializes a connnection to the database
	*/
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

	/**
	* Destructor releases the connnection to the database
	*/
	public function __destruct()
	{
		unset($this->conn);
	}

	//db level functions

	/**
	* Performs a simple select query
	*/
	public function dbSelect($query,$values)
	{
		$stmt=$this->conn->prepare($query);
		$stmt->execute($values);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	/**
	* Executes a simple insert,update or delete query
	*/
	public function dbExecute($query,$values)
	{
		$result = false;
		try{
			$stmt=$this->conn->prepare($query);
			$result = $stmt->execute($values);
		}catch(PDOException $e)
		{
			$result = false;
		}
		return $result;
	}


	//generic functions in the context of vyavsaay

	/**
	* Performs delete as per the provided indexes
	*/
	public function vDelete($indexes)
	{
		$whereArray=$this->getWhereClause($indexes);

		$subQueries = array(
				'where' => $whereArray['query']
		);
		$query=$this->getQuery('delete',$subQueries);

		$query=$this->getQuery('delete','',$whereArray['query']);
		return $this->dbExecute($query,$whereArray['values']);
	}

	/**
	* Performs update as per the provided indexes and data
	*/
	public function vUpdate($indexes,$data)
	{
		$setArray=$this->getSetClause($data);
		$whereArray=$this->getWhereClause($indexes);

		$subQueries = array(
				'where' => $whereArray['query'],
				'set' => $setArray['query']
		);
		$query=$this->getQuery('update',$subQueries);

		$values=array_merge($setArray['values'],$whereArray['values']);
		return $this->dbExecute($query,$values);
	}

	/**
	* Creates a new record as per the provided data
	*/
	public function vCreate($data)
	{
		$valuesArray=$this->getValuesClause($data);

		$subQueries = array(
				'values' => $valuesArray['query']
		);
		$query=$this->getQuery('insert',$subQueries);

		return $this->dbExecute($query,$valuesArray['values']);
	}

	/**
	* Returns the selection output as per the provided indexes
	*/
	public function vRead($indexes,$options)
	{
		$whereArray=$this->getWhereClause($indexes);
		$limitArray=$this->getLimitClause($options);
		$indexesClause=$this->getIndexesClause($indexes,$options);

		$subQueries = array(
				'where' => $whereArray['query'],
				'limit' => $limitArray['query'],
				'index' => $indexesClause
		);
		$query=$this->getQuery('select',$subQueries);
		$values = array_merge($whereArray['values'],$limitArray['values']);

		$rows = $this->dbSelect($query,$values);

		$startIndex = isset($options['startIndex']) ? $options['startIndex'] : 0;
		$count = count($rows);
		$endIndex = $startIndex + $count;

		$result = array(
			"count" => $count,
			"endIndex" => $endIndex,
			"rows" => array()
		);

		foreach($rows as $row)
		{
			$result['rows'][]=$row;
		}

		return $result;
	}

	/**
	* Puts data if it doesn't already exist
	*/
	public function vPut($data)
	{
		$result=$this->vCreate($data);
		if(!$result)
		{
			$result=$this->vUpdate(array(),$data);
		}
		return $result;
	}

	//helper functions to generate queries

	/**
	* Sets the table of the object to execute the queries
	*/
	public function setTable($table)
	{
		$this->table = $table;
	}

	/**
	* Sets the table of the object to execute the queries
	*/
	public function getIndexesClause($indexes,$options)
	{
		$all_indexes = isset($options['allIndexes']) ? $options['allIndexes'] : 'no';
		if($all_indexes=='yes'|| count($indexes)==0)
		{
			return "*";
		}
		else{
			$query = "";
			foreach($indexes as $index)
			{
				$query.=$index['index'].",";
			}
			$query=rtrim($query,",");
			return $query;
		}
	}

	/**
	* Generates the where clause of the query, based on the indexes
	*/
	private function getWhereClause($indexes)
	{
		$result = array(
			'query' => '',
			'values' => array()
		);
		foreach($indexes as $index)
		{
			if(isset($index['upperbound']))
			{
				$result['query'].=$this->table.".".$index['index']." <= ? and ";
				$result['values'][]=$index['upperbound'];
			}

			if(isset($index['lowerbound']))
			{
				$result['query'].=$this->table.".".$index['index']." >= ? and ";
				$result['values'][]=$index['lowerbound'];
			}

			if(isset($index['unequal']))
			{
				$result['query'].="(".$this->table.".".$index['index']." <> ? or isNull(".$this->table.".".$index['index'].")) and ";
				$result['values'][]=$index['unequal'];
			}

			if(isset($index['isnull']))
			{
				if($index['isnull']=='yes')
				{
					$result['query'].="isNull(".$this->table.".".$index['index'].") and ";
				}
				else
				{
					$result['query'].="!isNull(".$this->table.".".$index['index'].") and ";
				}
			}

			if(isset($index['array']))
			{
				$result['query'].=$this->table.".".$index['index']." in (";
				$exploded_values=(array)$index['array'];
				foreach($exploded_values as $value)
				{
					$result['query'].="?,";
					$result['values'][]=$value;
				}
				if(count($exploded_values)==0)
				{
					$result['query'].="?,";
					$result['values'][]="--";
				}

				$result['query']=rtrim($result['query'],",");
				$result['query'].=") and ";
			}

			if(isset($index['approx_array']))
			{
				$approx_array=(array)$index['approx_array'];
				$exploded_values=[];
				foreach ($approx_array as $val)
				{
					$exploded_values[] = "%".$val."%";
				}
				$result['query'].="(";
				foreach($exploded_values as $value)
				{
					$result['query'].=$this->table.".".$index['index']." like ? or ";
					$result['values'][]=$value;
				}
				if(count($exploded_values)==0)
				{
					$result['query'].="?,";
					$result['values'][]="--";
				}

				$result['query']=rtrim($result['query'],", or ");
				$result['query'].=") and ";
			}

			if(isset($index['all_approx_array']))
			{
				$approx_array=(array)$index['all_approx_array'];
				$exploded_values=[];
				foreach ($approx_array as $val)
				{
					$exploded_values[] = "%".$val."%";
				}
				$result['query'].="(";
				foreach($exploded_values as $value)
				{
					$result['query'].=$this->table.".".$index['index']." like ? and ";
					$result['values'][]=$value;
				}
				if(count($exploded_values)==0)
				{
					$result['query'].="?,";
					$result['values'][]="--";
				}

				$result['query']=rtrim($result['query'],", and ");
				$result['query'].=") and ";
			}

			if(isset($col['value']))
			{
				if($col['value']!="")
				{
					if($col['index']=='id')
					{
						$result['query'].=$this->table.".".$index['index']." = ? and ";
						$result['values'][]=$index['value'];
					}
					else
					{
						$result['query'].=$this->table.".".$index['index']." like ? and ";
						$result['values'][]="%".$index['value']."%";
					}
				}
			}

			if(isset($index['exact']))
			{
				$result['query'].=$this->table.".".$index['index']." = ? and ";
				$result['values'][]=$index['exact'];
			}
		}

		$result['query']=rtrim($result['query'],"and ");

		return $result;
	}


	/**
	* Generates the set clause of the query, based on the data
	*/
	private function getSetClause($data)
	{
		$result = array(
			'query' => '',
			'values' => array()
		);

		foreach($data as $index)
		{
			$result['query'].=$this->table.".".$index['index']." = ?,";
			$result['values'][]=$index['value'];
		}
		$result['query']=rtrim($result['query'],",");

		return $result;
	}

	/**
	* Generates the values clause of the query, based on the data
	*/
	private function getValuesClause($data)
	{
		$result = array(
			'query' => '',
			'values' => array()
		);

		$insert = "";
		$values = "";

		foreach($data as $index)
		{
			$insert.=$this->table.".".$index['index'].",";
			$values.="?,";
			$result['values'][]=$index['value'];
		}

		$insert=rtrim($insert,",");
		$values=rtrim($values,",");

		$result['query']="(".$insert.") values(".$values.")";

		return $result;
	}

	/**
	* Generates the Limit clause of the query, based on the data
	*/
	private function getLimitClause($options)
	{
		$result = array(
			'query' => '',
			'values' => array()
		);
		$startIndex = isset($options['startIndex']) ? $options['startIndex'] : 0;
		$count = isset($options['count']) ? $options['count'] : 500;

		if($count>5000)
		{
			$count=5000;
		}

		$result['query'] = "limit ?,?";
		$result['values'][] = $startIndex;
		$result['values'][] = $count;

		return $result;
	}

	/**
	* Generates the Complete query, from subqueries
	*/
	private function getQuery($type,$subQueries)
	{
		$index = isset($subQueries['index'])? $subQueries['index'] : "*";
		$where = isset($subQueries['where'])? $subQueries['where'] : "";
		$set = isset($subQueries['set'])? $subQueries['set'] : "";
		$values = isset($subQueries['values'])? $subQueries['values'] : "";
		$limit = isset($subQueries['limit'])? $subQueries['limit'] : "";

		switch($type)
		{
			case 'select': if($where!="")
							{
								$query = "select " . $index . " from " . $this->table . " where " . $where . " " . $limit. ";";
							}
							else{
								$query = "select " . $index . " from " . $this->table . " " . $limit. ";";
							}
							return $query;
			case 'insert': if($values!="")
							{
								$query = "insert into " . $this->table . " " . $values. ";";
								return $query;
							}
							break;
			case 'update': if($where!="")
							{
								$query = "update " . $this->table . " set " . $set . " where " . $where. ";";
								return $query;
							}
							break;
			case 'delete': if($where!="")
							{
								$query = "delete from " . $this->table . " where " . $where. ";";
								return $query;
							}
							break;
		}

		return "";
	}

}
?>
