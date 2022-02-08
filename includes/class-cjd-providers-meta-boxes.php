<?php
/**
 * Registers CJD Providers Meta Boxes
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 1.0.0
 */
class CJD_Providers_Meta_Boxes {
	/**
	 * This plugin's instance.
	 *
	 * @var CJD_Providers_Meta_Boxes
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CJD_Providers_Meta_Boxes
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CJD_Providers_Meta_Boxes();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_custom_post_meta' ) );
	}

	/**
	 * Sets up and adds the meta boxes.
	 *
	 * @access public
	 */

	 function register_custom_post_meta() {
	 	$screens = [ 'providers' ];

		register_post_meta( 'providers', '_cjd_last_name', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		) );

		register_post_meta( 'providers', '_cjd_first_name', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		) );

		register_post_meta( 'providers', '_cjd_courtesy_title', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		) );

		register_post_meta( 'providers', '_cjd_name_suffix', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		) );

		register_post_meta( 'providers', 'cjd_job_title', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'auth_callback' => function() {
        	    return current_user_can( 'edit_posts' );
            }
        ) );
	 }

}

CJD_Providers_Meta_Boxes::register();
