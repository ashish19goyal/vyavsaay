<?php

	include_once "../Classes/db.php";
	include_once "../Classes/sms.php";
	include_once "../Classes/emailSES.php";
	use RetailingEssentials\emailSES;
	use RetailingEssentials\send_sms;
	use RetailingEssentials\db_connect;

	$status="failed_registration";

	$username=$_POST['userid'];
	$email=$_POST['email'];
	$name=$_POST['name'];
	$pass=$_POST['pass'];
	$phone=$_POST['phone'];

	$salt=$username."1234567891234567891234";
	$salt_22=substr($salt,0,22);
	$pass_options=['salt'=> $salt_22];
	$pass_hash=password_hash($pass,PASSWORD_DEFAULT,$pass_options);

	$conn=new db_connect(0);

	$stmt=$conn->conn->prepare("insert into user_profile (username,email,name,phone,status,dbname) values(?,?,?,?,?,?)");
	$stmt->execute(array($username,$email,$name,$phone,'active','re_user_'.$username));
	$id_user=$conn->conn->lastInsertId();

	$response_object = array( "status" => "success");

	try
	{
		$conn2=new db_connect("re_user_".$username);
		set_user_profiles($conn2,$pass_hash,$name,$email,$phone);

	}catch(PDOException $ex)
	{
		$response_object['status']="error";
		$response_object['description']=$ex->getMessage();
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

	$message="Congratulations!! Your Vyavsaay ERP account has been successfully setup.";
	$sms_instance=new send_sms();
	$sms_instance->direct_send($message,$phone,'transaction');
	$sms_instance->log_sms($username,$message,$phone,'transaction');

	$from = "info@vyavsaay.com";
	$from_name = "Vyavsaay ERP";
	$email_message="Congratulations $name!! Your Vyavsaay account has been successfully setup.".
					"<br>Your account details are as follows. Please login and change your password.".
					"<br>Url: https://vyavsaay.com".
					"<br>Login: ".$username.
					"<br>Password: ".$pass;
	$to_array=array(
				array("email" => $email
					//"name" => $name
				)
			);
	$to = json_encode($to_array);

	$subject ='Vyavsaay: Account Setup';
	$mailer=emailSES::getInstance('vyavsaay');
	$message = array(
		'receivers' => $to,
		'sender' => $from,
		'subject' => $subject,
		'message' => $email_message,
		'sender_name' => $from_name,
		'attachment_type' => '',
		'message_attachment' => ''
	);

	$mailer->send($message);

	function set_user_profiles($conn2,$pass_hash,$name,$email,$phone)
	{
		$stmt2=$conn2->conn->prepare("insert into staff (name,status,email,phone,acc_name,last_updated) values(?,?,?,?,?,?)");
		$stmt2->execute(array($name,'active',$email,$phone,$name." (".$phone.")",1000*time()));

		$stmt3=$conn2->conn->prepare("insert into accounts (username,password,acc_name,type,status,last_updated) values(?,?,?,?,?,?)");
		$stmt3->execute(array('master',$pass_hash,$name." (".$phone.")",'master','active',1000*time()));
	}

?>
