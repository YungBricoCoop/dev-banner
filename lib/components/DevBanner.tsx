import React, { useEffect } from "react";

// interface
/**
 * Props for the DevBanner component.
 * @property {string} [title] - The title to display in the banner. Defaults to "⚠️ DEV MODE ⚠️".
 * @property {string} [pagePrefix] - The prefix to add to the page title in development mode. Defaults to "(DEV)".
 * @property {string} [className] - Additional CSS class names to apply to the banner.
 * @property {React.CSSProperties} [style] - Additional CSS styles to apply to the banner.
 */
interface DevBannerProps {
    isDev: boolean;
    title?: string;
    pagePrefix?: string;
    consoleMessage?: string;
    displayPagePrefix?: boolean;
    displayConsoleMessage?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// constants
const DEFAULT_IS_DEV = false;
const DEFAULT_BANNER_TITLE = "⚠️ DEV MODE ⚠️";
const DEFAULT_PAGE_PREFIX = "(DEV)";
const DEFAULT_CONSOLE_MESSAGE = DEFAULT_BANNER_TITLE;
const DEFAULT_DISPLAY_PAGE_PREFIX = true;
const DEFAULT_DISPLAY_CONSOLE_MESSAGE = true;
const DEFAULT_STYLE: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(255, 235, 59, 0.5)",
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    padding: "0.5rem",
    zIndex: 50,
};
const DEFAULT_CONSOLE_STYLE: string = `
    background: rgba(255, 235, 59, 0.8);
    border: 2px dashed black;
    border-radius: 5px;
    color: black;
    font-weight: bold;
    padding: 4px 8px;
`;

/**
 * A banner component that displays an advisory message when the app is running in development mode.
 * @param {DevBannerProps} props - The component props.
 * @returns {JSX.Element | null} The DevBanner component.
 */
const DevBanner: React.FC<DevBannerProps> = ({
    isDev = DEFAULT_IS_DEV,
    title = DEFAULT_BANNER_TITLE,
    pagePrefix = DEFAULT_PAGE_PREFIX,
    consoleMessage = DEFAULT_CONSOLE_MESSAGE,
    displayPagePrefix = DEFAULT_DISPLAY_PAGE_PREFIX,
    displayConsoleMessage = DEFAULT_DISPLAY_CONSOLE_MESSAGE,
    className,
    style,
}) => {
    // automatically add a prefix to the page title
    useEffect(() => {
        if (!isDev || document.title.startsWith(pagePrefix)) return;
        if (displayPagePrefix) {
            document.title = `${pagePrefix} ${document.title}`;
        }
    }, [isDev, pagePrefix, displayPagePrefix]);

    useEffect(() => {
        if (!isDev) return;
        if (displayConsoleMessage) {
            console.log(`%c${consoleMessage}`, DEFAULT_CONSOLE_STYLE);
        }
    }, [isDev, consoleMessage, displayConsoleMessage]);

    if (!isDev) return null;

    return (
        <div className={className} style={{ ...DEFAULT_STYLE, ...style }}>
            {title}
        </div>
    );
};

export default DevBanner;
