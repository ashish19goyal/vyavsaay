<?php

namespace RetailingEssentials;
include_once "vElasticCore.php";

// use vElasticCore;

class vElastic
{
	private static $instance;
	private $logger;
	private $core;
	private static $searchType = "search";
	private static $logType = "log";

	/**
	* Constructor initializes a connnection to Elastic
	*/
	private function __construct($domain)
	{
		$this->index = $domain;
		$this->logger = vLog::getInstance(array("domain" => $domain));
		$this->core = vElasticCore::getInstance($domain);
	}

	public static function getInstance($domain)
	{
		if(!isset(self::$instance))
		{
			self::$instance = new vElastic($domain);
		}
		return self::$instance;
	}

	public function setup()
	{
		try{
			if($this->core->createIndex())
			{
				$searchProperties = array(
					'description' => [
                        'type' => 'text',
                        'analyzer' => 'standard'
                    ],
                    'data' => [
                        'type' => 'text',
                        'analyzer' => 'standard'
                    ],
                    'title' => [
                        'type' => 'text',
                        'analyzer' => 'standard'
                    ],
                    'link' => [
                        'type' => 'text',
                        'index' => 'not_analyzed'
                    ],
					'id' => [
						'type' => 'text',
						'index' => 'not_analyzed'
					]
				);
				$logProperties = array(
					'data' => [
						'type' => 'text',
						'analyzer' => 'standard'
					],
					'title' => [
						'type' => 'text',
						'analyzer' => 'standard'
					],
					'link' => [
						'type' => 'text',
						'index' => 'not_analyzed'
					],
					'by' => [
						'type' => 'text',
						'analyzer' => 'standard'
					],
					'at' => [
						'type' => 'long'
					],
					'id' => [
						'type' => 'text',
						'index' => 'not_analyzed'
					],
					'tablename' => [
						'type' => 'text',
						'index' => 'not_analyzed'
					],
					'type' => [
						'type' => 'text',
						'index' => 'not_analyzed'
					],
					'display' => [
						'type' => 'text',
						'analyzer' => 'standard'
					]
				);
				$this->core->addType(self::$searchType,$searchProperties);
				$this->core->addType(self::$logType,$logProperties);
				return true;
			}
		}
		catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return false;
	}

	public function addToSearch($document)
	{
		try
		{
			$this->core->addDocument(self::$searchType,$document);
			return true;
		}
		catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return false;
	}

	public function search($query)
	{
		try
		{
			return $this->getResult($this->core->get(self::$searchType,$query));
		}
		catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return array();
	}

	public function addLog($document)
	{
		try
		{
			$this->core->addDocument(self::$logType,$document);
			return true;
		}catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return false;
	}

	public function getLog($query)
	{
		try
		{
			return $this->getResult($this->core->get(self::$logType,$query));
		}catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return array();
	}

	private function getResult($dbResult)
	{
		$response = array();
		foreach($dbResult as $res)
		{
			$response[] = $res["_source"];
		}
		return $response;
	}
}
?>
