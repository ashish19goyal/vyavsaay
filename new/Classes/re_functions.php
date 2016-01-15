<?php

namespace RetailingEssentials;

require_once 'gettext.inc';

class re_functions
{	
	private $directory="../locales/";
	private $domain="messages";
	private $encoding="UTF-8";

	public function change_locale($locale)
	{
		T_setlocale(LC_MESSAGES, $locale);
		T_bindtextdomain($this->domain, $this->directory);
		T_bind_textdomain_codeset($this->domain, $this->encoding);
		T_textdomain($this->domain);
	}

	public function re_session_start()
	{
		//$session_name = 're_session_id';   // Set a custom session name
	    //$secure = 'SECURE';
	    // This stops JavaScript being able to access the session id.
	    $httponly = true;
	    // Forces sessions to only use cookies.
	    if (ini_set('session.use_only_cookies', 1) === FALSE) {
	        header("Location: logout.php?err=Could not initiate a safe session (ini_set)");
	        exit();
	    }
	    // Gets current cookies params.
	    $cookieParams = session_get_cookie_params();
	    session_set_cookie_params($cookieParams["lifetime"],
	        $cookieParams["path"], 
	        $cookieParams["domain"], 
	        "",
	        $httponly);
	    // Sets the session name to the one set above.
	    //session_name($session_name);

	    session_start();            // Start the PHP session 
	    session_regenerate_id();    // regenerated the session, delete the old one. 
	}
}	
	
?>