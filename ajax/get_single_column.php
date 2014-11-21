<?php
/*	input data format: 
 * 			<table_name>
 *				<column1>value1</column1>
 *				<column2>value2</column2>
 *				<column3></column3>
 *				<column(n)>value(n)</column(n)>
 *			</table_name>
 *	output data format: 
 *			<table_name>
 *				<row>value1</row>
 *				<row>value1</row>
 *			</table_name>
*/

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_POST['domain'];
		$username=$_POST['username'];
		$read_access=$_POST['re'];
		$columns=$_POST['columns'];
		$input_xml=new DOMDocument();
		$input_xml->loadXML($columns);
		$input=$input_xml->documentElement;
		
		//echo $columns;
		if(isset($_SESSION['session']))
		{
			if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
			{
				$table=$input->nodeName;
				$columns_array=array();
				$values_array=array();
				$result_column=$input->childNodes->item(0)->nodeName;
				$query="select $result_column from $table where ";
				foreach($input->childNodes as $col)
				{
					$columns_array[]=$col->nodeName;
					if($col->nodeValue!="")
					{
						if($col->hasAttribute('compare'))
						{
							if($col->getAttribute('compare')==='less than')
							{
								$query.=$col->nodeName." < ? and ";
							}
							else if($col->getAttribute('compare')==='more than')
							{
								$query.=$col->nodeName." > ? and ";
							}
							else if($col->getAttribute('compare')==='equal')
							{
								$query.=$col->nodeName." = ? and ";
							}
							else if($col->getAttribute('compare')==='not equal')
							{
								$query.=$col->nodeName." <> ? and ";
							}
							$values_array[]=$col->nodeValue;
						}
						else if($col->hasAttribute('array'))
						{
							$query.=$col->nodeName." in (";
							$string=rtrim($col->nodeValue,"-");
							$exploded_values=explode("--",$string);
							foreach($exploded_values as $value)
							{
								$query.="?,";
								$values_array[]=$value;
							}
							$query=rtrim($query,",");
							$query.=") and ";
						}
						else if($col->hasAttribute('exact'))
						{
							$query.=$col->nodeName." = ? and ";
							$values_array[]=$col->nodeValue;
						}
						else
						{
							$query.=$col->nodeName." like ? and ";
							$values_array[]="%".$col->nodeValue."%";
						}
					}
				}
				$query=rtrim($query,"and ");
				$query.=" ORDER BY id DESC";
				if(count($values_array)===0)
				{
					$query="select $result_column from $table ORDER BY id DESC";
				}
					//echo $query;	
				$db_name="re_user_".$domain;
				$xmlresponse="<$table>";
				
				$conn=new db_connect($db_name);
				$stmt=$conn->conn->prepare($query);
				$stmt->execute($values_array);
				$struct_res=$stmt->fetchAll(PDO::FETCH_NUM);
				
				for($i=0;$i<count($struct_res);$i++)
				{
					$xmlresponse.="<row>";
					$xmlresponse.=$struct_res[$i][0];
					$xmlresponse.="</row>";
				}
				
				$xmlresponse.="</$table>";
				header ("Content-Type:text/xml");
				echo $xmlresponse;
			}
			else
			{
				echo "Invalid session";
			}
		}
		else
		{
			echo "Invalid session";
		}

?>