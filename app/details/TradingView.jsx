"use client";
import React, { useEffect, useRef } from "react";

function TradingViewCandle({ symbol }) {
  const container = useRef();

  useEffect(() => {
    const containerElement = container.current;

    // Cleanup any existing script tags
    while (containerElement.firstChild) {
      containerElement.removeChild(containerElement.firstChild);
    }

    // Create and append the new script
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `OKX:${symbol}`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    containerElement.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (containerElement && containerElement.contains(script)) {
        containerElement.removeChild(script);
      }
    };
  }, [symbol]); // Adding symbol as a dependency

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100vh", width: "100vw" }} // Full height and width of the viewport
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }} // Ensure the widget takes up the full container
      ></div>
    </div>
  );
}

export default TradingViewCandle;
