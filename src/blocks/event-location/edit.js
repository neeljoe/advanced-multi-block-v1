/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Retrieves the current post meta.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect
 */
import { useSelect } from '@wordpress/data';

export default function Edit() {
	const blockProps = useBlockProps();

	const { eventLocation, eventCountry } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		const meta = editor.getEditedPostAttribute( 'meta' ) || {};
		return {
			eventLocation: meta.event_location || '',
			eventCountry: meta.event_country || '',
		};
	} );

	const displayLocation = eventLocation || 'Location will appear here';
	const country = eventCountry ? `, ${eventCountry}` : '';

	return (
		<p { ...blockProps }>
			📍 {displayLocation}{country}
		</p>
	);
}