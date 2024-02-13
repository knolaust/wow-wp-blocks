<?php
/**
 * Plugin Name: WOW WP Blocks
 * Plugin URI:  https://github.com/knolaust/wow-wp-blocks
 * Description: Adds WOW.js animation controls to Gutenberg blocks.
 * Version:     1.0.0
 * Author:      Knol Aust
 * Author URI:  https://knolaust.com
 */
function wow_wp_blocks_enqueue_assets() {
    // Enqueue Animate.css for animation effects
    wp_enqueue_style('animate-style', plugins_url('node_modules/animate.css/animate.min.css', __FILE__));

    // Enqueue WOW.js script
    wp_enqueue_script('wow-script', plugins_url('node_modules/wowjs/dist/wow.min.js', __FILE__), array(), '1.0.0', true);

    // Dependencies array includes WordPress provided scripts
    $script_dependencies = array('wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-compose', 'wow-script');

    // Enqueue your custom script to handle the WOW.js initialization and WordPress block enhancements
    wp_enqueue_script('wow-wp-blocks-script', plugins_url('assets/js/wow-wp-blocks.js', __FILE__), $script_dependencies, '1.0.0', true);

    // Initialize WOW.js
    wp_add_inline_script('wow-script', 'new WOW().init();');

}
add_action('wp_enqueue_scripts', 'wow_wp_blocks_enqueue_assets');
add_action('enqueue_block_editor_assets', 'wow_wp_blocks_enqueue_assets');
