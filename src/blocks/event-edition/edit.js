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

	const { eventFirstEditionYear } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		const meta = editor.getEditedPostAttribute( 'meta' ) || {};
		return {
			eventFirstEditionYear: meta.event_first_edition_year || '',
		};
	} );

	const displayText = eventFirstEditionYear ? `Since ${eventFirstEditionYear}` : 'Edition year will appear here';

	return (
		<p { ...blockProps }>
			{displayText}
		</p>
	);
}