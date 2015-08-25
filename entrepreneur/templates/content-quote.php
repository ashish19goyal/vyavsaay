<?php 
global $masonry, $masonry_template_key;
$quote = get_post_meta( get_the_ID(), '_format_quote_copy', true);
$quote_source_name = get_post_meta( get_the_ID(), '_format_quote_source_name', true);
$quote_source_title = get_post_meta( get_the_ID(), '_format_quote_source_title', true);
?> 
<div class="post-inner">
    <blockquote>
        <?php if($quote > ""){?><p><?php echo esc_attr($quote); ?></p><?php } ?>
        <footer><?php if($quote_source_name > ""){echo esc_attr($quote_source_name);} ?><?php if($quote_source_title > ""){ ?>, <cite title="Source Title"><?php echo esc_attr($quote_source_title); ?></cite><?php } ?></footer>
    </blockquote>                    
	<?php get_template_part('templates/entry-meta-footer'.$masonry_template_key); ?>
</div>


