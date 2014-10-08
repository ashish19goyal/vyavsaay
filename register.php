<?php
	include "includes/header.php";
?>
<div id="r_register">
<div id="failed_register"></div>
	<form id="registeration">
		<fieldset>
			<legend>Register</legend>
			User ID: <input type="text" autocomplete="on" autofocus="autofocus" onblur="userid_validation()" required><label id="userid_validation"></label></br>
			Email: <input type="email" autocomplete="on" onblur="emailid_validation()" required><label id="emailid_validation"></label></br>
			Full Name: <input type="text" autocomplete="on" required></br>
			Contact No: <input type="tel" autocomplete="on" required></br>
			Password: <input type="password" required></br>
			Retype Password: <input type="password" onkeyup="match_password()" required><label id="password_match_validation"></label></br>
			Select your industry:<select id="r_industry" required>
									<option value="general" selected="selected">General Store</option>
									<option value="clothing">Clothing & Apparels</option>
									<option value="pharmacy">Pharmacy (medicine store)</option>
									<option value="clinic">Nursing Home & clinics</option>
									<option value="food">Bakery & food joints</option>
									<option value="restaurant">Restaurant</option>
									<option value="hotel">Hotel & Guest house</option>
									<option value="opticals">Opticals</option>
									<option value="lawyer">Lawyer or law firm</option>
									<option value="ca">CA or CA firm</option>
									<option value="events">Event Management (Marriages,Parties,Performances)</option>
								</select>
			</br>
			<input type="submit" value='Submit'>
		</fieldset>
	</form>
</div>
<div id="r_complete"></div>
<script>
	$('#registeration').on('submit',function(event)
	{
		event.preventDefault();
		register_click();
	});
</script>
<?php 
	include "includes/footer.php";
?>