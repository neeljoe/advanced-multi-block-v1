<?php
/**
 * PHP file to render the block on the frontend.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$event_website = get_post_meta( get_the_ID(), 'event_website', true );
?>
<a <?php echo get_block_wrapper_attributes( array( 'class' => 'wp-block-button__link has-base-color has-text-color has-background' ) ); ?> href="<?php echo esc_url( $event_website ); ?>">
	🌐 Official Website
</a>