import QuoteClient from './QuoteClient';

// Šī rinda ir svarīga, lai lapa vienmēr būtu dinamiska
export const dynamic = 'force-dynamic';

// --- KONSTANTES ---
const STRAPI_URL = 'https://api.kazocina.pro';

// --- DATU IEGUVES FUNKCIJAS ---

async function getQuotesAndTags() {
  try {
    // Vienlaicīgi pieprasām gan citātus, gan birkas
    const [quotesRes, tagsRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/quotes?populate=*`, { cache: 'no-store' }),
      fetch(`${STRAPI_URL}/api/tags`, { cache: 'no-store' })
    ]);

    if (!quotesRes.ok) throw new Error('Neizdevās ielādēt citātus');
    if (!tagsRes.ok) throw new Error('Neizdevās ielādēt birkas');

    const quotesJson = await quotesRes.json();
    const tagsJson = await tagsRes.json();

    return {
      quotes: quotesJson.data || [],
      tags: tagsJson.data || []
    };
  } catch (error) {
    console.error("Datu ielādes kļūda:", error);
    return { quotes: [], tags: [] };
  }
}

// Galvenā lapas komponente
export default async function HomePage() {
  const { quotes, tags } = await getQuotesAndTags();

  // Izvēlamies vienu nejaušu citātu kā "dienas citātu"
  const quoteOfTheDay = quotes.length > 0
    ? quotes[Math.floor(Math.random() * quotes.length)]
    : null;

  return (
    <div className="bg-mauve text-russian-violet min-h-screen">
       <QuoteClient 
         initialQuotes={quotes} 
         initialTags={tags} 
         quoteOfTheDay={quoteOfTheDay} 
       />
    </div>
  );
}
