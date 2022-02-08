<?php

/**
 * PROVIDERS CUSTOM POST TYPE
 * 
 * @package             CJDProviders
 * @author              Candace Johnson Designs
 * @copyright           2021 Candace Johnson Designs
 * @license             GPL-2.0-or-later
 * 
 *@wordpress-plugin
 * Plugin Name:         Providers
 * Description:         A Providers package that includes a custom post type and a custom taxonomies for credentials, memberships, and medical specialities. 
 * Version:             1.0.0
 * Text Domain:         cjd-providers
 * Author:              Candace Johnson Designs
 * License:             GPL v2 or later
 * License URI:         http://www.gnu.org/licenses/gpl-2.0.txt
 * Author URI:          http://candacejohnsondesigns.com
 */


defined( 'ABSPATH' ) || exit;

define( 'CJD_PROVIDERS_VERSION', '1.0.0' );
define( 'CJD_PROVIDERS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CJD_PROVIDERS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CJD_PROVIDERS_PLUGIN_FILE', __FILE__ );
define( 'CJD_PROVIDERS_PLUGIN_BASE', plugin_basename( __FILE__ ) );

if ( ! class_exists( 'CJD_Providers' ) ) :

    /**
     * CJD Providers plugin class.
     * 
     * @since 1.0.0
     */
    final class CJD_Providers {
        /**
         * This plugin's instance.
         * 
         * @var CJD_Providers
         * @since 1.0.0
         */
        private static $instance;

        /**
		 * Main CJD_Providers Instance.
		 *
		 * Insures that only one instance of CJD_Providers exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @return object|CJD_Providers The one and only CJD_Providers
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof CJD_Providers ) ) {
				self::$instance = new CJD_Providers();
				self::$instance->init();
				self::$instance->includes();
			}
			return self::$instance;
		}

        /**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'cjd-providers' ), '1.0' );
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'cjd-providers' ), '1.0' );
		}

        /**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			// Attributes.
			require_once CJD_PROVIDERS_PLUGIN_DIR . 'includes/attributes/attribute-cjd-providers-singleton.php';

			require_once CJD_PROVIDERS_PLUGIN_DIR . 'includes/class-cjd-providers-custom-post-types.php';
			require_once CJD_PROVIDERS_PLUGIN_DIR . 'includes/class-cjd-providers-meta-boxes.php';
			require_once CJD_PROVIDERS_PLUGIN_DIR . 'includes/class-cjd-providers-custom-taxonomies.php';



			if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
				require_once CJD_PROVIDERS_PLUGIN_DIR . 'includes/admin/class-cjd-providers-install.php';
			}
		}

        /**
		 * Load actions
		 *
		 * @return void
		 */
		private function init() {
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 99 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_localization' ) );
			add_action( 'init', array( $this, 'cjd_providers_blocks_init' ) );
		}

        /**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'cjd-providers', false, basename( CJD_PROVIDERS_PLUGIN_DIR ) . '/languages' );
		}

		/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		public function block_localization() {
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'cjd-providers-editor', 'cjd-providers', CJD_PROVIDERS_PLUGIN_DIR . '/languages' );
			}
		}

		/**
		 * Registers the block using the metadata loaded from the `block.json` file.
		 * Behind the scenes, it registers also all assets so they can be enqueued
		 * through the block editor in the corresponding context.
		 *
		 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
		 */
		function cjd_providers_blocks_init() {

			// automatically load dependencies and version
			$asset_file = include( plugin_dir_path( __FILE__ ) . 'blocks/provider-directory/build/index.asset.php');
		
			wp_register_script(
				'cjd-blocks-provider-directory',
				plugins_url( 'blocks/provider-directory/build/index.js', __FILE__ ),
				$asset_file['dependencies'],
				$asset_file['version']
			);

			register_block_type( 
				plugin_dir_path( __FILE__ ) . 'blocks/provider-directory/',
				array(
					'api_version' => 2,
					'attributes' => array(
						'displayJobTitle' => array(
							'type' => 'boolean',
							'default' => 'true'
						),
						'displayProviderPhoto' => array(
							'type' => 'boolean',
							'default' => 'true'
						)
					),
					'editor_script' => 'cjd-blocks-provider-directory',
					'render_callback' => array( $this, 'render_cjd_blocks_provider_directory' )
				)
			);

			// automatically load dependencies and version
			$asset_file = include( plugin_dir_path( __FILE__ ) . 'blocks/title-by-name/build/index.asset.php');
		
			wp_register_script(
				'cjd-blocks-title-by-name',
				plugins_url( 'blocks/title-by-name/build/index.js', __FILE__ ),
				$asset_file['dependencies'],
				$asset_file['version']
			);

			register_block_type( 
				plugin_dir_path( __FILE__ ) . 'blocks/title-by-name/',
				array(
					'api_version' => 2,
					'attributes' => array(
						'textAlign' => array(
							'type' => 'string',
							'default' => 'left'
						)
					),
					'editor_script' => 'cjd-blocks-title-by-name',
					'render_callback' => array( $this, 'render_cjd_blocks_title_by_name' )
				)
			);

			// automatically load dependencies and version
            $asset_file = include( plugin_dir_path( __FILE__ ) . 'blocks/job-title/build/index.asset.php');

            wp_register_script(
                'cjd-blocks-job-title',
                plugins_url( 'blocks/job-title/build/index.js', __FILE__ ),
                $asset_file['dependencies'],
                $asset_file['version']
            );

            register_block_type(
                plugin_dir_path( __FILE__ ) . 'blocks/job-title/',
            	array(
            	    'api_version' => 2,
            		'attributes' => array(
            		    'textAlign' => array(
            			    'type' => 'string',
            			    'default' => 'left'
            			)
            		),
            		'editor_script' => 'cjd-blocks-job-title',
            		'render_callback' => array( $this, 'render_cjd_blocks_job_title' )
            	)
            );

			//register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/single-provider-template/' );

			// automatically load dependencies and version
			$asset_file = include( plugin_dir_path( __FILE__ ) . 'blocks/medical-specialties/build/index.asset.php');
		
			wp_register_script(
				'cjd-blocks-medical-specialties',
				plugins_url( 'blocks/medical-specialties/build/index.js', __FILE__ ),
				$asset_file['dependencies'],
				$asset_file['version']
			);

			register_block_type( 
				plugin_dir_path( __FILE__ ) . 'blocks/medical-specialties/',
				array(
					'api_version' => 2,
					'attributes' => array(
						'term' => array(
							'type' => 'string'
						),
						'isInline' => array(
							'type' => 'boolean',
							'default' => true
						),
						'displayAcronym' => array(
                            'type' => 'boolean',
                            'default' => true
                        ),
						'textAlign' => array(
							'type' => 'string'
						),
						'separator' => array(
							'type' => 'string',
							'default' => ', '
						)
					),
					'editor_script' => 'cjd-blocks-medical-specialties',
					'render_callback' => array( $this, 'render_cjd_blocks_medical_specialties' )
				)
			);
		}

		function render_cjd_blocks_title_by_name( $block_attributes, $content ) {

			$lastName = get_post_meta( get_the_ID(), '_cjd_last_name', true );
			$firstName = get_post_meta( get_the_ID(), '_cjd_first_name', true );
			$middleName = get_post_meta( get_the_ID(), '_cjd_middle_name', true );
			
			$title = get_the_title();

			$align_class_name = empty( $block_attributes['textAlign'] ) ? '' : "has-text-align-{$block_attributes['textAlign']}";
			$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) );

			if ( ! $lastName && ! $firstName && ! $middleName ) {
				return '';
			}

			return sprintf(
				'<h1 %1$s>%2$s</h1>',
				$wrapper_attributes,
				$title
			);
		}

		function render_cjd_blocks_job_title( $block_attributes, $content ) {

            $jobTitle = get_post_meta( get_the_ID(), 'cjd_job_title', true );

        	$align_class_name = empty( $block_attributes['textAlign'] ) ? '' : "has-text-align-{$block_attributes['textAlign']}";
        	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) );

        	if ( ! $jobTitle ) {
        	    return '';
        	}

        	return sprintf(
        		'<p %1$s>%2$s</p>',
        	    $wrapper_attributes,
        	    $jobTitle
            );
        }

		function render_cjd_blocks_medical_specialties( $block_attributes, $content ) {

		    $taxonomy = get_taxonomy( $block_attributes['term'] );
			$terms = get_the_terms( get_the_ID(), $block_attributes['term'] );

            if ( $terms && ! is_wp_error( $terms ) ) {
                $term_links = array();

                if ( $block_attributes['isInline'] ) {

                    $separator =
                        trim( $block_attributes['separator'] ) != ';' &&
                        trim( $block_attributes['separator'] ) != ',' ?
                        ' ' : '';
                    $separator .= trim( $block_attributes['separator'] );
                    $separator .= ' ';

                    foreach ( $terms as $term ) {

                        $term_name =
                            $block_attributes['displayAcronym'] &&
                            get_term_meta( $term->term_id, 'acronym', true ) ?
                                get_term_meta( $term->term_id, 'acronym', true ) :
                                $term->name;

                        $term_links[] =
                            '<a href="' . esc_attr( get_term_link( $term->slug, $block_attributes['term'] ) ) . '">' .
                            __( $term_name ) .
                            '</a>';
                    }
                    $term_list = join( $separator, $term_links );

                    return sprintf(
                        '<p %1$s>%2$s</p>',
                        get_block_wrapper_attributes(),
                        __( $term_list )
                    );

                } else {
                    foreach ( $terms as $term ) {
                        $term_name =
                            $block_attributes['displayAcronym'] &&
                            get_term_meta( $term->term_id, 'acronym', true ) ?
                                get_term_meta( $term->term_id, 'acronym', true ) :
                                $term->name;

                        $term_links[] =
                            '<li><a href="' . esc_attr( get_term_link( $term->slug, $block_attributes['term'] ) ) . '">' .
                            __( $term_name ) .
                            '</a></li>';
                    }
                    $term_list = join( '', $term_links );

                    return sprintf(
                        '<ul %1$s>%2$s</ul>',
                        get_block_wrapper_attributes(),
                        __( $term_list )
                    );
                }
			} else {
			    return $content;
			}
		}

		function render_cjd_blocks_provider_directory( $block_attributes, $content ) {

			$displayProviderPhoto = $block_attributes['displayProviderPhoto'];
			$displayJobTitle = $block_attributes['displayJobTitle'];

			$args = array(
			'post_type'=> 'providers',
			'meta_query' => array(
				'relation' => 'AND',
				'query_last_name' => array(
					'key' => '_cjd_last_name',
				),
				'query_first_name' => array(
					'key' => '_cjd_first_name',
				), 
			),
			'orderby' => array( 
				'query_last_name' => 'ASC',
				'query_first_name' => 'ASC',
			),
		); 
		
		$query = new WP_Query( $args );
		if ( $query->have_posts() ) :  
			$num_without_photos = 0;
			$directory = '';
			$directory_with_photo = '<ul class="provider-directory">';
			$directory_without_photo = '<ul class="missing-provider-photo"><h5 class="subhead">Photo Unavailable:</h5>';

			if ( ! $displayProviderPhoto ) {
				$directory .= '<ul class="provider-directory no-photo">';
			}

			while ( $query->have_posts() ) : $query->the_post();
				$provider_listing = ''; 
				$provider_id = get_the_ID();
				$permalink = esc_url( get_permalink( $provider_id ));
				$title = esc_html( get_the_title( $provider_id ) );
				$credentials = get_the_terms( $provider_id, 'credential');
				$jobTitle = get_post_meta( $provider_id, 'cjd_job_title', true);

				if ( $displayProviderPhoto && has_post_thumbnail() ) :
					$num_without_photos++;

					$provider_listing .= '<li class="provider"><a href="' . $permalink . '">';

					$img_url = get_the_post_thumbnail_url($provider_id, 'large');
					$provider_listing .= '<figure class="provider-photo"><img src="' . $img_url . '" /></figure>'; 

					$provider_listing .= '<div class="provider-info"><h6 class="provider-name">' . $title . '</h6>';

					if ( $displayJobTitle && $jobTitle ) {
						$provider_listing .= '<p class="provider-job-title">';
// 						$separator = '';
// 						foreach( $credentials as $credential ) {
// 							$provider_listing .=  $separator . $credential->name;
// 							$separator = ', ';
// 						}
						$provider_listing .= $jobTitle;
						$provider_listing .= '</p>';
					}


					$provider_listing .= '</div></a></li>';

					$directory_with_photo .= $provider_listing;

				elseif ( $displayProviderPhoto && ! has_post_thumbnail() ):
					$provider_listing .= '<li class="provider no-photo"><a href="' . $permalink . '">';
					$provider_listing .= '<h6 class="provider-name">' . $title . '</h6>';

					if ( $displayJobTitle && $jobTitle ) {
						$provider_listing .= '<p class="provider-job-title">';
// 						$separator = '';
// 						foreach( $credentials as $credential ) {
// 							$provider_listing .=  $separator . $credential->name;
// 							$separator = ', ';
// 						}
                        $provider_listing .= $jobTitle;
						$provider_listing .= '</p>';
					}

					$directory_without_photo .= $provider_listing;
				else:

					$provider_listing .= '<li class="provider"><a href="' . $permalink . '">';
					$provider_listing .= '<div class="provider-info"><h6 class="provider-name">' . $title . '</h6>';

					if ( $displayJobTitle && $credentials ) {
						$provider_listing .= '<p class="credentials">';
						$separator = '';
						foreach( $credentials as $credential ) {
							$provider_listing .=  $separator . $credential->name;
							$separator = ', ';
						}
						$provider_listing .= '</p>';
					}

					$provider_listing .= '</div></a></li>';

					$directory .= $provider_listing;
				endif;

			endwhile;

			if ( ! $displayProviderPhoto ) {
				$directory .= '</ul>';
			}

			$directory_without_photo .= '</ul>';

			$directory_with_photo = $directory_with_photo . 
				( $num_without_photos >= 1 ?
				$directory_without_photo
				: '') . '</ul>';

			$directory .= $directory_with_photo;
			wp_reset_postdata(); 
		else: 
			$directory = null;
		endif;

		return $directory;
		}
	}
endif;   

/**
 * The main function for that returns CJD Providers
 *
 * The main function responsible for returning the only CJD Providers
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $CJD_Providers = CJD_Providers(); ?>
 *
 * @since 1.0.0
 * @return object|CJD_Providers The one and only CJD_Providers
 */
function CJD_Providers() {
	return CJD_Providers::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if ( function_exists( 'is_multisite' ) && is_multisite() ) {
	add_action( 'plugins_loaded', 'cjd-providers', 90 );
} else {
	CJD_Providers();
}
