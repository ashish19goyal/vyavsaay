<?php include_once("conf/loadconfig.inc.php"); 
extract($_POST);
extract($_GET);

global $db;


?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Shipment Tracking</title>
    
    <link href="api.css" rel="stylesheet" type="text/css">
</head>
<body>
    <!--<header>
        <nav class="main_menu">
                <ul>
                    <li><a href="index.html" class="menu_item">Home</a></li>
                    <li><a href="about-us.html" class="menu_item">About Us</a></li>
                    <li><a href="index.html#contact" class="menu_item">Contact Us</a></li>
                </ul>
            </nav>
        
        <img class=logo src="images/7horses-crop-u3509.png" />
        
        
    </header>-->
    <?php include('includes/header.php'); 
    ?>
    <div class="banner">
    <div class="banner_text">TRACK YOUR ORDER</div>
    <img class="hero_banner" src="images/about us.jpg">
    </div>
    
    
	<form method="post" action="#">
		<input class="tracktext" type='text' name='awb_num' id='awb_num' placeholder="Enter AWB Number" title='For tracking multiple AWB numbers, separate using comma (,)'>
		  <input type="submit" name="Submit" value="Submit" >
	</form>
	<div class="order_details" id="result">       
	</div>
    
      <?php 
   if((isset($_POST['Submit'])&& $_POST['Submit'] == 'Submit') || isset($_GET['awbNo']))
   {

	 $startDate;
	 $endDate;
	 //$_POST['awb_num'];

	$awb_num="";	
	if(isset($_GET['awbNo']))
	{
		$awb_num=$_GET['awbNo'];
	}
	else 
	{
		//$awb_num='81693'; //$_POST['awb_num'];
		$awb_num=$_POST['awb_num'];
	}	
	$data_object=[];
	$data_object['api_key']="becontent15082015";
	$data_object['username']="becontent";
	$data_object['data_store']="logistics_orders";
	//$data_object['count']="1";
	$data_object['start_index']="0";
	$data_object['indexes']=[];
	$data_object['indexes'][0]=[];
	$data_object['indexes'][0]['index']='awb_num';
	$data_object['indexes'][0]['value']=$awb_num;
	$data_object['indexes'][0]['array']='yes';

    $data_string="data=".json_encode($data_object);
	
	//$url="localhost/api/get_data.php";
	$url="https://vyavsaay.com/api/get_data.php";

	$ch=curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
   curl_setopt($ch,CURLOPT_POST,1);
   curl_setopt($ch,CURLOPT_POSTFIELDS,$data_string);
   curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_VERBOSE,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
	//$verbose = fopen('php://temp', 'w+');
	//curl_setopt($ch, CURLOPT_STDERR, $verbose);
	$result = curl_exec($ch);
	curl_close($ch);
	
	if($result===false) 
	{
	  	die("Curl failed");
	}
	else 
	{
		
		  $result;
		
		 $data = json_decode($result);
		//print_r($data);
		$rows = $data->rows;
	?>

    <div class="col-sm-6 tract_your_order" style="margin-top:270px;">
    
      <div class="span6">
  
    
  <?php       
        	foreach ($rows as $row) { 
			//echo "<pre>";

			//echo date('Y-m-d', 1444496540581/1000);
			

			//print_r($row);
			?>
            <?php 
				 $del_status=$dispatch_date=$row->status;
			
			?>
            <div class="tracking_info">
            <ul>
            	<li> <img src="http://sevenhorses.sunnyeyewear.com/img/1.png" ><br/>
                <span>Registered For Pickup</span>
                </li>
                <li> <img src="http://sevenhorses.sunnyeyewear.com/img/2.png" ><br/>
                <span>Shipment Picked up</span>
                </li>
                <li> <img src="http://sevenhorses.sunnyeyewear.com/img/3.png" ><br/>
                <span>Shipment In-transit up</span>
                </li>
                <li> <img  <?php if($del_status=='undelivered') { echo 'class="active"'; }?>src="http://sevenhorses.sunnyeyewear.com/img/4.png" ><br/>
                 <span>Shipment Out For Delivery</span>
                </li>
                <li> <img <?php if($del_status=='delivered') { echo 'class="active"'; }?> src="http://sevenhorses.sunnyeyewear.com/img/5.png" ><br/>
                 <span>Shipment Delivered</span>
                </li>
            </ul>
            </div>
            <div class="clear"></div>
              <table cellpadding="0" cellspacing="0">
      	<tr>
        	<th>Awb Num</th>
            <th>Shipper Name</th>
            <th>Order No.</th>
            <th>Pick Date</th>
            <th>Payment Mode</th>
             <th>Status</th>
        </tr>
        <tr>
        	<td><?php echo $row->awb_num; ?></td>
            <td><?php echo $row->shipper_name; ?></td>
            <td><?php echo $row->order_num; ?>
             <td><?php $import_date=$row->import_date;
			 echo date('Y/m/d h:i:s A', $import_date/1000);
			  ?>
			
            </td>
            <td><?php echo $row->manifest_type; ?> </td>

<td>			 	<?php 
				echo $dispatch_date=$row->status;
			?></td>
        </tr>
</table>
        <h3><?php echo $row->awb_num; ?> On Spot Tracking</h3>
        <table border="0" cellpadding="0" cellspacing="0">

            <tr><th>Time</th><th>Details</th><th>Location</th><th>Status</th></tr>
              <?php 
				foreach($row->order_history as $order_history)
				{	//echo "<pre>";
					//print_r($order_history);
			?>		
             <tr><td><?php
			   $import_date=$order_history->timeStamp;;
			 echo date('Y/m/d h:i:s A', $import_date/1000);
			  
			   ?></td><td><?php echo $order_history->details; ?></td><td><?php echo $order_history->location; ?></td><td><?php echo $order_history->status; ?></td></tr>		
           
            <?php }?>
          
        </table>
		<?php 
		}
	?>
        
     
<?php }?>
         <?php }?>
 <style>
 tbody{
	 color:#000 !important;
}
.tract_your_order{
	width:1170px;
	margin:auto;
}

td {
	border:none !important;
	border-bottom:1px solid #ddd !important;
}
table{
	border:1px solid #ddd !important;
}
.tracking_info ul li{
	display:inline-block;
	list-style:none;
	width:218px;
}

.tracking_info img:hover {
    background: #fc541f none repeat scroll 0 0;
    border-radius: 50%;
}
.active {
    background: #fc541f none repeat scroll 0 0;
    border-radius: 50%;
}
</style>		 
</body>

</html>