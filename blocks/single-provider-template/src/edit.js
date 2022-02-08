import { 
    useBlockProps,
    useInnerBlocksProps, 
} from "@wordpress/block-editor";

import { useSelect, getEntityRecords } from '@wordpress/data';

import './editor.scss'; 

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
    clientId
} ) {

    const blockProps = useBlockProps( { className: "template-lock" } );
    const innerBlockCount = useSelect( ( select ) => 
        select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );

	const TEMPLATE = [
        [ 'core/post-featured-image', { className: 'grid-area-featured-image is-style-cjd-rounded' } ],
        [ 'core/group', { id: 'content-container', className: 'grid-area-content template-lock' },
            [
                [ 'core/group', { className: 'cjd-entry-header is-style-cjd-sandwich-border template-lock', tagName: 'header' }, 
                    [
                        [ 'cjd-blocks/title-by-name', {} ],
                        [ 'core/group', { id: 'provider-meta', className: 'post-meta' } ]
                    ]
                ],
                [ 'core/group', { className: 'cjd-entry-body' },
                    [
                        [ 'core/heading', { level: 2, className: 'uppercase', content: "Professional Experience" } ],
                        [ 'core/paragraph', { placeholder: 'Add professional biography here...' } ],
                        [ 'core/heading', { level: 2, className: 'uppercase', content: "Personal Life" } ],
                        [ 'core/paragraph', { placeholder: 'Add personal biography here...' } ],
                    ]
                ]
            ]
        ],
        [ 'core/group', { templateLock: false, className: 'grid-area-sidebar is-style-cjd-sandwich-border' }, 
            [
                [ 'core/heading', { level: 3, placeholder: 'Medical Specialties' } ],
                [ 'core/list', { placeholder: 'Add a speciality' } ]
            ] 
        ],
    ];

    const innerBlocksProps = useInnerBlocksProps( blockProps, {
        template: TEMPLATE
    } );

    return (
        <div>
            <div { ...innerBlocksProps } />
        </div>
    );
}