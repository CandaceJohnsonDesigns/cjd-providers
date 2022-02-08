<?php
/**
 * Registers CJD Providers Custom Taxonomies
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
class CJD_Providers_Custom_Taxonomies {
	/**
	 * This plugin's instance.
	 *
	 * @var CJD_Providers_Custom_Taxonomies
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CJD_Providers_Custom_Taxonomies
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CJD_Providers_Custom_Taxonomies();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'create_custom_taxonomies' ), 0 );

		add_action( 'init', array( $this, 'register_credential_acronym_meta') );
		add_action( 'credential_add_form_fields', array( $this, 'credentials_add_term_fields'), 10, 2 );
		add_action( 'credential_edit_form_fields', array( $this, 'credentials_edit_term_fields'), 10, 2 );
		add_action( 'create_credential', array( $this, 'credentials_save_term_fields'), 10, 2 );
		add_action( 'edit_credential', array( $this, 'credentials_save_term_fields'), 10, 2 );

		add_filter( 'manage_edit-credential_columns', array( $this, 'edit_credential_columns'), 10, 3 );
		add_filter( 'manage_credential_custom_column', array( $this, 'manage_credential_custom_column'), 10, 3 );

		add_action( 'init', array( $this, 'register_membership_acronym_meta') );
		add_action( 'membership_add_form_fields', array( $this, 'memberships_add_term_fields'), 10, 2 );
		add_action( 'membership_edit_form_fields', array( $this, 'memberships_edit_term_fields'), 10, 2 );
		add_action( 'create_membership', array( $this, 'memberships_save_term_fields'), 10, 2 );
		add_action( 'edit_membership', array( $this, 'memberships_save_term_fields'), 10, 2 );

		add_filter( 'manage_edit-membership_columns', array( $this, 'edit_membership_columns'), 10, 3 );
		add_filter( 'manage_membership_custom_column', array( $this, 'manage_membership_custom_column'), 10, 3 );
	}

	/**
	 * Registers the taxonomies.
	 *
	 * @access public
	 */
	function create_custom_taxonomies() {

		// Add new "Credential" taxonomy to Providers
		// This array of options controls the labels displayed in the WordPress Admin UI
		$labels = array(
			'name' => _x( 'Credentials', 'taxonomy general name' ),
			'singular_name' => _x( 'Credential', 'taxonomy singular name' ),
			'search_items' =>  __( 'Search Credentials' ),
			'all_items' => __( 'All Credentials' ),
			'not_found' => __( 'No credentials found' ),
            'no_terms' => __( 'No Credentials' ),
			'parent_item' => __( 'Parent Credential' ),
			'parent_item_colon' => __( 'Parent Credential:' ),
			'edit_item' => __( 'Edit Credential' ),
			'update_item' => __( 'Update Credential' ),
			'add_new_item' => __( 'Add New Credential' ),
			'new_item_name' => __( 'New Credential Name' ),
			'menu_name' => __( 'Credentials' ),
			'back_to_items' => __( '&larr; Back to Credentials' ),
		);
	  
		$args = array(
			'hierarchical' => false, // Hierarchical taxonomy (like categories)
			'labels'	=> $labels,
			'public'	=>	true,
			'show_in_rest'	=> true,
			'rewrite' => array(
			'slug' => 'credentials', // This controls the base slug that will display before each term
			'with_front' => false, // Don't display the category base before "/credentials/"
			),
			'show_admin_column' => true,
			'args' => array( 'orderby' => 'term_order' ),
		);
		
		register_taxonomy('credential', 'provider', $args);

		// Add new "Membership" taxonomy to Providers
		// This array of options controls the labels displayed in the WordPress Admin UI
		$labels = array(
			'name' => _x( 'Memberships', 'taxonomy general name' ),
			'singular_name' => _x( 'Membership', 'taxonomy singular name' ),
			'search_items' =>  __( 'Search Memberships' ),
			'all_items' => __( 'All Memberships' ),
			'not_found' => __( 'No memberships found' ),
			'no_terms' => __( 'No Memberships' ),
			'parent_item' => __( 'Parent Membership' ),
			'parent_item_colon' => __( 'Parent Membership:' ),
			'edit_item' => __( 'Edit Membership' ),
			'update_item' => __( 'Update Membership' ),
			'add_new_item' => __( 'Add New Membership' ),
			'new_item_name' => __( 'New Membership Name' ),
			'menu_name' => __( 'Memberships' ),
			'back_to_items' => __( '&larr; Back to Memberships' ),
		);
	  
		$args = array(
			'hierarchical' => false, // Hierarchical taxonomy (like categories)
			'labels'	=> $labels,
			'public'	=>	true,
			'show_in_rest'	=> true,
			'rewrite' => array(
			'slug' => 'memberships', // This controls the base slug that will display before each term
			'with_front' => false, // Don't display the category base before "/memberships/"
			),
			'show_admin_column' => true,
			'args' => array( 'orderby' => 'term_order' ),
		);
		
		register_taxonomy('membership', 'provider', $args);
	}

	function register_credential_acronym_meta() {
		register_term_meta( 'credential', 'acronym', [
			'type' => 'string',
			'description' => 'The acronym for the credential.',
			'single' => true,
			'show_in_rest' => [
                'schema' => [
                    'type' => 'string',
                        'format' => 'url',
                        'context' => ['view', 'edit'],
                        'readonly' => true,
                ]
            ],
		]);
	}

	// A callback function to add an acronym custom field to our 'Credential' taxonomy  
	function credentials_add_term_fields() {  
		?>
		<div class="form-field credential-acronym-wrap">
			<label for="credential-acronym"><?php _e( 'Acronym', 'cjd-providers' ); ?></label>
			<?php wp_nonce_field( basename( __FILE__ ), 'credential_acronym_nonce' ); ?>
			<input type="text" name="credential_acronym" id="credential-acronym" value="" class="credential-acronym-field" />
			<p class="description"><?php _e('The acronym for the credential'); ?> 
		</div>
		
	<?php
	}

	// A callback function to edit an acronym custom field to our 'Credential' taxonomy  
	function credentials_edit_term_fields( $term ) {  
		// Check for existing taxonomy meta for the term you're editing  
		$value = get_term_meta( $term->term_id, 'acronym', true );
		$value = sanitize_text_field( $value );

		if ( ! $value )
        	$value = ""; ?>  
		
		<tr class="form-field credential-acronym-wrap">
			<th scope="row"><label for="credential-acronym"><?php _e( 'Credential Acronym', 'cjd-providers' ); ?></label></th>
			<td>
				<?php wp_nonce_field( basename( __FILE__ ), 'credential_acronym_nonce' ); ?>
				<input type="text" name="credential_acronym" id="credential-acronym" value="<?php echo esc_attr( $value ); ?>" class="credential-acronym-field"  />
				<p class="description"><?php _e('The acronym for the credential'); ?> </p>
			</td>
    	</tr>	
	<?php
	}

	// A callback function to save our extra taxonomy field(s)  
	function credentials_save_term_fields( $term_id ) {  
		// verify the nonce --- remove if you don't care
		if ( ! isset( $_POST['credential_acronym_nonce'] ) || ! wp_verify_nonce( $_POST['credential_acronym_nonce'], basename( __FILE__ ) ) )
        return;

		$old_value  = get_term_meta( $term_id, 'acronym', true );
		$new_value = isset( $_POST['credential_acronym'] ) ? sanitize_text_field( $_POST['credential_acronym'] ) : '';

		if ( $old_value && '' === $new_value )
			delete_term_meta( $term_id, 'acronym' );

		else if ( $old_value !== $new_value )
			update_term_meta( $term_id, 'acronym', $new_value );
	} 
	
	// MODIFY COLUMNS (add our meta to the list)

	function edit_credential_columns( $columns ) {

		$columns['acronym'] = __( 'Acronym', 'cjd-providers' );

		return $columns;
	}

	// RENDER COLUMNS (render the meta data on a column)

	function manage_credential_custom_column( $out, $column, $term_id ) {

		if ( 'acronym' === $column ) {

			$value = get_term_meta( $term_id, 'acronym', true );
			$value = sanitize_text_field( $value );

			if ( ! $value )
				$value = '';

			$out = sprintf( '<span class="credential-acronym-block" style="" >%s</div>', esc_attr( $value ) );
		}

		return $out;
	}


	function register_membership_acronym_meta() {
		register_term_meta( 'membership', 'acronym', [
			'type' => 'string',
			'description' => 'The acronym for the membership organization.',
			'single' => true,
			'show_in_rest' => [
                'schema' => [
                    'type' => 'string',
                    'format' => 'url',
                    'context' => ['view', 'edit'],
                    'readonly' => true,
                ]
            ],
		] );
	}

	// A callback function to add an acronym custom field to our 'Membership' taxonomy  
	function memberships_add_term_fields() {  
	?>
		<div class="form-field membership-acronym-wrap">
			<label for="membership-acronym"><?php _e( 'Membership Acronym', 'cjd-providers' ); ?></label>
			<?php wp_nonce_field( basename( __FILE__ ), 'membership_acronym_nonce' ); ?>
			<input type="text" name="membership_acronym" id="membership-acronym" value="" class="membership-acronym-field" />
			<p class="description"><?php _e('The acronym for the membership'); ?> 
		</div>
		
	<?php
	}

	// A callback function to edit an acronym custom field to our 'Membership' taxonomy  
	function memberships_edit_term_fields( $term ) {  
		// Check for existing taxonomy meta for the term you're editing  
		$value = get_term_meta( $term->term_id, 'acronym', true );
		$value = sanitize_text_field( $value );

		if ( ! $value )
        	$value = ""; ?>  
		
		<tr class="form-field membership-acronym-wrap">
			<th scope="row"><label for="membership-acronym"><?php _e( 'Membership Acronym', 'cjd-providers' ); ?></label></th>
			<td>
				<?php wp_nonce_field( basename( __FILE__ ), 'membership_acronym_nonce' ); ?>
				<input type="text" name="membership_acronym" id="membership-acronym" value="<?php echo esc_attr( $value ); ?>" class="membership-acronym-field"  />
				<p class="description"><?php _e('The acronym for the membership'); ?> </p>
			</td>
    	</tr>	
	<?php
	}

	// A callback function to save our extra taxonomy field(s)  
	function memberships_save_term_fields( $term_id ) {  
		// verify the nonce --- remove if you don't care
		if ( ! isset( $_POST['membership_acronym_nonce'] ) || ! wp_verify_nonce( $_POST['membership_acronym_nonce'], basename( __FILE__ ) ) )
        return;

		$old_value  = get_term_meta( $term_id, 'acronym', true );
		$new_value = isset( $_POST['membership_acronym'] ) ? sanitize_text_field( $_POST['membership_acronym'] ) : '';

		if ( $old_value && '' === $new_value )
			delete_term_meta( $term_id, 'acronym' );

		else if ( $old_value !== $new_value )
			update_term_meta( $term_id, 'acronym', $new_value );
	} 
	
	// MODIFY COLUMNS (add our meta to the list)

	function edit_membership_columns( $columns ) {

		$columns['acronym'] = __( 'Acronym', 'cjd-providers' );

		return $columns;
	}

	// RENDER COLUMNS (render the meta data on a column)

	function manage_membership_custom_column( $out, $column, $term_id ) {

		if ( 'acronym' === $column ) {

			$value = get_term_meta( $term_id, 'acronym', true );
			$value = sanitize_text_field( $value );

			if ( ! $value )
				$value = '';

			$out = sprintf( '<span class="membership-acronym-block" style="" >%s</div>', esc_attr( $value ) );
		}

		return $out;
	}
}

CJD_Providers_Custom_Taxonomies::register();
