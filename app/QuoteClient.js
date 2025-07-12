// Fails: src/app/QuoteClient.js
// Šī ir Klienta Komponente, kas satur visu interaktīvo loģiku.

'use client'; // Šī rinda ir obligāta! Tā pasaka Next.js, ka šis kods darbojas pārlūkā.

import React, { useState, useEffect, useMemo } from 'react';

// --- IKONAS ---
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
);
const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
);

// --- KONSTANTES ---
const STRAPI_URL = 'https://api.kazocina.pro';

// --- MAZĀKAS KOMPONENTES ---

function QuoteCard({ quote }) {
  const imageUrl = quote.image?.url ? `${STRAPI_URL}${quote.image.url}` : null;
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={`Attēls priekš citāta no "${quote.source}"`} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1F2937/FFFFFF?text=Attēls+nav+pieejams'; }}
        />
      )}
      <div className="p-6">
        <blockquote className="text-lg italic text-gray-200 border-l-4 border-cyan-400 pl-4 mb-4">
          <p>{quote.text}</p>
        </blockquote>
        <figcaption className="text-right text-gray-400 mb-4">
          — {quote.author?.name || quote.source || 'Nezināms avots'}
        </figcaption>
        <div className="flex flex-wrap gap-2">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteListItem({ quote }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <blockquote className="text-lg italic text-gray-200 mb-4">
        <p>{quote.text}</p>
      </blockquote>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
        <figcaption className="text-right text-gray-400">
          — {quote.author?.name || quote.source || 'Nezināms avots'}
        </figcaption>
      </div>
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-cyan-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Ritini uz augšu"
    >
      <ArrowUpIcon />
    </button>
  );
}

// Galvenā interaktīvā komponente, kas saņem datus kā "props"
export default function QuoteClient({ initialQuotes, initialTags }) {
  const [quotes] = useState(initialQuotes);
  const [tags] = useState(initialTags);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        quote.text?.toLowerCase().includes(searchLower) ||
        quote.source?.toLowerCase().includes(searchLower) ||
        quote.author?.name?.toLowerCase().includes(searchLower) ||
        quote.tags?.some(tag => tag.name.toLowerCase().includes(searchLower));
      return matchesSearch;
    });
  }, [quotes, searchTerm]);

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md p-4 mb-10 border-b border-gray-700">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Citātu Lapa</h1>
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Meklēt..."
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <div className="flex items-center gap-2">
            <a href="/par-mums" className="text-gray-300 hover:text-white transition hidden sm:block">Par mums</a>
            <button
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition"
              aria-label="Pārslēgt skatu"
            >
              {view === 'grid' ? <ListIcon /> : <GridIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map(quote => <QuoteCard key={quote.id} quote={quote} />)}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuotes.map(quote => <QuoteListItem key={quote.id} quote={quote} />)}
          </div>
        )}
        
        {filteredQuotes.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Pēc Jūsu kritērijiem nekas netika atrasts.</p>
        )}
      </main>

      <ScrollToTopButton />
    </div>
  );
}
