<?php

    $apikey = '7b9a22f306ffbabb5fccf9ca6e811427-us11';
     
    $to_emails = array('ashish.19goyal@gmail.com', 'ashish.18goyal@outlook.com');
    $to_names = array('Ashish Gmail', 'Ashish Outlook');
     
    $message = array(
        'html'=>'Yo, this is the <b>html</b> portion',
        'text'=>'Yo, this is the *text* portion',
        'subject'=>'This is the subject',
        'from_name'=>'Vyavsaay',
        'from_email'=>'info@vyavsaay.com',
        'to_email'=>$to_emails,
        'to_name'=>$to_names
    );
     
    $tags = array('WelcomeEmail');
     
    $params = array(
        'apikey'=>$apikey,
        'message'=>$message,
        'track_opens'=>false,
        'track_clicks'=>false,
        'tags'=>$tags
    );
     
    $url = "http://us1.sts.mailchimp.com/1.0/SendEmail";
     
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url.'?'.http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     
    $result = curl_exec($ch);
    echo $result;
    curl_close ($ch);
     
    $data = json_decode($result);
    echo "Status = ".$data->status."\n";
    
?>