<?php
/*
Template Name: Blog - Masonry
*/
?>
<?php global $post;  ?>
<?php include( locate_template( 'templates/page-layout.php' ) ); ?>
<div class="inner-container">
	<?php include( locate_template( 'templates/meta-slider-flex.php' ) ); ?>
	<?php include( locate_template( 'templates/page-header.php' ) ); // Page Header Template ?>
    
    <?php 
	//-----------------------------------------------------
	// OPEN | OUTER Container + Row
	//-----------------------------------------------------
    echo wp_kses_post($outer_container_open) . wp_kses_post($outer_row_open); // Outer Tag Open ?>

    <?php 
	//-----------------------------------------------------
	// OPEN | Wrapper Class - Support for sidebar
	//-----------------------------------------------------
    echo wp_kses_post($main_class_open);  ?>
    
    <?php
	//-----------------------------------------------------
	// OPEN | Section + INNER Container
	//----------------------------------------------------- ?>
    
    <?php
	// Set Image Size
	$image_size = 'themo_blog_masonry';
	
	$masonry_template_key = '-masonry';
	$masonry_section_class = 'masonry-blog';
	$masonry_row_class = 'mas-blog';
	if($has_sidebar){
		$masonry_div_class = 'mas-blog-post col-md-6';
	}else{
		$masonry_div_class = 'mas-blog-post col-lg-4 col-md-4 col-sm-6';
	}
	
	$automatic_post_excerpts = 'on';
	if ( function_exists( 'ot_get_option' ) ) {
		$automatic_post_excerpts = ot_get_option( 'themo_automatic_post_excerpts', 'on' );
	}
	
	?>

    <section id="<?php echo sanitize_html_class($key).'_content'; ?>" class="<?php echo sanitize_text_field($masonry_section_class); ?>">
	<?php echo wp_kses_post($inner_container_open);?>

	<?php
    //-----------------------------------------------------
    // LOOP
    //----------------------------------------------------- ?>
    
    <?php query_posts('post_type=post&post_status=publish&paged='. get_query_var('paged')); ?>
    
    <div class="<?php echo sanitize_text_field($masonry_row_class); ?> row">
		<?php if (!have_posts()) : ?>
            <div class="alert">
            <?php _e('Sorry, no results were found.', THEMO_TEXT_DOMAIN); ?>
            </div>
            <?php get_search_form(); ?>
        <?php endif; ?>
            
		<?php while (have_posts()) : the_post(); ?>
		<?php
        $format = get_post_format();
        if ( false === $format ) {
        $format = 'standard';
        }
        ?>
            <div <?php post_class($masonry_div_class); ?> >
				<?php get_template_part('templates/content', $format); ?>
			</div><!-- /.col-md --> 
        <?php endwhile; ?>	
    </div><!-- /.row -->
    
    <div class="row">
		<?php if ($wp_query->max_num_pages > 1) : ?>
            <nav class="post-nav">
                <ul class="pager">
                    <li class="previous"><?php next_posts_link(__('&larr; Older posts', THEMO_TEXT_DOMAIN)); ?></li>
                    <li class="next"><?php previous_posts_link(__('Newer posts &rarr;', THEMO_TEXT_DOMAIN)); ?></li>
                </ul>
            </nav>
        <?php endif; ?>
	</div>
    
    <?php wp_reset_query(); ?>
    
	<?php
	//-----------------------------------------------------
	// CLOSE | Section + INNER Container
	//----------------------------------------------------- ?>
	<?php echo wp_kses_post($inner_container_close);?>
	</section>

	<?php 
    //-----------------------------------------------------
	// CLOSE | Main Class
	//-----------------------------------------------------
    echo wp_kses_post($main_class_close); ?>
    
    <?php
    //-----------------------------------------------------
	// INCLUDE | Sidebar
	//-----------------------------------------------------
    include themo_sidebar_path(); ?>
    
    <?php
	//-----------------------------------------------------
	// CLOSE | OUTER Container + Row
	//----------------------------------------------------- 
    echo wp_kses_post($outer_container_close) . wp_kses_post($outer_row_close); // Outer Tag Close ?>
</div><!-- /.inner-container -->