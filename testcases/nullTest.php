<?php

	include_once '../Classes/vUtil.php';
	use RetailingEssentials\vUtil;

	$arr = [];
	$arr['a'] = 'a';

	try{
		$b = isset($arr['b']) ? $arr['b'] : 'b';
	}
	catch(Exception $ex)
	{
		print_r($ex);
	}

	echo $b;

?>
