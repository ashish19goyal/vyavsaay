<?php

namespace RetailingEssentials;
use \PDO;

include_once 'vUtil.php';
include_once 'vDB.php';

class handler
{
	private static $instance;
	private static $domain;
	private static $dbName;
	private static $vDB;

	private function __construct($domain)
	{
		self::$domain = $domain;
		self::$dbName = "re_user_".$domain;
		self::$vDB = new vDB(self::$dbName);
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
}
