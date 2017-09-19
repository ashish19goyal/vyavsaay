<?php

namespace RetailingEssentials;
include_once "../Classes/vDB.php";
require_once "../Classes/aws/aws-autoloader.php";
include_once '../Classes/config.php';
include_once '../Classes/vUtil.php';
include_once "../Classes/vLog.php";

use RetailingEssentials\vDB;
use \PDO;
use Aws\S3\S3Client;
use RetailingEssentials\vLog;

class vS3
{
    private $domain=null;
	private $client=null;
	private $dbConn=null;
    private $bucket=null;

	public function __construct($settings = array())
	{
		$this->domain = isset($settings["domain"]) ? $settings["domain"] : 'vyavsaay';
        $this->bucket = isset($settings["bucket"]) ? $settings["bucket"] : 'vyavsaay-logs';

        $config = config::getInstance();

        $this->log = vLog::getInstance(array('domain' => $this->domain));
		$this->dbConn = new vDB("re_user_".$this->domain);

        $this->client = S3Client::factory(array(
		    'version'=> 'latest',
		    'region' => isset($settings['region']) ? $settings['region'] : 'ap-southeast-1',
			'credentials' => array(
		        'key'    => isset($settings['awsKey']) ? $settings['awsKey'] : $config->get("awsAccessKey"),
		        'secret' => isset($settings['awsSecret']) ? $settings['awsSecret'] : $config->get("awsSecretKey")
	    	)
		));
	}

	public function putObject($fileInfo)
	{
		try
        {
            $result = $this->client->putObject([
                'Bucket' => $this->bucket,
                'Key'    => $fileInfo['name'],
                'Body'   => $fileInfo['content'],
                'ContentType' => $fileInfo['mime']
            ]);
            //$this->log::info($result);
            return true;
		}
        catch(Exception $e)
        {
            $this->log::err($e);
            return false;
		}
	}

    public function deleteS3Object($fileInfo)
    {
        try
        {
            $result = $this->client->deleteObject([
                'Bucket' => $this->bucket,
                'Key'    => $fileInfo['name'],
            ]);
            return true;
        }
        catch(Exception $e)
        {
            $this->log::err($e);
            return false;
        }
    }

    public function saveObject($fileInfo)
	{
		// remove the prefix
	    $uri=substr($fileInfo['content'],strpos($fileInfo['content'],",")+1);
		$fileInfo['content']=base64_decode($uri);

		if($this->putObject($fileInfo))
        {
    		$query="insert into s3_objects (name,type,status,description,last_updated) values(?,?,?,?,?)";
            $values = array($fileInfo['name'],'create','synced',$fileInfo['description'],1000*time());
            $this->dbConn->dbExecute($query,$values);
            $this->log::info('document saved in db');
        }
	}

	public function updateObject($fileInfo)
	{
		// remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		$fileInfo['content']=base64_decode($uri);

		if($this->putObject($fileInfo))
	    {
            $query="update s3_objects set type=?,description=?,last_updated=? where name=?";
            $values=array('update',$fileInfo['description'],1000*time(),$fileInfo['name']);
    		$this->dbConn->dbExecute($query,$values);
        }
	}

    public function deleteObject($fileInfo)
	{
	    if($this->deleteS3Object($fileInfo))
        {
        	$query="delete from s3_objects where name=?";
            $values = array($fileInfo['name']);
            $this->dbConn->dbExecute($query,$values);
        }
	}
}

?>
