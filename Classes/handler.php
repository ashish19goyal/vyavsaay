<?php

namespace RetailingEssentials;

include_once 'vUtil.php';
include_once 'vDB.php';
include_once 'vCron.php';
include_once 'vS3.php';
include_once 'vElastic.php';

class handler
{
	private static $instance;
	private static $domain;
	private static $dbName;
	private static $vDB;
	private static $vElastic;

	private function __construct($domain)
	{
		self::$domain = $domain;
		self::$dbName = "re_user_".$domain;
		self::$vDB = new vDB(self::$dbName);
		self::$vElastic = vElastic::getInstance(self::$domain);
	}

	/**
	 * This is a public function called to get an object of handler
	 */
	public static function getInstance($domain)
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new handler($domain);
    	}
    	return self::$instance;
	}

	/**
	 * [create description]
	 * @param  [type] $inputData [description]
	 * @return [type]            [description]
	 */
	public static function create($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = $inputData['data'];

		$dbResult = self::$vDB->vCreate($data);
		if($dbResult['status']=='success')
		{
			$logData = array_merge($inputData,
				array(
					'type' => 'create',
					'ids' => array($dbResult['id']),
				));
			try{
				self::$vElastic->addActivityLog($logData);
			}catch(Exception $e)
			{

			}
			self::$vDB->log($logData);
		}

		$dbResult['data_store'] = $dataStore;
		$dbResult['warning']= isset($inputData['warning']) ? $inputData['warning'] : 'yes';
		return $dbResult;
	}

/**
 * [update description]
 * @param  [type] $inputData [description]
 * @return [type]            [description]
 */
	public static function update($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = $inputData['data'];

		$dbResult = self::$vDB->vUpdate($data);
		if($dbResult['status']=='success')
		{
			$logData = array_merge($inputData,
				array(
					'type' => 'update',
					'ids' => array($dbResult['id'])
				));
			try{
				self::$vElastic->addActivityLog($logData);
			}catch(Exception $e)
			{

			}
			self::$vDB->log($logData);
		}

		$dbResult['data_store'] = $dataStore;
		$dbResult['warning']= isset($inputData['warning']) ? $inputData['warning'] : 'yes';
		return $dbResult;
	}

	public static function delete($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = $inputData['data'];

		$dbResult = self::$vDB->vDelete($data);
		if($dbResult['status']=='success')
		{
			$logData = array_merge($inputData,
				array(
					'type' => 'delete',
					'ids' => $dbResult['ids']
				));
			try{
				self::$vElastic->addActivityLog($logData);
			}catch(Exception $e)
			{

			}
			self::$vDB->log($logData);
		}

		$dbResult['data_store'] = $dataStore;
		$dbResult['warning']= isset($inputData['warning']) ? $inputData['warning'] : 'yes';
		return $dbResult;
	}

	public static function read_rows($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = $inputData['indexes'];

		$options = array(
			'access' => isset($inputData['access']) ? true : null,
			'count' => isset($inputData['count']) ? $inputData['count'] : null,
			'startIndex' => isset($inputData['start_index']) ? $inputData['start_index'] : 0,
			'allIndexes' => isset($inputData['all_indexes']) ? $inputData['all_indexes'] : null
		);

		$dbResult = self::$vDB->vRead($data,$options);
		$dbResult['data_store'] = $dataStore;
		return $dbResult;
	}

	public static function read_column($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = isset($inputData['indexes']) ? $inputData['indexes'] : array();

		$options = array(
			'access' => isset($inputData['access']) ? true : null,
			'count' => isset($inputData['count']) ? $inputData['count'] : 100000,
			'startIndex' => isset($inputData['start_index']) ? $inputData['start_index'] : 0,
			'allIndexes' => null,
			'returnColumn' => isset($inputData['return_column']) ? $inputData['return_column'] : 'id'
		);

		$dbResult = self::$vDB->vRead($data,$options);
		$output=[];
		foreach($dbResult['rows'] as $r)
		{
			if($r[$inputData['return_column']]==null || $r[$inputData['return_column']]=="null")
			{
				$output[]=0;
			}
			else{
				$output[]=$r[$inputData['return_column']];
			}
		}
		$dbResult['rows']=$output;
		$dbResult['data_store'] = $dataStore;
		return $dbResult;
	}

	public static function get_count($inputData)
	{
		$dataStore = $inputData['data_store'];
		self::$vDB->setTable($dataStore);
		$data = isset($inputData['indexes']) ? $inputData['indexes'] : array();

		$options = array(
			'access' => isset($inputData['access']) ? true : null,
			'count' => isset($inputData['count']) ? $inputData['count'] : 100000,
			'startIndex' => isset($inputData['start_index']) ? $inputData['start_index'] : 0,
			'allIndexes' => null,
			'returnColumn' => isset($inputData['return_column']) ? "count(".$inputData['return_column'].")" : 'count(id)'
		);

		$dbResult = self::$vDB->vRead($data,$options);
		// print_r($dbResult);
		$dbResult['count']= (count($dbResult['rows'])>0) ? $dbResult['rows'][0][$options['returnColumn']] : 0;
		$dbResult['data_store'] = $dataStore;
		return $dbResult;
	}

	public static function manage_cron($data)
	{
		$vCron = vCron::getInstance();

		$dbResult = array();
		switch($data['request_type'])
		{
			case 'activate': $dbResult = $vCron::activate($data['cron_name']);
							break;
			case 'suspend': $dbResult = $vCron::suspend($data['cron_name']);
							break;
			case 'check': $dbResult = $vCron::isActive($data['cron_name']) ? array('result' => 'active') : array('result' => 'suspended');
							break;
		}
		// print_r($dbResult);
		$dbResult['status']= 'success';
		return $dbResult;
	}

	public static function batch($requests)
	{
		$response = array();
		$response['responses'] = array();
		try
		{
			foreach($requests as $request)
			{
				$request_output = null;
				switch($request['request_type'])
				{
					case 'create' : $request_output = self::create($request);
									break;
					case 'update' : $request_output = self::update($request);
									break;
					case 'delete' : $request_output = self::delete($request);
									break;
					case 'read_rows' : $request_output = self::read_rows($request);
									break;
					case 'read_column' : $request_output = self::read_column($request);
									break;
					case 'get_count' : $request_output = self::get_count($request);
									break;
				}
				$response['responses'][] = $request_output;
			}
			$response['status'] = 'success';
		}
		catch(Exception $e)
		{
			$response['status'] = 'fail';
		}
		return $response;
	}

	public static function s3($data)
	{
		$vS3 = new vS3(array(
			'domain' => $data['domain'],
			'bucket' => $data['bucket']
		));

		$dbResult = array();
		$objectInfo = array(
			'name' => $data['name'],
			'content' => $data['blob'],
			'mime' => $data['content_type'],
			'description' => $data['description']
		);
		switch($data['type'])
		{
			case 'create': $vS3->saveObject($objectInfo);
							$dbResult['status']= 'created';
							break;
			case 'update': $vS3->updateObject($objectInfo);
							$dbResult['status']= 'updated';
							break;
			case 'delete': $vS3->deleteObject($objectInfo);
							$dbResult['status']= 'deleted';
							break;
		}
		return $dbResult;
	}

	public static function search($data)
	{
		$result = array(
			'status' => 'success'
		);
		$result['data'] = self::$vElastic->search($data);
		return $result;
	}

	public static function getLog($query)
	{
		$result = array(
			'status' => 'success'
		);
		$result['data'] = self::$vElastic->getLog($query);
		return $result;
	}

	public static function deleteLog($query)
	{
		if(!self::$vElastic->deleteLog($query))
		{
			return array(
				'status' => 'fail'
			);
		}
		return array(
			'status' => 'success'
		);
	}
}
