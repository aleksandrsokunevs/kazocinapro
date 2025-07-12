// Fails: src/app/page.js
// Šis ir galvenais lapas komponents. Tā ir Servera Komponente.
// Tās vienīgais uzdevums ir saņemt datus un nodot tos tālāk Klienta Komponentei.

import QuoteClient from './QuoteClient'; // Importējam mūsu jauno Klienta Komponenti

// --- KONSTANTES ---
const STRAPI_URL = 'https://api.kazocina.pro';

// --- DATU IEGUVES FUNKCIJAS ---

// Iegūst visus publicētos citātus
async function getQuotes() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/quotes?populate=*`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Neizdevās ielādēt citātus');
    return res.json();
  } catch (error) {
    console.error("Citātu ielādes kļūda:", error);
    return { data: [] };
  }
}

// Iegūst visas publicētās birkas (tags)
async function getTags() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/tags`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Neizdevās ielādēt birkas');
    return res.json();
  } catch (error) {
    console.error("Birku ielādes kļūda:", error);
    return { data: [] };
  }
}

// Galvenā lapas komponente, kas tiek izsaukta pirmā.
export default async function HomePage() {
  // Saņemam datus no abām funkcijām vienlaicīgi uz servera
  const [quotesResponse, tagsResponse] = await Promise.all([getQuotes(), getTags()]);
  
  // Pārbaudām, vai dati ir saņemti pareizi
  const initialQuotes = quotesResponse?.data || [];
  const initialTags = tagsResponse?.data || [];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Visa lapas loģika un stāvokļa pārvaldība notiek QuoteClient komponentē */}
       <QuoteClient initialQuotes={initialQuotes} initialTags={initialTags} />
    </div>
  );
}
