<?php
/**
 * Run on plugin install.
 *
 * @package CDJ_Providers
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CJD_Providers_Install Class
 */
class CJD_Providers_Install {

	/**
	 * Constructor
	 */
	public function __construct() {
		register_activation_hook( CJD_PROVIDERS_PLUGIN_FILE, array( $this, 'register_defaults' ) );
	}

	/**
	 * Register plugin defaults.
	 */
	public function register_defaults() {
		if ( is_admin() ) {
			if ( ! get_option( 'cjd_providers_date_installed' ) ) {
				add_option( 'cjd_providers_date_installed', gmdate( 'Y-m-d h:i:s' ) );
			}
		}
	}
}

return new CJD_Providers_Install();
