'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 wrapper component.
 * Uses next/script with afterInteractive strategy to avoid blocking render.
 * 
 * Centralizado como wrapper para cumplir con el principio de
 * Agnosticismo de Dependencias — si cambiamos de analytics provider,
 * solo editamos este archivo.
 */

const GA_MEASUREMENT_ID = 'G-PZ2W4P0L8J';

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
