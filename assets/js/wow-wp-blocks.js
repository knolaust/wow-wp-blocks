(function (wp) {
    var el = wp.element.createElement;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var SelectControl = wp.components.SelectControl;
    var RangeControl = wp.components.RangeControl;
    var addFilter = wp.hooks.addFilter;

    // Full list of animations supported by WOW.js (assuming use with Animate.css)
    var wowAnimations = [
        { label: "None", value: "" },
        { label: "Bounce", value: "animate__bounce" },
        { label: "Flash", value: "animate__flash" },
        { label: "Pulse", value: "animate__pulse" },
        { label: "Rubber Band", value: "animate__rubberBand" },
        { label: "Shake", value: "animate__shake" },
        { label: "Swing", value: "animate__swing" },
        { label: "Tada", value: "animate__tada" },
        { label: "Wobble", value: "animate__wobble" },
        { label: "Jello", value: "animate__jello" },
        { label: "Heart Beat", value: "animate__heartBeat" },
        { label: "Back In Down", value: "animate__backInDown" },
        { label: "Back In Left", value: "animate__backInLeft" },
        { label: "Back In Right", value: "animate__backInRight" },
        { label: "Back In Up", value: "animate__backInUp" },
        { label: "Back Out Down", value: "animate__backOutDown" },
        { label: "Back Out Left", value: "animate__backOutLeft" },
        { label: "Back Out Right", value: "animate__backOutRight" },
        { label: "Back Out Up", value: "animate__backOutUp" },
        { label: "Bounce In", value: "animate__bounceIn" },
        { label: "Bounce In Down", value: "animate__bounceInDown" },
        { label: "Bounce In Left", value: "animate__bounceInLeft" },
        { label: "Bounce In Right", value: "animate__bounceInRight" },
        { label: "Bounce In Up", value: "animate__bounceInUp" },
        { label: "Bounce Out", value: "animate__bounceOut" },
        { label: "Bounce Out Down", value: "animate__bounceOutDown" },
        { label: "Bounce Out Left", value: "animate__bounceOutLeft" },
        { label: "Bounce Out Right", value: "animate__bounceOutRight" },
        { label: "Bounce Out Up", value: "animate__bounceOutUp" },
        { label: "Fade In", value: "animate__fadeIn" },
        { label: "Fade In Down", value: "animate__fadeInDown" },
        { label: "Fade In Down Big", value: "animate__fadeInDownBig" },
        { label: "Fade In Left", value: "animate__fadeInLeft" },
        { label: "Fade In Left Big", value: "animate__fadeInLeftBig" },
        { label: "Fade In Right", value: "animate__fadeInRight" },
        { label: "Fade In Right Big", value: "animate__fadeInRightBig" },
        { label: "Fade In Up", value: "animate__fadeInUp" },
        { label: "Fade In Up Big", value: "animate__fadeInUpBig" },
        { label: "Fade Out", value: "animate__fadeOut" },
        { label: "Fade Out Down", value: "animate__fadeOutDown" },
        { label: "Fade Out Down Big", value: "animate__fadeOutDownBig" },
        { label: "Fade Out Left", value: "animate__fadeOutLeft" },
        { label: "Fade Out Left Big", value: "animate__fadeOutLeftBig" },
        { label: "Fade Out Right", value: "animate__fadeOutRight" },
        { label: "Fade Out Right Big", value: "animate__fadeOutRightBig" },
        { label: "Fade Out Up", value: "animate__fadeOutUp" },
        { label: "Fade Out Up Big", value: "animate__fadeOutUpBig" },
        { label: "Flip", value: "animate__flip" },
        { label: "Flip In X", value: "animate__flipInX" },
        { label: "Flip In Y", value: "animate__flipInY" },
        { label: "Flip Out X", value: "animate__flipOutX" },
        { label: "Flip Out Y", value: "animate__flipOutY" },
        { label: "Light Speed In", value: "animate__lightSpeedIn" },
        { label: "Light Speed Out", value: "animate__lightSpeedOut" },
        { label: "Rotate In", value: "animate__rotateIn" },
        { label: "Rotate In Down Left", value: "animate__rotateInDownLeft" },
        { label: "Rotate In Down Right", value: "animate__rotateInDownRight" },
        { label: "Rotate In Up Left", value: "animate__rotateInUpLeft" },
        { label: "Rotate In Up Right", value: "animate__rotateInUpRight" },
        { label: "Rotate Out", value: "animate__rotateOut" },
        { label: "Rotate Out Down Left", value: "animate__rotateOutDownLeft" },
        { label: "Rotate Out Down Right", value: "animate__rotateOutDownRight" },
        { label: "Rotate Out Up Left", value: "animate__rotateOutUpLeft" },
        { label: "Rotate Out Up Right", value: "animate__rotateOutUpRight" },
        { label: "Slide In Up", value: "animate__slideInUp" },
        { label: "Slide In Down", value: "animate__slideInDown" },
        { label: "Slide In Left", value: "animate__slideInLeft" },
        { label: "Slide In Right", value: "animate__slideInRight" },
        { label: "Slide Out Up", value: "animate__slideOutUp" },
        { label: "Slide Out Down", value: "animate__slideOutDown" },
        { label: "Slide Out Left", value: "animate__slideOutLeft" },
        { label: "Slide Out Right", value: "animate__slideOutRight" },
        { label: "Zoom In", value: "animate__zoomIn" },
        { label: "Zoom In Down", value: "animate__zoomInDown" },
        { label: "Zoom In Left", value: "animate__zoomInLeft" },
        { label: "Zoom In Right", value: "animate__zoomInRight" },
        { label: "Zoom In Up", value: "animate__zoomInUp" },
        { label: "Zoom Out", value: "animate__zoomOut" },
        { label: "Zoom Out Down", value: "animate__zoomOutDown" },
        { label: "Zoom Out Left", value: "animate__zoomOutLeft" },
        { label: "Zoom Out Right", value: "animate__zoomOutRight" },
        { label: "Zoom Out Up", value: "animate__zoomOutUp" },
        { label: "Hinge", value: "animate__hinge" },
        { label: "Jack In The Box", value: "animate__jackInTheBox" },
        { label: "Roll In", value: "animate__rollIn" },
        { label: "Roll Out", value: "animate__rollOut" },
    ];    

    // Function to add WOW attribute to block settings
    function addWOWAttribute(settings) {
        if (typeof settings.attributes !== "undefined") {
            settings.attributes = Object.assign(settings.attributes, {
                wowAnimation: {
                    type: "string",
                    default: "",
                },
                wowDuration: {
                    type: "number",
                    default: 1, // Default WOW animation duration in seconds
                },
                // You can add more WOW.js-specific settings if needed
            });
        }

        return settings;
    }

    // Higher Order Component to add WOW controls to Inspector
    var withWOWControl = wp.compose.createHigherOrderComponent(function (
        BlockEdit
    ) {
        return function (props) {
            return el(
                wp.element.Fragment,
                {},
                el(BlockEdit, props),
                el(
                    InspectorControls,
                    {},
                    el(
                        PanelBody,
                        {
                            title: "WOW Animation Settings",
                            initialOpen: true,
                        },
                        el(SelectControl, {
                            label: "WOW Animation",
                            value: props.attributes.wowAnimation,
                            options: wowAnimations,
                            onChange: function (selectedAnimation) {
                                props.setAttributes({ wowAnimation: selectedAnimation });
                            },
                        }),
                        el(RangeControl, {
                            label: "Animation Duration (seconds)",
                            value: props.attributes.wowDuration,
                            onChange: function (newDuration) {
                                props.setAttributes({ wowDuration: newDuration });
                            },
                            min: 0.5,
                            max: 5,
                            step: 0.1,
                        })
                        // Add more WOW.js-specific controls if needed
                    )
                )
            );
        };
    }, "withWOWControl");

    addFilter(
        "blocks.registerBlockType",
        "wow-blocks/add-wow-attribute",
        addWOWAttribute
    );

    addFilter("editor.BlockEdit", "wow-blocks/with-wow-control", withWOWControl);

    // Apply WOW.js classes and data attributes (animation and duration) to block save output
    wp.hooks.addFilter(
        'blocks.getSaveContent.extraProps',
        'wow-blocks/apply-wow-attributes',
        (extraProps, blockType, attributes) => {
            if (attributes.wowAnimation && attributes.wowAnimation !== "") {
                extraProps.className = (extraProps.className || '') + ` wow ${attributes.wowAnimation}`;
                extraProps['data-wow-duration'] = `${attributes.wowDuration}s`;
                // You can add more WOW.js-specific attributes if needed
            }
            return extraProps;
        }
    );

    // Ensure WOW.js is initialized to recognize elements with WOW animations
    document.addEventListener('DOMContentLoaded', function() {
        new WOW().init();
    });

})(window.wp);
