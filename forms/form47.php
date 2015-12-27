<div id='form47' class='function_detail'>
	<form id='form47_master' autocomplete="off">
		<fieldset>
				<label>Current Password: <input type="password"></label><br>
				<label>New Password: <input type="password"></label><br>
				<label>Retype Password: <input type="password" onkeydown="form47_verify_password($(this));"></label>
				<br><label class="form47_verify"></label><br>
				<label><input type="button" title="Save" class='save_icon' onclick="form47_update_form();" disabled='true'></label>
		</fieldset>
	</form>
	<script>
		function form47_verify_password(button)
		{
			//console.log("verifying pass");
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var pass1=form.elements[2].value;
			var pass2=form.elements[3].value;
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