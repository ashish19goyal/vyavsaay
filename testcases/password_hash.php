<?php
$pass='password';
$salt="123456789123456789123456789";
$salt_22=substr($salt,0,22);
$pass_options=['salt'=> $salt_22];
$pass_hash=password_hash($pass,PASSWORD_DEFAULT,$pass_options);

echo $pass_hash;

?>
