<?php
namespace RetailingEssentials;


/**
 * This class is used to handle the mailing operations based on analytics
 * @author ashish
 * @version june 2014
 *
 */
class mailer
{
	public $header;
	public $footer;
	public $from;
	public static $mail_config_file; 
	public $priority;

	
	function __construct()
	{}
	
	function __destruct()
	{}
	
	function num_mail_queued()
	{}
		
	function enqeue_mails()
	{}
	
	function send_mails_from_queue()
	{}
	
}