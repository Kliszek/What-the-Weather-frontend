import * as React from "react";

const isDev = ["development", "test"].includes(process.env.NODE_ENV);

const isLocalHost = (hostname: string): boolean =>
  !!(
    hostname === "localhost" ||
    hostname === "0.0.0.0" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

export const HttpsRedirect: React.FC<any> = ({ children }) => {
  if (
    typeof window === "undefined" ||
    !window.location ||
    window.location.protocol === "https:" ||
    isLocalHost(window.location.hostname) ||
    isDev
  ) {
    return children;
  }

  window.location.href = window.location.href.replace(/^http(?!s)/, "https");
  return null;
};

export default HttpsRedirect;
