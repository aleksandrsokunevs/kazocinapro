'use client'; 

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AdCard } from './AdComponent'; 
import Link from 'next/link';

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
const DiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M12 16h.01"/></svg>
);
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;


// --- KONSTANTES ---
const STRAPI_URL = 'https://api.kazocina.pro';

// --- JAUNA KOMPONENTE TEKSTA IEKRĀSOŠANAI ---
function HighlightText({ text, highlight }) {
  if (!text) return null;
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-icterine/70 text-russian-violet rounded px-1 py-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

// --- JAUNA KOMPONENTE "DIENAS CITĀTAM" ---
function QuoteOfTheDayCard({ quote }) {
    if (!quote) return null;
    const getImageUrl = () => {
        if (quote.image?.url) return `${STRAPI_URL}${quote.image.url}`;
        return `https://picsum.photos/seed/${quote.id}/1200/400`;
    };
    const imageUrl = getImageUrl();
    return (
        <div className="mb-12 rounded-xl shadow-lg overflow-hidden relative min-h-[300px] flex items-center justify-center text-center">
            <img 
                src={imageUrl} 
                alt="Dienas citāta fons"
                className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm brightness-50"
                crossOrigin="anonymous"
            />
            <div className="relative p-8 text-white z-10">
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic mb-4">
                    <p>"{quote.text}"</p>
                </blockquote>
                <figcaption className="text-lg text-mauve/90">
                    — {quote.author?.name || 'Nezināms autors'}
                    {quote.source && <span className="block text-sm opacity-70 mt-1">{quote.source}</span>}
                </figcaption>
            </div>
        </div>
    );
}

// --- MAZĀKAS KOMPONENTES ---

function QuoteCard({ quote, searchTerm, animationDelay, onShare }) {
  const getImageUrl = () => {
    if (quote.image?.url) return `${STRAPI_URL}${quote.image.url}`;
    return `https://picsum.photos/seed/${quote.id}/600/400`;
  };
  const imageUrl = getImageUrl();
  
  const getFontSizeClass = (text) => {
    const length = text?.length || 0;
    if (length > 250) return 'text-md';
    if (length > 150) return 'text-lg';
    return 'text-xl';
  };

  return (
    <div 
      id={`quote-${quote.id}`}
      className="bg-white/50 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col border border-russian-violet/10 relative animate-fadeIn"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <button onClick={() => onShare(quote)} className="share-button absolute top-3 right-3 bg-mint/50 text-white p-2 rounded-full hover:bg-mint transition z-20" aria-label="Kopīgot kā attēlu">
        <ImageIcon />
      </button>
      <img 
        src={imageUrl} 
        alt={`Attēls priekš citāta no "${quote.source}"`} 
        className="w-full h-48 object-cover"
        crossOrigin="anonymous" 
        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/C2AFF0/462255?text=Bilde+nav+pieejama`; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <blockquote className={`text-russian-violet mb-4 flex-grow italic ${getFontSizeClass(quote.text)}`}>
          <p><HighlightText text={quote.text} highlight={searchTerm} /></p>
        </blockquote>
        <div className="text-right text-gray-500 mb-4 font-sans">
          <Link href={`/autori/${encodeURIComponent(quote.author?.name)}`} className="font-bold text-mint hover:underline">
            — {quote.author?.name || 'Nezināms autors'}
          </Link>
          <Link href={`/avoti/${encodeURIComponent(quote.source)}`} className="block text-sm text-gray-400 mt-1 hover:underline">
            {quote.source || 'Nezināms avots'}
          </Link>
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

function QuoteListItem({ quote, searchTerm }) {
  if (!quote) {
    return null;
  }
  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-lg border border-russian-violet/10">
      <blockquote className="text-xl text-russian-violet mb-4 italic">
        <p><HighlightText text={quote.text} highlight={searchTerm} /></p>
      </blockquote>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {quote.tags?.map(tag => (
            <span key={tag.id} className="bg-mint/20 text-green-900 font-semibold text-xs px-2.5 py-0.5 rounded-full">{tag.name}</span>
          ))}
        </div>
        <div className="text-right text-gray-500 font-sans">
          <Link href={`/autori/${encodeURIComponent(quote.author?.name)}`} className="font-bold text-mint hover:underline">
            — {quote.author?.name || 'Nezināms autors'}
          </Link>
          <Link href={`/avoti/${encodeURIComponent(quote.source)}`} className="block text-sm text-gray-400 mt-1 hover:underline">
            {quote.source || 'Nezināms avots'}
          </Link>
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
export default function QuoteClient({ initialQuotes, initialTags, quoteOfTheDay }) {
  const [quotes] = useState(initialQuotes);
  const [tags] = useState(initialTags);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  // JAUNA, UZLABOTA ATTĒLU ĢENERĒŠANAS FUNKCIJA
  const generateShareImage = async (quote) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // 1. Fona bilde
    const getImageUrl = () => {
        if (quote.image?.url) return `${STRAPI_URL}${quote.image.url}`;
        return `https://picsum.photos/seed/${quote.id}/1080/1080`;
    };
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = getImageUrl();
    
    await new Promise((resolve) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 1080, 1080);
            resolve();
        };
        img.onerror = () => {
            ctx.fillStyle = '#C2AFF0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            resolve();
        };
    });

    // 2. Tumšs slānis labākai lasāmībai
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Teksts
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // UZLABOTA TEKSTA APLAUŠANAS UN IZMĒRA MAIŅAS FUNKCIJA
    const wrapAndFitText = (context, text, x, y, maxWidth, maxHeight) => {
        let fontSize = 60; // Sākotnējais maksimālais fonta izmērs
        let lines;

        do {
            context.font = `italic ${fontSize}px Arial`;
            const words = text.split(' ');
            let line = '';
            lines = [];
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                if (context.measureText(testLine).width > maxWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            
            // Pārbaudām, vai teksts ielien augstumā
            if (lines.length * (fontSize * 1.2) > maxHeight) {
                fontSize -= 2; // Samazinām fonta izmēru un mēģinām vēlreiz
            } else {
                break; // Teksts ielien
            }
        } while (fontSize > 20); // Minimālais fonta izmērs

        const lineHeight = fontSize * 1.2;
        const totalTextHeight = lines.length * lineHeight;
        let startY = y - totalTextHeight / 2;

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], x, startY);
            startY += lineHeight;
        }
    };

    ctx.fillStyle = '#FFFFFF';
    wrapAndFitText(ctx, `"${quote.text}"`, 540, 500, 900, 600); // Vairāk vietas tekstam

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(`— ${quote.author?.name || 'Nezināms autors'}`, 540, 850);

    // 4. Brendings
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('Sintijas Citāti', 1040, 1040);

    // 5. Lejupielāde
    const link = document.createElement('a');
    link.download = `citats-${quote.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

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

  const itemsWithAds = useMemo(() => {
    const items = [];
    filteredQuotes.forEach((quote, index) => {
      items.push(<QuoteCard key={quote.id} quote={quote} searchTerm={searchTerm} animationDelay={index * 50} onShare={generateShareImage} />);
      if ((index + 1) % 6 === 0) {
        items.push(<AdCard key={`ad-${index}`} adSlot="4775307152" />);
      }
    });
    return items;
  }, [filteredQuotes, searchTerm]);

  const handleRandomQuote = () => {
    if (filteredQuotes.length === 0) return;
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    const element = document.getElementById(`quote-${randomQuote.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-light-green', 'ring-offset-4', 'ring-offset-mauve');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-light-green', 'ring-offset-4', 'ring-offset-mauve');
      }, 2000);
    }
  };

  return (
    <div className="w-full">
      <header className="sticky top-0 z-50 bg-mauve/80 backdrop-blur-md p-4 border-b border-russian-violet/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-russian-violet whitespace-nowrap">Sintijas Citāti</h1>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-2">
            <Link href="/par-projektu" className="text-russian-violet hover:text-mint transition hidden md:block px-3">Par projektu</Link>
            <button onClick={handleRandomQuote} className="p-2 bg-russian-violet/10 rounded-full text-russian-violet hover:text-black transition" aria-label="Nejaušs citāts">
              <DiceIcon />
            </button>
            <div id="view-switcher" className="flex items-center gap-1 bg-russian-violet/10 p-1 rounded-full">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-full ${view === 'grid' ? 'bg-mint text-white' : 'text-russian-violet hover:text-black'}`} aria-label="Režģa skats"><GridIcon /></button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-full ${view === 'list' ? 'bg-mint text-white' : 'text-russian-violet hover:text-black'}`} aria-label="Saraksta skats"><ListIcon /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <QuoteOfTheDayCard quote={quoteOfTheDay} />

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
          
          {itemsWithAds}

        </div>
        
        <div className={view === 'list' ? 'space-y-6' : 'hidden'}>
          {filteredQuotes.map(quote => <QuoteListItem key={quote.id} quote={quote} searchTerm={searchTerm} />)}
        </div>

        {filteredQuotes.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Pēc Jūsu kritērijiem nekas netika atrasts.</p>
        )}
      </main>

      <ScrollToTopButton />
    </div>
  );
}
