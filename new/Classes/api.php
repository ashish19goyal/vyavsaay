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
	private static $indexes;
	private static $apiKey;
	private static $username;

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

		$indexes = isset($post['indexes']) ? $post['indexes'] : null;
		$iArray = json_decode($indexes,true);
		self::$indexes = is_array($iArray) ? $iArray : array();

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
		$vDB=new vDB($dbname);
		$result = array(
			'status' => 'success',
			'data_store' => self::$table
		);

		switch(self::$requestType)
		{
			case 'get': $result = array_merge($result, $vDB->vRead(self::$table,self::$indexes));
						return $result;
			case 'put': if($vDB->vPut(self::$table,self::$data))
						return $result;
			case 'post': if($vDB->vCreate(self::$table,self::$data))
						return $result;
			case 'delete': if($vDB->vDelete(self::$table,self::$indexes))
						return $result;
			default: return array(
								'status' => 'error',
								'description' => 'request type not supported'
							);
		}
	}
}

?>
