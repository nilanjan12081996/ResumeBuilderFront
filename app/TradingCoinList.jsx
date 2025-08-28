"use client";
import React, { useEffect, useRef, memo } from "react";

function TradingCoinList() {
  const container = useRef(null);

  useEffect(() => {
    // Clean up previous script if it exists
    while (container.current?.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": "light",
        "isTransparent": false,
        "locale": "en",
        "width": "100%",
        "height": 550
      }
    `;
    container.current.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (container.current?.contains(script)) {
        container.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingCoinList);
