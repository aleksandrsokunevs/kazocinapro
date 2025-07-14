# Sintijas Citātu Lapa

Šis ir personīgs projekts, kas radīts, lai izveidotu skaistu un funkcionālu digitālo mājvietu manas sievas apkopotajiem citātiem no grāmatām un citiem avotiem. Mērķis ir radīt elegantu un interaktīvu platformu, kurā var viegli pārlūkot, meklēt un dalīties ar iedvesmojošām domām.

**Tiešraides saite:** [**kazocina.pro**](https://kazocina.pro) 

---

## ✨ Funkcionalitāte (Features)

* **Dinamiska Citātu Attēlošana:** Visi citāti tiek ielādēti no Strapi CMS, nodrošinot vieglu satura pārvaldību.
* **Divu veidu Skati:** Lietotāji var pārslēgties starp vizuālu "režģa" skatu ar bildēm un kompaktu "saraksta" skatu.
* **Jaudīga Filtrēšana:**
    * Meklēšana citātu tekstā.
    * Filtrēšana pēc autora.
    * Filtrēšana pēc avota (grāmatas).
    * Ātrā filtrēšana pēc populārākajiem tagiem.
* **"Dienas Citāts":** Lapas augšpusē tiek izcelts īpašs, iedvesmojošs dienas citāts ar fona attēlu.
* **"Nejaušs Citāts":** Poga, kas ļauj atklāt nejauši izvēlētu citātu no kolekcijas.
* **Kopīgot kā Attēlu:** Iespēja jebkuru citātu ar vienu klikšķi pārvērst par skaistu attēlu, kas gatavs lejupielādei un publicēšanai sociālajos tīklos.
* **Dinamisks Fonta Izmērs:** Garāki citāti automātiski tiek attēloti ar nedaudz mazāku fontu, lai saglabātu vienotu bloku izskatu.
* **Google AdSense Integrācija:** Diskrēti reklāmas bloki monetizācijas iespējām.

---

## 🚀 Izmantotās Tehnoloģijas

Šis projekts ir uzbūvēts, izmantojot modernu tehnoloģiju komplektu:

* **Front-end:** [Next.js](https://nextjs.org/) (React ietvars)
* **Stilizācija:** [Tailwind CSS](https://tailwindcss.com/)
* **Back-end (CMS):** [Strapi](https://strapi.io/)
* **Datubāze:** [PostgreSQL](https://www.postgresql.org/)
* **Hostings:** [DigitalOcean](https://www.digitalocean.com/) Droplets
* **Web Serveris:** [Nginx](https://www.nginx.com/)
* **Procesu Menedžeris:** [PM2](https://pm2.keymetrics.io/)

---

## 🔧 Kā palaist projektu lokāli

Šis projekts sastāv no divām daļām: `frontend-app` (Next.js) un `strapi-app` (Strapi).

1.  **Lejupielādējiet repozitoriju:**
    ```bash
    git clone [https://github.com/aleksandrsokunevs/kazocinapro.git](https://github.com/aleksandrsokunevs/kazocinapro.git)
    cd kazocinapro
    ```
2.  **Instalējiet atkarības:**
    ```bash
    npm install
    ```
3.  **Palaidiet izstrādes serveri:**
    ```bash
    npm run dev
    ```
    Aplikācija būs pieejama adresē `http://localhost:3000`.
