<?php
/**
 * Initial setup and constants
 *
 * @author     @retlehs
 * @link 	   http://roots.io
 * @editor     Themovation <themovation@gmail.com>
 * @version    1.0
 */

//-----------------------------------------------------
// after_setup_theme
// Perform basic setup, registration, and init actions
// for this theme.
//-----------------------------------------------------


add_action('after_setup_theme', 'themo_setup');
 
function themo_setup() {
	// Make theme available for translation
	load_theme_textdomain(THEMO_TEXT_DOMAIN, get_template_directory() . '/lang');

	// Register wp_nav_menu() menus (http://codex.wordpress.org/Function_Reference/register_nav_menus)
	register_nav_menus(array(
	'primary_navigation' => __('Primary Navigation', THEMO_TEXT_DOMAIN),
	));

	// Add post thumbnails (http://codex.wordpress.org/Post_Thumbnails)
	add_theme_support('post-thumbnails');
	// set_post_thumbnail_size(150, 150, false);

	if ( function_exists( 'add_image_size' ) ) { 
		// Set Image Size for Logo
		if ( function_exists( 'ot_get_option' ) ) {
			$logo_height = ot_get_option( 'themo_logo_height', 100 );
			add_image_size('themo-logo', 9999, $logo_height); //  (unlimited width, user set height)	
		}else{
			add_image_size('themo-logo', 9999, 100); // (unlimited width, 100px high)	
		}	
		
		// Set our custom images sizes
		add_image_size('themo_full_width', 1140, 900); // General Full Width Images - 1140 wide
		add_image_size('themo_thumb_slider', 255, 170, array( 'center', 'center' )); // Thumbnail Slider - 255 wide, 170 high, cropped center by center.
		add_image_size('themo_thumb_slider_portrait', 255, 0); // Thumbnail Slider Portrait - 255 wide, unlimited height.
		add_image_size('themo_brands', 0, 80); // Brands - 80 high
		add_image_size('themo_testimonials', 60, 60, array( 'center', 'top' ) ); // Testimonial Headshot - 60 wide, 60 high, cropped center and top.
		add_image_size('themo_featured', 555, 290, array( 'center', 'center' ) ); // Featured image - 440 wide, 300 high, cropped center by center.
		add_image_size('themo_team', 480); // Meet the Team - 360 wide.
		add_image_size('themo_showcase', 500); // Showcase - 500 wide.
		add_image_size('themo_page_header', 1920); // Page Header / BG - 1920 wide.
		add_image_size('themo_blog_standard', 750); // Blog for Standard post with Sidebar - 750 wide.
		add_image_size('themo_blog_masonry', 360); // Blog for Masonry - 360 wide.
        add_image_size('themo_portfolio_standard', 380, 380, true); // Standard Portfolio Size - 380 x 380, hard crop
		
	}

	
  
	// Add post formats (http://codex.wordpress.org/Post_Formats)
	add_theme_support('post-formats', array('aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio'));

}

// Backwards compatibility for older than PHP 5.3.0
if (!defined('__DIR__')) { define('__DIR__', dirname(__FILE__)); }
if (!defined('THEMEO_OT_DEFAULTS')) {
	define('THEMEO_OT_DEFAULTS', 'YTo1Mzp7czoxMzoidGhlbW9fZmF2aWNvbiI7czowOiIiO3M6MTc6InRoZW1vX2xvZ29faGVpZ2h0IjtzOjM6IjEwMCI7czoxMDoidGhlbW9fbG9nbyI7czowOiIiO3M6MzY6InRoZW1vX2xvZ29fdHJhbnNwYXJlbnRfaGVhZGVyX2VuYWJsZSI7czoyOiJvbiI7czoyOToidGhlbW9fbG9nb190cmFuc3BhcmVudF9oZWFkZXIiO3M6MDoiIjtzOjIwOiJ0aGVtb19uYXZfdG9wX21hcmdpbiI7czoxOiI4IjtzOjE2OiJ0aGVtb19jdXN0b21fY3NzIjtzOjA6IiI7czo0OToidGhlbW9fbWV0YV9ib3hfYnVpbGRlcl9tZXRhX2JveF9tYW51YWxfc29ydF9vcmRlciI7czozOiJvZmYiO3M6NDQ6InRoZW1vX21ldGFfYm94X2J1aWxkZXJfbWV0YV9ib3hfbWF4X3F1YW50aXR5IjtzOjE6IjUiO3M6Mjk6InRoZW1vX2F1dG9tYXRpY19wb3N0X2V4Y2VycHRzIjtzOjI6Im9uIjtzOjE5OiJ0aGVtb19zbW9vdGhfc2Nyb2xsIjtzOjM6Im9mZiI7czoxOToidGhlbW9fY29sb3JfcHJpbWFyeSI7czowOiIiO3M6MTg6InRoZW1vX2NvbG9yX2FjY2VudCI7czowOiIiO3M6MTU6InRoZW1vX2JvZHlfZm9udCI7czowOiIiO3M6MTU6InRoZW1vX21lbnVfZm9udCI7czowOiIiO3M6MTk6InRoZW1vX2hlYWRpbmdzX2ZvbnQiO3M6MDoiIjtzOjI3OiJ0aGVtb19zb2NpYWxfbWVkaWFfYWNjb3VudHMiO2E6Mzp7aTowO2E6Mzp7czo1OiJ0aXRsZSI7czo4OiJGYWNlYm9vayI7czoyMjoidGhlbW9fc29jaWFsX2ZvbnRfaWNvbiI7czoxNToic29jaWFsLWZhY2Vib29rIjtzOjE2OiJ0aGVtb19zb2NpYWxfdXJsIjtzOjM2OiJodHRwczovL3d3dy5mYWNlYm9vay5jb20vdGhlbW92YXRpb24iO31pOjE7YTozOntzOjU6InRpdGxlIjtzOjc6IlR3aXR0ZXIiO3M6MjI6InRoZW1vX3NvY2lhbF9mb250X2ljb24iO3M6MTQ6InNvY2lhbC10d2l0dGVyIjtzOjE2OiJ0aGVtb19zb2NpYWxfdXJsIjtzOjMwOiJodHRwOi8vdHdpdHRlci5jb20vdGhlbW92YXRpb24iO31pOjI7YTozOntzOjU6InRpdGxlIjtzOjk6Ikluc3RhZ3JhbSI7czoyMjoidGhlbW9fc29jaWFsX2ZvbnRfaWNvbiI7czoxNjoic29jaWFsLWluc3RhZ3JhbSI7czoxNjoidGhlbW9fc29jaWFsX3VybCI7czoxOiIjIjt9fXM6MTk6InRoZW1vX3N0aWNreV9oZWFkZXIiO3M6Mjoib24iO3M6MjQ6InRoZW1vX3RyYW5zcGFyZW50X2hlYWRlciI7czoyOiJvbiI7czoxNzoidGhlbW9fd2lkZV9sYXlvdXQiO3M6Mjoib24iO3M6Mjk6InRoZW1vX2JveGVkX2xheW91dF9iYWNrZ3JvdW5kIjtzOjA6IiI7czoxNzoidGhlbW9fYmFja3N0cmV0Y2giO3M6Mjoib24iO3M6MjA6InRoZW1vX3JldGluYV9zdXBwb3J0IjtzOjM6Im9mZiI7czoyMjoidGhlbW9fZm9vdGVyX2NvcHlyaWdodCI7czoyMjoiwqDCqSAyMDE1IEVudHJlcHJlbmV1ciI7czoxOToidGhlbW9fZm9vdGVyX2NyZWRpdCI7czo3NDoiVGhlbWUgYnkgPGEgdGFyZ2V0PSJfYmxhbmsiIGhyZWY9Imh0dHA6Ly90aGVtb3ZhdGlvbi5jb20vIj5UaGVtb3ZhdGlvbjwvYT4iO3M6MjY6InRoZW1vX2Zvb3Rlcl93aWRnZXRfc3dpdGNoIjtzOjI6Im9uIjtzOjIwOiJ0aGVtb19mb290ZXJfY29sdW1ucyI7czoxOiIzIjtzOjIwOiJ0aGVtb19mbGV4X2FuaW1hdGlvbiI7czo0OiJmYWRlIjtzOjE3OiJ0aGVtb19mbGV4X2Vhc2luZyI7czo1OiJzd2luZyI7czoyNDoidGhlbW9fZmxleF9hbmltYXRpb25sb29wIjtzOjI6Im9uIjtzOjIzOiJ0aGVtb19mbGV4X3Ntb290aGhlaWdodCI7czoyOiJvbiI7czoyNToidGhlbW9fZmxleF9zbGlkZXNob3dzcGVlZCI7czo0OiI0MDAwIjtzOjI1OiJ0aGVtb19mbGV4X2FuaW1hdGlvbnNwZWVkIjtzOjM6IjU1MCI7czoyMDoidGhlbW9fZmxleF9yYW5kb21pemUiO3M6Mzoib2ZmIjtzOjIzOiJ0aGVtb19mbGV4X3BhdXNlb25ob3ZlciI7czoyOiJvbiI7czoxNjoidGhlbW9fZmxleF90b3VjaCI7czoyOiJvbiI7czoyMzoidGhlbW9fZmxleF9kaXJlY3Rpb25uYXYiO3M6Mjoib24iO3M6MjE6InRoZW1vX2ZsZXhfY29udHJvbE5hdiI7czoyOiJvbiI7czozNToidGhlbW9fYmxvZ19pbmRleF9sYXlvdXRfc2hvd19oZWFkZXIiO3M6Mjoib24iO3M6MzY6InRoZW1vX2Jsb2dfaW5kZXhfbGF5b3V0X2hlYWRlcl9mbG9hdCI7czo4OiJjZW50ZXJlZCI7czozMToidGhlbW9fYmxvZ19pbmRleF9sYXlvdXRfc2lkZWJhciI7czo1OiJyaWdodCI7czozNjoidGhlbW9fc2luZ2xlX3Bvc3RfbGF5b3V0X3Nob3dfaGVhZGVyIjtzOjI6Im9uIjtzOjM3OiJ0aGVtb19zaW5nbGVfcG9zdF9sYXlvdXRfaGVhZGVyX2Zsb2F0IjtzOjg6ImNlbnRlcmVkIjtzOjMyOiJ0aGVtb19zaW5nbGVfcG9zdF9sYXlvdXRfc2lkZWJhciI7czo1OiJyaWdodCI7czozMjoidGhlbW9fZGVmYXVsdF9sYXlvdXRfc2hvd19oZWFkZXIiO3M6Mjoib24iO3M6MzM6InRoZW1vX2RlZmF1bHRfbGF5b3V0X2hlYWRlcl9mbG9hdCI7czo4OiJjZW50ZXJlZCI7czoyODoidGhlbW9fZGVmYXVsdF9sYXlvdXRfc2lkZWJhciI7czo1OiJyaWdodCI7czoyNToidGhlbW9fcG9ydGZvbGlvX2hvbWVfbGluayI7czowOiIiO3M6MzI6InRoZW1vX3BvcnRmb2xpb19ob21lX2xpbmtfYW5jaG9yIjtzOjA6IiI7czoyODoidGhlbW9fcG9ydGZvbGlvX3Jld3JpdGVfc2x1ZyI7czowOiIiO3M6Mjk6InRoZW1vX3Byb2plY3RfYWRkdGhpc190b29sYm94IjtzOjI6Im9uIjtzOjE5OiJ0aGVtb19wcm9qZWN0X2ljb25zIjtzOjI6Im9uIjtzOjE3OiJ0aGVtb19wcm9qZWN0X25hdiI7czoyOiJvbiI7fQ==');
	}
if (!defined('THEMO_TEXT_DOMAIN')) { define('THEMO_TEXT_DOMAIN', 'ENTREPRENEUR'); }
if (!defined('THEMO_COLOR_PRIMARY')) { define('THEMO_COLOR_PRIMARY', '#1e8190'); }
if (!defined('THEMO_COLOR_ACCENT')) { define('THEMO_COLOR_ACCENT', '#f96d64'); }