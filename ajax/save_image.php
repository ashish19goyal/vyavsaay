<?php

	session_start();
	
	if(isset($_POST["blob"]) && !empty($_POST["blob"]) )
	{
	    // get the image data
	    $blob=$_POST['blob'];
		$name=$_POST['name'];	
	
	    // remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		
		// decode the image data and save it to file
		file_put_contents('../'. $name, base64_decode($uri));
	}
?>	