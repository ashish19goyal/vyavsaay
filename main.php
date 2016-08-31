<!DOCTYPE html>
<html manifest="/vyavsaay.appcache">

    <?php
    	session_start();
		include "includes/head.php"
	?>

    <body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white page-sidebar-closed" onload="default_load();">

       	<?php include "functions/lock_screen.php"; ?>

        	<!-- BEGIN HEADER & CONTENT DIVIDER -->
			<?php include "includes/top_bar.php" ?>
			<div class="clearfix"> </div>
        	<!-- END HEADER & CONTENT DIVIDER -->

        	<!-- BEGIN CONTAINER -->
			<div class="page-container">

            <!-- BEGIN SIDEBAR -->
            <?php include "includes/side_menu.php" ?>
            <!--end sidebar-->

            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
				<?php include "includes/content.php" ?>
                <!-- END CONTENT BODY -->
            </div>
            <!-- END CONTENT -->

			</div>
        	<!-- END CONTAINER -->

        	<!-- BEGIN FOOTER -->
			<?php include "includes/footer.php" ?>
        	<!-- END FOOTER -->

		<!-- BEGIN CORE PLUGINS -->
		<?php include "includes/footer_scripts.php" ?>
      <?php include "includes/overwrite_functions.php" ?>
      <!-- END THEME LAYOUT SCRIPTS -->

	</body>
</html>
