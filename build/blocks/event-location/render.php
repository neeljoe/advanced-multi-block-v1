<?php
/**
 * PHP file to render the block on the frontend.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$event_location = get_post_meta( get_the_ID(), 'event_location', true );
$event_country = get_post_meta( get_the_ID(), 'event_country', true );

$location_text = '📍 ' . esc_html( $event_location );
if ( $event_country ) {
	$location_text .= ', ' . esc_html( $event_country );
}
?>
<p <?php echo get_block_wrapper_attributes( array( 'class' => 'has-base-color has-text-color has-medium-font-size' ) ); ?>>
	<?php echo $location_text; ?>
</p>