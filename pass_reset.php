<?php
	include "includes/index_header.php";
?>	

		<div class="contact">
	      	<div class="container">
	      		  <h3>Password Reset</h3>
      			  <div class="contact-form">
		  	        <form id='index_reset'>
			    	    <p class="comment-form-author"><label>UserName</label>
			    	    	<input type="text" name='userName' required class="textbox" placeholder="Enter UserName...">
				    	</p>
				        <p class="comment-form-author"><label>Email</label>
				     	   <input type="email" name='userEmail' class="textbox" placeholder="Enter your registered email...">
				        </p>
				        <input type="submit" value="Submit">
			        </form>
		          </div>
		          <div class="Demo-text"><p id="reset_complete"></p></div>
	      	</div>
		</div>

		<script>
			$('#index_reset').on('submit',function(event)
			{
				event.preventDefault();
				reset_click();
			});


			function reset_click()
			{
				var form=document.getElementById('index_reset');

				var username=form.elements[0].value;
				var email=form.elements[1].value;
				
				show_loader();
				var post_data="userName="+username+
								"&userEmail="+email;
				
				ajax_with_custom_func("./ajax/pass_reset.php",post_data,function(e)
				{
					if(e.responseText=='failed')
					{
						document.getElementById("reset_complete").innerHTML="Couldn't reset your password. ";
					}
					else
					{
						$("#index_reset").slideUp();
						document.getElementById("reset_complete").innerHTML="We have sent a you a mail with updated password information. Please check your mailbox.";	
					}
					hide_loader();
					console.log(e.responseText);
				});
			}
			
		</script>
</body>
</html>