// Šī funkcija paliek gandrīz tāda pati
async function getQuotes() {
  try {
    // Mēs joprojām izmantojam ?populate=*, jo tas pareizi pievieno autora un birku datus
    const res = await fetch('http://68.183.9.236:1337/api/quotes?populate=*', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Kļūda saņemot datus: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Nevarēja pieslēgties Strapi:", error);
    return { data: [] };
  }
}

// Šis ir galvenais lapas komponents ar PAREIZU DATU STRUKTŪRU
export default async function HomePage() {
  // Strapi atgriež objektu ar 'data' masīvu, tāpēc mēs to šeit "izvelkam"
  const response = await getQuotes();
  const quotes = response.data; // īstais citātu saraksts

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-900 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10">Sievas Citātu Lapa</h1>
      
      <div className="w-full max-w-3xl space-y-6">
        {/* Pārbaudām, vai ir ko rādīt */}
        {quotes && quotes.length > 0 ? (
          quotes.map((quote) => (
            <figure key={quote.id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <blockquote className="text-lg italic text-gray-200">
                {/* TAGAD IZMANTOJAM quote.text TIEŠI */}
                <p>{quote.text}</p>
              </blockquote>
              <figcaption className="text-right mt-4 text-cyan-400">
                {/* UN quote.author.name TIEŠI */}
                — {quote.author?.name || quote.source || 'Nezināms avots'}
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="text-center text-gray-500">Pašlaik nav citātu vai neizdevās tos ielādēt.</p>
        )}
      </div>
    </main>
  );
}