<?php

	require_once '../ajax/mandrill/src/Mandrill.php';
	$api_key='Ub0h4w5NVLE6GdyXrYFlZw';

	try
	{
		$mandrill = new Mandrill($api_key);

		$message = array(
	        'html' => '<p>hi name, Example HTML content</p>',
	        'text' => 'hi name, Example text content',
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
	        'important' => false,
	        'track_opens' => null,
	        'track_clicks' => null,
	        'auto_text' => null,
	        'auto_html' => null,
	        'inline_css' => null,
	        'url_strip_qs' => null,
	        'preserve_recipients' => null,
	        'view_content_link' => null,
	        'tracking_domain' => null,
	        'signing_domain' => null,
	        'return_path_domain' => null,
	        'merge' => true,
	        'merge_language' => 'mailchimp',
	        'global_merge_vars' => array(
	            array(
	                'name' => 'merge1',
	                'content' => 'merge1 content'
	            )
	        ),
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
	        'tags' => array('password-resets'),
	        'subaccount' => 'customer-123',
	        'google_analytics_domains' => array('example.com'),
	        'google_analytics_campaign' => 'message.from_email@example.com',
	        'metadata' => array('website' => 'www.example.com'),
	        'recipient_metadata' => array(
	            array(
	                'rcpt' => 'recipient.email@example.com',
	                'values' => array('user_id' => 123456)
	            )
	        ),
	        'attachments' => array(
	            array(
	                'type' => 'text/plain',
	                'name' => 'myfile.txt',
	                'content' => 'ZXhhbXBsZSBmaWxl'
	            )
	        ),
	        'images' => array(
	            array(
	                'type' => 'image/png',
	                'name' => 'IMAGECID',
	                'content' => 'ZXhhbXBsZSBmaWxl'
	            )
	        )
	    );
	    $async = false;
	    $ip_pool = 'Main Pool';
	    $send_at = 'example send_at';
	    $result = $mandrill->messages->send($message);
	    print_r($result);
	} 
	catch(Mandrill_Error $e) 
	{
    	echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
    	throw $e;
	}
?>