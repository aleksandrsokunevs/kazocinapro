const STRAPI_URL = 'https://api.kazocina.pro';

// Funkcija, kas saņem visus datus no Strapi
async function fetchAllData() {
    try {
        const [quotesRes, authorsRes] = await Promise.all([
            // Pieprasām visus citātus ar atjaunināšanas datumu, avotu un autoru
            fetch(`${STRAPI_URL}/api/quotes?fields[0]=updatedAt&fields[1]=source&populate[author][fields][0]=name`),
            fetch(`${STRAPI_URL}/api/authors?fields[0]=name`),
        ]);

        const quotesJson = await quotesRes.json();
        const authorsJson = await authorsRes.json();

        return {
            quotes: quotesJson.data || [],
            authors: authorsJson.data || [],
        };
    } catch (error) {
        console.error("Neizdevās ielādēt datus priekš sitemap:", error);
        return { quotes: [], authors: [] };
    }
}

export default async function sitemap() {
    const { quotes, authors } = await fetchAllData();
    const baseUrl = 'https://kazocina.pro';

    // Pievienojam saites uz autoru lapām ar pēdējo atjaunināšanas datumu
    const authorUrls = authors.map((author) => {
        const lastMod = quotes
            .filter(q => q.author?.name === author.name)
            .map(q => new Date(q.updatedAt))
            .sort((a, b) => b - a)[0] || new Date();
        return {
            url: `${baseUrl}/autori/${encodeURIComponent(author.name)}`,
            lastModified: lastMod,
        };
    });

    // Pievienojam saites uz avotu lapām ar pēdējo atjaunināšanas datumu
    const uniqueSources = [...new Set(quotes.map(q => q.source).filter(Boolean))];
    const sourceUrls = uniqueSources.map((source) => {
        const lastMod = quotes
            .filter(q => q.source === source)
            .map(q => new Date(q.updatedAt))
            .sort((a, b) => b - a)[0] || new Date();
        return {
            url: `${baseUrl}/avoti/${encodeURIComponent(source)}`,
            lastModified: lastMod,
        };
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...authorUrls,
        ...sourceUrls,
    ];
}
