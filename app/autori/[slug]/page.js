import Link from 'next/link';
import Script from 'next/script';

const STRAPI_URL = 'https://api.kazocina.pro';

// Ģenerē metadatus
export async function generateMetadata({ params }) {
  const authorName = decodeURIComponent(params.slug);
  const url = `${STRAPI_URL}/autori/${params.slug}`;

  return {
    title: `Visi citāti no autora: ${authorName}`,
    description: `Pārlūkojiet visus citātus, ko pierakstījusi Sintija no autora ${authorName}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Citāti no autora: ${authorName}`,
      description: `Visi apkopotie citāti no ${authorName}.`,
      url: url,
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `Citāti no autora: ${authorName}`,
      description: `Visi apkopotie citāti no ${authorName}.`,
    },
  };
}

async function getQuotesByAuthor(slug) {
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

export default async function AuthorPage({ params }) {
  const { quotes, authorName } = await getQuotesByAuthor(params.slug);

  // JSON-LD strukturētie dati par šo lapu
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Visi citāti no autora: ${authorName}`,
    description: `Saraksts ar visiem citātiem no autora ${authorName}, kas atrodami Sintijas kolekcijā.`,
    breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Sākums',
                item: 'https://kazocina.pro'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: authorName
            }
        ]
    }
  };

  return (
    <>
      <Script
        id="json-ld-author"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                <article key={quote.id} className="bg-white/50 p-6 rounded-xl shadow-lg border border-russian-violet/10">
                  <blockquote className="text-xl italic mb-4">
                    <p>"{quote.text}"</p>
                  </blockquote>
                  <div className="text-right text-gray-500 font-sans">
                    <p className="text-sm text-gray-400">{quote.source || 'Nezināms avots'}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>Šim autoram citāti nav atrasti.</p>
          )}
        </main>
      </div>
    </>
  );
}
