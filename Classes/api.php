<?php
namespace RetailingEssentials;

include_once 'vDB.php';

/**
 * This class performs all the api handling and request generation
 * @author ashish
 * @version july 2016
 * @designPattern singleton
 */
class api
{
	private static $instance;
	private static $username;
	private static $apiKey;
	private static $table;
	private static $requestType;
	private static $data;
	private static $row;
	private static $indexes;
	private static $options;
	private static $requiredFields;
	private static $indexFields;
	private static $refactorFields;

	/**
	 * Constructor
	 * @param $get contains the get parameters in the api call
	 * @param $post contains the post paramaeteres in the api call
	 */
	private function __construct($get,$post)
	{
		$getArray = explode('/',$get['url']);
		self::$table = isset($getArray[0]) ? $getArray[0] : null;
		self::$requestType = isset($getArray[1]) ? $getArray[1] : null;

		$data = isset($post['data']) ? $post['data'] : null;
		$dArray = json_decode($data,true);
		self::$data = is_array($dArray) ? $dArray : array();

		$row = isset($post['row']) ? $post['row'] : null;
		$rArray = json_decode($row,true);
		self::$row = is_array($rArray) ? $rArray : array();

		$indexes = isset($post['indexes']) ? $post['indexes'] : null;
		$iArray = json_decode($indexes,true);
		self::$indexes = is_array($iArray) ? $iArray : array();

		$options = isset($post['options']) ? $post['options'] : null;
		$oArray = json_decode($options,true);
		self::$options = is_array($oArray) ? $oArray : array();

		self::$username = isset($post['username']) ? $post['username'] : null;
		self::$apiKey = isset($post['key']) ? $post['key'] : null;
	}

	/**
	 * This is a public function called to get an object of configurations
	 */
	public static function getInstance($get,$post)
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new api($get,$post);
    	}
    	return self::$instance;
	}

	/**
	* This function returns true or false, as per the success or failure of authentication
	*/
	public static function authenticateRequest()
	{
		$query="select * from api_key_mapping where api_key=? and username=? and status=? and data_stores=? and request_types like ?";
		$values=array(self::$apiKey,self::$username,'active',self::$table,"%".self::$requestType."%");

		$vDB=new vDB(0);
		$result=$vDB->dbSelect($query,$values);

		$response = array(
			'status' => 'error',
			'description' => 'no api access'
		);

		if(count($result)>0)
		{
			$response['status'] = 'success';
			$response['description'] = 'api access granted';
			$response['dbname']=$result[0]['dbname'];
			self::$requiredFields=$result[0]['required_fields'];
			self::$refactorFields=$result[0]['re_factoring'];
			self::$indexFields=$result[0]['indexes'];
		}
		return $response;
	}

	/**
	* This function adds required additional indexes to a request
	*/
	private static function inflateIndexes()
	{
		if(isset(self::$indexFields))
		{
			$additionalIndexes = json_decode(self::$indexFields,true);
			if(is_array($additionalIndexes))
			{
				self::$indexes = array_merge(self::$indexes, $additionalIndexes);
			}
		}
		return true;
	}

	/**
	* This function adds validates required fields
	*/
	private static function validateRequiredFields($row)
	{
		if(isset(self::$requiredFields))
		{
			$requiredFields = json_decode(self::$requiredFields,true);
			if(is_array($requiredFields))
			{
				foreach($requiredFields as $field)
				{
					$present=false;
					foreach($row as $index)
					{
						if($field['index'] == $index['index'])
						{
							$present = true;
							break;
						}
					}
					if(!$present)
					{
						return false;
					}
				}
			}
		}
		return true;
	}

	/**
	* This function refactor fields
	*/
	private static function refactorFields($row)
	{
		if(isset(self::$refactorFields))
		{
			$refactorFields = json_decode(self::$refactorFields,true);
			if(is_array($refactorFields))
			{
				foreach($refactorFields as $refactor)
				{
					$refactored=false;
					foreach($row as $key => $index)
					{
						if($refactor['index'] == $index['index'])
						{
							$row[$key] = $refactor + $index;
							$refactored=true;
							break;
						}
					}
					if(!$refactored)
					{
						$row[]=$refactor;
					}
				}
			}
		}
		return $row;
	}

	/**
	* This function executes the request and returns formatted response
	*/
	public static function executeRequest($dbname)
	{
		switch(self::$requestType)
		{
			case 'get': return self::get($dbname);
			case 'put': return self::put($dbname);
			case 'post': return self::post($dbname);
			case 'delete': return self::delete($dbname);

			default: return array(
				'status' => 'error',
				'description' => 'request type not supported'
			);
		}
	}

	/**
	* This function executes a get request
	*/
	private static function get($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table
		);
		self::inflateIndexes();
		$result = array_merge($result, $vDB->vRead(self::$indexes,self::$options));
		return $result;
	}

	/**
	* This function executes a put request
	*/
	private static function put($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table,
			'rows' => array()
		);

		if(count(self::$row)>0)
		{
			if(self::validateRequiredFields(self::$row))
			{
				self::$row = self::refactorFields(self::$row);
				return $vDB->vPut(self::$row);
			}
			else{
				$result['rows'][] = array(
					'status' => 'error',
					'description' => 'required indexes missing',
					'row' => self::$row
				);
			}
		}
		else if(count(self::$data)>0)
		{
			foreach(self::$data as $row)
			{
				if(self::validateRequiredFields($row))
				{
					$row = self::refactorFields($row);
					return $vDB->vPut($row);
				}
				else{
					$result['rows'][] = array(
						'status' => 'error',
						'description' => 'required indexes missing',
						'row' => $row
					);
				}
			}
		}
		return $result;
	}

	/**
	* This function executes a post request
	*/
	private static function post($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table,
			'rows' => array()
		);

		if(count(self::$row)>0)
		{
			if(self::validateRequiredFields(self::$row))
			{
				self::$row = self::refactorFields(self::$row);
				return $vDB->vCreate(self::$row);
			}
			else{
				$result['rows'][] = array(
					'status' => 'error',
					'description' => 'required indexes missing',
					'row' => self::$row
				);
			}
		}
		else if(count(self::$data)>0)
		{
			foreach(self::$data as $row)
			{
				if(self::validateRequiredFields($row))
				{
					$row = self::refactorFields($row);
					return $vDB->vCreate($row);
				}
				else{
					$result['rows'][] = array(
						'status' => 'error',
						'description' => 'required indexes missing',
						'row' => $row
					);
				}
			}
		}
		return $result;
	}

	/**
	* This function executes a delete request
	*/
	private static function delete($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table
		);
		self::inflateIndexes();
		if($vDB->vDelete(self::$indexes))
		return $result;
	}
}

?>
