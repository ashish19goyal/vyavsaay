<?php
namespace RetailingEssentials;

/**
 * This class is will get all the configuration parameters to the php scripts
 * @author ashish
 * @version june 2016
 * @designPattern singleton
 */
class config
{
	private $attributes = array();
	private static $instance;

	private function __construct()
	{
	    $root_folder="../";
	    if(isset($_SERVER['DOCUMENT_ROOT']) && $_SERVER['DOCUMENT_ROOT']!="")
	    {
	    	$root_folder=$_SERVER['DOCUMENT_ROOT']."/";
	    }
	    $fr=$root_folder."../Config/config.php";
	    $this->attributes = include $fr ;
	}

	/**
	 * This is a public function called to get an object of configurations
	 */
	public static function getInstance()
	{
		if(!isset(self::$instance))
		{
      		self::$instance = new config();
    	}
    	return self::$instance;
	}

  	public function get($key)
	{
		if(isset($this->attributes[$key]))
		{
      		return $this->attributes[$key];
    	}
    	return '';
	}

}

?>
