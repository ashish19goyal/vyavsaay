<?php
	include "includes/header.php";
?>
<div id="r_register">
	<form id="register" action="register.php" method="post">
		<fieldset>
			<legend>Register</legend>
			<div id="failed_register"></div>
			User ID: <input type="text" name='r_id' id='r_id' autocomplete="on" autofocus="autofocus" onblur="userid_validation()"/><label id="userid_validation"></label></br>
			Email: <input type="email" name='r_email' id='r_email' autocomplete="on" onblur="emailid_validation()"><label id="emailid_validation"></label></br>
			Full Name: <input type="text" name='r_name' id='r_name' autocomplete="on"></br>
			Contact No: <input type="tel" name='r_phone' id='r_phone' autocomplete="on"></br>
			Password: <input type="password" name='r_pass1' id="r_pass1"></br>
			Retype Password: <input type="password" name='r_pass2' id="r_pass2" onkeyup="match_password()"><label id="password_match_validation"></label></br>
			Select your industry:<select id="r_industry">
									<option value="general" selected="selected">General Store</option>
									<option value="clothing">Clothing & Apparels</option>
									<option value="food">Bakery & food joints</option>
									<option value="restaurant">Restaurant</option>
									<option value="hotel">Hotel & Guest house</option>
									<option value="opticals">Opticals</option>
									<option value="lawyer">Lawyer or law firm</option>
									<option value="ca">CA or CA firm</option>
									<option value="events">Event Management (Marriages,Parties,Performances)</option>
								</select>
			</br>
			<input type="button" value='Submit' id='l_register' onclick="register_click()">
		</fieldset>
	</form>
</div>
<div id="r_complete"></div>

<?php 
	include "includes/footer.php";
?>