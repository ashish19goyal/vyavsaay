<?php

	$timestamp=round(1445667660555/1000);
	$date = new DateTime("@$timestamp");
	echo $date->format('Y-m-d H:i:s');
?>