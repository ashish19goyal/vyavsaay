<?php
	include "includes/header.php";
?>	

<!-- content section begins -->
<fieldset>
		<legend>Reset Password</legend>
		<form action="pass_reset.php" method="post">
			Login ID: <input type="text" id="l_id" autocomplete="on"/></br>
			Old Password: <input type="password" id="old_pass"></br>
			New Password: <input type="password" id="new_pass"></br>
			<input type="submit" id=l_submit>
		</form>
</fieldset>
<!-- content section ends -->

<?php	
	include "includes/footer.php";
?>