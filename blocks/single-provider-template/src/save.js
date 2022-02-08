/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * WordPress dependencies
  */
 import { 
	useBlockProps,
	useInnerBlocksProps
	} from '@wordpress/block-editor';

  export default function save( { attributes } ) {

	const blockProps = useBlockProps.save( );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );


	 return (
		 <div { ...innerBlocksProps } />
	 );
 }