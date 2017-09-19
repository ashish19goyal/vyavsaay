<?php

namespace RetailingEssentials;
include_once 'config.php';

/***
* settings:{
	domain: domain_name, //defaults to vyavsaay
	logInfo: true/false, //defaults to true
	logError: true/false //defaults to true
}
**/

class vLog
{
	private static $instance;
	private static $domain;
	private static $infoFile;
	private static $errorFile;
	private static $infoLogEnabled;
	private static $errorLogEnabled;

	private function __construct($settings)
	{
		$config = config::getInstance();
		self::$infoFile = $config->get('infoLogFile');
		self::$errorFile = $config->get('errorLogFile');
		self::$infoLogEnabled = (!isset($settings['logInfo']) || $settings['logInfo']) ? $config->get('enableLogging') : 'no';
		self::$errorLogEnabled = (!isset($settings['logError']) || $settings['logError']) ? $config->get('enableLogging') : 'no';
		self::$domain = isset($settings['domain']) ? $settings['domain'] : 'vyavsaay';
	}

	/**
	 * This is a public function called to get an object of util
	 */
	public static function getInstance($settings = array())
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new vLog($settings);
    	}
    	return self::$instance;
	}

	/**
	*	This function logs information
	*/
	public static function info($message)
	{
		if(self::$infoLogEnabled == 'yes')
		{
			$message = self::$domain . " -- ". date("Y-m-d H:i:s") ." -- " . $message . "\n";
			file_put_contents(self::$infoFile, $message, FILE_APPEND);
		}
		// else {
		// 	file_put_contents(self::$infoFile, 'logging disabled', FILE_APPEND);
		// }
	}

	/**
	*	This function logs errors
	*/
	public static function err($message)
	{
		if(self::$errorLogEnabled == 'yes')
		{
			$message = self::$domain . " -- ". date("Y-m-d H:i:s") ." -- " . $message . "\n";
			file_put_contents(self::$errorFile, $message, FILE_APPEND);
		}
	}
}


?>
