<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Crypto</title>
	</head>
	<body>
		<div>
			<?php include('../Classes/ccavenue/Crypto.php')?>
			<?php 
			
				$merchant_data='ashish';
				$working_key='EA256A49C184883BBB18457997D673F6';
				
				$encrypted_data=encrypt($merchant_data,$working_key); // Method for encrypting the data.				
				$rcvdString=decrypt($encrypted_data,$working_key);		//Crypto Decryption used as per the specified working key.

			?>
			
		</div>
	</body>
</html>