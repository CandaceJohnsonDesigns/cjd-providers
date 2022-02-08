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
	 useBlockProps
 } from '@wordpress/block-editor';
 import {
	Panel,
	PanelBody,
	CheckboxControl
 } from '@wordpress/components';
 import { Platform, useState } from '@wordpress/element';
 import { store as coreStore, useEntityProp } from '@wordpress/core-data';
 import ServerSideRender from '@wordpress/server-side-render';

 const isWebPlatform = Platform.OS === 'web';

/**
 * Internal dependencies
 */
 import './style.scss';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function ProviderDirectoryEdit( {
	attributes,
	setAttributes,
} ) {
	const { align } = attributes;

	const providers = useSelect( ( select ) => { 
		const { getEntityRecords, getMedia } = select(
			coreStore
		);

		const providers = getEntityRecords( 
			'postType', 
			'providers', 
			{ order: 'asc' } 
		);

		return ! Array.isArray( providers )
			? providers
			: providers.map( ( provider ) => {
				if ( ! provider.featured_media ) return provider;

				const image = getMedia( provider.featured_media );
				let url = get(
					image,
					[
						'media_details',
						'sizes',
						'medium',
						'source_url',
					],
					null
				);

				if ( ! url ) {
					url = get( image, 'source_url', null );
				}

				const featuredImageInfo = {
					url,
					// eslint-disable-next-line camelcase
					alt: image?.alt_text,
				};

				return { ...provider, featuredImageInfo };

			})
	}, [] );

	const className =
		classnames(
			'wp-block-cjd-blocks-provider-directory'
		);

	const blockProps = useBlockProps( {
		className: className,
	} );

	const [ displayProviderPhoto, setDisplayProviderPhoto ] = useState( true );
	const [ displayJobTitle, setDisplayJobTitle ] = useState( true );

	const controls = (
		<>
			<InspectorControls group="block">
				<Panel>
					<PanelBody title="Provider Directory Settings">
						<CheckboxControl
							label="Display provider photo"
							checked={ displayProviderPhoto }
							onChange={ setDisplayProviderPhoto }
						/>
						<CheckboxControl
							label="Display job title"
							checked={ displayJobTitle }
							onChange={ setDisplayJobTitle }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);

	return (
		<div { ...blockProps } >
			{ controls }
			<ServerSideRender
				block="cjd-blocks/provider-directory"
				attributes={ {
					displayJobTitle: displayJobTitle,
					displayProviderPhoto: displayProviderPhoto
				} }
			/>
		</div>
	);
}
