<?php
namespace RetailingEssentials;

/**
 * This class is used as a middle layer for all file reading operations
 * @author ashish
 * @version june 2014
 * @param filename
 */
class file_reader
{
	public $attributes = array();
	public $file_open="default";
	
	/**
	 * Constructor takes parameter filename that is to be handled
	 * @param unknown $filename
	 */
	public function __construct($filename)
	{
		$this->file_open = fopen($filename,"r");
		$this->read_file();
	}
	
	/**
	 * This is a private function called by contructor to read the file
	 */
	private function read_file()
	{
		if($this->file_open)
		{
			
		while(($line=fgets($this->file_open,1024))!= false)
			{
				$key_value_pair=explode(":",$line,2);
				$key_value_pair[0]=trim($key_value_pair[0]);
				$key_value_pair[1]=trim($key_value_pair[1]);
				$this->attributes[$key_value_pair[0]]=$key_value_pair[1];
				
			}
		}		
		else
			echo "file could not be opened";
	}
	
	/**
	 * Destructor is used to close the open file
	 */
	function __destruct()
	{
		fclose($this->file_open);
	}


}

?>