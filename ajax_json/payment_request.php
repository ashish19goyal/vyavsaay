<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Vyavsaay ERP - Payment</title>
	</head>
	<body>
		<div>
			<?php include('../Classes/ccavenue/Crypto.php')?>
			<?php 
			
				error_reporting(0);
				
				$merchant_data='merchant_id=84158&';
				$working_key='EA256A49C184883BBB18457997D673F6';
				$access_code='AVHG07CK73CL42GHLC';

				foreach ($_POST as $key => $value){
					$merchant_data.=$key.'='.$value.'&';
				}
				//echo $merchant_data;
				//echo $working_key;

				$encrypted_data=encrypt($merchant_data,$working_key); // Method for encrypting the data.				
			?>
			
			<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
				<?php
				echo "<input type='hidden' name='encRequest' value='$encrypted_data'>";
				echo "<input type='hidden' name='access_code' value='$access_code'>";
				?>
			</form>
		</div>

		<div>Redirecting....</div>
		<script language='javascript'>document.redirect.submit();</script>
	</body>
</html>