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

	const { eventDistanceTypes } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		const meta = editor.getEditedPostAttribute( 'meta' ) || {};
		return {
			eventDistanceTypes: meta.event_distance_types || '',
		};
	} );

	const distances = eventDistanceTypes ? eventDistanceTypes.split( ',' ).map( d => d.trim() ) : [];
	const displayDistances = distances.length > 0 ? distances : [ 'Marathon', 'Half Marathon', '10K' ];

	return (
		<div { ...blockProps }>
			<p style={ { color: 'white', marginRight: '10px' } }>Distances:</p>
			{displayDistances.map( ( distance, index ) => (
				<span
					key={ index }
					style={ {
						backgroundColor: '#0D0D1A',
						borderRadius: '50px',
						padding: '5px 15px',
						marginRight: '10px',
						color: 'white',
						fontSize: '14px',
					} }
				>
					{ distance }
				</span>
			) )}
		</div>
	);
}