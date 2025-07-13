'use client';

import React, { useEffect, useRef } from 'react';

// Šī komponente atbild par AdSense loģiku
function AdsenseAd({ adSlot }) {
    const adRef = useRef(null);
    // Izmantojam useRef, lai sekotu līdzi, vai reklāma jau ir ielādēta
    const adPushed = useRef(false);

    useEffect(() => {
        // Palaižam kodu tikai tad, ja reklāma vēl nav ielādēta šajā blokā
        if (adRef.current && !adPushed.current) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                // Atzīmējam, ka reklāma ir veiksmīgi ielādēta
                adPushed.current = true; 
            } catch (err) {
                console.error("AdSense push kļūda:", err.message);
            }
        }
    }, [adSlot]);

    return (
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-0388155554297058"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-full-width-responsive="true"
      ></ins>
    );
}

// Šī komponente ir stilizēta kā kartīte un satur AdSense bloku.
// React.memo nodrošina, ka tā netiek pārkārtota bez vajadzības.
export const AdCard = React.memo(function AdCard({ adSlot }) {
    return (
      <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden flex flex-col border border-russian-violet/10 p-4 justify-center items-center min-h-[300px]">
        <span className="text-xs text-russian-violet/50 mb-2 font-sans">Reklāma</span>
        <div className="w-full h-full flex-grow">
          <AdsenseAd adSlot={adSlot} />
        </div>
      </div>
    );
});