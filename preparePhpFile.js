const fs = require('fs');
const path = require('path');

// Corrected function name
const modifyPhpEnqueuePaths = () => {
    const sourceFilePath = path.join(__dirname, 'wow-wp-blocks.php');
    const targetDirectory = path.join(__dirname, 'dist');
    const targetFilePath = path.join(targetDirectory, 'wow-wp-blocks.php');

    // Read the content of the source PHP file
    fs.readFile(sourceFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading PHP file:', err);
            return;
        }

        // Define the new enqueue function content
        const newEnqueueFunction = `
            function wow_wp_blocks_enqueue_assets() {
                wp_enqueue_style('wow-wp-blocks', plugins_url('wow-wp-blocks.min.css', __FILE__));
                wp_enqueue_script('wow-wp-blocks-script', plugins_url('wow-wp-blocks.min.js', __FILE__), array(), '1.0.0', true);
                wp_add_inline_script('wow-wp-blocks-script', 'new WOW().init();');
            }
            add_action('wp_enqueue_scripts', 'wow_wp_blocks_enqueue_assets'); 
            add_action('enqueue_block_editor_assets', 'wow_wp_blocks_enqueue_assets');
        `;

        // Regular expression to find the existing wow_wp_blocks_enqueue_assets function
        const enqueueFunctionRegex = /function wow_wp_blocks_enqueue_assets\(\) \{[\s\S]*?\}[\s\S]*?add_action\('enqueue_block_editor_assets', 'wow_wp_blocks_enqueue_assets'\);/g;

        // Replace the existing function with the new one
        let modifiedData = data.replace(enqueueFunctionRegex, newEnqueueFunction.trim());

        // Create the target directory if it doesn't exist
        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
        }

        // Write the modified content back to the target file
        fs.writeFile(targetFilePath, modifiedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing modified PHP file:', writeErr);
            } else {
                // console.log('PHP file prepared for dist.');
            }
        });
    });
};

// Export the correct function
module.exports = {
    modifyPhpEnqueuePaths, // Corrected function name
};
