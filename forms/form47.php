<div class='forms'><b>Change Password</b>
	<form id='form47_master'>
		<fieldset>
				Current Password: <input type="password" form='form47_master'/></br>
				New Password: <input type="password" form='form47_master'></br>
				Retype Password: <input type="password" form='form47_master' onkeyup="form47_verify_password($(this))">
				</br><label class="form47_verify"></label></br>
				<input type="button" value="Save" onclick="form47_save_form($(this))" form='form47_master' disabled='true'>
		</fieldset>
	</form>
	<script>
		function form47_verify_password(button)
		{
			console.log("verifying pass");
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var pass1=form.elements[2].value;
			var pass2=form.elements[3].value;
			console.log(pass1+" "+pass2);
			if(pass1==pass2)
			{
				$(form).find('.form47_verify').html('Match!');
				form.elements[4].disabled=false;
			}
			else
			{
				$(form).find('.form47_verify').html('Passwords do not match!');				
			}
		}
	</script>
</div>