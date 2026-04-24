<?php
/**
 * PHP file to render the block on the frontend.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$event_first_edition_year = get_post_meta( get_the_ID(), 'event_first_edition_year', true );
$edition_text = 'Since ' . esc_html( $event_first_edition_year );
?>
<p <?php echo get_block_wrapper_attributes( array( 'class' => 'has-accent-red-color has-text-color has-medium-font-size' ) ); ?>>
	<?php echo esc_html( $edition_text ); ?>
</p>