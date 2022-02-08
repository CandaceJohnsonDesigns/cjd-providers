/**
 * External dependencies
 */
import classnames from 'classnames';
import { filter, identity, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { 
    CheckboxControl, 
    Panel, 
    PanelBody, 
    Placeholder, 
    SelectControl, 
    Spinner, 
    TextControl, 
    ToggleControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect, getEntityRecords } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore, useEntityProp, getTaxonomy } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import usePostTerms from './use-post-terms';
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
	context: { postType, postId }
} ) {
	const { term, isInline, displayAcronym, textAlign, separator } = attributes;
    const TagName = isInline ? 'p' : 'ul';

    const toggleIsInline = () => {
        setAttributes( { 
            isInline: ! isInline,
        } );
    };

    const toggleDisplayAcronym = () => {
        setAttributes( {
            displayAcronym: ! displayAcronym,
        } );
    };

    const availableTerms = useSelect(
		( select ) => {
			const { getTaxonomies } = select( coreStore );
			const taxonomies = getTaxonomies( { per_page: -1 } );
            const availableTaxonomies = filter( taxonomies, ( taxonomy ) =>
                includes( taxonomy.types, postType )
            );
            const visibleTaxonomies = filter(
                availableTaxonomies,
                ( taxonomy ) => taxonomy.visibility.show_ui
            );

            const selectableTerms = visibleTaxonomies.map( ( term ) => ( { label: term.name, value: term.slug } ) );
			return selectableTerms ? selectableTerms : {};
		}
	);

	const selectedTerm = useSelect(
		( select ) => {
            if ( ! term ) return {};
			const { getTaxonomy } = select( coreStore );
			const taxonomy = getTaxonomy( term );
			return taxonomy?.visibility?.publicly_queryable ? taxonomy : {};
		}, [ term ]
	);

	const { postTerms, hasPostTerms, isLoading } = usePostTerms( {
		postId,
		postType,
		term: selectedTerm,
	} );

	const hasPost = postId && postType;
	const [ meta, setMeta ] = useEntityProp( 'taxonomy', term, 'meta' );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
			[ `taxonomy-${ term }` ]: term,
		} ),
	} );

	if ( ! hasPost || ! term  ) {
		return ( 
            <div { ...blockProps }>
                { availableTerms ? (
                    <Placeholder 
                        label={ __( 'Select a taxonomy to list for this post' ) }
                    >
                        <SelectControl
                            label={ __( 'Taxonomy' ) }
                            value={ term }
                            options={ availableTerms }
                            onChange={ ( newTerm ) => {
                                setAttributes( { term: newTerm } );
                            } }
                        />
                    </Placeholder>
                ) : (
                    __( 'This page or post type does not support the Post Meta block.' )
                ) }
            </div>
        );
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
            <InspectorControls>
                <Panel>
                    <PanelBody title={ __( 'Term Settings' ) }>
                        <SelectControl
                            label={ __( 'Taxonomy' ) }
                            value={ term }
                            options={ availableTerms }
                            onChange={ ( newTerm ) => {
                                setAttributes( { term: newTerm } );
                            } }
                        />
                        <ToggleControl 
                            label={ __( 'Display inline' ) }
                            checked={ isInline }
                            onChange={ toggleIsInline }
                        />
                        { isInline && (
                        <TextControl
                            autoComplete="off"
                            label={ __( 'Separator' ) }
                            value={ separator || '' }
                            onChange={ ( nextValue ) => {
                        	    setAttributes( { separator: nextValue } );
                            } }
                            help={ __( 'Enter character(s) used to separate terms.' ) }
                        />
                        ) }
                        <ToggleControl
                            label={ __( 'Display Acronym' ) }
                            checked={ displayAcronym }
                            onChange={ toggleDisplayAcronym }
                            help={ __( 'Display an acronym if available.' ) }
                        />
                    </PanelBody>
                </Panel>
			</InspectorControls>
			<TagName { ...blockProps }>
				{ isLoading && <Spinner /> }
				{ ! isLoading &&
					hasPostTerms &&
                    isInline &&
					postTerms
						.map( ( postTerm ) => (
							<a
								key={ postTerm.id }
								href={ postTerm.link }
								onClick={ ( event ) => event.preventDefault() }
							>
								{ displayAcronym && postTerm.meta['acronym'] ? postTerm.meta['acronym'] : postTerm.name }
							</a>
						) )
						.reduce( ( prev, curr ) => (
							<>
								{ prev }
                                { separator.trim() !== ',' && separator.trim() !== ';' && ` `}
								<span className="wp-block-post-terms__separator">
                                    { separator.trim() }
                                </span>
                                { ` ` }
								{ curr }
							</>
						) ) }
                { ! isLoading &&
					hasPostTerms &&
                  ! isInline &&
					postTerms
						.map( ( postTerm ) => (
                            <li key={ postTerm.id }>
                                <a
                                    href={ postTerm.link }
                                    onClick={ ( event ) => event.preventDefault() }
                                >
                                    { displayAcronym && postTerm.meta['acronym'] ? postTerm.meta['acronym'] : postTerm.name }
                                </a>
                            </li>
						) )
						}
				{ ! isLoading &&
					! hasPostTerms &&
					( selectedTerm?.labels?.no_terms ||
						__( 'Term items not found.' ) ) }
			</TagName>
		</>
	);
}