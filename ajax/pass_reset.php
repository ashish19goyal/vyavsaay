<?php

	include_once "../Classes/db.php";
	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\send_mailer_json;

	$userNameString=$_POST['userName'];
	$userEmail=$_POST['userEmail'];

	$response_object = array();

	$position=strrpos($userNameString,'@');
	$domain=$userNameString;
	$username='master';

	if($position!==false)
	{
		$domain=substr($userNameString,$position+1);
		$username=substr($userNameString,0,$position);
	}

	$subject="Reset your Vyavsaay password";

	$password=$username.substr(time(),4);

	$salt=$domain."1234567891234567891234";
	$salt_22=substr($salt,0,22);
	$pass_options=['salt'=> $salt_22];
	$pass_hash=password_hash($password,PASSWORD_DEFAULT,$pass_options);

	try
	{
		$conn=new db_connect("re_user_".$domain);
		$stmt1=$conn->conn->prepare("select count(*) from staff,accounts where accounts.username=? and staff.acc_name=accounts.acc_name and staff.email=? union select count(*) from customers,accounts where accounts.username=? and customers.acc_name=accounts.acc_name and customers.email=? union select count(*) from suppliers,accounts where accounts.username=? and suppliers.acc_name=accounts.acc_name  and suppliers.email=?");
		$stmt1->execute(array($username,$userEmail,$username,$userEmail,$username,$userEmail));
		$unique=$stmt1->fetchAll(PDO::FETCH_NUM)[0][0];
		//echo $unique;
		if($unique!=0 && $unique!='0')
		{
			$stmt2=$conn->conn->prepare("update accounts set password=? where username=?");
			$stmt2->execute(array($pass_hash,$username));

			$message = '<html><head><title>'.$subject.
			'</title></head><body><table><tr><td>Your Vyavsaay password has been changed to : <b>'.$password.'</b></td></tr>'.
			'<tr><td>Please login and change it as soon as possible. </td></tr>'.
			'</table></body></html>';

			$from = "info@vyavsaay.com";
			$from_name = "Vyavsaay ERP";

			$to_array=array(
				array("email" => $userEmail,
					"name" => 'User'
				)
			);
			$to = json_encode($to_array);

			$email_instance=new send_mailer_json('vyavsaay');
			$email_instance->direct_send($subject,$message,'',$to,$from,$from_name);
			$email_instance->log_mailer($domain,$subject,$message,'',$to,$from,$from_name);
			$response_object['status']='success';
		}
		else
		{
			$response_object['status']='error';
		}

	}catch(PDOException $ex)
	{
		$response_object['status']='error';
		$response_object['description']=$ex;
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
