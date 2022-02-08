/**
 * External dependencies
 */
 import { get, includes, invoke, isUndefined, pickBy } from 'lodash';
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { useSelect } from '@wordpress/data';
 import {
	 AlignmentControl,
	 InspectorControls,
	 BlockControls,
	 useBlockProps,
	 PlainText
 } from '@wordpress/block-editor';
 import {
	Panel,
	PanelBody,
	CheckboxControl,
	Flex,
	FlexItem,
	Button,
	SelectControl,
	Draggable,
	Popover,
	Disabled
 } from '@wordpress/components';
 import { Icon, plusCircle } from '@wordpress/icons';
 import { Platform, useState, useEffect, RawHTML } from '@wordpress/element';
 import { store as coreStore, useEntityProp } from '@wordpress/core-data';

 const isWebPlatform = Platform.OS === 'web';

/**
 * Internal dependencies
 */
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
	context: { postType, postId, queryId }
} ) {
	const { textAlign } = attributes;

    const isDescendentOfQueryLoop = Number.isFinite( queryId );

    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta', postId );

	const jobTitle = meta[ 'cjd_job_title' ];
    function updateJobTitle( newValue ) {
        setMeta( { ...meta, cjd_job_title: newValue.trim() } );
    }

	const supportsJobTitle =
		jobTitle !== undefined
		? true : false;

	const className =
		classnames(
			{
				[ `has-text-align-${ textAlign }` ]: textAlign && ! isSelected,
				[ `has-warning` ]: !supportsJobTitle
			}
		);

	const blockProps = useBlockProps( {
		className: className,
	} );

	let jobTitleElement = (
	    <p { ...blockProps }>{ __( 'Job Title' ) }</p>
	);

	if ( postType && postId ) {
	    jobTitleElement =
	    ! isDescendentOfQueryLoop ? (
	        <PlainText
                tagName="p"
                value={ jobTitle }
                onChange={ updateJobTitle }
                placeholder={ __( 'Add Job Title' ) }
                __experimentalVersion={ 2 }
                { ...blockProps }
            />
	    ) : (
	        <p { ...blockProps }>{ jobTitle ? jobTitle : __( 'No job title set' ) }</p>
	    );
	}

	const controls = (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
		</>
	);

	return (
		<>
			{ controls }
			{ jobTitleElement }
		</>
	);
}
