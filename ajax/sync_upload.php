<?php

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	//username required to identify the database
	$domain=$_POST['domain'];
	$del_access=$_POST['del'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$cr_access=$_POST['cr'];
	
	$post_data=$_POST['data'];
	$last_sync=$_POST['last_sync'];

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['up']==$up_access && $_SESSION['del']==$del_access)
		{
			$conn=new db_connect("re_user_".$domain);
			$return_data="<activities>";
			//setting up the response xml string
			$xmlresponse_xml=new DOMDocument();
			$xmlresponse_xml->loadXML($post_data);
			$xmlresponse=$xmlresponse_xml->documentElement;
		
			foreach($xmlresponse->childNodes as $row)
			{
				$id=$row->getElementsByTagName('id')->item(0)->nodeValue;		
				$table_name=$row->getElementsByTagName('tablename')->item(0)->nodeValue;
				$type=$row->getElementsByTagName('type')->item(0)->nodeValue;
				$data_id=$row->getElementsByTagName('data_id')->item(0)->nodeValue;
				$data_xml=$row->getElementsByTagName('data_xml')->item(0);
				$last_updated=$row->getElementsByTagName('last_updated')->item(0)->nodeValue;
				$link_to=$row->getElementsByTagName('link_to')->item(0)->nodeValue;

				$q_string="insert into activities (id,tablename,type,data_id,data_xml,last_updated,status,link_to) values(?,?,?,?,?,?,?,?)";
				$stmt=$conn->conn->prepare($q_string);
				$stmt->execute(array($id,$table_name,$type,$data_id,$xmlresponse_xml->saveXML($data_xml),$last_updated,'synced',$link_to));
				
				$q_string1="select last_updated from $table_name where id=?;";
				$stmt1=$conn->conn->prepare($q_string1);
				$stmt1->execute(array($data_id));
				
				$result1=$stmt1->fetch(PDO::FETCH_ASSOC);
				$server_last_update=$result1['last_updated'];
				
				if($server_last_update<$last_sync)
				{
					$q_string2="";
					$data=$data_xml->childNodes->item(0);
					
					switch($type)
					{
						case 'create': 
							$data_array=array();
							$q_string2="insert into $table_name (";
							foreach($data->childNodes as $column)
							{
								if($column->nodeName!='#text')
									$q_string2.=$column->nodeName.",";
							}
							$q_string2=rtrim($q_string2,",");
							$q_string2.=") values(";
							foreach($data->childNodes as $column)
							{
								if($column->nodeName!='#text')
								{
									$q_string2.="?,";
									$data_array[]=$column->nodeValue;
								}
							}
							$q_string2=rtrim($q_string2,",");
							$q_string2.=");";	
							$stmt2=$conn->conn->prepare($q_string2);
							$stmt2->execute($data_array);
							break;
						case 'update': 
							$q_string2="update $table_name set ";
							$data_array=array();
							foreach($data->childNodes as $column)
							{
								if($column->nodeName!='#text')
								{
									$q_string2.=$column->nodeName."=?,";
									$data_array[]=$column->nodeValue;
								}
							}
							$q_string2=rtrim($q_string2,",");
							$q_string2.=" where id=?";
							$data_array[]=$data_id;
							$stmt2=$conn->conn->prepare($q_string2);
							$stmt2->execute($data_array);
							break;
						case 'delete': $q_string2="delete from $table_name where id=?";
							$stmt2=$conn->conn->prepare($q_string2);
							$stmt2->execute(array($data_id));
							break;
					}	
				}
				$return_data.="<id>$id</id>";
			}
			$return_data.="</activities>";
			header("Content-Type:text/xml");
			echo $return_data;
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