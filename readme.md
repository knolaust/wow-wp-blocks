# WOW WP Blocks

**Contributors:** Knol Aust  
**Tags:** animations, wow.js, animate.css, gutenberg, blocks  
**Requires at least:** 5.0  
**Tested up to:** 5.9  
**Requires PHP:** 7.0  
**Stable tag:** 1.0.0  
**License:** GPLv2 or later  
**License URI:** [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html)

Adds WOW.js animation controls to Gutenberg blocks, enhancing your WordPress site's interactivity and visual appeal.

## Description

The WOW WP Blocks plugin integrates WOW.js animations with the WordPress Gutenberg editor, allowing you to easily apply stunning animations to your blocks as they scroll into view. This plugin utilizes WOW.js and Animate.css to bring your website to life, ensuring your content captures the attention of your visitors.

## Installation

1. Download the `wow-wp-blocks.zip` file to your computer.
2. Log in to your WordPress dashboard and navigate to Plugins > Add New.
3. Click the 'Upload Plugin' button at the top of the page.
4. Select the `wow-wp-blocks.zip` file from your computer and click 'Install Now'.
5. Once the plugin is uploaded and installed, click on the 'Activate Plugin' link to activate it.
6. You're done! The WOW WP Blocks plugin is now installed and activated. You can start adding animations to your Gutenberg blocks through the block settings.

## Usage

1. Edit a page or post with the Gutenberg editor.
2. Select a block that you want to animate.
3. In the right-hand side panel, under 'Block' settings, you will find the 'WOW Animation Settings'.
4. Choose your desired animation and set the duration.
5. Update or publish your post/page to see the animations in action.

## Build Process

To build the distribution files for the plugin, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Navigate to the plugin directory in your terminal.
3. Run `npm install` or `yarn install` to install the required dependencies.
4. After the dependencies are installed, run `npm run build` or `yarn build`.
5. This will generate a `dist` directory with the updated, combined, minified PHP, JS, and CSS files ready for distribution.

## Frequently Asked Questions

### Can I use this plugin with any WordPress theme?

Yes, WOW WP Blocks is designed to work with any theme that supports the Gutenberg editor.

### Do I need to manually add WOW.js and Animate.css files?

No, the plugin automatically enqueues all necessary scripts and styles for WOW.js and Animate.css.

### How can I customize the animation effects?

Animation effects can be customized via the Gutenberg block settings panel for each block. You can select different animations and adjust their duration.

## Changelog

### 1.0.0
- Initial release. Adds WOW.js animation controls to Gutenberg blocks.

## Upgrade Notice

### 1.0.0
Initial Release
