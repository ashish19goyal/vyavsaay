#!/usr/bin/php
 
<?php

	include_once "../Classes/db.php";
	include_once "../Classes/sms.php";
	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\send_sms;
 	use RetailingEssentials\send_mailer_json;
 
	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for sending reminders for appointments\n";
    echo "\n";
    echo "Usage:";
    echo "\appointments.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function remind_appointments()
{
	$conn=new db_connect(0);
	$select_query="select username from user_profile where status=?";
	$select_stmt=$conn->conn->prepare($select_query);
		
	$select_stmt->execute(array('active'));
	$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
	$sms_instance=new send_sms();
	
	for($i=0;$i<count($result);$i++)
	{
		$domain=$result[$i]['username'];
		
		$email_instance=new send_mailer_json($domain);
		
		$conn1=new db_connect('re_user_'.$domain);
		
		$tselect_query="select name,value from user_preferences where name in (?,?,?,?)";
		$tselect_stmt=$conn1->conn->prepare($tselect_query);
		$tselect_stmt->execute(array('title','phone','email','address'));
		$tresult=$tselect_stmt->fetchAll(PDO::FETCH_ASSOC);
		$bt="";
		$bphone="";
		$baddress="";
		$bemail="";
		for($k=0;$k<count($tresult);$k++)
		{
			switch($tresult[$k]['name'])
			{
				case 'title': $bt=$tresult[$k]['value'];
								break;
				case 'phone': $bphone=$tresult[$k]['value'];
								break;
				case 'email': $bemail=$tresult[$k]['value'];
								break;
				case 'address': $baddress=$tresult[$k]['value'];
								break;	
			}
		}
							   
		$select_query="select a.schedule,b.phone,b.email,b.name from appointments a,customers b where a.status=? and a.schedule>=? and a.schedule<? and a.customer=b.acc_name";
		$select_stmt=$conn1->conn->prepare($select_query);
		$mtime=time()*1000;
		
		$select_stmt->execute(array('pending',$mtime,($mtime+24*3600000)));
		$app_result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($j=0;$j<count($app_result);$j++)
		{
			$phone=$app_result[$j]['phone'];
			$email=$app_result[$j]['email'];
			
			$schedule_format=date('d-m-Y h:i:s A',($app_result[$j]['schedule']/1000));
			
			///sending sms
			if($phone!="" && $phone!=null)
			{
				$sms_message="Your appointment at ".$bt." is confirmed for ".$schedule_format.". Dont forget to visit.";
				$sms_instance->direct_send($sms_message,$phone,'transaction');
				$sms_instance->log_sms($domain,$sms_message,$phone,'transaction');
			}
			
			//sending email
						///sending sms
			if($email!="" && $email!=null)
			{
				$subject=$bt.' - Reminder for Appointment';
				$email_message="Your appointment at ".$bt." is confirmed for ".$schedule_format.". Dont forget to visit.\n\nRegards,\n".$bt."\n".$baddress."\n".$bphone;
				$r_array=array(array('name'=>$app_result[$j]['name'],'email'=>$email));	
				$receivers=json_encode($r_array);
				$email_instance->direct_send($subject,$email_message,'',$receivers,$bemail,$bt);
				$email_instance->log_mailer($domain,$subject,$email_message,'',$receivers,$bemail,$bt);
			}
		}
	}
}


//configure command line arguments
if($argc > 0)
{
    foreach($argv as $arg)
    {
       $args = explode('=',$arg);
       switch($args[0])
       {
			case '--help':
                return displayUsage();
                break;
        }
    }
}
 
//fork the process to work in a daemonized environment
$pid = pcntl_fork();

if($pid == -1)
{
	return 1; //error
}
else if($pid)
{
	return 0; //success
}
else
{
    //the main process
    while(true)
    {        
		$ctime=localtime(time(),true);
		$chour=$ctime['tm_hour'];
		if($chour==8)
		{
			remind_appointments();
		}
		sleep(3550);
    }
}

?>