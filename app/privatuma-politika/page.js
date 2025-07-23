import Link from 'next/link';

// Metadati priekš SEO
export const metadata = {
  title: 'Privātuma Politika',
  description: 'Sintijas Citātu lapas privātuma politika un sīkdatņu izmantošanas noteikumi.',
};

export default function PrivacyPolicyPage() {
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
          <h1>Privātuma Politika</h1>
          <p><strong>Spēkā stāšanās datums: 2024. gada 23. jūlijs</strong></p>
          <p>Šī privātuma politika apraksta, kā "Sintijas Citāti" (turpmāk – "mēs", "mūsu") ievāc, izmanto un aizsargā informāciju, ko Jūs sniedzat, apmeklējot mājaslapu kazocina.pro (turpmāk – "Vietne").</p>
          
          <h2>1. Informācija, ko mēs ievācam</h2>
          <ul>
            <li><strong>Ne-personīga informācija:</strong> Apmeklējot Vietni, mēs automātiski varam ievākt informāciju, kas nav personiski identificējama, piemēram, Jūsu pārlūkprogrammas tips, ierīces veids, apmeklējuma laiks un lapas, kuras esat skatījis. Šī informācija tiek ievākta, izmantojot Google Analytics.</li>
            <li><strong>Sīkdatnes (Cookies):</strong> Mūsu Vietne izmanto sīkdatnes, lai uzlabotu Jūsu lietotāja pieredzi. Sīkdatnes ir mazi teksta faili, kas tiek saglabāti Jūsu ierīcē. Mēs izmantojam sīkdatnes, lai analizētu Vietnes apmeklējumu un rādītu personalizētas reklāmas.</li>
          </ul>

          <h2>2. Kā mēs izmantojam ievākto informāciju</h2>
          <p>Jebkura ievāktā informācija tiek izmantota, lai:</p>
          <ul>
            <li>Uzlabotu mūsu Vietnes darbību un saturu.</li>
            <li>Analizētu apmeklētāju plūsmu un uzvedību, izmantojot Google Analytics.</li>
            <li>Rādītu atbilstošas reklāmas, izmantojot Google AdSense.</li>
          </ul>

          <h2>3. Google AdSense un Sīkdatnes</h2>
          <p>Mūsu Vietnē tiek izmantots Google AdSense reklāmas serviss. Google kā trešās puses piegādātājs izmanto sīkdatnes, lai rādītu reklāmas. Google DART sīkdatne ļauj rādīt reklāmas, pamatojoties uz Jūsu iepriekšējiem apmeklējumiem mūsu un citās interneta vietnēs. Jūs varat atteikties no DART sīkdatnes izmantošanas, apmeklējot Google reklāmu un satura tīkla privātuma politiku.</p>

          <h2>4. Google Analytics</h2>
          <p>Mēs izmantojam Google Analytics, lai saprastu, kā apmeklētāji izmanto mūsu Vietni. Google Analytics ievāc anonīmu informāciju un ziņo par Vietnes tendencēm, neidentificējot atsevišķus apmeklētājus.</p>

          <h2>5. Jūsu tiesības</h2>
          <p>Jums ir tiesības kontrolēt sīkdatņu izmantošanu, mainot iestatījumus savā interneta pārlūkprogrammā. Lūdzu, ņemiet vērā, ka, atslēdzot sīkdatnes, dažas Vietnes funkcijas var nedarboties pilnvērtīgi.</p>

          <h2>6. Izmaiņas privātuma politikā</h2>
          <p>Mēs paturam tiesības jebkurā laikā atjaunināt šo privātuma politiku. Par jebkurām izmaiņām tiks paziņots, publicējot jauno versiju šajā lapā.</p>
        </div>
      </main>
    </div>
  );
}
