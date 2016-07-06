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
	private static $table;
	private static $requestType;
	private static $data;
	private static $row;
	private static $indexes;
	private static $apiKey;
	private static $username;
	private static $options;

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
		$query="select dbname,data_stores from api_key_mapping where api_key=? and username=? and status=?";
		$values=array(self::$apiKey,self::$username,'active');

		$vDB=new vDB(0);
		$result=$vDB->dbSelect($query,$values);

		$response = array(
			'status' => 'error',
			'description' => 'no api access'
		);

		if(count($result)>0)
		{
			$response['description'] = 'no data store access';

			$data_stores=$result[0]['data_stores'];
			if(strpos($data_stores,self::$table)!==false)
			{
				$response['status'] = 'success';
				$response['description'] = 'api access granted';
				$response['dbname']=$result[0]['dbname'];
			}
		}
		return $response;
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
	public static function get($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table
		);

		$result = array_merge($result, $vDB->vRead(self::$indexes,self::$options));
		return $result;
	}

	/**
	* This function executes a put request
	*/
	public static function put($dbname)
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
			if($vDB->vPut(self::$row))
			{
				$result['rows'][] = array(
					'status' => 'success',
					'row' => self::$row
				);
			}
			else {
				$result['rows'][] = array(
					'status' => 'error',
					'row' => self::$row
				);
			}
		}
		else if(count(self::$data)>0)
		{
			foreach(self::$data as $row)
			{
				if($vDB->vPut($row))
				{
					$result['rows'][] = array(
						'status' => 'success',
						'row' => $row
					);
				}
				else {
					$result['rows'][] = array(
						'status' => 'error',
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
	public static function post($dbname)
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
			if($vDB->vCreate(self::$row))
			{
				$result['rows'][] = array(
					'status' => 'success',
					'row' => self::$row
				);
			}
			else {
				$result['rows'][] = array(
					'status' => 'error',
					'row' => self::$row
				);
			}
		}
		else if(count(self::$data)>0)
		{
			foreach(self::$data as $row)
			{
				if($vDB->vCreate($row))
				{
					$result['rows'][] = array(
						'status' => 'success',
						'row' => $row
					);
				}
				else {
					$result['rows'][] = array(
						'status' => 'error',
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
	public static function delete($dbname)
	{
		$vDB=new vDB($dbname);
		$vDB->setTable(self::$table);

		$result = array(
			'status' => 'success',
			'data_store' => self::$table
		);

		if($vDB->vDelete(self::$indexes))
		return $result;
	}
}

?>
