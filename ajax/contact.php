<?php		
	$userName=$_POST['userName'];
	$userEmail=$_POST['userEmail'];
	$userPhone=$_POST['userPhone'];
	$userMsg=$_POST['userMsg'];
	$subject = "Vyavsaay inquiry from ".$userName; 
	$message = '<html><head><title>'.$subject.
		'</title></head><body><table><tr><td>Email id :  </td><td> '.$userEmail.'</td></tr>'.
		'<tr><td>Phone No : </td><td> '.$userPhone.'</td></tr><tr><td>Name : </td><td> '.$userName.'</td></tr>'.
		'<tr><td>Says : </td><td> '.$userMsg.'</td></tr></table></body></html>';
	$to="info@vyavsaay.com";
	$headers = "From: " . strip_tags($userEmail) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($userEmail) . "\r\n";
	$headers .= "MIME-Version: 1.0"."\r\n";
	$headers .= "Content-Type:text/html;charset=UTF-8\r\n";
	$mail_status=mail($to, $subject, $message, $headers);
?>