<?php
	
namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;
use \DOMDocument;

class user_setup
{
	private $conn=null;
 	private $dbname="";
 	
	public function __construct($username)
	{
		$this->dbname="re_user_".$username;
		$this->conn=new db_connect(0);
		$this->create_database();
		unset($this->conn);
		$this->conn=new db_connect($this->dbname);
		$this->setup();
		$this->get_master_data();
		$this->get_user_data();
		$this->get_demo_data();
	}

	public function __destruct()
	{
		unset($this->conn);
	}
	
	private function create_database()
	{
		$sql_create_db="create database ".$this->dbname;
		
		try{
			$this->conn->conn->exec($sql_create_db);
		}catch(PDOException $ex)
		{
			echo "Could not create database ".$this->dbname." ". $ex->getMessage()."</br>";
		}
	}
	
	private function setup()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/db_schema.xml");
		$db_schema=$db_schema_xml->documentElement;
		
		
		foreach($db_schema->childNodes as $table)
		{		
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				$q_string="create table $table_name (";
				
				foreach($table->childNodes as $column)
				{
					if($column->nodeName!='#text' && $column->nodeName!='#comment')
						$q_string.=$column->nodeName." ".$column->getAttribute('type')." ,";
				}
				$q_string.="PRIMARY KEY (id));";
				
				try{
					$this->conn->conn->exec($q_string);
				}catch(PDOException $ex)
				{
					echo "Could not create table $table_name: " .$ex->getMessage() ."</br>";
				}
			}
		}
	}
	
	private function get_user_data()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/user_db_data.xml");
		$db_schema=$db_schema_xml->documentElement;
			
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				foreach($table->childNodes as $row)
				{
					$data_array=Array();
					$q_string="insert into $table_name(";
		
					if($row->nodeName!='#text')
					{		
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{	
								$q_string.=$column->nodeName.",";
							}
						}
						
						$q_string=rtrim($q_string,",");
						$q_string.=") values(";
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.="?,";
								$data_array[]=$column->nodeValue;
							}
						}
						$q_string=rtrim($q_string,",");
						$q_string.=");";
			
						try{
							$stmt=$this->conn->conn->prepare($q_string);
							$stmt->execute($data_array);
						}catch(PDOException $ex)
						{
							echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
						}
					}
				}
			}
		}
				
	}

	private function get_demo_data()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/user_demo_data.xml");
		$db_schema=$db_schema_xml->documentElement;
			
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				foreach($table->childNodes as $row)
				{
					$data_array=Array();
					$q_string="insert into $table_name(";
	
					if($row->nodeName!='#text')
					{
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.=$column->nodeName.",";
							}
						}
	
						$q_string=rtrim($q_string,",");
						$q_string.=") values(";
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.="?,";
								$data_array[]=$column->nodeValue;
							}
						}
						$q_string=rtrim($q_string,",");
						$q_string.=");";
							
						try{
							$stmt=$this->conn->conn->prepare($q_string);
							$stmt->execute($data_array);
						}catch(PDOException $ex)
						{
							echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
						}
						}
					}
				}
			}
	
	}
	
	
	private function get_master_data()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/master_db_data.xml");
		$db_schema=$db_schema_xml->documentElement;
		
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				foreach($table->childNodes as $row)
				{
					$data_array=Array();
					$q_string="insert into $table_name(";
					
					if($row->nodeName!='#text')
					{		
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.=$column->nodeName.",";
							}
						}
							
						$q_string=rtrim($q_string,",");
						$q_string.=") values(";
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.="?,";
								$data_array[]=$column->nodeValue;
							}
						}
						$q_string=rtrim($q_string,",");
						$q_string.=");";
			
						try{
							$stmt=$this->conn->conn->prepare($q_string);
							$stmt->execute($data_array);
						}catch(PDOException $ex)
						{
							echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
						}
						//echo "data added to master table";
					}
				}
			}
		}
	}

}

class master_setup
{
	private $conn=null;
	 
	public function __construct()
	{
		$this->conn=new db_connect(0);
		$this->setup();
		$this->get_master_data();
	}

	public function __destruct()
	{
		unset($this->conn);
	}

	private function setup()
	{
		//////////reading xml schema of the database
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/master_db_schema.xml");
		$db_schema=$db_schema_xml->documentElement;
		
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				$q_string="create table $table_name (";
					
				foreach($table->childNodes as $column)
				{
					if($column->nodeName!='#text' && $column->nodeName!='#comment')
						$q_string.=$column->nodeName." ".$column->getAttribute('type')." ,";
				}
				$q_string.="PRIMARY KEY (id));";
					
				try{
					$this->conn->conn->exec($q_string);
				}catch(PDOException $ex)
				{
					echo "Could not create table $table_name: " .$ex->getMessage() ."</br>";
				}
				echo "Table $table_name created successfully</br>";
			}
		}
	}
	
	private function get_master_data()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/master_db_data.xml");
		$db_schema=$db_schema_xml->documentElement;
		
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				foreach($table->childNodes as $row)
				{
					$data_array=Array();
					$q_string="insert into $table_name(";
					if($row->nodeName!='#text')
					{
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{	
								$q_string.=$column->nodeName.",";
							}
						}
						
						$q_string=rtrim($q_string,",");
						$q_string.=") values(";
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.="?,";
								$data_array[]=$column->nodeValue;
							}
						}
						$q_string=rtrim($q_string,",");
						$q_string.=");";
			
						try{
							$stmt=$this->conn->conn->prepare($q_string);
							$stmt->execute($data_array);
						}catch(PDOException $ex)
						{
							echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
						}
						
					}
				}
			}
		}
		echo "Data added to tables";
	}
}

?>