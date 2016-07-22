<?php
namespace RetailingEssentials;

include_once 'vDB.php';
include_once 'mailer_json.php';
include_once 'vUtil.php';

/**
 * This class performs all the api handling and request generation
 * @author ashish
 * @version july 2016
 * @designPattern singleton
 */
class api
{
	//for instance management
	private static $instance;

	//for authentication
	private static $domain;
	private static $username;
	private static $apiKey;

	//for api management
	private static $table;
	private static $requestType;

	//api parameters
	private static $data;
	private static $row;
	private static $indexes;
	private static $options;
	private static $requiredFields;
	private static $indexFields;
	private static $refactorFields;
	private static $returnIndexes;

	//for notification
	private static $getMessage;
	private static $putMessage;
	private static $postMessage;
	private static $deleteMessage;
	private static $emailReceivers;
	private static $emailTitle;

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

		$_SESSION['name'] = self::$username;
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
			self::$domain=$result[0]['domain'];
			self::$emailReceivers=$result[0]['email'];
			self::$emailTitle=$result[0]['email_title'];
			self::$getMessage=$result[0]['get_message'];
			self::$putMessage=$result[0]['put_message'];
			self::$postMessage=$result[0]['post_message'];
			self::$deleteMessage=$result[0]['delete_message'];
			self::$returnIndexes=$result[0]['return_index'];
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
			$refactorFields=str_replace("{{time}}",time()*1000,self::$refactorFields);
			$refactorFields = json_decode($refactorFields,true);
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
	* This function notifies the API stakeholders about a hit
	*/
	public static function notify($result)
	{
		$email_message = "";
		switch(self::$requestType)
		{
			case 'get': $email_message = self::$getMessage; break;
			case 'put': $email_message = self::$putMessage; break;
			case 'post': $email_message = self::$postMessage; break;
			case 'delete': $email_message = self::$deleteMessage; break;
		}

		if(isset($email_message) && $email_message!="" && $email_message!=null && $email_message!="null" && $email_message!="0" && $result['status']!='error')
		{
			$vUtil = vUtil::getInstance(self::$domain);
			$userPreferences = $vUtil::getUserPreferences(array('title','email'));
			$bt= $userPreferences['title'];
			$bemail = $userPreferences['email'];

			$emails_array=explode(",",self::$emailReceivers);
			$r_array=array();

			foreach($emails_array as $em)
			{
				$receiver=array('name'=>$bt,'email'=>$em);
				$r_array[]=$receiver;
			}
			$receivers=json_encode($r_array);

			$formatted_message = $vUtil::getFormattedEmail(self::$emailTitle,$email_message);

			try{
				$email_instance=new send_mailer_json(self::$domain);
				$email_instance->direct_send(self::$emailTitle,$formatted_message,'',$receivers,$bemail,$bt);
				$email_instance->log_mailer(self::$domain,self::$emailTitle,$formatted_message,'',$receivers,$bemail,$bt);
			}
			catch(Exception $e){}
		}
	}

	/**
	* This function executes the request and returns formatted response
	*/
	public static function executeRequest($dbname)
	{
		$result = array(
			'status' => 'error',
			'description' => 'request type not supported'
		);
		switch(self::$requestType)
		{
			case 'get': $result = self::get($dbname); break;
			case 'put': $result = self::put($dbname); break;
			case 'post': $result = self::post($dbname); break;
			case 'delete': $result = self::delete($dbname); break;
		}
		self::notify($result);
		$returnIndexes = self::getReturnIndexes();
		$result = array_merge($result,$returnIndexes);
		return $result;
	}

	/**
	* Adds returnIndexes to request output
	*/
	private static function getReturnIndexes()
	{
		$returnIndexes = (isset(self::$returnIndexes)) ? json_decode(self::$returnIndexes,true) : array();
		$output = array();
		foreach($returnIndexes as $i)
		{
			$indexName = $i['index'];
			$indexValue = "";
			switch(self::$requestType)
			{
				case 'get':
				case 'delete': $indexValue = vUtil::getIndexValue(self::$indexes,$indexName); break;
				case 'put':
				case 'post': if(count(self::$row)>0)
							{
								$indexValue = vUtil::getIndexValue(self::$row,$indexName);
							}else if(count(self::$data)>0)
							{
								$indexValue = vUtil::getIndexValue(self::$data[0],$indexName);
							}
							break;
			}
			$output[$indexName] = $indexValue;
		}

		return $output;
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
				$vDB->setTable(self::$table);
				$dbResult = $vDB->vPut(self::$row);
				$result['rows'][] = $dbResult;
				if($dbResult['status']=='success')
				{
					$logData = array(
						'data_store' => self::$table,
						'type' => 'update',
						'ids' => array($dbResult['id']),
						'data' => self::$row
					);
					$vDB->log($logData);
				}
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
					$vDB->setTable(self::$table);
					$dbResult = $vDB->vPut($row);
					$result['rows'][] = $dbResult;
					if($dbResult['status']=='success')
					{
						$logData = array(
							'data_store' => self::$table,
							'type' => 'update',
							'ids' => array($dbResult['id']),
							'data' => $row
						);
						$vDB->log($logData);
					}
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
				$vDB->setTable(self::$table);
				$dbResult = $vDB->vCreate(self::$row);
				$result['rows'][] = $dbResult;
				if($dbResult['status']=='success')
				{
					$logData = array(
						'data_store' => self::$table,
						'type' => 'create',
						'ids' => array($dbResult['id']),
						'data' => self::$row
					);
					$vDB->log($logData);
				}
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
					$vDB->setTable(self::$table);
					$dbResult = $vDB->vCreate($row);
					$result['rows'][] = $dbResult;
					if($dbResult['status']=='success')
					{
						$logData = array(
							'data_store' => self::$table,
							'type' => 'create',
							'ids' => array($dbResult['id']),
							'data' => $row
						);
						$vDB->log($logData);
					}
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

		self::inflateIndexes();
		$output = $vDB->vDelete(self::$indexes);

		if($output == false)
		{
			return array(
				'status' => 'error',
				'description' => 'Could not delete data'
			);
		}else
		{
			$logData = array(
				'data_store' => self::$table,
				'type' => 'delete',
				'ids' => $output,
				'data' => self::$indexes
			);
			$vDB->log($logData);
			return array(
				'status' => 'success',
				'data_store' => self::$table,
				'ids' => $output
			);
		}
	}
}

?>
