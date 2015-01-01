<?php
	include "includes/index_header.php";
?>
		
	    <!---/start-contact----->
	    <div class="contact" id="contact">
	      	<div class="container">
	      		  <h3>CONTACT</h3>
      			  <div class="gallery-head text-center">
       			  </div>
       			
      			  <div class="contact-form">
		  	        <form id='index_contact'>
			    	    <p class="comment-form-author"><label>Name</label>
			    	    	<input type="text" name='userName' required class="textbox" placeholder="Enter your name...">
				    	</p>
				        <p class="comment-form-author"><label>Email</label>
				     	   <input type="email" name='userEmail' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Phone</label>
				     	   <input type="tel" name='userPhone' class="textbox" placeholder="Enter your email...">
				        </p>
				        <p class="comment-form-author"><label>Message</label>
				    	  <textarea name='userMsg' placeholder='Enter your message...'></textarea>
				        </p>
				        <input type="submit" value="Submit">
			        </form>
		          </div>
		          <div class="Demo-text"><p id="contact_complete"></p></div>
	      	</div>
		</div>

		<script>
			$('#index_contact').on('submit',function(event)
			{
				event.preventDefault();
				contact_click();
			});
		</script>
	</body>
</html>