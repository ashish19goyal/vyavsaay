<?php

namespace RetailingEssentials;
require_once "vendor/autoload.php";
include_once "vLog.php";

use Elasticsearch\ClientBuilder;

class vElasticCore
{
	private static $instance;
	private $client;
	private $index;
	private $logger;

	/**
	* Constructor initializes a connnection to Elastic
	*/
	private function __construct($domain)
	{
		$this->client = ClientBuilder::create()->build();
		$this->index = $domain;
		$this->logger = vLog::getInstance(array("domain" => $domain));
	}

	public static function getInstance($domain)
	{
		if(!isset(self::$instance))
		{
			self::$instance = new vElasticCore($domain);
		}
		return self::$instance;
	}

	/**
	* Destructor releases the connnection to Elastic
	*/
	public function __destruct()
	{
		unset($this->client);
	}

	public function createIndex()
	{
		try{
			$params = ['index' => $this->index];
			$response = $this->client->indices()->create($params);
			// print_r($response);
			if($response['acknowledged'])
			{
				return true;
			}
		}
		catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return false;
	}

	public function deleteIndex()
	{
		try{
			$params = ['index' => $this->index];
			$response = $this->client->indices()->delete($params);
			// print_r($response);
			if($response['acknowledged'])
			{
				return true;
			}
		}
		catch(Exception $e){
			$this->logger->err($e);
		}
		return false;
	}

	public function addType($type,$properties)
	{
		try{
			$params = [
			    'index' => $this->index,
			    'type' => $type,
			    'body' => [
			        $type => [
			            '_source' => [
			                'enabled' => true
			            ],
			            'properties' => $properties
			        ]
			    ]
			];
			$response = $this->client->indices()->putMapping($params);
			if($response['acknowledged'])
			{
				return true;
			}
		}
		catch(Exception $e){
			$this->logger->err($e);
		}
		return false;
	}

	public function addDocument($type,$document)
	{
		try{
			$params = [
			    'index' => $this->index,
			    'type' => $type,
			    'id' => $document['id'],
			    'body' => $document
			];
			$response = $this->client->index($params);
			return true;
		}catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return false;
	}

	public function get($type,$query)
	{
		try{
			$params = [
			    'index' => $this->index,
			    'type' => $type,
			    'body' => [
					'query' => $query
					]
			];
			$response = $this->client->search($params);
			if(count($response['hits'])>0)
			{
				return $response['hits']['hits'];
			}
		}
		catch(Exception $e)
		{
			$this->logger->err($e);
		}
		return array();
	}

}
?>
