<?php

//include '../Classes/gettext.inc';
require_once '../Classes/gettext.inc';

$locale="hi_IN.utf8";
$directory="../locales/";
$domain="messages";
$encoding="UTF-8";

T_setlocale(LC_MESSAGES, $locale);
bindtextdomain($domain, $directory);

if (function_exists('bind_textdomain_codeset'))
	bind_textdomain_codeset($domain, $encoding);

textdomain($domain);

header("Content-type: text/html; charset=$encoding");

//echo T_("Hello");
echo _("Hello");
echo "</br>";
echo _("Retailing Essentials");

?>