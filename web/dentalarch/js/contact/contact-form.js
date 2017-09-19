$(function(){
	$("#ContactForm").submit(function(event)
	{
		event.preventDefault();

		$("#submitf").attr('disabled','disabled');

		var contact_form=document.getElementById('ContactForm');
		var name = contact_form.elements['name'].value;
		var phone = contact_form.elements['phone'].value;
		var email = contact_form.elements['email'].value;
		var day = contact_form.elements['day'].value;
		var time = contact_form.elements['time'].value;
		console.log('booking appointment');
		$.ajax(
		{
			type:'POST',
			url:'https://vyavsaay.com/ajax/mailer.php',
			// url:'http://localhost/ajax/mailer.php',
			data:
			{
				'user':'dentalarch',
				'key':'vyavsaay-mailservice-20161110',
	    		'message':
	    		{
					'from_name':'DentalArch',
			      	'from_email': 'contact@dentalarch.in',
					'to_name':name,
			      	'to': email,
			      	'subject': 'DentalArch received you request',
			      	'html': '<b>Dear Sir/ Mam</b><br/><br/><br/>Thank you for getting in touch with us. We appreciate your time.<br/>We have received your appointment request. Our team member will get back to you, in case the appointment slot is not available.<br/><br/><b>Booked Slot: '+day+' - '+time+'</b><br/><br/>We hope to see you soon.<br/><br/><br/>Thanks and Regards<br/>Dental Arch Gurgaon'
				}
			},
			success:function(return_data,return_status,e)
			{
				var response=JSON.parse(e.responseText);
				if(response.status=='success'){
					$("#message_post").html("<div class='successMessage'>Your appointment request has been received!</div>");
				}else{
					$("#message_post").html("<div class='successMessage'>An error occured. Please try again.</div>");
				}
				$("#submitf").removeAttr('disabled');
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
				// $("#message_post").html("<div class='successMessage'>An error occured. Please try again.</div>");
				$("#message_post").html("<div class='successMessage'>Your appointment request has been received!</div>");
				console.log(xhr);
				$("#submitf").removeAttr('disabled');
			}
		});

		$.ajax(
		{
			type:'POST',
			url:'https://vyavsaay.com/ajax/mailer.php',
			// url:'http://localhost/ajax/mailer.php',
			data:
			{
				'user':'dentalarch',
				'key':'vyavsaay-mailservice-20161110',
				'message':
	    		{
					'user':'dentalarch',
					'from_name':name,
					'from_email': email,
					'to_name':'DentalArch',
			      	'to':'contact@dentalarch.in',
					//  	'to':'info@vyavsaay.com',
			      	'subject': 'Appointment Request: '+day+' - '+time,
			      	'html': 'Appointment request from : '+name+'<br>Phone: '+phone+'<br>Email: '+email+'<br>Time Slot: '+day+'-'+time
				}
			}
		});
	});
});
