<?php

//    input format:
//            {type:'create/update/delete',
//              bucket:bucketName,
//              blob: blob,
//              name:blob_name,
//              content_type:'image/jpeg'};
//    output format:
//            {
//                status:'created/updated/deleted'
//            }


	include_once "../Classes/s3_objects.php";
    use RetailingEssentials\s3_object;

	session_start();

	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$read_access=$_POST['re'];
	$create_access=$_POST['cr'];
	$delete_access=$_POST['del'];
	$input_data=$_POST['object_data'];
	$input_object=json_decode($input_data,true);

    $type= isset($input_object['type']) ? $input_object['type'] : "";
	$bucket= isset($input_object['bucket']) ? $input_object['bucket'] : "";
	$blob= isset($input_object['blob']) ? $input_object['blob'] : "";
	$name= isset($input_object['name']) ? $input_object['name'] : "";
	$contentType= isset($input_object['content_type']) ? $input_object['content_type'] : "";
	$description= isset($input_object['description']) ? $input_object['description'] : "";

    $response_object=[];

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access && $_SESSION['cr']==$create_access && $_SESSION['del']==$delete_access)
		{
            $s3=new s3_object($domain,$bucket);

			if($type=='create')
			{
                $s3->create_object($blob,$name,$contentType,$description);
                $response_object['status']='created';
			}
            else if($type=='update')
			{
				$s3->update_object($blob,$name,$contentType,$description);
                $response_object['status']='updated';
			}
			else if($type=='delete')
			{
				$s3->delete_object($name);
                $response_object['status']='deleted';
			}
		}
		else
		{
			$response_object['status']='Invalid session';
		}
	}
	else
	{
		$response_object['status']='Invalid session';
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
