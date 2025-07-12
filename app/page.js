import QuoteClient from './QuoteClient';

const STRAPI_URL = 'https://api.kazocina.pro';

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

export default async function HomePage() {
  const [quotesResponse, tagsResponse] = await Promise.all([getQuotes(), getTags()]);
  const initialQuotes = quotesResponse?.data || [];
  const initialTags = tagsResponse?.data || [];

  return (
    <div>
       <QuoteClient initialQuotes={initialQuotes} initialTags={initialTags} />
    </div>
  );
}