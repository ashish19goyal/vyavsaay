<?php
/**
 * Enqueue scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/assets/css/bootstrap.css
 * 2. /theme/assets/css/app.css
 *
 * Enqueue scripts in the following order:
 * 1. jquery-1.10.2.min.js via Google CDN
 * 2. /theme/assets/js/vendor/modernizr-2.6.2.min.js
 * 3. /theme/assets/js/plugins.js (in footer)
 * 4. /theme/assets/js/main.js    (in footer)
 */ 
function roots_scripts() {

	if (is_single() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
	wp_enqueue_script('jquery');

	/*
	* Prelaoder CSS
	 *  Only use of it's enabled in the theme options and if we are using the flex slider.
	* */

	if ( function_exists( 'ot_get_option' ) ) {
		$themo_preloader = ot_get_option( 'themo_preloader', "on" );
		if ($themo_preloader == 'on'){

			$id = get_the_ID();
			if(isset($id) && $id > ""){
				$show = get_post_meta($id, 'themo_slider_sortorder_show', true );
				$show_flex = get_post_meta($id, 'themo_slider_flex_show', true );
				if($show == 1 && $show_flex == 1) {
					wp_register_style('preloader', get_template_directory_uri() . '/assets/css/preloader.css', array(), '1');
					wp_enqueue_style('preloader');
				}
			}
		}
	}


	/********************************
	Bootstrap + Vendor CSS / JS
	 ********************************/


	wp_register_style('bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css', array(), '3.1.1');
	wp_enqueue_style('bootstrap');

	wp_register_style('t_vendor', get_template_directory_uri() . '/assets/css/vendor.css', array(), '1.0');
	wp_enqueue_style('t_vendor');


	wp_register_script('t_vendor', get_template_directory_uri() . '/assets/js/vendor/vendor.js', array(), '1.0', false);
	wp_enqueue_script('t_vendor');

	wp_register_script('t_vendor_footer', get_template_directory_uri() . '/assets/js/vendor/vendor_footer.js', array(), '1.0', true);
	wp_enqueue_script('t_vendor_footer');

	
	/********************************
		Main JS - moved to vendor.js
		In the future if we want to include specific JS plugins for Twitter bootstrap then we would do that here. For now we include
		everything in on bootstrap.js file.
	********************************/  
  	wp_register_script('roots_main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.1', true);
	wp_enqueue_script('roots_main');
	
	
	/********************************
		Headhesive
	********************************/
	if ( function_exists( 'ot_get_option' ) ) {
		$sticky_header = ot_get_option( 'themo_sticky_header', "on" );
		if ($sticky_header == 'on'){ 			
			wp_register_script('headhesive', get_template_directory_uri() . '/assets/js/vendor/headhesive.min.js', array(), '1.1.1', true);
			wp_enqueue_script('headhesive');
		}
	}

	/********************************
		NiceScroll
	********************************/
	if ( function_exists( 'ot_get_option' ) ) {
		$smooth_scroll = ot_get_option( 'themo_smooth_scroll', "on" );
		if ($smooth_scroll == 'on'){ 			
			wp_register_script('nicescroll', get_template_directory_uri() . '/assets/js/vendor/jquery.nicescroll.min.js', array(), '3.5.4', true);
  			wp_enqueue_script('nicescroll');
		}
	}
	
	/********************************
		Main Stylesheet
	********************************/  
	wp_register_style('roots_app',  get_template_directory_uri() . '/assets/css/app.css', array(), '1');
	wp_enqueue_style('roots_app');

	/********************************
		Responsive @media CSS
	********************************/
	wp_register_style('responsive_css',  get_template_directory_uri() . '/assets/css/responsive.css', array(), '1');
	wp_enqueue_style('responsive_css');
		
	/********************************
		Child Theme
	********************************/
	if (is_child_theme()) {
		wp_register_style('roots_child', get_stylesheet_uri());
		wp_enqueue_style('roots_child');
	}


	/*
	 * // load_html5shiv_respond
	 * // LOAD html5shiv respond.min.js
	*/
    //echo 'VERSOIN '.PHP_VERSION;
    /*if (version_compare(PHP_VERSION, '5.3.0') >= 0) {
        wp_enqueue_script( 'html5shiv', get_template_directory_uri() . '/assets/js/vendor/html5shiv.min.js', array(), '3.7.3', false );
        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if ( $handle === 'html5shiv' ) {
                $tag = "<!--[if lt IE 9]>$tag<![endif]-->";
            }
            return $tag;
        }, 10, 2 );

        wp_enqueue_script( 'html5shiv-printshiv', get_template_directory_uri() . '/assets/js/vendor/html5shiv-printshiv.min.js', array(), '3.7.3', false );
        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if ( $handle === 'html5shiv-printshiv' ) {
                $tag = "<!--[if lt IE 9]>$tag<![endif]-->";
            }
            return $tag;
        }, 10, 2 );

        wp_enqueue_script( 'respond', get_template_directory_uri() . '/assets/js/vendor/respond.min.js', array(), '1.4.2', false );
        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if ( $handle === 'respond' ) {
                $tag = "<!--[if lt IE 9]>$tag<![endif]-->";
            }
            return $tag;
        }, 10, 2 );
    }*/



  
}
add_action('wp_enqueue_scripts', 'roots_scripts', 100);


