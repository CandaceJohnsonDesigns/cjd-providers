/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import Edit from './edit';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'cjd-blocks/job-title', {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
