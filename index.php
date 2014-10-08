<?php
	include "includes/header.php";
?>

<div id="failed_auth"></div>
<form id='login'>
	<fieldset>
		<legend>Login</legend>
		Login ID: <input type="text" autocomplete="on" autofocus="autofocus" required></br>
		Password: <input type="password" required></br>
		<a href="pass_reset.php">Forgot password?</a> | <a href="register.php">New User</a></br>
		<input type="submit" value='Submit'>
	</fieldset>
</form>
<script>
		$('#login').on('submit',function(event)
		{
			event.preventDefault();
			login_action();
		});
</script>
<?php 
	include "includes/footer.php";
?>