<?php
$username='ashish';
$pass='ashish';
$salt=$username."1234567891234567891234";
$salt_22=substr($salt,0,22);
$pass_options=['salt'=> $salt_22];
$pass_hash=password_hash($pass,PASSWORD_DEFAULT,$pass_options);

echo $pass_hash;

?>