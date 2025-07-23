'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

// Atsevišķa komponente skriptiem, lai kods būtu tīrāks un ielādētos tikai pēc piekrišanas
const TrackingScripts = () => (
  <>
    {/* Google AdSense skripts */}
    <Script
      id="adsbygoogle-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0388155554297058"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
    {/* Google Analytics skripti */}
    <Script
      id="gtag-script"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=G-EJ3MZ0G3S1`}
    />
    <Script
      id="google-analytics-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EJ3MZ0G3S1');
        `,
      }}
    />
  </>
);

export default function CookieBanner() {
  // Pārbaudām piekrišanas statusu: 'granted', 'denied', vai 'pending'
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    if (storedConsent) {
      setConsent(storedConsent);
    } else {
      setConsent('pending'); // Ja nav saglabāts, parādām paziņojumu
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    setConsent('granted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setConsent('denied');
  };

  // Ja piekrišana ir dota, ielādējam skriptus
  if (consent === 'granted') {
    return <TrackingScripts />;
  }

  // Ja piekrišana vēl nav dota, parādām paziņojumu
  if (consent === 'pending') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-russian-violet text-white p-4 shadow-lg animate-fadeIn border-t border-mauve/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-center sm:text-left">
            <p>Šī lapa izmanto sīkdatnes (cepumus), lai analizētu apmeklējumu un rādītu atbilstošas reklāmas. Nospiežot "Piekrītu", Jūs apstiprināt to izmantošanu. Vairāk informācijas varat atrast mūsu <Link href="/privatuma-politika" className="underline hover:text-light-green">Privātuma Politikā</Link>.</p>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <button 
              onClick={handleAccept}
              className="bg-light-green text-russian-violet-darker font-bold py-2 px-4 rounded-lg hover:opacity-80 transition"
            >
              Piekrītu
            </button>
            <button 
              onClick={handleDecline}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
            >
              Atteikties
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ja piekrišana ir liegta vai vēl nav noteikta, neko nerādām
  return null;
}
