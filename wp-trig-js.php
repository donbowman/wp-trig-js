<?php
/**
 * Plugin Name:       Trig.js Scroll Animations
 * Description:       Animate on scroll via Trig.js
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Don
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-trig-js
 *
 * @package CreateBlock
 */

namespace dab\gutenberg\wp_trig_js;

class wp_trig_js {

	/**
	 * Static variable for instanciation
	 */
	protected static $instance = null;

	/**
	 * Get current Instance
	 */
	public static function getInstance() {
            if ( null === self::$instance ) {
                self::$instance = new self;
            }
            return self::$instance;
        }

	protected function __clone() {}

	protected function __construct() {
            $this->define_constants();
            // Init Plugin
            add_action( 'plugins_loaded', [ $this, 'init' ] );
	}

	function define_constants() {
            if ( ! defined( 'gutenberg_wp_trig_js_plugin_url' ) ) {
                define( 'gutenberg_wp_trig_js_plugin_url', plugin_dir_url( __FILE__ ) );
            }
	}

	function init() {
            // Enqueue Editor Scripts
            add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 202 );

            // Register FrontEnd Scripts
            add_action( 'init', [ $this, 'register_wp_trig_js_script' ] );

            // Enqueue FrontEnd Scripts
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_wp_trig_js_script' ] );
	}

	function enqueue_block_editor_assets() {
            wp_enqueue_script(
                'block-wp_trig_js-support',
                gutenberg_wp_trig_js_plugin_url . 'build/wp-trig-js/index.js',
                [
                    'wp-blocks',
                    'wp-i18n',
                    'wp-element',
                    'wp-plugins',
                    'wp-components',
                    'wp-edit-post',
                    'wp-api',
                    'wp-editor',
                    'wp-hooks'
                ],
            );
        }

	function register_wp_trig_js_script() {
            wp_register_script(
                'wp_trig_js',
                gutenberg_wp_trig_js_plugin_url . 'build/wp-trig-js/view.js',
                [],
                null,
                true
            );

            wp_register_style(
                'wp_trig_js',
                gutenberg_wp_trig_js_plugin_url . 'build/wp-trig-js/view.css',
                [],
                null,
                    'all'
            );
        }

	function enqueue_wp_trig_js_script() {
            global $post;
            if (str_contains($post->post_content, "enable-trig")) {
                wp_enqueue_script('wp_trig_js');
                wp_enqueue_style('wp_trig_js');
            }
	}
}

wp_trig_js::getInstance();
