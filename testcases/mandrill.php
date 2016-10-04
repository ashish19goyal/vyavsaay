<?php

	require_once '../Classes/mandrill/src/Mandrill.php';
	$api_key='Ub0h4w5NVLE6GdyXrYFlZw';

	try
	{
		$mandrill = new Mandrill($api_key);

		$message = array(
	        'html' => '<p>hi name, Example HTML content</p>',
	        'subject' => 'example subject',
	        'from_email' => 'info@vyavsaay.com',
	        'from_name' => 'Vyavsaay',
	        'to' => array(
	            array(
	                'email' => 'ashish.19goyal@gmail.com',
	                'name' => 'Ashish Goyal',
	                'type' => 'to'
	            )
	        ),
	        'headers' => array('Reply-To' => 'info@vyavsaay.com'),
	        'preserve_recipients' => false,
	        'merge' => true,
	        'merge_language' => 'mailchimp',
	        'merge_vars' => array(
	            array(
	                'rcpt' => 'ashish.19goyal@gmail.com',
	                'vars' => array(
	                    array(
	                        'name' => 'Ashish',
	                        'content' => 'merge2 content'
	                    )
	                )
	            )
	        ),
	        'attachments' => array(
	            array(
	                'type' => 'text/plain',
	                'name' => 'myfile.txt',
	                'content' => 'ZXhhbXBsZSBmaWxl'
	            )
	        )
	    );
	    $result = $mandrill->messages->send($message);
	    print_r($result);
	} 
	catch(Mandrill_Error $e) 
	{
    	echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
    	throw $e;
	}
?>