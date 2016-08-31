<?php
echo "hello";

include '../Classes/file_reader.php';
use RetailingEssentials\file_reader;


$reader=new file_reader('../Config/config.prop');

echo $reader->attributes["database"]."</br>";
echo $reader->attributes["user"]."</br>";
echo $reader->attributes["password"]."</br>";

?>
