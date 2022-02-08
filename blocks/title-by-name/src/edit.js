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
import minusCircle from './minus-circle';

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
	context: { postType, postId }
} ) {
	const { textAlign } = attributes;

	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);
    const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const courtesyTitle = meta[ '_cjd_courtesy_title' ];
    function updateCourtesyTitle( newValue ) {
        setMeta( { ...meta, _cjd_courtesy_title: newValue.trim() } );
    }

    const firstName = meta[ '_cjd_first_name' ];
    function updateFirstName( newValue ) {
        setMeta( { ...meta, _cjd_first_name: newValue.trim() } );
    }

	const middleName = meta[ '_cjd_middle_name' ];
    function updateMiddleName( newValue ) {
        setMeta( { ...meta, _cjd_middle_name: newValue.trim() } );
    }

	const lastName = meta[ '_cjd_last_name' ];
    function updateLastName( newValue ) {
        setMeta( { ...meta, _cjd_last_name: newValue.trim() } );
    }

	const nameSuffix = meta[ '_cjd_name_suffix' ];
    function updateNameSuffix( newValue ) {
        setMeta( { ...meta, _cjd_name_suffix: newValue.trim() } );
    }

	const supportsTitleByName = 
		lastName !== undefined ||
		firstName !== undefined ||
		middleName !== undefined
		? true : false;

	const [ includeComma, setIncludeComma ] = useState( false );
	const comma = ",";

	const [ nameOrder, setNameOrder ] = useState( 'fullName' );

	function buildTitleByName( orderType ) {
		let order = [];

		switch ( orderType ) {
			case ( 'fullName' ):
				order = [ 
					courtesyTitle ? courtesyTitle : undefined, 
					firstName ? firstName : undefined,
					middleName ? middleName : undefined, 
					lastName ? lastName : undefined, 
					includeComma && ( lastName && nameSuffix || firstName && nameSuffix ) ? comma : undefined,
					nameSuffix ? nameSuffix : undefined
				];
				break;
			case ( 'lastFirstMiddle' ):
				order = [ 
					lastName ? lastName : undefined, 
					lastName && firstName ? comma : undefined,
					firstName ? firstName : undefined, 
					middleName ? middleName : undefined
				];
				break;
			default:
				break;
		}

		if ( order.length < 1 ) {
			return '';
		}

		return order.reduce( function( pre, next ) {
			if ( pre && next ) {
				if ( 
					next == comma
				) {
					return pre + next;

				} else {
					return pre + " " + next;
				}

			} else if ( ! pre ) {
				return next;

			} else if ( ! next ) {
				return pre;

			}
			return '';
		});
	}

	

	useEffect( () => {
		let mounted = true;

		if ( supportsTitleByName ) {

			const newTitleByName = buildTitleByName( nameOrder );

			if ( mounted ) {
				setTitle( newTitleByName );
			}
		}

		return function cleanup() {
			mounted = false;
		}

	}, [ courtesyTitle, firstName, middleName, lastName, nameSuffix, includeComma, nameOrder, fullTitle, supportsTitleByName ] );

	const className =
		classnames(
			{
				[ `has-text-align-${ textAlign }` ]: textAlign && ! isSelected,
				[ `has-justify-${ textAlign }` ]: textAlign && isSelected,
				[ `has-warning` ]: !supportsTitleByName,
				[ `is-placeholder` ]: !rawTitle && rawTitle !== ''
			}
		);

	const blockProps = useBlockProps( {
		className: className,
	} );

	const courtesyTitleControl = 
		courtesyTitle !== undefined && (
			<>
				<FlexItem>
					<PlainText 
						tagName="h1" 
						value={ courtesyTitle }
						onChange={ updateCourtesyTitle }
						placeholder={ __( 'Title' ) }
						__experimentalVersion={ 2 }
					/>
					<p className="title_by_name__label">
						{ __( 'Courtesy Title' ) }
					</p>
				</FlexItem>
			</>
		);

	const firstNameControl = 
		firstName !== undefined && (
			<>
				<FlexItem>
					<PlainText 
						tagName="h1" 
						value={ firstName }
						onChange={ updateFirstName }
						placeholder={ __( 'First' ) }
						__experimentalVersion={ 2 }
					/>
					<p className="title_by_name__label">
						{ __( 'First' ) }
					</p>
				</FlexItem>
			</>
		);

	const middleNameControl = 
		middleName !== undefined && (
			<>
				<FlexItem>
					<PlainText 
						tagName="h1" 
						value={ middleName }
						onChange={ updateMiddleName }
						placeholder={ __( 'Middle' ) }
						__experimentalVersion={ 2 }
					/>
					<p className="title_by_name__label">
						{ __( 'Middle' ) }
					</p>
				</FlexItem>
			</>
		);

	const lastNameControl = 
		lastName !== undefined && (
			<>
			<FlexItem>
				<Flex 
					expanded="true" 
					align="flex-start"
					gap="0"
					justify="flex-start">
					<FlexItem>
						<PlainText 
							tagName="h1" 
							value={ lastName }
							onChange={ updateLastName }
							placeholder={ __( 'Last' ) }
							__experimentalVersion={ 2 }
						/>
						<p className="title_by_name__label">
							{ __( 'Last' ) }
						</p>
					</FlexItem>
					<FlexItem>
						{ nameOrder === 'fullName' ? (
							<>
								<PlainText 
									tagName="h1" 
									className={ includeComma ? '' : 'disabled'}
									value={ includeComma ? comma : undefined }
									placeholder={ __( ',' ) }
									__experimentalVersion={ 2 }
								/>
								<Button  
									icon={ ! includeComma ? plusCircle : minusCircle } 
									isSmall
									showTooltip 
									label={ includeComma ? __( 'Remove the comma?' ) : __( 'Include a comma?' ) } 
									onClick={ () => setIncludeComma( ! includeComma ) } 
								/>
							</>
						) : (
							<h1>,</h1>
						)}
					</FlexItem>
				</Flex>
			</FlexItem>
			</>
		);

	const nameSuffixControl =
		nameSuffix !== undefined && (
			<>
				<FlexItem>
					<PlainText 
						tagName="h1" 
						value={ nameSuffix }
						onChange={ updateNameSuffix }
						placeholder={ __( 'Suffix' ) }
						__experimentalVersion={ 2 }
					/>
					<p className="title_by_name__label">
						Suffix
					</p>
				</FlexItem>
			</>
		);

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
			<InspectorControls group="block">
				<Panel>
					<PanelBody title="Title by Name Settings">
						<SelectControl
							label={ __( 'Name Order' ) }
							value={ nameOrder }
							options={ [
								{ label: 'Full Name', value: 'fullName' },
								{ label: 'Last, First Middle', value: 'lastFirstMiddle' }
							]}
							onChange={ ( newOrder ) => setNameOrder( newOrder ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);

	return (
		<>
			{ controls }
			{ ! supportsTitleByName ? (
				<div { ...blockProps } >
					<div className="block-editor-warning">
						<div className="block-editor-warning__contents">
							<p className="block-editor-warning__message">
								This post type does not support the Title by Name block.
							</p>
						</div>
					</div>
				</div>
			) : ( 
				isSelected ? (
				<Flex { ...blockProps } 
					wrap="true" 
					expanded="false" 
					gap="28px"
					align="flex-start"
					justify="flex-start">
					{ nameOrder === 'fullName' && (
						<>
						{ courtesyTitleControl }
						{ firstNameControl }
						{ middleNameControl }
						{ lastNameControl }
						{ nameSuffixControl }
						</>
					) }
					{ nameOrder === 'lastFirstMiddle' && (
						<>
						{ lastNameControl }
						{ firstNameControl }
						{ middleNameControl }
						</>
					) }
				</Flex>
			) : (
				<h1 { ...blockProps }>{ rawTitle === '' ? ( <RawHTML key="html">{ __( 'Enter Name...' )}</RawHTML> ) : ( <RawHTML key="html">{ buildTitleByName( nameOrder ) }</RawHTML> ) }</h1>
			))}
		</>
	);
}
