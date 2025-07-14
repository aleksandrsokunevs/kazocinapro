// Šī ir jaunā lapa, kas rādīs visus viena autora citātus

import Link from 'next/link';

const STRAPI_URL = 'https://api.kazocina.pro';

// Funkcija, kas saņem datus par konkrētu autoru
async function getQuotesByAuthor(slug) {
  // Dekodējam autora vārdu no URL un veicam API pieprasījumu
  const authorName = decodeURIComponent(slug);
  const url = `${STRAPI_URL}/api/quotes?filters[author][name][$eq]=${authorName}&populate=*`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Neizdevās ielādēt datus priekš autora: ${authorName}`);
    const data = await res.json();
    return { quotes: data.data || [], authorName };
  } catch (error) {
    console.error(error);
    return { quotes: [], authorName };
  }
}

// Pati lapas komponente
export default async function AuthorPage({ params }) {
  const { quotes, authorName } = await getQuotesByAuthor(params.slug);

  return (
    <div className="bg-mauve min-h-screen text-russian-violet">
      <header className="bg-mauve/80 backdrop-blur-md p-4 border-b border-russian-violet/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xl md:text-2xl font-bold hover:text-mint transition">
            ← Atpakaļ uz sākumu
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">Visi citāti no autora: <span className="text-mint">{authorName}</span></h1>
        
        {quotes.length > 0 ? (
          <div className="space-y-6">
            {quotes.map(quote => (
              <div key={quote.id} className="bg-white/50 p-6 rounded-xl shadow-lg border border-russian-violet/10">
                <blockquote className="text-xl italic mb-4">
                  <p>"{quote.text}"</p>
                </blockquote>
                <div className="text-right text-gray-500 font-sans">
                  <p className="text-sm text-gray-400">{quote.source || 'Nezināms avots'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Šim autoram citāti nav atrasti.</p>
        )}
      </main>
    </div>
  );
}
