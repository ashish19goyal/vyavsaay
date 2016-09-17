<?php

/**
*
**/

	session_start();

	include_once '../Classes/config.php';
	include_once '../Classes/db.php';
	require_once '../Classes/vUtil.php';
	use RetailingEssentials\vUtil;
	use RetailingEssentials\db_connect;
	use RetailingEssentials\config;
	use \PDO;

	if(vUtil::isMasterSession())
	{
		$config = config::getInstance();
		$dbhost = $config->get("host");
		$dbuser = $config->get("user");
		$dbpass = $config->get("password");

		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);
		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];
			transform_deduplication($dbname);
		}
	}
	else
	{
		echo "You don't have permissions to perform this operation";
	}

	function transform_deduplication($dbname)
	{
		$time=time()*1000;
		$dbconn=new db_connect($dbname);
		$select_query="select * from de_duplication_ref";
		$select_stmt=$dbconn->conn->prepare($select_query);
		$select_stmt->execute(array());
		$select_res=$select_stmt->fetchAll(PDO::FETCH_ASSOC);

		$delete_query="delete from de_duplication_ref";
		$delete_stmt=$dbconn->conn->prepare($delete_query);
		$delete_stmt->execute();

		$insert_query="insert into de_duplication_ref (object,tablename,keycolumn,ref_table,ref_field,action,last_updated) value(?,?,?,?,?,?,?);";
		$insert_stmt=$dbconn->conn->prepare($insert_query);
		foreach($select_res as $key => $result)
		{
			$references_array=explode(';',$result['references_value']);
			if(is_array($references_array))
			{
				foreach($references_array as $ref)
				{
					$action="update";
					if(isset($refArray[2]))
					{
						$action=$refArray[2];
					}
					$refArray=explode('--',$ref);
					$insert_data=array(
							$result['object'],
							$result['tablename'],
							$result['keycolumn'],
							$refArray[0],
							$refArray[1],
							$action,
							$time
					);
					$insert_stmt->execute($insert_data);
				}
			}
		}
	}
?>
