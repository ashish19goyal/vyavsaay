<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="main.php">
            	<!--<img src="./layouts/layout/img/logo.png" alt="logo" class="logo-default" />-->
            	<b class='logo-default'><span class="logo-text">Vyavsaay</span> ERP</b>    
            </a>
            <div class="menu-toggler sidebar-toggler"> </div>
        </div>                
        <!-- END LOGO -->
		
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
    	<!-- END RESPONSIVE MENU TOGGLER -->
        
        <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
        <div class="top-menu pull-left">
            <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
            <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
			<div class='nav navbar pull-left'>	                
                <form class="topbar-search topbar-search-bordered">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." onkeydown="if(event.keyCode==13){show_search_results();return false;}">
                        <span class="input-group-btn">
                            <a href="javascript:;" class="btn submit" onclick="show_search_results();return false;">
                                <i class="icon-magnifier"></i>
                            </a>
                        </span>
                    </div>
                </form>
            </div>
            <script type="text/javascript">
				function show_search_results() 
				{
					hide_all();
					$("#search_results_box").show();
					search_ini();
				}
			</script>
        </div>
        <!-- END RESPONSIVE QUICK SEARCH FORM -->

        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">

                <!-- BEGIN NOTIFICATION DROPDOWN -->
				<?php include "includes/notifications.php" ?>                        
                <!-- END NOTIFICATION DROPDOWN -->
                
                <!-- BEGIN TODO DROPDOWN -->
				<?php include "includes/logs.php" ?>                        
                <!-- END TODO DROPDOWN -->

                <!-- BEGIN USER LOGIN DROPDOWN -->
                <?php include "includes/profile.php" ?>                        
                <!-- END USER LOGIN DROPDOWN -->
                
                <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-quick-sidebar-toggler">
                    <a href="" class="dropdown-toggle" onclick='delete_session();'>
                    	<i class="icon-logout"></i>
                    </a>
                </li>
                <!-- END QUICK SIDEBAR TOGGLER -->
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
        