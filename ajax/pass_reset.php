<?php
		
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$userNameString=$_POST['userName'];
	$userEmail=$_POST['userEmail'];
	
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
		$stmt1=$conn->conn->prepare("select count(*) from staff where username=? and email=?");
		$stmt1->execute(array($username,$userEmail));
		$unique=$stmt1->fetchAll(PDO::FETCH_NUM)[0][0];
		
		if($unique!==0 && $unique!='0')
		{
			$stmt2=$conn->conn->prepare("update staff set password=? where username=?");
			$stmt2->execute(array($pass_hash,$username));
			
			echo $password;
			
			//$message='<html><head><title>'.$subject.'</title></head><body><table><tr><td>Your Vyavsaay password has been temporarily reset to: '+$password+'</td></tr><tr><td>Please login with this password and change it.</td></tr></table></body></html>';
			$message = '<html><head><title>'.$subject.
			'</title></head><body><table><tr><td>Your Vyavsaay password has been changed to : <b>'.$password.'</b></td></tr>'.
			'<tr><td>Please login with this password and change it as soon as possible. </td></tr>'.
			'</table></body></html>';
			
			$to=strip_tags($userEmail);
			$headers = "From: info@vyavsaay.com \r\n";
			$headers .= "Reply-To: info@vyavsaay.com \r\n";
			$headers .= "MIME-Version: 1.0"."\r\n";
			$headers .= "Content-Type:text/html;charset=UTF-8\r\n";
			$mail_status=mail($to, $subject, $message, $headers);
		}
		else
		{
			echo 'failed';
		}
		
	}catch(PDOException $ex)
	{
		echo 'failed';
	}
?>