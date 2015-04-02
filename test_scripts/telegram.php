<?php


	$message_string="hello ignore this message";
	echo $message_string;
			
	$pipe_desc = array(
			0 => array('pipe', 'r'), // 0 is STDIN for process
			1 => array('pipe', 'w'), // 1 is STDOUT for process
	);
	$command="/home/ashish/Dropbox/vyavsaay/workspace/Code/telegram/tg/bin/telegram-cli -W";
	
	$to='pradeep_yadav';
	$name = 'pradeep_yadav';

	$p=proc_open($command,$pipe_desc,$pipes);
	
	//stream_set_blocking($pipes[1], 0);
	//stream_set_blocking($pipes[0], 0);
	//stream_set_blocking(STDIN, 0);
	
	$output=stream_get_contents($pipes[1]);
	echo $output;
	//echo "\nfirst output ends here\n";
	fwrite($pipes[0],'msg '.$to.' '.$message_string);
	//fwrite($pipes[0],"dialog_list");
	fclose($pipes[0]);
	$output1=stream_get_contents($pipes[1]);
	echo $output1;
	fclose($pipes[1]);
	proc_close($p);
	echo "\n done";
?>