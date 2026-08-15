/** @type {import('tailwindcss').Config} */
module.exports = {

  theme: {
    extend: {
      "colors": {
        "on-primary-container": "#858383",
        "on-surface-variant": "#444748",
        "on-tertiary-fixed": "#151c27",
        "surface": "#f9f9f9",
        "on-error": "#ffffff",
        "on-secondary-container": "#626566",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#1c1b1b",
        "inverse-on-surface": "#f0f1f1",
        "surface-tint": "#5f5e5e",
        "on-primary-fixed-variant": "#474646",
        "tertiary-container": "#151c27",
        "error-container": "#ffdad6",
        "tertiary-fixed-dim": "#c0c7d6",
        "secondary-container": "#e1e3e4",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#c8c6c5",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#dce2f3",
        "surface-variant": "#e2e2e2",
        "background": "#f9f9f9",
        "primary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#c5c7c8",
        "on-secondary-fixed": "#191c1d",
        "surface-container": "#eeeeee",
        "on-tertiary-fixed-variant": "#404754",
        "outline-variant": "#c4c7c7",
        "surface-bright": "#f9f9f9",
        "inverse-primary": "#c8c6c5",
        "secondary-fixed": "#e1e3e4",
        "surface-container-low": "#f3f3f4",
        "on-tertiary-container": "#7d8492",
        "outline": "#747878",
        "surface-container-high": "#e8e8e8",
        "tertiary": "#000000",
        "surface-dim": "#dadada",
        "primary-container": "#1c1b1b",
        "on-background": "#1a1c1c",
        "secondary": "#5c5f60",
        "inverse-surface": "#2f3131",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed-variant": "#454748",
        "on-surface": "#1a1c1c",
        "on-secondary": "#ffffff",
        "on-primary": "#ffffff",
        "surface-container-highest": "#e2e2e2",
        "primary": "#000000"
      },
      "borderRadius": {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-md": "24px",
        "unit": "8px",
        "margin-desktop": "64px",
        "container-max": "1280px",
        "stack-lg": "48px",
        "margin-mobile": "24px",
        "stack-sm": "12px",
        "gutter": "32px"
      },
      "fontFamily": {
        "headline-md": ["Inter"],
        "body-lg": ["Inter"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "label-sm": ["Inter"],
        "display-lg": ["Inter"],
        "label-md": ["Inter"],
        "headline-lg": ["Inter"]
      },
      "fontSize": {
        "headline-md": ["24px", { "lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "500" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "1.4", "letterSpacing": "0.04em", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-md": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.02em", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }]
      }
    }
  }

};