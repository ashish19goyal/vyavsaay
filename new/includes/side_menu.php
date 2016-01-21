<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <ul class="page-sidebar-menu page-sidebar-menu-closed page-sidebar-menu-hover-submenu page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px;">
            <li class="sidebar-toggler-wrapper hide">
                <div class="sidebar-toggler"> </div>
            </li>
            <li class="nav-item start ">
                <a onclick='home_display();' class="nav-link nav-toggle">
                    <i class="icon-home"></i>
                    <span class="title">Dashboard</span>
                    <span class="arrow"></span>
                </a>
            </li>
            <li class="heading">
                <h3 class="uppercase">Functions</h3>
            </li>

			<?php
			
				include_once "./Classes/db.php";
				use RetailingEssentials\db_connect;
			
				$domain="";
				
				if(isset($_GET['dn']))
				{
					$domain=$_GET['dn'];
				}

				$grids_html="";
				
				if(isset($_SESSION['domain']) || $domain!="")
				{
					if($domain=="")
					{	$domain=$_SESSION['domain'];}
					
					$db_name="re_user_".$domain;
					$conn=new db_connect($db_name);
					$query="select name,display_name,elements,head_color from system_grids where status=? order by grid_order asc;";
					
					$stmt=$conn->conn->prepare($query);
					$stmt->execute(array('active'));
					$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
			
					foreach($struct_res as $res)
					{
						$first_char=substr($res['display_name'],0,1);
						$grids_html.="<li class='nav-item' id='nav-".$res['name']."'>".
			                	"<a class='nav-link nav-toggle'>".
			                    "<b style='color:#999;font-size:1.2em;'>".$first_char."</b>".
								"<span class='title' style='font-weight:900;color:#999;'>".$res['display_name']."</span>".
			                    "<span class='arrow'></span></a>";
			            
					if($res['elements']!="" && $res['elements']!=null)
					{
						$grids_html.="<ul class='sub-menu'>";
						$elements_array=json_decode($res['elements'],true);
						foreach($elements_array as $element)
		            	{
		                	$grids_html.="<li class='nav-item' id='nav-".$element['name']."'>".
		                        "<a onclick=\"element_display('','".$element['name']."');\" class='nav-link'>".
		                            "<span class='title'>".$element['display_name']."</span>".
		                        "</a></li>";
						}
						
						$grids_html.="</ul>";
			         }			            
			         $grids_html.="</li>";            
					}
				}
				echo $grids_html;
			?>
		</ul>
    </div>
</div>