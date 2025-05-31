import { __ } from "@wordpress/i18n";
import "./editor.scss";

const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const { ToggleControl, SelectControl, PanelBody, PanelRow } = wp.components;

const NumberControl = wp.components.__experimentalNumberControl;


function gutenbergWPTrigJSAttributes(settings) {
    if (typeof settings.attributes !== "undefined") {
        settings.attributes = Object.assign(settings.attributes, {
            gutenbergUseWPTrigJS: {
                type: "boolean",
                default: false,
            },
            gutenbergWPTrigJSAnimation: {
                type: "select",
                default: "trig-fade",
            },
            gutenbergWPTrigJSDirection: {
                type: "select",
                default: "normal backwards",
            },
            gutenbergWPTrigJSTransition: {
                type: "select",
                default: "ease",
            },
            gutenbergWPTrigJSBlend: {
                type: "select",
                default: "up",
            },
            gutenbergWPTrigJSDelay: {
                type: "integer",
                default: 0,
            },
            gutenbergWPTrigJSDuration: {
                type: "integer",
                default: 0,
            },
        });
    }
    return settings;
}

const gutenbergWPTrigJSControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name.substring(0, 5) !== "core/") {
            return (
                <Fragment>
                    <BlockEdit {...props} />
                </Fragment>
            );
        }

        const { attributes, setAttributes, isSelected } = props;

        const {
            gutenbergUseWPTrigJS,
            gutenbergWPTrigJSAnimation,
            gutenbergWPTrigJSDirection,
            gutenbergWPTrigJSTransition,
            gutenbergWPTrigJSBlend,
            gutenbergWPTrigJSDelay,
            gutenbergWPTrigJSDuration,
        } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title={__("WPTrigJS Animation", "gutenberg-wp-trig-js")} initialOpen={ false } >
                            <PanelRow>
                                <ToggleControl
                                    label={__("Animate", "gutenberg-wp-trig-js")}
                                    checked={!!gutenbergUseWPTrigJS}
                                    onChange={() =>
                                        setAttributes({
                                            gutenbergUseWPTrigJS: !gutenbergUseWPTrigJS,
                                        })
                                    }
                                    help={
                                        !!gutenbergUseWPTrigJS
                                            ? __(
                                                    "Animate Element inside viewport",
                                                    "gutenberg-wp-trig-js",
                                              )
                                            : __(
                                                    "Don't animate Element inside viewport",
                                                    "gutenberg-wp-trig-js",
                                              )
                                    }
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    label="Animation"
                                    value={gutenbergWPTrigJSAnimation}
                                    options={[
                                        { label: "None",     value: "" },
                                        { label: "Fade",     value: "trig-fade" },
                                        { label: "Grow",     value: "trig-grow" },
                                        { label: "Pop",      value: "trig-pop" },
                                        { label: "Roll",     value: "trig-roll" },
                                        { label: "Reveal",   value: "trig-reveal", },
                                        { label: "Flip",     value: "trig-flip" },
                                        { label: "Parallax", value: "trig-parallax", },
                                    ]}
                                    onChange={(gutenbergWPTrigJSAnimation) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSAnimation: gutenbergWPTrigJSAnimation,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    label="Direction"
                                    value={gutenbergWPTrigJSDirection}
                                    options={[
                                        { label: "None", value: "" },
                                        { label: "Normal Backwards", value: "normal backwards", },
                                        { label: "Backwards Normal", value: "backwards normal", },
                                    ]}
                                    onChange={(gutenbergWPTrigJSDirection) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSDirection: gutenbergWPTrigJSDirection,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    label="Blend"
                                    value={gutenbergWPTrigJSBlend}
                                    options={[
                                        { label: "None", value: "" },
                                        { label: "Up", value: "up" },
                                        { label: "Left", value: "left" },
                                        { label: "Right", value: "right" },
                                        { label: "Up-Left", value: "up-left" },
                                        { label: "Up-Right", value: "up-right", },
                                        { label: "Down-Left", value: "down-left", },
                                        { label: "Down-Right", value: "down-right", },
                                    ]}
                                    onChange={(gutenbergWPTrigJSBlend) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSBlend: gutenbergWPTrigJSBlend,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    label="Transition"
                                    value={gutenbergWPTrigJSTransition}
                                    options={[
                                        { label: "Ease", value: "ease" },
                                        { label: "Linear", value: "linear" },
                                        { label: "Ease-in", value: "ease-in" },
                                        { label: "Ease-out", value: "ease-out" },
                                        { label: "Ease-in-out", value: "ease-in-out" }
                                    ]}
                                    onChange={(gutenbergWPTrigJSTransition) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSBlend: gutenbergWPTrigJSTransition,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>

                            <PanelRow>
                                <NumberControl
                                    label="Delay (ms)"
                                    min={0}
                                    value={gutenbergWPTrigJSDelay}
                                    onChange={(gutenbergWPTrigJSDelay) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSDelay: gutenbergWPTrigJSDelay,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>

                            <PanelRow>
                                <NumberControl
                                    label="Duration (ms)"
                                    min={0}
                                    value={gutenbergWPTrigJSDuration}
                                    onChange={(gutenbergWPTrigJSDuration) =>
                                        props.setAttributes({
                                            gutenbergWPTrigJSDuration: gutenbergWPTrigJSDuration,
                                        })
                                    }
                                    __next40pxDefaultSize
                                />
                            </PanelRow>
                        </PanelBody>
                    </InspectorControls>
                )}
            </Fragment>
        );
    };
}, "gutenbergWPTrigJSControls");

function gutenbergWPTrigJSApplyAttributes(extraProps, blockType, attributes) {
    if (blockType.name.substring(0, 5) !== "core/") {
        return extraProps;
    }

    const { gutenbergUseWPTrigJS,
            gutenbergWPTrigJSAnimation,
            gutenbergWPTrigJSDirection,
            gutenbergWPTrigJSTransition,
            gutenbergWPTrigJSBlend,
            gutenbergWPTrigJSDelay,
            gutenbergWPTrigJSDuration } = attributes;

    if (typeof(extraProps.className) !== 'undefined' && extraProps.className) {
        const classes = extraProps.className.split(" ").filter(c => !c.startsWith("trig"));
        extraProps.className = classes.join(" ").trim();
    }
    if (typeof(extraProps.style) !== 'undefined' && extraProps.style) {
        for (const key in extraProps.style) {
            if (key.startsWith('--trig')) {
                delete(extraProps.style[key]);
            }
        }
    }
// <div class="trig-fade enable-trig" style="--trig-delay:2s;--trig-duration:10s;--trig-blend:ease-in-out;--trig-direction:reverse forwards;">

    if (typeof gutenbergUseWPTrigJS !== "undefined" && gutenbergUseWPTrigJS) {
        let animationName;
        let direction;
        let blend;
        if (
            typeof gutenbergWPTrigJSAnimation !== "undefined" &&
            gutenbergWPTrigJSAnimation !== ''
        ) {
            console.log("BEFORE: ", extraProps);
            let className = gutenbergWPTrigJSAnimation;
            if (gutenbergWPTrigJSBlend !== '') {
                className = className + '-' + gutenbergWPTrigJSBlend;
            }
            extraProps.className += ' ' + ' ' + className + ' ' + 'enable-trig' + ' ' + 'trig-target';
            if (!('style' in extraProps)) {
                extraProps.style = {};
            }
            if (gutenbergWPTrigJSDelay) {
                extraProps.style['--trig-delay'] = `${gutenbergWPTrigJSDelay}ms`;
            }
            if (gutenbergWPTrigJSDuration) {
                extraProps.style['--trig-duration'] = `${gutenbergWPTrigJSDuration}ms`;
            }
            extraProps.style['--trig-blend'] = gutenbergWPTrigJSTransition;
//            extraProps.style['--trig-blend'] = `${gutenbergWPTrigJSBlend}ms`;
            extraProps.style['--trig-direction'] = gutenbergWPTrigJSDirection;
            /*
            extraProps["data-wp-trig-js"] = gutenbergWPTrigJSAnimation;
            */
            console.log("AFTER: ", extraProps);
        }
    }

    return extraProps;
}

addFilter(
    "blocks.registerBlockType",
    "gutenbergwp-trig-js/attributes",
    gutenbergWPTrigJSAttributes,
);

addFilter(
    "editor.BlockEdit",
    "gutenbergwp-trig-js/controls",
    gutenbergWPTrigJSControls,
);


addFilter(
    "blocks.getSaveContent.extraProps",
    "gutenbergwp-trig-js/applyAttributes",
    gutenbergWPTrigJSApplyAttributes,
);

