<?php
	
	$keywords=$_POST['keywords'];
	$keywords=str_replace(' ','+',$keywords);
	
	$max_results=$_POST['max_results'];
	$user_id="UA-fac8d2fc4c87ae024da0c4b744a2027f";
	
	$json = file_get_contents("http://api-v1-dotmic.in/?search=$keywords&start-index=0&max-results=$max_results&ua=$user_id",0,null,null);
	$json_output = json_decode($json,true);
	
	$xmlresponse="<data>";
	foreach($json_output as $data)
	{
		$title=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['title']);
		$description=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['description']);
		$price=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['price']);
		$image=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['image']);
		$link=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['link']);
		$store=str_replace(array('\n','\r','\t','&','  '),array(' ',' ',' ','&amp;',' '),$data['store']);
		
		$xmlresponse.="<row>";
			$xmlresponse.="<title>".$title."</title>";
			$xmlresponse.="<description>".$description."</description>";
			$xmlresponse.="<image>".$image."</image>";
			$xmlresponse.="<price>".$price."</price>";
			$xmlresponse.="<link>".$link."</link>";
			$xmlresponse.="<store>".$store."</store>";
		$xmlresponse.="</row>";
	}	
	$xmlresponse.="</data>";
	header("Content-Type:text/xml");
	echo $xmlresponse;
?>
