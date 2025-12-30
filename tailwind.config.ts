import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                editor: {
                    bg: "rgb(var(--color-editor-bg) / <alpha-value>)",
                    panel: "rgb(var(--color-editor-panel) / <alpha-value>)",
                    sidebar: "rgb(var(--color-editor-panel) / <alpha-value>)", // Using panel color for sidebar as they are often same
                    border: "rgb(var(--color-editor-border) / <alpha-value>)",
                    line: "rgb(var(--color-editor-line) / <alpha-value>)",
                    selection: "#264F78", // Keep as hex if not in globals
                },
                text: {
                    primary: "rgb(var(--color-text-primary) / <alpha-value>)",
                    muted: "rgb(var(--color-text-muted) / <alpha-value>)",
                    disabled: "#5A5A5A",
                },
                syntax: {
                    keyword: "rgb(var(--color-syntax-keyword) / <alpha-value>)",
                    function: "rgb(var(--color-syntax-function) / <alpha-value>)",
                    variable: "rgb(var(--color-syntax-variable) / <alpha-value>)",
                    string: "rgb(var(--color-syntax-string) / <alpha-value>)",
                    number: "rgb(var(--color-syntax-number) / <alpha-value>)",
                    comment: "rgb(var(--color-syntax-comment) / <alpha-value>)",
                    type: "rgb(var(--color-syntax-type) / <alpha-value>)",
                    error: "rgb(var(--color-syntax-error) / <alpha-value>)",
                },
                enspy: {
                    accent: "rgb(var(--color-enspy-accent) / <alpha-value>)",
                    dark: "rgb(var(--color-enspy-dark) / <alpha-value>)",
                    success: "rgb(var(--color-enspy-success) / <alpha-value>)",
                },
            },
            fontFamily: {
                mono: ["var(--font-ibm-mono)", "monospace"],
                sans: ["var(--font-ibm-sans)", "system-ui"],
            },
        },
    },
    plugins: [],
};

export default config;
