<?php

/**
*
**/

	session_start();

	require_once '../Classes/vUtil.php';
	include_once "../Classes/db.php";
	use RetailingEssentials\vUtil;
	use RetailingEssentials\db_connect;

	function update_tables($db_name,$info_conn,$db_schema)
	{
		$db_conn=new db_connect($db_name);

		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;

			if($table_name!='#text' && $table_name!='#comment')
			{
				///get the schema of the table
				$get_query="select column_name,data_type from columns where table_schema=? and table_name=?";
				$get_stmt=$info_conn->conn->prepare($get_query);
				$get_stmt->execute(array($db_name,$table_name));
				$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

				if(count($get_res)==0)
				{
					$q_string="create table $table_name (";

					foreach($table->childNodes as $column)
					{
						if($column->nodeName!='#text' && $column->nodeName!='#comment')
							$q_string.=$column->nodeName." ".$column->getAttribute('type')." ,";
					}
					$q_string.="PRIMARY KEY (id));";

					try{
						$db_conn->conn->exec($q_string);
						echo "adding table ".$table_name."<br>";
					}catch(PDOException $ex)
					{
						echo "Could not create table $table_name: " .$ex->getMessage() ."<br>";
					}
				}
				else
				{
					foreach($table->childNodes as $column)
					{
						if($column->nodeName!='#text' && $column->nodeName!='#comment')
						{
							$match=false;
							for($i=0;$i<count($get_res);$i++)
							{
								if($get_res[$i]['column_name']==$column->nodeName)
								{
									$match=true;
									break;
								}
							}
							if($match==false)
							{
								echo "adding column ".$column->nodeName." to table $table_name<br>";
								$alter_query="alter table $table_name add ".$column->nodeName." ".$column->getAttribute('type');

								try{
									$db_conn->conn->exec($alter_query);
								}catch(PDOException $ex)
								{
									echo "Could not update table $table_name: " .$ex->getMessage() ."<br>";
								}
							}
						}
					}
				}
			}
		}
	}

	function update_all_db_tables()
	{
		$db_schema_xml=new \DOMDocument();
		$db_schema_xml->load("../db/db_schema.xml");
		$db_schema=$db_schema_xml->documentElement;

		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

		for($i=0;$i<count($get_res);$i++)
		{
			echo "<b>updating db ".$get_res[$i]['table_schema']."</b><br>";
			update_tables($get_res[$i]['table_schema'],$info_conn,$db_schema);
		}
	}


	if(vUtil::isMasterSession())
	{
		update_all_db_tables();
	}
	else{
		echo "You don't have permissions to perform this operation.";
	}

?>
