<?php
	include "includes/index_header.php";
?>

	
					<!-- share box -->
		<div id="share_box" data-url="http://vyavsaay.com" data-text="Latest technology for your business" title='Share'>
			<div class="box">
				<div class="count"><img src='./images/share.png' style='width:40px;height:40px'></div>
				<div class="share">share</div>
			</div>
			<div class="social_buttons">
				<div class="button">
					<a href='https://www.google.com/+Vyavsaayindia' target='_blank'>
						<img src='./images/google.png' title="+1">
					</a>
					<a href="https://plus.google.com/share?url=http%3A%2F%2Fvyavsaay.com" target='_blank'>Share</a>
				</div>
				<div class="button">
					<a href="https://twitter.com/VyavsaayIndia" target='_blank'><img src='./images/twitter.jpeg' title="Follow @VyavsaayIndia"></a>
					 <!-- <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://vyavsaay.com" data-text="Latest technology for your business" data-via="ashish_18goyal" data-count="horizontal">Tweet</a> -->
					<a href="https://twitter.com/intent/tweet?text=Latest%20technology%20for%20your%20business&url=http%3A%2F%2Fvyavsaay.com&via=ashish_18goyal" target='_blank'>Tweet</a>
				</div>
				<div class="button">
					<a href="https://www.facebook.com/vyavsaayindia" target='_blank'><img src='./images/fb.png' title="Like"></a>
					<!-- <div class="fb-share-button" data-href="http://vyavsaay.com" data-layout="button"></div> -->
					<a href="http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fvyavsaay.com&t=Latest%20technology%20for%20your%20business" target='_blank'>Share</a>
				</div>
				<div class="button">
					<div onclick='modal34_action();'>
						<img src='./images/whatsapp.jpeg' title="Connect">
						<div>Connect</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="modal_forms">
			<div id="modal34" title="Subscribe to Vyavsaay on whatsapp">
				<form id='modal34_form'>
					<fieldset>
						<label>Name<input type="text"></label></br>
						<label>Contact Number<input type="number" required></label></br>
						<input type="submit" value="Subscribe">
					</fieldset>
				</form>
			</div>
		</div>
		
		<!-- end share box -->
		
 		<script>
			!function()
			{
				$("#modal34").dialog({
			   		autoOpen: false,
			   		width: 300,
			   		modal: true,
			   		show: "slide",
			   		closeOnEscape: true,
				});
			}();	

			function modal34_action()
			{
				var form=document.getElementById("modal34_form");
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					var name=form.elements[1].value;
					var contact=form.elements[2].value;
					var post_data="name="+name+"&contact="+contact;
					
					ajax_with_custom_func("./ajax/whatsapp.php",post_data,function(e)
					{
						console.log(e.responseText);
						$("#modal34").dialog("close");
					});		
				});
				$("#modal34").dialog("open");
			}
						
			/////display social media buttons
		    $('#share_box').on('click',function(event)
		   	{
			   	$(this).find('.social_buttons').show();
			});
		    $('#share_box').on('mouseleave',function(event)
	    	{
	    	   	$(this).find('.social_buttons').hide();
	    	});
			
	</script>
			

 		<!----- banner ---->
			<div class="banner">
					<div class="banner-info" itemscope itemtype="http://schema.org/Organization">
						<div itemprop='logo' class="col-md-6 appp">
							 <img src="images/mbl-app.png" alt="">
						</div>
						<div class="col-md-6 banner-text">
							<h1 itemprop='name'>Vyavsaay</h1>
							<p itemprop='description'><b>Vyavsaay provides latest technology solutions for your business, on a cloud based platform.</b></p>
						</div>
					</div>
			</div>
			<!----- banner ---->
			
			<!----- /start-About---->
			<div id="about" class="about">
	       		<div class="container">
	       		   <div class="gallery-head text-center" >
					  <h3>ABOUT</h3>
					  <p>Vyavsaay is an India based company that provides industry standard as well as customizable automation solutions for your business. It is well suited for small and medium enterprises that don't want to spend a lot of money in setting up and managing their own IT infrastructure.</p>
					 <p>Vyavsaay provides solutions around Billing, Inventory management, Accounting, Project management, Task force management and Customer Relationship Management (CRM).</p>
				    </div>
	       			<div class="row text-center">
	       				<div class="col-md-4 about_grid screenshots">
	       					 <img src="images/Screen1.jpeg" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid screenshots">
	       					<img src="images/Screen2.jpeg" alt="">
	       				</div>
	       				<div class="col-md-4 about_grid screenshots">
	       					<img src="images/Screen3.jpeg" alt="">
	       				</div>
	       				<div class="clearfix"> </div>
	       			</div>
	       		</div>
	       	</div>
	  <!---//End-About----->
	 	<!----- /strat-Reviews---->
			<div id="reviews" class="Reviews">
	       		<div class="container">
	       		   <div class="review-head text-center">
					  <h3>Reviews</h3>
				    </div>
	       			<div class="row revies-content text-center">
	       				<div class="review_grid" itemscope itemtype="http://schema.org/Review">
		       				<div class="col-md-4 review-img1">
		       					 <img src="images/sou.jpeg" alt="">
		       				</div>
		       				<div class="col-md-8 review-text">
		       					<p itemprop='description'>"Vyavsaay is very user friendly. Anybody can use it with ease. It took us only a few hours to setup and get started with Vyavsaay."</p>
		       					<span itemprop='author'>Business Owner,<br>Professional Services Industry</span>
		       				</div>
		       				<div class="clearfix"> </div>
		       			</div>
	       				<div class="review_grid" itemscope itemtype="http://schema.org/Review">
		       				<div class="col-md-4 review-img2">
		       					 <img src="images/nishu.jpeg" alt="" class='review_picture_rotate'>
		       				</div>
		       				<div class="col-md-8 review-text">
		       					<p itemprop='description'>"Now we can manage all our process with just one platform. We don't need to use multiple desktop and mobile solutions and worry about moving data between them."</p>
		       					<span itemprop='author'>Business owner,<br>HealthCare Industry</span>
		       				</div>
		       				<div class="clearfix"> </div>
		       			</div>
	       			</div>
	       			
	       			<div class="clearfix"> </div>
	       		</div>
	       	</div>
	  <!---//End-Reviews----->
<!----- /start-demo---->
		<div id="pricing" class="demo">
       		<div style='height:50px;'></div>
       		<div class="container">
       		   	<div class="demo-head text-center">
				  <h3>Pricing</h3>
			    </div>
			    <div style='height:50px;'></div>
       			<div class="pricing_grids">
       					<div class="Demo-text pricing_grid" itemscope itemtype="http://schema.org/Service">
	       					<p style='text-align:center;' itemprop='name'><b>Basic Plan</b></p>
	       					Single User</br></br>
	       					Covers industry-wise standard business processes</br></br>
	       					Free 30 day trial
	       					<p itemprop='description' style='position:absolute;bottom:0;text-align:center;'><b>Rs. 500/month</b></p>
	       				</div>
	       				<div class="Demo-text pricing_grid" itemscope itemtype="http://schema.org/Service">
	       					<p style='text-align:center;' itemprop='name'><b>Premium Plan</b></p>
	       					Single User</br></br>
	       					Advanced analytical features</br></br>
	       					Customizations</br></br>
	       					Free 30 day trial
	       					<p itemprop='description' style='position:absolute;bottom:0;text-align:center;'><b>Rs. 1000/month</b></p>
	       				</div>
	       				<div class="Demo-text pricing_grid" itemscope itemtype="http://schema.org/Service">
	       					<p style='text-align:center;' itemprop='name'><b>Multi-User</b></p>
	       					Multiple Users</br></br>
	       					Advanced analytical features</br></br>
	       					Customizations</br></br>
	       					Free 30 day trial
	       					<p itemprop='description' style='position:absolute;bottom:0;text-align:center;'><b>Rs. 2000/month</b></p>
	       				</div>
	       				<div class="Demo-text pricing_grid" itemscope itemtype="http://schema.org/Service">
	       					<p style='text-align:center;' itemprop='name'><b>Enterprise Level</b></p>
	       					Customized solutions for medium sized enterprises with specific business requirements.</br></br>
	       					Maintenance and updates inclusive.
	       					<p itemprop='description' style='position:absolute;bottom:0;text-align:center;'><b><a href="#contact">Ask for a quote</a></b></p>
	       				</div>
       			</div>
       			<div style='height:100px;'></div>
       		</div>
		</div>
	  <!---//End-Reviews----->
	<a href="#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>

	</body>
</html>