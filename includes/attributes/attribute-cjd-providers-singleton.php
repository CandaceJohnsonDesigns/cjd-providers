<?php
/**
 * Trait for our Singleton pattern.
 *
 * @package CJD_Providers
 */

/**
 * Trait for our Singleton pattern.
 *
 * @since 1.0.0
 */
trait CJD_Providers_Singleton_Attribute {
	/**
	 * The object instance.
	 *
	 * @var Object
	 */
	private static $instance = null;

	/**
	 * Return the plugin instance.
	 *
	 * @return Object
	 */
	public static function register() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Reset the plugin instance.
	 */
	public static function reset() {
		self::$instance = null;
	}
}
