<?php

namespace RetailingEssentials;

include_once 'vUtil.php';

class vCron
{
	private static $instance;

	private function __construct(){}

	/**
	 * This is a public function called to get an object of handler
	 */
	public static function getInstance()
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new vCron();
    	}
    	return self::$instance;
	}

	/*
	* Checks if a cron is active or not
	*/
	public static function isActive($cron_name)
	{
		$check_command = "ps -ef | grep $cron_name";
		$check_result = array();
		exec($check_command,$check_result);

		$cron_command = "php ../crons/".$cron_name;

		foreach($check_result as $cr)
		{
			if(strpos($cr,$cron_command)>0)
			{
				return true;
			}
		}

		return false;
	}

	/*
	* Checks if a cron is active or not
	*/
	public static function getPid($cron_name)
	{
		$check_command = "ps -ef | grep $cron_name";
		$check_result = array();
		exec($check_command,$check_result);

		$cron_command = "php ../crons/".$cron_name;

		foreach($check_result as $cr)
		{
			if(strpos($cr,$cron_command)>0)
			{
				preg_match_all('/\d+/', $cr, $matches);
				// print_r($matches);
				return $matches[0][0];
			}
		}

		return "";
	}

	/*
	* if the cron is not already active, it activates the cron
	*/
	public static function activate($cron_name)
	{
		if(!self::isActive($cron_name))
		{
			$cron_command="php ../crons/$cron_name > /dev/null 2>/dev/null & echo $!";
			try{
				$pid = exec($cron_command);
			}catch(Exception $e){

			}
		}
		return array('result' => 'active','pid' => $pid);
	}

	/*
	* if the cron is not already suspended, it kills the cron
	*/
	public static function suspend($cron_name)
	{
		if(self::isActive($cron_name))
		{
			$pid = self::getPid($cron_name);
			$suspend_command="kill -9 $pid";
			try{
				exec($suspend_command);
			}catch(Exception $e){

			}
		}

		return array('result' => 'suspended');
	}

}
