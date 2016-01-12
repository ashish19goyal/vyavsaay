<?php
/*
 * output data format: 
 *	<re_xml>	
 *			<tablename>data_id</tablename>
 *			<tablename>data_id</tablename>
 *	</re_xml>	
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$re_access=$_POST['re'];
	$username=$_POST['username'];
	$last_sync_time=$_POST['last_sync_time'];

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			$conn=new db_connect("re_user_".$domain);
			
			$db_schema_xml=new DOMDocument();
			$db_schema_xml->load("../db/db_schema.xml");
			$db_schema=$db_schema_xml->documentElement;
			
			$xmlresponse="<re_xml>";

			$stmt_query=$conn->conn->prepare("select tablename,data_id from activities where (last_updated>? or last_sync_time>?) and type=?;");
			$stmt_query->execute(array($last_sync_time,$last_sync_time,'delete'));
			$stmt_res=$stmt_query->fetchAll(PDO::FETCH_NUM);

			for($i=0;$i<count($stmt_res);$i++)
			{
				$xmlresponse.="<".$stmt_res[$i][0].">";
				$xmlresponse.=$stmt_res[$i][1];
				$xmlresponse.="</".$stmt_res[$i][0].">";
			}				
			$xmlresponse.="</re_xml>";
			header("Content-Type:text/xml");
			echo $xmlresponse;
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