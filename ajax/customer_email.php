<?php
/*	input data format:
* 			<data>
* 				<items>
* 					<row>
*						<item>value1</item>
*						<offer>offer1</offer>
*					</row>
* 					<row>
*						<item>value2</item>
*						<offer>offer2</offer>
*					</row>
*				</items>
*				<emails>
*					<row>
*						<name>name1</name>
*						<email>email1</email>
*					</row>
*					<row>
*						<name>name2</name>
*						<email>email2</email>
*					</row>
*				</emails>
*				<sender>
*					<sender_email></sender_email>
*					<mail_subject></mail_subject>
*					<sender_title></sender_title>
*					<sender_address></sender_address>
*				</sender>
*			</data>
*/

	session_start();
	
	include_once "../Classes/db.php";
	include_once "../Classes/mailer.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\send_mailer;

	$email_data=$_POST['email_data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	$input_xml=new DOMDocument();
	$input_xml->loadXML($email_data);
	$input=$input_xml->documentElement;
	
	//echo $columns;
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			$items=$input->childNodes->item(0);
			$emails=$input->childNodes->item(1);
			$sender=$input->childNodes->item(2);
			$sender_email=$sender->childNodes->item(0)->nodeValue;
			$custom_subject=$sender->childNodes->item(1)->nodeValue;
			$sender_title=$sender->childNodes->item(2)->nodeValue;
			$sender_address=$sender->childNodes->item(3)->nodeValue;
				
			$headers = "From: " . strip_tags($sender_email) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($sender_email) . "\r\n";
			$headers .= "MIME-Version: 1.0"."\r\n";
			$headers .= "Content-Type:text/html;charset=UTF-8\r\n";
			
			
			$message="<html><body><div>".$sender_title."</div><br/><table><th><td>Item</td><td>Offer</td></th>";
			foreach($items->childNodes as $item)
			{
				$message.='<tr><td>'.$item->childNodes->item(0)->nodeValue.'</td><td>'.$item->childNodes->item(1)->nodeValue.'</td></tr>';
			}
			$message.="</table><br/><div>Visit us at: ".$sender_address."</div></body></html>";
			//echo "message: ".$message;
			foreach($emails->childNodes as $row)
			{
				$to=$row->childNodes->item(1)->nodeValue;
				$subject = $row->childNodes->item(0)->nodeValue.": ".$custom_subject;
				//echo "subject: ".$subject;	
				//echo "send to: ".$to;
				$mail_status=mail($to, $subject, $message, $headers);
			}
			echo "mails sent";	
		}
		else
		{
			echo "Invalid session";
		}
	}
	else
	{
		echo "Invalid session";
	}
?>