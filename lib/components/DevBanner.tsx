import React, { useEffect } from "react";

// interface
interface DevBannerProps {
    title?: string;
    pagePrefix?: string;
    className?: string;
    style?: React.CSSProperties;
}

// constants
const IS_PROD = false;
const DEFAULT_BANNER_TITLE = "⚠️ DEV MODE ⚠️";
const DEFAULT_PAGE_PREFIX = "(DEV)";
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

const DevBanner: React.FC<DevBannerProps> = ({
    title = DEFAULT_BANNER_TITLE,
    pagePrefix = DEFAULT_PAGE_PREFIX,
    className,
    style,
}) => {
    // automatically add a prefix to the page title
    useEffect(() => {
        if (!IS_PROD && !document.title.startsWith(pagePrefix)) {
            document.title = `${pagePrefix} ${document.title}`;
        }
    }, [pagePrefix]);

    if (IS_PROD) return null;

    return (
        <div className={className} style={{ ...DEFAULT_STYLE, ...style }}>
            {title}
        </div>
    );
};

export default DevBanner;
