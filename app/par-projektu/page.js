import Link from 'next/link';

// Metadati priekš SEO
export const metadata = {
  title: 'Par Mums',
  description: 'Stāsts par to, kā radās Sintijas citātu lapa un kas ir tās autore.',
};

export default function AboutPage() {
  return (
    <div className="bg-mauve min-h-screen text-russian-violet">
      <header className="bg-mauve/80 backdrop-blur-md p-4 border-b border-russian-violet/10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-xl md:text-2xl font-bold hover:text-mint transition">
            ← Atpakaļ uz sākumu
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/50 p-8 rounded-xl shadow-lg border border-russian-violet/10 prose prose-lg">
          <h1>Par Projektu</h1>
          <p>
            Sveicināti "Sintijas Citātu" lapā! Šī ir vieta, kas radusies no mīlestības pret vārdiem, grāmatām un domām, kas neļauj palikt vienaldzīgam.
          </p>
          <p>
            Lapas sirds un dvēsele ir Sintija – kaislīga lasītāja un vērīga pasaules novērotāja, kas savās pārdomās un stāstos dalās arī blogā <a href="https://apatija.blog/" target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">Apatija.blog</a>. Gadiem ilgi viņa ir krājusi un pierakstījusi citātus, kas uzrunā, liek aizdomāties vai vienkārši iedvesmo.
          </p>
          <p>
            Šī mājaslapa ir mēģinājums šīm domām piešķirt digitālu mājvietu – vietu, kur tās varētu atrast un novērtēt arī citi. Tā ir tehniska dāvana un veltījums viņas aizrautībai.
          </p>
          <p>
            Ceram, ka, pārlūkojot šo kolekciju, arī Jūs atradīsiet kādu domu, kas rezonē un paliek atmiņā.
          </p>
        </div>
      </main>
    </div>
  );
}
