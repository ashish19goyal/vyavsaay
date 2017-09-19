<?php

namespace RetailingEssentials;

include_once 'vDB.php';

class vUtil
{
	private static $instance;
	private static $domain;
	private static $dbName;

	private function __construct($domain)
	{
		self::$domain = $domain;
		self::$dbName = "re_user_".$domain;
	}

	/**
	 * This is a public function called to get an object of util
	 */
	public static function getInstance($domain)
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new vUtil($domain);
    	}
    	return self::$instance;
	}

	/**
	* This function encapsulates a table into an formatted email body
	*/
	public static function getFormattedEmail($reportTitle,$content)
	{
		$userPreferences = self::getUserPreferences(array('logo','address','phone','email','website'));
		$logo = $userPreferences['logo'];
		$address = $userPreferences['address'];
		$phone = $userPreferences['phone'];
		$email = $userPreferences['email'];
		$website = $userPreferences['website'];

		$output = "<div>".
					"<div style='width:100%;text-align:center'>".
						"<div>".
							"<img src='https://vyavsaay.com/client_images/".$logo."'>".
						"</div>".
					"</div>".
					"<div style='width:100%;text-align:center;font-size:18px;margin:10px 0px;'>".
						"<hr style='border: 1px solid #000;margin:2px 0px;'><div style='text-align:center;'><b style='text-size:1.2em'>".$reportTitle."</b></div><hr style='border: 1px solid #000;margin:2px 0px;'>".
					"</div>".
					$content.
					"<div style='width:100%;text-align:center;margin:10px 0px;'>".
						"<hr style='border: 1px solid #000;margin:2px 0px;'><div>".$address." Tel: ".$phone." E-Mail: ".$email." Website: ".$website."</div><hr style='border: 1px solid #000;margin:2px 0px;'>".
					"</div>".
				"</div>";

		return $output;
	}

	/**
	* This function returns the user preferences as per the array passed to it
	*/
	public static function getUserPreferences($preferences)
	{
		$vDB = new vDB(self::$dbName);

		$in = array();
		foreach($preferences as $p)
		{
			$in[]="?";
		}
		$in = implode(',',$in);

		$select_query="select name,value from user_preferences where name in ($in);";
		$result=$vDB->dbSelect($select_query,$preferences);

		$output = array();

		foreach($result as $r)
		{
			$output[$r['name']] = $r['value'];
		}

		foreach($preferences as $p)
		{
			if(!isset($output[$p]))
			{
				$output[$p]="";
			}
		}

		return $output;
	}

	/**
	* This function creates a 1d array from 2d array, by getting the speicified index from 2nd dimension
	*/
	public static function get1Dfrom2D($array,$index)
	{
		$output=array();
		if(!is_array($array))
		{
			return $output;
		}

		foreach($array as $subArray)
		{
			$k = isset($subArray[$index]) ? $subArray[$index] : null;
			if($k)
			{
				$output[]=$k;
			}
		}

		return $output;
	}

	/**
	* This function creates an indexed array from simple key-value pair
	*/
	public static function getIndexedArray($kv)
	{
		$output=array();
		if(!is_array($kv))
		{
			return $output;
		}

		foreach($kv as $k => $v)
		{
			$result = array(
				"index" => $k,
				"value" => $v
			);
			$output[]=$result;
		}

		return $output;
	}

	/**
	* This function creates a key-value array from an indexed array
	*/
	public static function getKVfromIndexedArray($indexed)
	{
		$output=array();
		if(!is_array($indexed))
		{
			return $output;
		}

		foreach($indexed as $index)
		{
			$output[$index['index']]=$index['value'];
		}

		return $output;
	}

	/**
	* This function checks whether an index is set in an indexed array
	*/
	public static function issetIndex($array,$index)
	{
		foreach($array as $v)
		{
			if($v['index'] == $index)
			{
				return true;
			}
		}

		return false;
	}

	/**
	* This function returns a specified index from an indexed array
	*/
	public static function getIndexValue($array,$index)
	{
		foreach($array as $v)
		{
			if($v['index'] == $index)
			{
				$output = isset($v['value']) ? $v['value'] : $v['exact'];
				return $output;
			}
		}

		return "";
	}

	/**
	*	This function validates the session
	*/
	public static function validateSession($post)
	{
		$domain=isset($post['domain']) ? $post['domain'] : "" ;
		$username=isset($post['username']) ? $post['username'] : "" ;
		$cr_access=isset($post['cr']) ? $post['cr'] : "" ;
		$re_access=isset($post['re']) ? $post['re'] : "" ;
		$up_access=isset($post['up']) ? $post['up'] : "" ;
		$del_access=isset($post['del']) ? $post['del'] : "" ;

		if(isset($_SESSION['session']) && $_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['re']==$re_access && $_SESSION['up']==$up_access && $_SESSION['del']==$del_access)
		{
			return true;
		}
		return false;
	}

	/**
	*	This function checks if a variable is blank or not
	*/
	public static function isBlank($arg)
	{
		if(!isset($arg) || $arg==null || $arg=="null" || $arg=="undefined" || $arg=="")
		{
			return true;
		}
		return false;
	}

	/**
	*	This function validates the master session for scripts
	*/
	public static function isMasterSession()
	{
		if(isset($_SESSION['session']) && $_SESSION['session']=='yes' && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']=='master')
		{
			return true;
		}
		return false;
	}
}


?>
