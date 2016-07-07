<?php

	include_once "../../Classes/S3.php";
	include_once '../../Classes/config.php';
	include_once "../../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\config;

	$pass=$_GET['p'];

	if($pass=='vya')
	{
		$config = config::getInstance();
		$dbhost = $config->get("host");
		$dbuser = $config->get("user");
		$dbpass = $config->get("password");
		$awsAccessKey=$config->get("backupAwsAccessKey");
		$awsSecretKey=$config->get("backupAwsSecretKey");

		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

		$bucketName="vyavsaay-backup";
		$mime = "application/octet-stream";

		//$awsAccessKey="AKIAIUMY6WOBUJW3JR4A";
		//$awsSecretKey='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';


		$s3 = new S3($awsAccessKey, $awsSecretKey);

		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];

			$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname";

			$backup_command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname > dummy/$dbname.sql";
            exec($backup_command);

            $split_command = "split -d -b 10m dummy/$dbname.sql dummy/$dbname";
            exec($split_command);

            $delete_command = "rm dummy/$dbname.sql";
            exec($delete_command);

            $files=scandir('dummy');
            foreach($files as $file)
            {
                if(preg_match("/".$dbname."/",$file))
                {
                    $file_data = file_get_contents("dummy/".$file);
                    if($s3->putObject($file_data,$bucketName,time()."_".$file,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $mime)))
                    {
                        echo "backed up ".$file;
                    }
                    $file_delete_command = "rm dummy/$file";
                    exec($file_delete_command);
                }
            }
		}
	}
	else
	{
		echo "Invalid session";
	}
?>
