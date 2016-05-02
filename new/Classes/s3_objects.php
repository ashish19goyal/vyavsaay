<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
require_once '../Classes/S3.php';
include_once '../Classes/file_reader.php';

use RetailingEssentials\db_connect;
use \PDO;
use \S3;

class s3_object
{
	public $bucketName=null;	    
	public $awsAccessKey=null;
	public $awsSecretKey=null;
    public $conn=null;
    public $domain=null;
    
    public function __construct($domain='vyavsaay',$bucket='vyavsaay-newsletter')
	{
        $fr=new file_reader($_SERVER['DOCUMENT_ROOT']."/../Config/config.prop");
        
        $this->bucketName=$bucket;
		$this->awsAccessKey=$fr->attributes["awsAccessKey"];
		$this->awsSecretKey=$fr->attributes["awsSecretKey"];
        $this->domain=$domain;
		$this->s3=new S3($this->awsAccessKey, $this->awsSecretKey);
		$this->conn=new db_connect('re_user_'.$domain);
	}

	//transfer s3 object
	public function create_object($blob,$name,$type,$description)
	{
		// remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		$code_uri=base64_decode($uri);
		
		$this->s3->putObject($code_uri,$this->bucketName,$name,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $type));		
		$create_query="insert into s3_objects (name,type,status,description,last_updated) values(?,?,?,?,?)";		
		$create_stmt=$this->conn->conn->prepare($create_query);
		$create_stmt->execute(array($name,$type,'synced',$description,1000*time()));		
	}

	public function update_object($blob,$name,$type,$description)
	{
		// remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		$code_uri=base64_decode($uri);
		
		$this->s3->putObject($code_uri,$this->bucketName,$name,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $type));		
		$update_query="update s3_objects set type=?,description=?,last_updated=? where name=?";		
		$update_stmt=$this->conn->conn->prepare($update_query);
		$update_stmt->execute(array($type,$description,1000*time(),$name));
	}

    public function delete_object($name)
	{
	    $this->s3->deleteObject($this->bucketName,$name);		
		$delete_query="delete from s3_objects where name=?";		
		$delete_stmt=$this->conn->conn->prepare($delete_query);
		$delete_stmt->execute(array($name));		
	}
    
    public function direct_transfer($blob,$name,$type)
	{
		// remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		$code_uri=base64_decode($uri);
		
		$this->s3->putObject($code_uri,$this->bucketName,$name,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $type));		
	}

	///transfer all pending s3_objects stored in the db
	public function transfer_stored_objects($domain)
	{
		$conn1=new db_connect('re_user_'.$domain);

		$select_query="select * from s3_objects where status=?";
		$select_stmt=$conn1->conn->prepare($select_query);
		$update_query="update s3_objects set status=? where id=?;";
		$update_stmt=$conn1->conn->prepare($update_query);
		 
		$select_stmt->execute(array('pending'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->direct_transfer($result[$i]['data_blob'],$result[$i]['name'],$result[$i]['type']);
			$update_stmt->execute(array('synced',$result[$i]['id']));
		}
	}
	
	public function store_pending_transfer($blob,$name,$type)
	{
		$create_query="insert into s3_objects (name,data_blob,type,status,last_updated) values(?,?,?,?,?)";		
		$create_stmt=$this->conn->conn->prepare($create_query);
		$create_stmt->execute(array($name,$blob,$type,'pending',1000*time()));		
	}

	public function log_transfer($blob,$name,$type)
	{
		$create_query="insert into s3_objects (name,data_blob,type,status,last_updated) values(?,?,?,?,?)";		
		$create_stmt=$this->conn->conn->prepare($create_query);
		$create_stmt->execute(array($name,$blob,$type,'synced',1000*time()));		
	}
	
	public function transfer_all_stored_objects()
	{
		$conn=new db_connect(0);
		$select_query="select username from user_profile where status=?";
		$select_stmt=$conn->conn->prepare($select_query);
		
		$select_stmt->execute(array('active'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->transfer_stored_objects($result[$i]['username']);
		}
	}
}

?>