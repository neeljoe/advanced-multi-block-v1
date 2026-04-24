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

	const { eventRegisterLink } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		const meta = editor.getEditedPostAttribute( 'meta' ) || {};
		return {
			eventRegisterLink: meta.event_register_link || '',
		};
	} );

	return (
		<p { ...blockProps }>
			{eventRegisterLink || 'Registration link will appear here'}
		</p>
	);
}