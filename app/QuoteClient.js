'use client';

import React, { useState, useEffect, useMemo } from 'react';

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
);
const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
);

const STRAPI_URL = 'https://api.kazocina.pro';

function QuoteCard({ quote }) {
  const imageUrl = quote.image?.url ? `${STRAPI_URL}${quote.image.url}` : null;
  return (
    <div className="rounded-2xl shadow-lg bg-white/30 flex flex-col overflow-hidden">
      <div className="bg-russian-violet text-white text-3xl font-bold text-center py-16">
        {imageUrl ? <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-t-2xl" /> : `Bilde ${quote.id || ''}`}
      </div>
      <div className="bg-white/70 p-6 flex flex-col flex-grow">
        <blockquote className="italic text-russian-violet mb-4 flex-grow text-base">{quote.text}</blockquote>
        <div className="text-right text-gray-500 font-sans text-sm">
          <span className="font-bold text-mint">{quote.author?.name || 'Nezināms autors'}</span>
          {quote.source && <span className="block text-gray-400">{quote.source}</span>}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-mint text-white rounded-full px-4 py-1 text-sm font-semibold">{tag.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteListItem({ quote }) {
  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg border border-russian-violet/10">
      <blockquote className="italic text-russian-violet mb-4 font-sans">
        <p>{quote.text}</p>
      </blockquote>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-mint text-white rounded-full px-4 py-1 text-sm font-semibold">{tag.name}</span>
          ))}
        </div>
        <div className="text-right text-gray-500 font-sans text-sm">
          <span className="font-bold text-mint">{quote.author?.name || 'Nezināms autors'}</span>
          {quote.source && <span className="block text-gray-400">{quote.source}</span>}
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
    <div className="w-full font-sans">
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
        {/* FILTRA KARTIŅA */}
        <div className="bg-white/70 rounded-2xl shadow-lg p-6 mb-10">
          <input type="text" placeholder="Meklēt citāta tekstā..." className="w-full p-4 rounded-lg bg-white mb-4 text-russian-violet placeholder-russian-violet/60 focus:outline-none focus:ring-2 focus:ring-mint transition font-sans" onChange={e => setSearchTerm(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select className="w-full bg-white text-russian-violet p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint font-sans" onChange={e => setAuthorFilter(e.target.value)}>
              <option value="">Filtrēt pēc autora</option>
              {uniqueAuthors.map(author => <option key={author} value={author}>{author}</option>)}
            </select>
            <select className="w-full bg-white text-russian-violet p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint font-sans" onChange={e => setSourceFilter(e.target.value)}>
              <option value="">Filtrēt pēc avota</option>
              {uniqueSources.map(source => <option key={source} value={source}>{source}</option>)}
            </select>
          </div>
          <div>
            <span className="text-sm font-semibold text-russian-violet/80 mr-3 font-sans">Populāri tagi:</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              <button onClick={() => setTagFilter('')} className={`px-4 py-1 text-sm rounded-full font-semibold transition ${tagFilter === '' ? 'bg-mint text-white' : 'bg-mint/40 text-mint hover:bg-mint/60'}`}>Visi</button>
              {tags.map(tag => <button key={tag.id} onClick={() => setTagFilter(tag.name)} className={`px-4 py-1 text-sm rounded-full font-semibold transition ${tagFilter === tag.name ? 'bg-mint text-white' : 'bg-mint/40 text-mint hover:bg-mint/60'}`}>{tag.name}</button>)}
            </div>
          </div>
        </div>

        {/* CITĀTU KARTIŅAS */}
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'hidden'}>
          {filteredQuotes.map(quote => <QuoteCard key={quote.id} quote={quote} />)}
        </div>

        <div className={view === 'list' ? 'space-y-6' : 'hidden'}>
          {filteredQuotes.map(quote => <QuoteListItem key={quote.id} quote={quote} />)}
        </div>

        {filteredQuotes.length === 0 && (
          <p className="text-center text-gray-500 mt-10 font-sans">Pēc Jūsu kritērijiem nekas netika atrasts.</p>
        )}
      </main>

      <ScrollToTopButton />
    </div>
  );
}