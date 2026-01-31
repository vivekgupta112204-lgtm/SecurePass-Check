import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
  slot: string;
  format?: string;
  layout?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ className, style, slot, format = "auto", layout }) => {
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // If we have already pushed for this component instance, do not push again.
    if (adPushed.current) return;

    let attempts = 0;
    const maxAttempts = 10; // Retry for ~5 seconds

    const pushAd = () => {
      // Prevent race conditions or double pushes
      if (adPushed.current) return;

      try {
        // Only push if the element is visible and has width
        if (adRef.current && adRef.current.offsetWidth > 0) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushed.current = true;
        } else {
          // If width is 0, the element might be hidden or not laid out yet.
          attempts++;
          if (attempts < maxAttempts) {
            // Retry after 500ms
            setTimeout(pushAd, 500);
          } else {
            console.warn("AdSense: Failed to push ad because container has no width after multiple attempts.");
          }
        }
      } catch (e) {
        console.error("AdSense error", e);
      }
    };

    // Initial check with a small delay to ensure React has mounted and CSS is applied
    const timer = setTimeout(pushAd, 100);
    return () => clearTimeout(timer);
  }, [slot]);

  return (
    <div className={`ad-container ${className || ""}`}>
      <span className="ad-label">Advertisement</span>
      <div 
        className="ad-placeholder" 
        style={{ 
            ...style, 
            minHeight: style?.minHeight || "90px",
            display: "block" // Force block to ensure width is calculated from parent correctly
        }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-2014274337287264"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdSlot;