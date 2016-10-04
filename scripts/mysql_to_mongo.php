<?php

/**
*	db=domainName
*/

	session_start();

	require_once '../Classes/vUtil.php';
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\vUtil;

	if(vUtil::isMasterSession())
	{
		$domain=$_GET['db'];
		$dbname = "re_user_".$domain;

		//connecting to mongo
		echo "Connecting to mongo.<br>";
		$mongoClient = new MongoDB\Driver\Manager("mongodb://localhost:27017");
		echo "Connected to mongo.<br>";


		//dropping mongo db if exists
		$dropCommand = new MongoDB\Driver\Command(['drop' => 1]);
		try{
			$dropResponse = $mongoClient->executeCommand($dbname,$dropCommand);
			if($dropResponse.ok)
			{
				echo "Existing mongo Db dropped.<br>";
			}
		}catch(Exception $e)
		{
			echo "No mongo Db exists.<br>";
		}

		//creating mongodb
		$mongoDb = $mongoClient->dbname;

		//getting mysql tables
		$info_conn=new db_connect('information_schema');
		$get_query="select table_name from information_schema.tables where table_schema=?";
		$get_array=array($dbname);
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute($get_array);
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

		$conn=new db_connect("re_user_".$domain);

		$num_records=1000;

		///iterating over tables
		foreach($get_res as $table)
		{
			$table_name=$table['table_name'];

			//creating mongo collection
			$mCollection = $mongoDb->createCollection($table_name);

			//counting the number of records to get
			$stmt_count=$conn->conn->prepare("select count(*) from $table_name;");
			$stmt_count->execute(array());
			$record_count =$stmt_count->fetch(PDO::FETCH_NUM)[0];
			$start_offset=0;

			//getting records from mysql table
			while($record_count>0)
			{
				$stmt=$conn->conn->prepare("select * from $table_name limit ?,?;");
				$stmt->execute(array($start_offset,$num_records));
				$stmt_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

				//writing data to mongo collection
				for($i=0;$i<count($stmt_res);$i++)
				{
					$json_array=array();
					foreach($stmt_res[$i] as $key => $value)
					{
						$json_array[$key]=$value;
					}
					$mCollection->insert($json_array);
				}

				$start_offset+=$num_records;
				$record_count-=$num_records;
			}

			echo "Migrated $table_name.<br>";
		}

		echo "Migration to Mongo completed successfully.<br>";
	}else{
		echo "You don't have permissions to perform this operation.";
	}
?>
