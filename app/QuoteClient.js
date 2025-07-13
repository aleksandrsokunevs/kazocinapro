'use client'; 

import React, { useState, useEffect, useMemo } from 'react';

// --- IKONAS ---
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
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
    <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col border border-russian-violet/10">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={`Attēls priekš citāta no "${quote.source}"`} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/C2AFF0/462255?text=Bilde+nav+pieejama`; }}
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <blockquote className="text-lg text-russian-violet mb-4 flex-grow">
          <p>{quote.text}</p>
        </blockquote>
        <div className="text-right text-gray-500 mb-4">
          <p className="font-bold text-mint">— {quote.author?.name || 'Nezināms autors'}</p>
          <p className="text-sm text-gray-400 mt-1">{quote.source || 'Nezināms avots'}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-mint/20 text-green-900 font-semibold text-xs px-2.5 py-0.5 rounded-full">{tag.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteListItem({ quote }) {
  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg border border-russian-violet/10">
      <blockquote className="text-lg text-russian-violet mb-4">
        <p>{quote.text}</p>
      </blockquote>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-mint/20 text-green-900 font-semibold text-xs px-2.5 py-0.5 rounded-full">{tag.name}</span>
          ))}
        </div>
        <div className="text-right text-gray-500">
          <p className="font-bold text-mint">— {quote.author?.name || 'Nezināms autors'}</p>
          <p className="text-sm text-gray-400 mt-1">{quote.source || 'Nezināms avots'}</p>
        </div>
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
      className={`fixed bottom-8 right-8 bg-mint text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} hover:bg-opacity-80`}
      aria-label="Ritini uz augšu"
    >
      <ArrowUpIcon />
    </button>
  );
}

// Galvenā interaktīvā komponente
export default function QuoteClient({ initialQuotes, initialTags }) {
  const [quotes] = useState(initialQuotes);
  const [tags] = useState(initialTags);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || quote.text?.toLowerCase().includes(searchLower);
      const matchesAuthor = authorFilter === '' || quote.author?.name === authorFilter;
      const matchesSource = sourceFilter === '' || quote.source === sourceFilter;
      const matchesTag = tagFilter === '' || quote.tags?.some(tag => tag.name === tagFilter);
      return matchesSearch && matchesAuthor && matchesSource && matchesTag;
    });
  }, [quotes, searchTerm, authorFilter, sourceFilter, tagFilter]);
  
  const uniqueAuthors = useMemo(() => [...new Set(quotes.map(q => q.author?.name).filter(Boolean))], [quotes]);
  const uniqueSources = useMemo(() => [...new Set(quotes.map(q => q.source).filter(Boolean))], [quotes]);

  return (
    <div className="w-full">
      <header className="sticky top-0 z-50 bg-mauve/80 backdrop-blur-md p-4 border-b border-russian-violet/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-russian-violet whitespace-nowrap">Kazocina.pro</h1>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-2">
            <a href="#" className="text-russian-violet hover:text-mint transition hidden md:block px-3">Par mums</a>
            <div id="view-switcher" className="flex items-center gap-1 bg-russian-violet/10 p-1 rounded-full">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-full ${view === 'grid' ? 'bg-mint text-white' : 'text-russian-violet hover:text-black'}`} aria-label="Režģa skats"><GridIcon /></button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-full ${view === 'list' ? 'bg-mint text-white' : 'text-russian-violet hover:text-black'}`} aria-label="Saraksta skats"><ListIcon /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'hidden'}>
          <div className="md:col-span-2 lg:col-span-3 bg-white/50 rounded-xl shadow-lg p-6 space-y-4 border border-russian-violet/10">
            <input type="text" placeholder="Meklēt citāta tekstā..." className="w-full p-3 rounded-lg bg-white/70 text-russian-violet placeholder-russian-violet/60 focus:outline-none focus:ring-2 focus:ring-mint transition" onChange={e => setSearchTerm(e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="w-full bg-white/70 text-russian-violet p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint" onChange={e => setAuthorFilter(e.target.value)}>
                <option value="">Filtrēt pēc autora</option>
                {uniqueAuthors.map(author => <option key={author} value={author}>{author}</option>)}
              </select>
              <select className="w-full bg-white/70 text-russian-violet p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint" onChange={e => setSourceFilter(e.target.value)}>
                <option value="">Filtrēt pēc avota</option>
                {uniqueSources.map(source => <option key={source} value={source}>{source}</option>)}
              </select>
            </div>
            <div className="pt-2">
              <span className="text-sm font-semibold text-russian-violet/80 mr-3">Populāri tagi:</span>
              <div className="inline-flex flex-wrap gap-2">
                <button onClick={() => setTagFilter('')} className={`px-3 py-1 text-sm rounded-full transition font-bold ${tagFilter === '' ? 'bg-light-green text-russian-violet' : 'bg-mint text-white hover:opacity-80'}`}>Visi</button>
                {tags.map(tag => <button key={tag.id} onClick={() => setTagFilter(tag.name)} className={`px-3 py-1 text-sm rounded-full transition font-bold ${tagFilter === tag.name ? 'bg-light-green text-russian-violet' : 'bg-mint text-white hover:opacity-80'}`}>{tag.name}</button>)}
              </div>
            </div>
          </div>
          {filteredQuotes.map(quote => <QuoteCard key={quote.id} quote={quote} />)}
        </div>
        
        <div className={view === 'list' ? 'space-y-6' : 'hidden'}>
          {filteredQuotes.map(quote => <QuoteListItem key={quote.id} quote={quote} />)}
        </div>

        {filteredQuotes.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Pēc Jūsu kritērijiem nekas netika atrasts.</p>
        )}
      </main>

      <ScrollToTopButton />
    </div>
  );
}
