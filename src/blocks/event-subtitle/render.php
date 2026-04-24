<?php
/**
 * PHP file to render the block on the frontend.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$event_subtitle = get_post_meta( get_the_ID(), 'event_subtitle', true );
?>
<p <?php echo get_block_wrapper_attributes( array( 'class' => 'has-cyan-color has-text-color has-large-font-size' ) ); ?>>
	<?php echo esc_html( $event_subtitle ); ?>
</p>