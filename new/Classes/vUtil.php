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
}


?>
