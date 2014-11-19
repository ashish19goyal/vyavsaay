<?php
/*	input data format:
 * 			<data>
* 				<messages>
* 					<row>
*						<message>message1</message>
*					</row>
* 					<row>
*						<message>message2</message>
*					</row>
*				</messages>
*				<contacts>
*					<row>
*						<name>name1</name>
*						<contact>contact1</contact>
*					</row>
*					<row>
*						<name>name2</name>
*						<contact>contact2</contact>
*					</row>
*				</contacts>
*				<sender>
*					<contact></contact>
*					<sender_title></sender_title>
*					<sender_address></sender_address>
*				</sender>
*			</data>
*/

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$message_data=$_POST['message_data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	$input_xml=new DOMDocument();
	$input_xml->loadXML($message_data);
	$input=$input_xml->documentElement;
	
	//echo $columns;
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			$messages=$input->childNodes->item(0);
			$contacts=$input->childNodes->item(1);
			$sender=$input->childNodes->item(2);
			$sender_contact=$sender->childNodes->item(0)->nodeValue;
			$sender_title=$sender->childNodes->item(1)->nodeValue;
			$sender_address=$sender->childNodes->item(2)->nodeValue;
								
			$message_string="<html><body><div>".$sender_title."</div><br/><table><th><td>Item</td><td>Offer</td></th>";
			foreach($messages->childNodes as $message)
			{
				$message_string.='<tr><td>'.$item->childNodes->item(0)->nodeValue.'</td></tr>';
			}
			$message_string.="</table><br/><div>Visit us at: ".$sender_address."</div></body></html>";
			
			$pipe_desc = array(
					0 => array('pipe', 'r'), // 0 is STDIN for process
					1 => array('pipe', 'w'), // 1 is STDOUT for process
			);
			$command="telegram-cli";
			
			foreach($contacts->childNodes as $row)
			{
				$to=$row->childNodes->item(1)->nodeValue;
				$name = $row->childNodes->item(0)->nodeValue;
				
				$p=proc_open($command,$pipe_desc,$pipes);
				fwrite($pipes[0],'msg '.$to.' '.$message_string);
				fclose($pipes[0]);
				$output=stream_get_contents($pipes[1]);
				echo $output;
				fclose($pipes[1]);
				proc_close($p);
				//$mail_status=mail($to, $subject, $message, $headers);
			}
			echo "messages sent";
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