<?php
/**
 * PHP file to render the block on the frontend.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$event_distance_types = get_post_meta( get_the_ID(), 'event_distance_types', true );

if ( empty( $event_distance_types ) ) {
	return;
}

$distances = array_map( 'trim', explode( ',', $event_distance_types ) );
?>
<div class="wp-block-group distance-pills-container" style="gap:var(--wp--preset--spacing--10)">
	<p class="has-white-color has-text-color has-small-font-size" style="font-family:var(--wp--preset--font-family--mono);text-transform:uppercase;letter-spacing:0.15em;margin-right:var(--wp--preset--spacing--15)">Distances:</p>
	<?php foreach ( $distances as $distance ) : ?>
		<div class="wp-block-group has-primary-dark-background-color has-background" style="border-radius:50px;padding-top:var(--wp--preset--spacing--5);padding-right:var(--wp--preset--spacing--15);padding-bottom:var(--wp--preset--spacing--5);padding-left:var(--wp--preset--spacing--15);display:inline-flex">
			<p class="has-base-color has-text-color has-small-font-size" style="font-family:var(--wp--preset--font-family--mono);font-weight:500">
				<?php echo esc_html( $distance ); ?>
			</p>
		</div>
	<?php endforeach; ?>
</div>