<?php
	include "includes/header.php";
?>

<form action="index.php" method="post">
	<fieldset>
		<legend>Login</legend>
		<div id="failed_auth"></div>
		Login ID: <input type="text" name='l_id' id="l_id" autocomplete="on" autofocus="autofocus"/></br>
		Password: <input type="password" name='l_pass' id="l_pass" onkeydown="if (event.keyCode==13) login_action();"></br>
		Remember me: <input type="checkbox" name='l_remember' id="l_remember"></br>
		<a href="pass_reset.php">Forgot password?</a> | <a href="register.php">New User</a></br>
		<input type="button" value='Submit' id='l_submit' onclick="login_action();">
	</fieldset>
</form>


<?php 
	include "includes/footer.php";
?>