<?php

namespace RetailingEssentials;
use \PDO;

include_once 'config.php';
include_once 'vUtil.php';

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
		$indexesClause=$this->getIndexesClause();
		$subQueries = array(
				'where' => $whereArray['query'],
				'index' => $indexesClause
		);

		$query=$this->getQuery('select',$subQueries);
		$values = array_merge($whereArray['values']);
		$rows = $this->dbSelect($query,$values);
		$ids = vUtil::get1Dfrom2D($rows,'id');
		// print_r($ids);die;
		$query=$this->getQuery('delete',$subQueries);
		if($this->dbExecute($query,$whereArray['values']))
		{
			return $ids;
		}else {
			return false;
		}
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

		$id = vUtil::getIndexValue($indexes,'id');

		if($this->dbExecute($query,$values))
		{
			return array(
				'status' => 'success',
				'row' => $indexes,
				'id' => $id
			);
		}
		else{
			return array(
				'status' => 'error',
				'description' => 'data could not be saved',
				'row' => $indexes
			);
		}
	}

	/**
	* Creates a new record as per the provided data
	*/
	public function vCreate($data)
	{
		$valuesArray = $this->getValuesClause($data);
		$uniqueWhereArray = $this->getUniqueWhereClause($data);
		$uniqueIndexesClause = $this->getIndexesClause();

		$unique=0;
		if(count($uniqueWhereArray['values'])>0)
		{
			$selectSubqueries = array(
					"where" => $uniqueWhereArray['query'],
					"index" => $uniqueIndexesClause
			);
			$selectQuery = $this->getQuery('select',$selectSubqueries);
			$rows = $this->dbSelect($selectQuery,$uniqueWhereArray['values']);
			$unique = count($rows);
		}
		if($unique==0)
		{
			$subQueries = array(
					'values' => $valuesArray['query']
			);
			$query=$this->getQuery('insert',$subQueries);

			if($this->dbExecute($query,$valuesArray['values']))
			{
				return array(
					'status' => 'success',
					'row' => $data,
					'id' => $this->conn->lastInsertId()
				);
			}
			else{
				return array(
					'status' => 'error',
					'description' => 'data could not be saved',
					'row' => $data
				);
			}
		}
		else {
			return array(
				'status' => 'error',
				'description' => 'duplicate record',
				'row' => $data
			);
		}
	}

	/**
	* Returns the selection output as per the provided indexes
	*/
	public function vRead($indexes,$options = array())
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

	// /**
	// * Puts data if it doesn't already exist
	// */
	// public function vPut($data)
	// {
	// 	$result=$this->vCreate($data);
	// 	if(!$result)
	// 	{
	// 		$result=$this->vUpdate(array(),$data);
	// 	}
	// 	return $result;
	// }


	/**
	* Logs a DB operation
	* $requestData = array(
	*	log => 'yes',
	*	log_data => array(),
	*	type => create/update/delete
	*	ids => array()
	* )
	*/
	public function log($requestData)
	{
		$log = (isset($requestData['log']) && $requestData['log']=='yes') ? true : false;

		$this->setTable('activities');
		$logData = $log ? $requestData['log_data'] : array();
		$addData = array(
			'data_type' => 'json',
			'updated_by' => $_SESSION['name'],
			'user_display' => isset($requestData['log']) ? $requestData['log'] : 'no',
			'tablename' => $requestData['data_store'],
			'data_xml' => json_encode($requestData['data']),
			'status' => 'online',
			'type' => $requestData['type'],
			'last_updated' => 1000*time()
		);

		$affectedIds = (isset($requestData['ids'])) ? $requestData['ids'] : array(0);
		foreach($affectedIds as $id)
		{
			$data = array_merge($logData,$addData,array('data_id' => $id));
			$indexedData = vUtil::getIndexedArray($data);
			$valuesArray = $this->getValuesClause($indexedData);
			$subQueries = array(
				'values' => $valuesArray['query']
			);
			$query=$this->getQuery('insert',$subQueries);
			$this->dbExecute($query,$valuesArray['values']);
		}

		return true;
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
	public function getIndexesClause($indexes = array(array("index" => "id")),$options = array())
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

		if(!vUtil::issetIndex($data,'last_updated'))
		{
			$data[] = array(
				"index" => "last_updated",
				"value" => time()*1000
			);
		}

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

		if(!vUtil::issetIndex($data,'last_updated'))
		{
			$data[] = array(
				"index" => "last_updated",
				"value" => time()*1000
			);
		}

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


	/**
	* Generates the where clause based on unique columns required for insertion
	*/
	private function getUniqueWhereClause($data)
	{
		$result = array(
			'query' => '',
			'values' => array()
		);

		$indexed_columns = vUtil::getKVfromIndexedArray($data);

		foreach($data as $index)
		{
			if(isset($index['unique']) && $index['unique']=='yes')
			{
				$result['query'].=$index['index']."= ? or ";
				$result['values'][] = $index['value'];
			}
			else if(isset($index['uniqueWith']))
			{
				$uniqueWithColumns=(array)$index['uniqueWith'];
				$subcondition=$index['index']."=? and ";
				$result['values'][] = $index['value'];
				foreach($uniqueWithColumns as $uwc)
				{
					$subcondition.=$uwc."=? and ";
					$result['values'][] = $indexed_columns[$uwc];
				}
				$subcondition=rtrim($subcondition," and ");
				$result['query'].="(".$subcondition.") or ";
			}
		}
		$result['query'] = rtrim($result['query'],"or ");

		return $result;
	}
}
?>
