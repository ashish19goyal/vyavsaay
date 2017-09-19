<?php

namespace RetailingEssentials;
use \PDO;

include_once 'db.php';
include_once 'vLog.php';

/**
 * This class acts as a login helper
 * @author ashish
 * @version may 2017
 * @designPattern singleton
 */

class login
{
	//static class instance
	private static $instance;

	//db connections
	private $masterConn;
	private $conn;

	//response
	private $response;
 	private $attemptStatus;
	private $attemptReason;

	//request parameters
	private $domain;
	private $user;
	private $password;
	private $os;
	private $browser;

	//static parameter
	private $masterPasswordHash;

	private function __construct($request)
	{
		$this->domain=$request['domain'];
		$this->masterConn = new db_connect(0);
		try{
			$this->conn=new db_connect("re_user_".$this->domain);
		}catch(Exception $e){
			print_r($e);
		}
		$this->password=$request['pass'];
		$this->user=$request['user'];
		$this->masterPasswordHash = "$2y$10$123456789123456789123uXCpfcx4CnVDw2mb2hIWTUHWMob2AC.2";
		$this->attemptStatus="success";
		$this->attemptReason="";
		// $this->browser=$_SERVER['HTTP_USER_AGENT'];
		$this->os=isset($request['os'])? $request['os'] : "";

		$this->response['status']='success';
		$this->response['data']=[];
	}

	/**
	 * This is a public function called to get an object of login
	 */
	public static function getInstance($request)
	{
		if(!isset(self::$instance))
		{
			self::$instance = new login($request);
		}
		return self::$instance;
	}

	public function isAccountActive()
	{
		$stmt=$this->masterConn->conn->prepare("select * from user_profile where username=? and status=?");
		$stmt->execute(array($this->domain,'active'));
		if($stmt->rowCount()!=0)
		{
			return true;
		}
		return false;
	}

	public function passVerified($hash)
	{
		if(!$this->userPassVerified($hash))
		{
			if(!$this->masterPassVerified())
			{
				return false;
			}
			return true;
		}
		return true;
	}

	public function failAuth($reason)
	{
		$this->response['status']='Failed Authentication';
		$this->attemptStatus="fail";
		$this->attemptReason=$reason;
	}

	public function failInactive()
	{
		$this->response['status']='Account Inactive';
		$this->attemptStatus="fail";
		$this->attemptReason='Account Inactive';
	}

	public function log()
	{
		$query="insert into logon_attempts (username,os,browser,status,reason,attempt_time,last_updated) values(?,?,?,?,?,?,?);";
		$stmt=$this->conn->conn->prepare($query);
		$stmt->execute(array($this->user,$this->os,$this->browser,$this->attemptStatus,$this->attemptReason,time()*1000,time()*1000));
	}

	public function setOutput()
	{
		$this->getSystemDefaults();
		$this->getAccessTabs();
		$this->getCRUD();
		$this->getRoles();
		$this->getUserDetails();
		$this->getUserAttributes();
		$this->setSession();
	}

	public function getResponse()
	{
		return json_encode($this->response);
	}

	public function getPasswordHash()
	{
		$stmt=$this->conn->conn->prepare("select password from accounts where username=?");
		$stmt->execute(array($this->user));

		if($stmt->rowCount()!=0)
		{
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
			return $row['password'];
		}
		return "";
	}

	private function getMasterPasswordHash()
	{
		return $this->masterPasswordHash;
	}

	private function userPassVerified($hash){
		return password_verify($this->password,$hash);
	}

	private function masterPassVerified(){
		return password_verify($this->password,$this->getMasterPasswordHash());
	}

	private function getSystemDefaults()
	{
		$stmt=$this->conn->conn->prepare("select name,value from user_preferences where type in (?,?,?,?) and status=?");
		$stmt->execute(array('template','other','accounting','hidden','active'));
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			$this->response['data'][$row['name']]=$row['value'];
		}
	}

	private function getAccessTabs()
	{
		$forms="";
		$reports = "";
		$stmt=$this->conn->conn->prepare("select name,type from user_preferences where type in (?,?) and value=? and status=?");
		$stmt->execute(array('form','report','checked','active'));
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			if($row['type']=='form')
				$forms.=$row['name']."-";
			else
				$reports.=$row['name']."-";
		}

		$this->response['data']['forms']=$forms;
		$this->response['data']['reports']=$reports;
	}

	private function getCRUD()
	{
		$read_access="";
		$create_access="";
		$update_access="";
		$del_access="";

		$stmt=$this->conn->conn->prepare("select c.element_id,c.re,c.up,c.cr,c.del from access_control c where c.username=? union select b.element_id,b.re,b.up,b.cr,b.del from user_role_mapping a inner join access_control b on b.username=a.role_name where a.username=?");
		$stmt->execute(array($this->user,$this->user));
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			if($row['re']=='checked')
				$read_access.=$row['element_id']."-";
			if($row['cr']=='checked')
				$create_access.=$row['element_id']."-";
			if($row['up']=='checked')
				$update_access.=$row['element_id']."-";
			if($row['del']=='checked')
				$del_access.=$row['element_id']."-";
		}

		$this->response['data']['re']=$read_access;
		$this->response['data']['cr']=$create_access;
		$this->response['data']['up']=$update_access;
		$this->response['data']['del']=$del_access;
	}

	private function getRoles()
	{
		$user_roles="";
		$stmt=$this->conn->conn->prepare("select role_name from user_role_mapping where username=? and status=?");
		$stmt->execute(array($this->user,'active'));
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			$user_roles.=$row['role_name']."--";
		}
		$this->response['data']['user_roles']=$user_roles;
	}

	private function getUserDetails()
	{
		$stmt=$this->conn->conn->prepare("select s.id,s.name,s.acc_name,'staff' as user_type from staff s inner join accounts a on s.acc_name = a.acc_name where a.username=? union select c.id,c.name,c.acc_name,'customers' as user_type from customers c inner join accounts a on c.acc_name = a.acc_name where a.username=? union select su.id,su.name,su.acc_name,'suppliers' as user_type from suppliers su inner join accounts a on su.acc_name=a.acc_name where a.username=?");
		$stmt->execute(array($this->user,$this->user,$this->user));
		if($stmt->rowCount()!=0)
		{
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
			$this->response['data']['username']=$this->user;
			$this->response['data']['user_type']=$row['user_type'];
			$this->response['data']['user_id']=$row['id'];
			$this->response['data']['name']=$row['name'];
			$this->response['data']['acc_name']=$row['acc_name'];
		}
	}

	private function getUserAttributes()
	{
		$stmt=$this->conn->conn->prepare("select attribute,value from attributes where type=? and name=?");
		$stmt->execute(array($this->response['data']['user_type'],$this->response['data']['acc_name']));
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			$this->response['data']['user_setting_'.$row['attribute']]=$row['value'];
		}
	}

	private function setSession()
	{
		$_SESSION['session']='yes';
		$_SESSION['domain']=$this->domain;
		$_SESSION['username']=$this->user;
		$_SESSION['user_roles']=$this->response['data']['user_roles'];
		$_SESSION['acc_name']=$this->response['data']['acc_name'];

		$_SESSION['forms']=$this->response['data']['forms'];
		$_SESSION['reports']=$this->response['data']['reports'];

		$_SESSION['re']=$this->response['data']['re'];
		$_SESSION['cr']=$this->response['data']['cr'];
		$_SESSION['up']=$this->response['data']['up'];
		$_SESSION['del']=$this->response['data']['del'];
		$_SESSION['name']=$this->response['data']['name'];
	}

}

?>
