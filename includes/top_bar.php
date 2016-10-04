<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a onclick='home_display();'>
            	<!--<img src="./layouts/layout/img/logo.png" alt="logo" class="logo-default" />-->
            	<b class='logo-default'><span class="logo-text">Vyavsaay</span> <span class='logo-text2'>ERP</span></b>    
            </a>
            <div class="menu-toggler sidebar-toggler"> </div>
        </div>                
        <!-- END LOGO -->
		 <!-- BEGIN HEADER SEARCH BOX -->
        <form class="search-form" id='search_form'>
            <div class="input-group">
                <input type="text" class="form-control" name='search_box' required placeholder="Search...">
                <span class="input-group-btn">
                    <a class="btn submit">
                        <i class="icon-magnifier"></i>
                    </a>
                </span>
            </div>
        </form>
        <script>
        	$('#search_form').on('submit',function(e)
        	{
        		e.preventDefault();
					  show_search_results();
			    });
        </script>
        <!-- END HEADER SEARCH BOX -->
       
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
    	<!-- END RESPONSIVE MENU TOGGLER -->
        
        <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
        <!--<div class="top-menu pull-left">
            <div class='nav navbar pull-left'>
                <form class="topbar-search topbar-search-bordered" id='search_form'>
                    <div class="input-group">
                        <input type="text" class="form-control" name="search_box" required placeholder="Search...">
                        <span class="input-group-btn">
                            <a class="btn submit" onclick="show_search_results();">
                                <i class="icon-magnifier"></i>
                            </a>
                        </span>
                    </div>
                </form>
            </div>
            
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
                    <a title='Log out' class="dropdown-toggle" onclick='delete_session();'>
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
