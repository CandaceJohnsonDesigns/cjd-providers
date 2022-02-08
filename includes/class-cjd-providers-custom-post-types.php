<?php
/**
 * Registers CJD Providers Custom Post Types
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
class CJD_Providers_Custom_Post_Types {

	const CUSTOM_POST_TYPE       = 'providers';

	/**
	 * This plugin's instance.
	 *
	 * @var CJD_Providers_Custom_Post_Types
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CJD_Providers_Custom_Post_Types
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CJD_Providers_Custom_Post_Types();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'create_post_types' ) );
		add_filter( 'enter_title_here', array( $this, 'custom_enter_title') );

		add_image_size( 'cjd-admin-thumb', 100, 125, array('center', 'top') );

		add_filter( sprintf( 'manage_%s_posts_columns', self::CUSTOM_POST_TYPE),       array( $this, 'edit_admin_columns' ) );
		add_filter( sprintf( 'manage_%s_posts_custom_column', self::CUSTOM_POST_TYPE), array( $this, 'image_column'       ), 10, 2 );
	}

	/**
	 * Registers the custom post types.
	 *
	 * @access public
	 */
	function create_post_types() {

		if ( post_type_exists( self::CUSTOM_POST_TYPE ) ) {
			return;
		}

		// Providers Custom Post Type
		register_post_type( self::CUSTOM_POST_TYPE,
			array(
				'labels' => array(
					'name' => __( 'Providers' ),
					'singular_name' => __( 'Provider' ),
					'add_new' => __( 'Add Provider'),
					'add_new_item' => __( 'Add New Provider'),
					'edit_item' => __( 'Edit Provider' ),
					'item_updated' => __( 'Provider updated.'),
					'view_item' => __( 'View Provider' ),
					'view_items' => __( 'View Providers' ),
					'search_items' => __( 'Search Providers' ),
					'not_found' => __( 'No providers found.' ),
					'all_items' => __( 'All Providers' ),

				),
				'public' => true,
				'supports' => array ( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'publicize', 'jetpack_sitemap_post_types' ),
				'taxonomies' => array( 'credential', 'membership' ),
				'hierarchical' => false,
				'menu_position' => 6,
				'capability_type' => 'post',
				'menu_icon' => 'dashicons-businesswoman',
				'show_in_rest' => true
			)
		);
	}


	function custom_enter_title( $input ) {
		if ( 'providers' === get_post_type() ) {
			return __( 'Enter Provider Name...', 'cjd-providers' );
		}
	
		return $input;
	}

	/**
	 * Change ‘Title’ column label
	 * Add Featured Image column
	 */
	function edit_admin_columns( $columns ) {
		// change 'Title' to 'Provider'
		// $columns['title'] = __( 'Provider', 'jetpack' );

		$columns = array(
			'cb' => $columns['cb'],
			'title' => __( 'Provider', 'cjd-providers' ),
			'credential' => __( 'Credentials', 'cjd-providers' ),
			'membership' => __( 'Memberships', 'cjd-providers' ),
		  );

		  if ( current_theme_supports( 'post-thumbnails' ) ) {
			$columns = array(
				'cb' => $columns['cb'],
				'title' => __( 'Provider', 'cjd-providers' ),
				'thumbnail' => __( 'Photo', 'cjd-providers' ),
				'credential' => __( 'Credentials', 'cjd-providers' ),
				'membership' => __( 'Memberships', 'cjd-providers' ),
			  );
		}

		return $columns;
	}

	/**
	 * Add featured image to column
	 */
	function image_column( $column, $post_id ) {
		global $post;
		switch ( $column ) {
			case 'thumbnail':
				echo get_the_post_thumbnail( $post_id, 'cjd-admin-thumb' );
				break;
			case 'credential':
				$credentials = get_the_terms( $post_id, 'credential');
				if ( ! empty( $credentials ) && ! is_wp_error( $credentials ) ) {
					$separator = '';
					foreach ( $credentials as $credential ) {
						echo sprintf( '%s<a href="edit.php?post_type=%s&amp;credential=%s">%s</a>', $separator, self::CUSTOM_POST_TYPE, $credential->slug, $credential->name );
						$separator = ', ';
					}
				} else {
					echo '–';
				}
				break;
			case 'membership':
				$memberships = get_the_terms( $post_id, 'membership');
				if ( ! empty( $memberships ) && ! is_wp_error( $memberships ) ) {
					$separator = '';
					foreach ( $memberships as $membership ) {
						$acronym = get_term_meta( $membership->term_id, 'membership-acronym', true );
						if( $acronym !== '' ) {
							echo sprintf( '%s<a href="edit.php?post_type=%s&amp;membership=%s">%s</a>', $separator, self::CUSTOM_POST_TYPE, $membership->slug, $acronym );
						} else {
							echo sprintf( '%s<a href="edit.php?post_type=%s&amp;membership=%s">%s</a>', $separator, self::CUSTOM_POST_TYPE, $membership->slug, $membership->name );
						}
						$separator = ', ';
					}
				} else {
					echo '–';
				}
				break;
		}
	}
}

CJD_Providers_Custom_Post_Types::register();
