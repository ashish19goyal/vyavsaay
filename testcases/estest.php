<?php

	include "../Classes/vElastic.php";
	use RetailingEssentials\vElastic;

	$vES = vElastic::getInstance("beacon");
	// $vES->setup();
	// $document = [
	// 	'id' => '12344',
	// 	'title' => 'second doc',
	// 	'link' => 'master',
	// 	'data' => 'this document is for testing only {a:b}',
	// 	'description' => 'wonderful'
	// ];
	// $vES->addToSearch($document);

	$query = array(
		'match' => [
                'data' => 'testing'
            ]
	);
	$response = $vES->search($query);
	print_r($response);
?>
