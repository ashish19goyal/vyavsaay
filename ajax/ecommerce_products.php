<?php
	
	//creating signature
	function createSignature($string,$secretkey){
		return base64_encode(hash_hmac("sha256",$string,$secretkey,true));
	}
	
	//printing search results
	function printAmazonResults($parsed_xml,$SearchIndex)
	{
		echo "<table>";
		$numOfItems=$parsed_xml->Items->TotalResults;
		if($numOfItems>0){
			foreach($parsed_xml->Items->Item as $current)
			{
				echo "<tr><td>";
				if (isset($current->ItemAttributes->Title)) {
					echo "Title: ".$current->ItemAttributes->Title;
					echo "</td><td>";
				}
				if(isset($current->ItemAttributes->Manufacturer)) {
					echo "Make: ".$current->ItemAttributes->Manufacturer;
					echo "</td><td>";
				}
				if(isset($current->MediumImage->URL)){
					echo "<img src='".$current->MediumImage->URL."'>";
					echo "</td><td>";
				}
				if(isset($current->OfferSummary->LowestNewPrice->FormattedPrice)){
					echo "Best Price: ".$current->OfferSummary->LowestNewPrice->FormattedPrice;
					echo "</td><td>";
				}
				if(isset($current->DetailPageURL)){
					echo "<a href='".$current->DetailPageURL."' target='_blank'>See on Amazon</a>";
					echo "</td>";
				}
				echo "</tr>";
			}
		}
		echo "</table>";
	}

	function AmazonItemSearch($SearchIndex, $Keywords)
	{	
		///constant credential
		$access_key = "AKIAIVQY7BSVNB65W7JQ";
		$associateTag = "vyavsaaycom-21";
		$secretkey = "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";
		$operation = "AWSECommerceService";
		
		//Set the values for some of the parameters
		$Operation = "ItemSearch";
		$ResponseGroup = "Small,OfferSummary,Images";
		$timestamp = gmdate("Y-m-d\TH:i:s\Z");
		//$timestamp="2014-11-08T12:19:26.000Z";
		
		$APIcall=
		"AWSAccessKeyId=$access_key&".
		"AssociateTag=$associateTag&".
		"Keywords=$Keywords&".
		"Operation=ItemSearch&".
		"ResponseGroup=$ResponseGroup&".
		"SearchIndex=Books&".
		"Service=AWSECommerceService&".
		"Timestamp=$timestamp&".
		"Version=2009-03-31";
		
		$APIcall=str_replace(array(' ', '+', ',', ':'), array('%20', '%20', urlencode(','), urlencode(':')), $APIcall);
		//$APIcall=urlencode($APIcall);
		
		$string_signature="GET\necs.amazonaws.in\n/onca/xml\n".$APIcall;
				
		$signature=createSignature($string_signature,$secretkey);
		$signature=urlencode($signature);
		
		$APIcall="http://ecs.amazonaws.in/onca/xml?".
				$APIcall.
				"&Signature=".$signature;
		
		$response=file_get_contents($APIcall);
		$parsed_xml=simplexml_load_string($response);
		printAmazonResults($parsed_xml,$SearchIndex);
	}
	
	function flipkartItemSearch()
	{
		$apiToken="5e82f1a8d787481e9a67e55eacd1c681";
	}
	
	//AmazonItemSearch("Books","harry+potter");
	
?>
