export type OpenRole = {
  id: string;
  name: string;
  type: string; // e.g. "Protagonista", "Supporto", "DOP"
  ageRange?: string;
  gender?: string;
  fee?: string;
  shootDates?: string;
  notes?: string;
  spots?: number;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category: "Acting" | "UGC" | "Crew" | "Voice" | "Production";
  tags: string[];
  budget: string;
  deadline: string;
  roles: number;
  description: string;
  synopsis: string;
  requirements: string[];
  references: string[];
  cover: string;
  paid: boolean;
  remote: boolean;
  featured?: boolean;
  openRoles?: OpenRole[];
  applySteps?: { title: string; description: string }[];
};

const covers = [
  "linear-gradient(135deg,#1a1a2e,#3a3a6e)",
  "linear-gradient(135deg,#2a1a1a,#7a3a3a)",
  "linear-gradient(135deg,#1a2a2a,#3a6a6e)",
  "linear-gradient(135deg,#2a1a2e,#7B83FF)",
  "linear-gradient(135deg,#0e0e1a,#4a4a8e)",
  "linear-gradient(135deg,#1a1a1a,#5a5a5a)",
];

export const JOBS: Job[] = [
  {
    id: "horror-rome",
    title: "Lungometraggio Horror",
    company: "Red Penguin Productions",
    location: "Roma, Italia",
    category: "Acting",
    tags: ["In evidenza", "Pagato", "Sul set"],
    budget: "€8.000 – €18.000",
    deadline: "14 dic",
    roles: 4,
    description: "Ruoli protagonisti e di supporto per un horror atmosferico ambientato nell'Italia degli anni '70.",
    synopsis:
      "Una giovane restauratrice torna nella villa di famiglia e scopre che i dipinti custodiscono qualcosa di molto più antico della memoria. Un folk horror lento nella tradizione di Argento e Garrone.",
    requirements: ["18–35 anni", "Italiano fluente", "Showreel on-camera"],
    references: ["Suspiria", "The VVitch", "Nope"],
    cover: covers[0],
    paid: true,
    remote: false,
    featured: true,
    openRoles: [
      {
        id: "elena",
        name: "Elena",
        type: "Protagonista",
        ageRange: "26–32",
        gender: "F",
        fee: "€12.000",
        shootDates: "10 feb – 22 mar",
        notes: "Restauratrice introversa. Forte presenza fisica, parla italiano fluente.",
        spots: 1,
      },
      {
        id: "marco",
        name: "Marco",
        type: "Supporto principale",
        ageRange: "30–40",
        gender: "M",
        fee: "€6.000",
        shootDates: "18 feb – 14 mar",
        notes: "Storico dell'arte enigmatico. Esperienza teatrale richiesta.",
        spots: 1,
      },
      {
        id: "nonna",
        name: "La Nonna",
        type: "Cameo",
        ageRange: "70+",
        gender: "F",
        fee: "€2.500",
        shootDates: "2 giorni a marzo",
        notes: "Dialoghi in dialetto romano. Audizione self-tape.",
        spots: 1,
      },
      {
        id: "voci",
        name: "Voci della villa",
        type: "Comparse principali",
        ageRange: "20–60",
        fee: "€450/giorno",
        shootDates: "Marzo (date variabili)",
        notes: "Cerchiamo presenze fotogeniche, no esperienza richiesta.",
        spots: 4,
      },
    ],
    applySteps: [
      { title: "Compila il profilo", description: "Verifica showreel, foto recenti e contatto agente." },
      { title: "Invia self-tape", description: "Riceverai le sides via email entro 24h dalla candidatura." },
      { title: "Callback in presenza", description: "Selezionati invitati a Roma tra il 9 e il 12 gennaio." },
    ],
  },
  {
    id: "ugc-netflix",
    title: "Campagna UGC stile Netflix",
    company: "House of Pixels",
    location: "Remoto · Worldwide",
    category: "UGC",
    tags: ["Pagato", "Remoto", "Worldwide"],
    budget: "$600 / deliverable",
    deadline: "30 nov",
    roles: 12,
    description: "Contenuti verticali nativi da creator per il lancio di una piattaforma streaming.",
    synopsis:
      "Cerchiamo creator capaci di girare clip verticali cinematografiche con la propria voce — niente copione, solo brief e la tua camera roll.",
    requirements: ["Camera/telefono propri", "10k+ follower preferibili", "Inglese"],
    references: ["Trailer A24", "Recensioni Letterboxd"],
    cover: covers[3],
    paid: true,
    remote: true,
    featured: true,
  },
  {
    id: "psych-thriller",
    title: "Thriller psicologico indipendente",
    company: "Northlight Films",
    location: "Lisbona, Portogallo",
    category: "Acting",
    tags: ["Pagato", "Protagonista"],
    budget: "€4.500",
    deadline: "08 gen",
    roles: 2,
    description: "Un two-hander girato in 16mm. Cerchiamo un protagonista e un comprimario.",
    synopsis: "Due sconosciuti, un appartamento, tre giorni. Un dramma da camera su memoria e consenso.",
    requirements: ["25–40 anni", "Forte background teatrale"],
    references: ["Aftersun", "La persona peggiore del mondo"],
    cover: covers[1],
    paid: true,
    remote: false,
  },
  {
    id: "fashion-milan",
    title: "Campagna Fashion · Milano",
    company: "Atelier Nove",
    location: "Milano, Italia",
    category: "Production",
    tags: ["Pagato", "Viaggio coperto"],
    budget: "€2.200",
    deadline: "02 dic",
    roles: 6,
    description: "Campagna editoriale per la capsule SS26. Modelli, MUA, assistenti foto.",
    synopsis: "Lusso silenzioso incontra architettura brutalista. Tre giorni in location.",
    requirements: ["Portfolio", "Disponibile 10–13 dic"],
    references: ["Jil Sander", "The Row"],
    cover: covers[2],
    paid: true,
    remote: false,
  },
  {
    id: "feature-a24",
    title: "Lungometraggio drammatico",
    company: "Quiet Room Studio",
    location: "Brooklyn, NY",
    category: "Crew",
    tags: ["Troupe", "Lungometraggio"],
    budget: "$48.000",
    deadline: "20 dic",
    roles: 5,
    description: "Cerchiamo DOP, gaffer, fonico, AD e scenografo per un feature indipendente.",
    synopsis: "Lungometraggio di formazione da 96 minuti, girato in cinque settimane tra Greenpoint e Coney Island.",
    requirements: ["Showreel", "Locali a NYC", "Disponibilità 5 settimane"],
    references: ["The Florida Project", "Past Lives"],
    cover: covers[4],
    paid: true,
    remote: false,
    featured: true,
  },
  {
    id: "horror-pod",
    title: "Voiceover · Podcast Horror",
    company: "Midnight Frequencies",
    location: "Remoto",
    category: "Voice",
    tags: ["Pagato", "Remoto"],
    budget: "$1.200 / stagione",
    deadline: "25 nov",
    roles: 3,
    description: "Tre doppiatori per un'antologia horror scritta, stagione due.",
    synopsis: "Sei episodi, ~30 min ciascuno. Preferita una resa intima, sussurrata.",
    requirements: ["Home studio", "Demo reel"],
    references: ["The Magnus Archives", "Limetown"],
    cover: covers[5],
    paid: true,
    remote: true,
  },
];

export const CATEGORIES = ["All", "Acting", "UGC", "Crew", "Voice", "Production"] as const;

export type Realm = "casting" | "production";

export const REALMS: { id: Realm; label: string; sub: string }[] = [
  { id: "casting", label: "Casting", sub: "Ruoli, talent e chiamate creative" },
  { id: "production", label: "Produzione", sub: "Troupe, fornitori, location e attrezzature" },
];

export const ROLES_TALENT = [
  { id: "acting", name: "Recitazione", icon: "🎭" },
  { id: "voiceover", name: "Voiceover", icon: "🎙️" },
  { id: "modeling", name: "Modella/o", icon: "📸" },
  { id: "creator", name: "Content Creator", icon: "✨" },
  { id: "extra", name: "Comparsa", icon: "👥" },
  { id: "stunts", name: "Stunt", icon: "🥋" },
];

export const ROLES_PRODUCTION = [
  { id: "producer", name: "Produttore", icon: "📋" },
  { id: "casting", name: "Casting Director", icon: "🎬" },
  { id: "crew", name: "Troupe / DOP", icon: "🎚️" },
  { id: "vendor", name: "Fornitore", icon: "🎛️" },
  { id: "location", name: "Location Owner", icon: "🏛️" },
  { id: "commission", name: "Film Commission", icon: "🌍" },
];

export const ROLES = [...ROLES_TALENT, ...ROLES_PRODUCTION];

export const GEO_QUICK = ["Roma", "Milano", "Italia", "Remoto", "Europa"] as const;

export type Vendor = {
  id: string;
  name: string;
  role: string;
  category: "Crew" | "Vendor" | "Location" | "Equipment" | "Catering" | "Vehicles" | "Stuff";
  city: string;
  rate: string;
  availability: string;
  verified: boolean;
  cover: string;
  bio: string;
  tags: string[];
};

export const VENDORS: Vendor[] = [
  {
    id: "dop-marco",
    name: "Marco Vitali",
    role: "Direttore della Fotografia",
    category: "Crew",
    city: "Roma",
    rate: "€850–1.200 / giorno",
    availability: "Dall'8 gennaio",
    verified: true,
    cover: "linear-gradient(135deg,#1a1a2e,#3a3a6e)",
    bio: "10 anni tra narrativa e commercial. Alexa 35 / anamorfico. Crediti IMDb in horror indipendente.",
    tags: ["Anamorfico", "Narrativa", "Roma"],
  },
  {
    id: "sound-elena",
    name: "Elena Ricci",
    role: "Fonico di Presa Diretta",
    category: "Crew",
    city: "Milano",
    rate: "€500–700 / giorno",
    availability: "Disponibile ora",
    verified: true,
    cover: "linear-gradient(135deg,#2a1a1a,#7a3a3a)",
    bio: "Sound Devices 888, kit completo boom + lavalier. Lavora su serie e lungometraggi.",
    tags: ["Sennheiser", "Serie TV", "Lombardia"],
  },
  {
    id: "gaffer-luca",
    name: "Luca Bernardi",
    role: "Gaffer & Lighting",
    category: "Crew",
    city: "Roma",
    rate: "€600–900 / giorno",
    availability: "Metà dicembre",
    verified: false,
    cover: "linear-gradient(135deg,#3a2a1a,#a0653a)",
    bio: "Pacchetto ARRI SkyPanel + HMI. Luce narrativa cinematografica.",
    tags: ["ARRI", "HMI", "Roma"],
  },
  {
    id: "rental-cineflux",
    name: "CineFlux Rentals",
    role: "Camera & Ottiche",
    category: "Equipment",
    city: "Milano",
    rate: "€450+ / giorno",
    availability: "Aperto ogni giorno",
    verified: true,
    cover: "linear-gradient(135deg,#0e0e1a,#4a4a8e)",
    bio: "Alexa 35, Mini LF, Cooke S7/i, Atlas anamorfico. Consegna in tutta Italia.",
    tags: ["Alexa", "Cooke", "Atlas"],
  },
  {
    id: "grip-vega",
    name: "Vega Grip Truck",
    role: "Grip Truck & Crane",
    category: "Vendor",
    city: "Roma",
    rate: "€1.400 / giorno",
    availability: "Prenotazioni 2 sett. prima",
    verified: true,
    cover: "linear-gradient(135deg,#1a2a2a,#3a6a6e)",
    bio: "Grip truck 5 tonn., gru Scorpio, dolly track. Autista + grip inclusi.",
    tags: ["Crane", "Dolly", "Lazio"],
  },
  {
    id: "catering-orto",
    name: "Orto · Set Catering",
    role: "Catering per set cinematografici",
    category: "Catering",
    city: "Milano",
    rate: "€28 / persona",
    availability: "Lun–Dom",
    verified: false,
    cover: "linear-gradient(135deg,#1a2a1a,#5a8a4a)",
    bio: "Menù italiani plant-forward. Troupe 20–150. Pasti caldi + crafty.",
    tags: ["Vegano", "Pasto caldo", "Crafty"],
  },
  {
    id: "vehicles-classic",
    name: "Classico Auto d'Epoca",
    role: "Auto d'epoca · Fiat, Alfa, Lancia",
    category: "Vehicles",
    city: "Roma",
    rate: "€350–900 / giorno",
    availability: "Su prenotazione",
    verified: true,
    cover: "linear-gradient(135deg,#2a1a1a,#a0653a)",
    bio: "Parco di oltre 40 vetture italiane anni '50–'90, assicurate per il cinema. Autista certificato incluso.",
    tags: ["Anni 60", "Anni 70", "Italiane"],
  },
  {
    id: "vehicles-police",
    name: "Roma Action Cars",
    role: "Mezzi speciali · Polizia, Carabinieri, ambulanze",
    category: "Vehicles",
    city: "Roma",
    rate: "€600–1.800 / giorno",
    availability: "Da 72h prima",
    verified: true,
    cover: "linear-gradient(135deg,#0e0e1a,#3a3a8e)",
    bio: "Volanti, gazzelle, ambulanze 118 replica e mezzi VVF. Piloti stunt certificati ENPALS.",
    tags: ["Polizia", "Stunt", "Action"],
  },
  {
    id: "vehicles-trucks",
    name: "Nord Truck Service",
    role: "Camion, bus e mezzi pesanti",
    category: "Vehicles",
    city: "Milano",
    rate: "€450–1.200 / giorno",
    availability: "Tutta Italia",
    verified: false,
    cover: "linear-gradient(135deg,#1a1a1a,#5a5a5a)",
    bio: "TIR, autoarticolati, bus turistici e mezzi industriali. Service trailer e cabine trucker.",
    tags: ["Tir", "Bus", "Industria"],
  },
  {
    id: "stuff-armory",
    name: "Cinequip Armeria",
    role: "Armeria scenica · Custodi certificati",
    category: "Stuff",
    city: "Roma",
    rate: "Su preventivo",
    availability: "Con custode armeria",
    verified: true,
    cover: "linear-gradient(135deg,#2a1a1a,#6a2a2a)",
    bio: "Armi sceniche d'epoca e contemporanee, repliche a salve, coltelli da scena. Sempre con armaiolo sul set.",
    tags: ["Sicurezza", "Storico", "Custode"],
  },
  {
    id: "stuff-fx",
    name: "Atelier FX Pratici",
    role: "Effetti speciali pratici · Atmosfere",
    category: "Stuff",
    city: "Milano",
    rate: "€800–2.500 / giorno",
    availability: "Squadra 2–6 persone",
    verified: true,
    cover: "linear-gradient(135deg,#1a2a2a,#3a6a6e)",
    bio: "Pioggia, neve, nebbia, fumo. Squibs e protesi. Lavora su lungo, serie e pubblicità.",
    tags: ["Pioggia", "Nebbia", "Squib"],
  },
  {
    id: "stuff-animals",
    name: "Animals on Set",
    role: "Animali per il cinema · Addestratori",
    category: "Stuff",
    city: "Roma",
    rate: "Da €450 / giorno",
    availability: "Cani, cavalli, rapaci",
    verified: false,
    cover: "linear-gradient(135deg,#3a2a1a,#8a6a3a)",
    bio: "Animali addestrati per il set, etici e in conformità ENPA. Addestratori sempre presenti.",
    tags: ["Cani", "Cavalli", "Etico"],
  },
  {
    id: "stuff-set-deco",
    name: "Bottega Scenografia",
    role: "Scenografia & arredo scena",
    category: "Stuff",
    city: "Roma",
    rate: "€1.200–4.000 / giorno",
    availability: "Costruzioni + noleggio",
    verified: true,
    cover: "linear-gradient(135deg,#1a1a2e,#4a4a8e)",
    bio: "Costruzione set e magazzino arredi da anni '20 al contemporaneo. Pareti, controsoffitti, dressing.",
    tags: ["Costruzione", "Arredi", "Vintage"],
  },
];

import locVillaAurelia from "@/assets/loc-villa-aurelia.jpg";
import locStudioNavigli from "@/assets/loc-studio-navigli.jpg";
import locRooftopEur from "@/assets/loc-rooftop-eur.jpg";
import locBarPorta from "@/assets/loc-bar-porta.jpg";

export type Location = {
  id: string;
  name: string;
  type: string;
  city: string;
  area: string;
  rate: string;
  cover: string;
  photo?: string;
  tags: string[];
  verified: boolean;
};

export const LOCATIONS: Location[] = [
  {
    id: "villa-aurelia",
    name: "Villa Aurelia",
    type: "Villa d'epoca · 1700",
    city: "Roma",
    area: "Trastevere",
    rate: "€2.400 / giorno",
    cover: "linear-gradient(135deg,#3a2418,#8a5a3a)",
    photo: locVillaAurelia,
    tags: ["Epoca", "Giardini", "Cinematografica"],
    verified: true,
  },
  {
    id: "studio-navigli",
    name: "Studio Navigli 4B",
    type: "Loft industriale",
    city: "Milano",
    area: "Navigli",
    rate: "€780 / giorno",
    cover: "linear-gradient(135deg,#1a1a1a,#5a5a5a)",
    photo: locStudioNavigli,
    tags: ["Loft", "Pareti nere", "Cyc"],
    verified: true,
  },
  {
    id: "rooftop-eur",
    name: "Rooftop EUR",
    type: "Rooftop brutalista",
    city: "Roma",
    area: "EUR",
    rate: "€1.100 / giorno",
    cover: "linear-gradient(135deg,#0e1820,#3a5a7a)",
    photo: locRooftopEur,
    tags: ["Skyline", "Brutalista", "Tramonto"],
    verified: false,
  },
  {
    id: "bar-porta",
    name: "Bar Porta Romana",
    type: "Bar interno anni '60",
    city: "Milano",
    area: "Porta Romana",
    rate: "€620 / giorno",
    cover: "linear-gradient(135deg,#2a1a1a,#a0653a)",
    photo: locBarPorta,
    tags: ["Retrò", "Practical", "Notte"],
    verified: true,
  },
];

export type Commission = {
  id: string;
  name: string;
  region: string;
  country: string;
  credit: string;
  ceiling: string;
  minSpend: string;
  highlights: string[];
  contact: string;
  color: string;
};

export const COMMISSIONS: Commission[] = [
  {
    id: "lazio",
    name: "Roma Lazio Film Commission",
    region: "Lazio",
    country: "Italia",
    credit: "Fino al 40%",
    ceiling: "€20M / progetto",
    minSpend: "€250.000 spesa qualificata",
    highlights: ["Tax credit nazionale + regionale", "Fondo audiovisivo €15M", "Location scouting gratuito"],
    contact: "info@romalaziofc.it",
    color: "linear-gradient(135deg,#7a1a1a,#c4161c)",
  },
  {
    id: "tuscany",
    name: "Toscana Film Commission",
    region: "Toscana",
    country: "Italia",
    credit: "Fino al 30%",
    ceiling: "€8M / progetto",
    minSpend: "€150.000 in regione",
    highlights: ["Fondo regionale €5M", "Sportello permessi unico", "Network di studi e laboratori"],
    contact: "info@toscanafilmcommission.it",
    color: "linear-gradient(135deg,#3a2a1a,#a0653a)",
  },
  {
    id: "lombardia",
    name: "Lombardia Film Commission",
    region: "Lombardia",
    country: "Italia",
    credit: "Fino al 25%",
    ceiling: "€6M / progetto",
    minSpend: "€100.000 in regione",
    highlights: ["Bandi annuali", "Sostegno R&D audiovisivo", "Coproduzioni internazionali"],
    contact: "info@lombardiafilmcommission.it",
    color: "linear-gradient(135deg,#1a2a2a,#3a6a6e)",
  },
  {
    id: "apulia",
    name: "Apulia Film Commission",
    region: "Puglia",
    country: "Italia",
    credit: "Fino al 40%",
    ceiling: "€10M / progetto",
    minSpend: "€200.000 in regione",
    highlights: ["Cluster mediterraneo", "Hospitality troupe", "Apulia Film Forum annuale"],
    contact: "info@apuliafilmcommission.it",
    color: "linear-gradient(135deg,#2a1a2e,#6a3a7a)",
  },
  {
    id: "bfi",
    name: "British Film Institute",
    region: "Regno Unito",
    country: "UK",
    credit: "Fino al 25%",
    ceiling: "Nessun tetto",
    minSpend: "10% UK qualifying spend",
    highlights: ["High-end TV credit", "Cultural test obbligatorio", "Pinewood, Shepperton, Leavesden"],
    contact: "info@bfi.org.uk",
    color: "linear-gradient(135deg,#0e0e1a,#3a3a8e)",
  },
  {
    id: "cnc",
    name: "Centre National du Cinéma",
    region: "Francia",
    country: "FR",
    credit: "Fino al 30%",
    ceiling: "€30M / progetto",
    minSpend: "€250.000 in Francia",
    highlights: ["TRIP per produzioni internazionali", "Coproduzioni minoritarie", "Studi a Parigi e Marsiglia"],
    contact: "contact@cnc.fr",
    color: "linear-gradient(135deg,#1a1a1a,#5a5a5a)",
  },
];

export const INCUBATOR_PROJECTS = [
  { id: "p-folk", title: "L'ora del sale", genre: "Folk Horror · Lungometraggio", stage: "Pre-prod", logline: "Una vedova torna in un paese di mare dove la marea si rifiuta di salire.", looking: "Produttore · DOP", cover: "linear-gradient(135deg,#1a1a2e,#3a3a6e)" },
  { id: "p-doc", title: "Pixel Saints", genre: "Documentario", stage: "Sviluppo", logline: "Dentro la scena rave underground che sta ricostruendo la Milano post-pandemia.", looking: "Co-produttore · Sound", cover: "linear-gradient(135deg,#2a1a2e,#7a3a7a)" },
  { id: "p-short", title: "Tre Minuti", genre: "Corto · Drammatico", stage: "Finanziato", logline: "Un ritardo del treno costringe due sconosciuti a confrontarsi con lo stesso ricordo.", looking: "Cast · Troupe", cover: "linear-gradient(135deg,#3a2a1a,#a0653a)" },
];



export const PLANS = [
  {
    id: "free",
    name: "Beta Gratuita",
    price: "€0",
    suffix: "/per sempre",
    badge: "Beta",
    features: ["3 candidature / mese", "Esplora progetti pubblici", "Profilo base"],
    cta: "Inizia gratis",
    tone: "muted" as const,
  },
  {
    id: "pro",
    name: "Circle Pro",
    price: "€14",
    suffix: "/mese",
    badge: "Più scelto",
    features: [
      "Candidature illimitate",
      "Visibilità prioritaria",
      "Messaggi sbloccati",
      "Insight AI del portfolio",
    ],
    cta: "Passa a Pro",
    tone: "primary" as const,
  },
  {
    id: "studio",
    name: "Studio",
    price: "€99",
    suffix: "/mese",
    badge: "Per produzioni",
    features: ["Shortlist e posti team", "Database talent privato", "Casting call illimitati", "Badge produttore verificato"],
    cta: "Prova Studio",
    tone: "dark" as const,
  },
];

export const CONVERSATIONS = [
  {
    id: "c1",
    name: "Sofia · Lumière Pictures",
    role: "Casting Director",
    avatar: "linear-gradient(135deg,#7B83FF,#b8a4ff)",
    last: "Mi è piaciuto il tuo provino. Disponibile giovedì per il callback?",
    time: "12m",
    unread: 2,
  },
  {
    id: "c2",
    name: "Quiet Room Studio",
    role: "Produzione",
    avatar: "linear-gradient(135deg,#1a1a2e,#3a3a6e)",
    last: "Ti condivido il moodboard ora ↗",
    time: "1h",
    unread: 0,
  },
  {
    id: "c3",
    name: "Mira K.",
    role: "Regista",
    avatar: "linear-gradient(135deg,#2a1a2e,#7a3a7a)",
    last: "Messaggio vocale (0:42)",
    time: "Ieri",
    unread: 0,
  },
  {
    id: "c4",
    name: "House of Pixels",
    role: "Brand",
    avatar: "linear-gradient(135deg,#3a6a6e,#1a2a2a)",
    last: "Benvenuta nel Circle ✦",
    time: "2g",
    unread: 0,
  },
];

export const MESSAGES: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  c1: [
    { from: "them", text: "Ciao! Ho visto il tuo reel — davvero forte.", time: "10:14" },
    { from: "them", text: "Mi è piaciuto il tuo provino. Disponibile giovedì per il callback?", time: "10:14" },
    { from: "me", text: "Grazie mille. Giovedì va benissimo — mattina o pomeriggio?", time: "10:21" },
    { from: "them", text: "Pomeriggio, ore 15. Ti mandiamo le scene stasera.", time: "10:22" },
  ],
  c2: [
    { from: "them", text: "Benvenuta a bordo. La call sheet della troupe arriva domani.", time: "Lun" },
    { from: "them", text: "Ti condivido il moodboard ora ↗", time: "Lun" },
  ],
  c3: [
    { from: "them", text: "Messaggio vocale (0:42)", time: "Ieri" },
  ],
  c4: [
    { from: "them", text: "Benvenuta nel Circle ✦", time: "2g" },
  ],
};

export const NOTIFICATIONS = [
  { id: "n1", title: "Nuovo ruolo per te", body: "Lungometraggio Horror · Roma è in linea con il tuo profilo.", time: "8m", kind: "match" },
  { id: "n2", title: "Sofia ha risposto", body: "Mi è piaciuto il tuo provino. Disponibile giovedì per il callback?", time: "12m", kind: "message" },
  { id: "n3", title: "Candidatura vista", body: "Quiet Room Studio ha visualizzato la tua candidatura.", time: "1h", kind: "view" },
  { id: "n4", title: "Aggiornamento progetto salvato", body: "Il corto stile A24 ha aggiunto un moodboard.", time: "3h", kind: "update" },
  { id: "n5", title: "Benvenuta in Circle Beta", body: "Sei dentro. Tocca per completare il profilo.", time: "2g", kind: "system" },
];

export const COMMUNITY_POSTS = [
  {
    id: "rp-casting-lead",
    author: "Red Penguin Productions",
    role: "Casa di produzione · Ufficiale",
    initials: "RP",
    brand: true,
    production: "Untitled Feature · Q1 2026",
    location: "Roma · Lazio",
    day: "Casting aperto",
    timeAgo: "3h",
    caption:
      "Cerchiamo PROTAGONISTA maschile (30–42) e due comprimari per nuovo lungometraggio drammatico. Riprese gennaio–marzo 2026, Roma e provincia. Inviateci self-tape + reel via Circle entro il 5 dicembre.",
    tags: ["#casting", "#attori", "#lungometraggio"],
    color: "linear-gradient(135deg,#0a0a0a 0%,#3a0a0e 60%,#c4161c 100%)",
    aspect: "4 / 5",
    likes: 318,
    comments: 42,
  },
  {
    id: "rp-crew-call",
    author: "Red Penguin Productions",
    role: "Casa di produzione · Ufficiale",
    initials: "RP",
    brand: true,
    production: "Untitled Feature · Pre-prod",
    location: "Roma · Cinecittà",
    day: "Troupe",
    timeAgo: "1g",
    caption:
      "Stiamo completando la troupe: DOP (anamorfico), fonico di presa diretta, gaffer e scenografo. Disponibilità da metà gennaio, 8 settimane. Mandate showreel e crediti recenti.",
    tags: ["#troupe", "#crew", "#cinecitta"],
    color: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 70%,#7a0e12 100%)",
    aspect: "1 / 1",
    likes: 184,
    comments: 27,
  },
  {
    id: "rp-extras",
    author: "Red Penguin Productions",
    role: "Casa di produzione · Ufficiale",
    initials: "RP",
    brand: true,
    production: "Untitled Feature · Q1 2026",
    location: "Roma e provincia",
    day: "Comparse",
    timeAgo: "2g",
    caption:
      "Casting comparse aperto: uomini e donne 25–65, tutti i tipi fisici, residenti Roma e Lazio. Giornate di set tra febbraio e marzo. Compenso giornaliero sindacale + pasti.",
    tags: ["#comparse", "#castingRoma"],
    color: "linear-gradient(135deg,#1a0a0a 0%,#5a1a1a 60%,#c4161c 100%)",
    aspect: "4 / 5",
    likes: 256,
    comments: 61,
  },
  {
    id: "rp-wrap",
    author: "Red Penguin Productions",
    role: "Casa di produzione · Ufficiale",
    initials: "RP",
    brand: true,
    production: "L'Infinito",
    location: "Recanati · Marche",
    day: "Wrap",
    timeAgo: "5g",
    caption:
      "Wrap dopo 32 giorni di set. Grazie a cast, troupe e a chi ci ha aperto le porte di Recanati. Ci vediamo in sala di montaggio. 🐧",
    tags: ["#wrap", "#linfinito", "#grazie"],
    color: "linear-gradient(135deg,#0a0a0a 0%,#2a0a0e 60%,#7a0e12 100%)",
    aspect: "1 / 1",
    likes: 612,
    comments: 84,
  },
];


// ============================================================
// Circle swipe profiles
// ============================================================

import circleP1 from "@/assets/circle-p1.jpg";
import circleP2 from "@/assets/circle-p2.jpg";
import circleP3 from "@/assets/circle-p3.jpg";
import circleP4 from "@/assets/circle-p4.jpg";
import circleP5 from "@/assets/circle-p5.jpg";
import circleP6 from "@/assets/circle-p6.jpg";

export type CircleProfile = {
  id: string;
  name: string;
  age: number;
  roleId: string; // matches ROLES.id
  roleLabel: string;
  city: string; // matches GEO_QUICK
  experience: string;
  bio: string;
  skills: string[];
  lastWork: string;
  photo: string;
  cover: string; // gradient fallback
  wouldMatch: boolean;
  available: boolean;
};

export const CIRCLE_PROFILES: CircleProfile[] = [
  {
    id: "cp-giulia",
    name: "Giulia Romano",
    age: 28,
    roleId: "acting",
    roleLabel: "Attrice",
    city: "Roma",
    experience: "8 anni",
    bio: "Drammatico, dialoghi serrati, presenza scenica. Bilingue IT/EN.",
    skills: ["Drama", "Bilingue", "Teatro"],
    lastWork: "Suburra II · Netflix",
    photo: circleP1,
    cover: "linear-gradient(135deg,#3a1a1a,#7a4a3a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-marco",
    name: "Marco Bellandi",
    age: 36,
    roleId: "crew",
    roleLabel: "Direttore della fotografia",
    city: "Milano",
    experience: "12 anni",
    bio: "Anamorfico, naturalismo, storytelling visivo. Premio Globo d'Oro 2024.",
    skills: ["Anamorfico", "DOP", "Naturalismo"],
    lastWork: "Corto Sundance · 2025",
    photo: circleP2,
    cover: "linear-gradient(135deg,#1a1a2e,#3a3a5e)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-amara",
    name: "Amara Diallo",
    age: 24,
    roleId: "modeling",
    roleLabel: "Modella · Creator",
    city: "Milano",
    experience: "5 anni",
    bio: "Editorial, fashion week, moda sostenibile. Volto Vogue Italia.",
    skills: ["Editorial", "Runway", "Brand"],
    lastWork: "Campagna Diesel SS26",
    photo: circleP3,
    cover: "linear-gradient(135deg,#3a2a1a,#a07a4a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-luca",
    name: "Luca De Santis",
    age: 44,
    roleId: "producer",
    roleLabel: "Produttore esecutivo",
    city: "Roma",
    experience: "20 anni",
    bio: "Lungometraggi indie, co-produzioni EU, festival circuit.",
    skills: ["Indie", "Co-prod EU", "Festival"],
    lastWork: "Quiet Room · Venezia 2025",
    photo: circleP4,
    cover: "linear-gradient(135deg,#2a1a0e,#7a4a1a)",
    wouldMatch: false,
    available: true,
  },
  {
    id: "cp-elena",
    name: "Elena Marchetti",
    age: 31,
    roleId: "casting",
    roleLabel: "Casting Director",
    city: "Roma",
    experience: "9 anni",
    bio: "Casting per cinema d'autore. Network attori emergenti tutta Italia.",
    skills: ["Cinema", "Talent scout", "Network"],
    lastWork: "L'Ultima Notte · Rai Cinema",
    photo: circleP5,
    cover: "linear-gradient(135deg,#3a2a2e,#c87a6a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-kenji",
    name: "Kenji Watanabe",
    age: 33,
    roleId: "crew",
    roleLabel: "Sound designer",
    city: "Italia",
    experience: "10 anni",
    bio: "Sound design immersivo, Dolby Atmos, post-produzione audio.",
    skills: ["Atmos", "Foley", "Post"],
    lastWork: "Documentario BBC Earth",
    photo: circleP6,
    cover: "linear-gradient(135deg,#0e1a2e,#1a3a5e)",
    wouldMatch: false,
    available: false,
  },
  {
    id: "cp-sara",
    name: "Sara Bianchi",
    age: 26,
    roleId: "creator",
    roleLabel: "Content Creator",
    city: "Milano",
    experience: "4 anni",
    bio: "Branded content, lifestyle, 380k follower IG. UGC su misura.",
    skills: ["UGC", "Reels", "Brand"],
    lastWork: "Adv Lavazza · 2025",
    photo: circleP1,
    cover: "linear-gradient(135deg,#2a1a3a,#7a4a8a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-alessio",
    name: "Alessio Greco",
    age: 29,
    roleId: "acting",
    roleLabel: "Attore",
    city: "Remoto",
    experience: "6 anni",
    bio: "Self-tape pro, ruoli supporto, action e commedia romantica.",
    skills: ["Self-tape", "Action", "Comedy"],
    lastWork: "Smetto Quando Voglio 4",
    photo: circleP2,
    cover: "linear-gradient(135deg,#1a2a1a,#3a5a3a)",
    wouldMatch: false,
    available: true,
  },
  {
    id: "cp-noemi",
    name: "Noemi Costa",
    age: 35,
    roleId: "crew",
    roleLabel: "Production Designer",
    city: "Roma",
    experience: "11 anni",
    bio: "Scenografie d'epoca e contemporanee. Specializzata anni '60-'70.",
    skills: ["Scenografia", "Epoca", "Set dressing"],
    lastWork: "Esterno Notte · Bellocchio",
    photo: circleP3,
    cover: "linear-gradient(135deg,#3a2a0e,#a07a3a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-thomas",
    name: "Thomas Vidal",
    age: 38,
    roleId: "vendor",
    roleLabel: "Noleggio camera",
    city: "Europa",
    experience: "15 anni",
    bio: "Arri, RED, Sony — pacchetti completi con DIT e ottiche vintage.",
    skills: ["Arri", "RED", "Vintage"],
    lastWork: "Set HBO Italia · 2025",
    photo: circleP4,
    cover: "linear-gradient(135deg,#1a1a1a,#4a4a4a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-livia",
    name: "Livia Conti",
    age: 27,
    roleId: "voiceover",
    roleLabel: "Voiceover artist",
    city: "Italia",
    experience: "5 anni",
    bio: "Doppiaggio, audiolibri, brand voice. Studio in casa, consegne 24h.",
    skills: ["Doppiaggio", "Audiolibri", "ENG"],
    lastWork: "Audible Original · 2025",
    photo: circleP5,
    cover: "linear-gradient(135deg,#3a1a2a,#a04a6a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-haruto",
    name: "Haruto Sato",
    age: 41,
    roleId: "producer",
    roleLabel: "Line Producer",
    city: "Europa",
    experience: "18 anni",
    bio: "Co-produzioni Asia-EU, location fixing, budget control.",
    skills: ["Line", "Asia-EU", "Budget"],
    lastWork: "Tokyo Vice · HBO",
    photo: circleP6,
    cover: "linear-gradient(135deg,#0e1a1a,#2a4a4a)",
    wouldMatch: false,
    available: false,
  },
  {
    id: "cp-fede",
    name: "Federico Marin",
    age: 32,
    roleId: "crew",
    roleLabel: "Editor / Colorist",
    city: "Milano",
    experience: "9 anni",
    bio: "Montaggio narrativo + color grading. DaVinci certified.",
    skills: ["Editing", "Color", "DaVinci"],
    lastWork: "Pubblicità Gucci · 2025",
    photo: circleP2,
    cover: "linear-gradient(135deg,#2a0e1a,#7a2a4a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-maya",
    name: "Maya Ferrari",
    age: 23,
    roleId: "extra",
    roleLabel: "Comparsa speciale",
    city: "Roma",
    experience: "3 anni",
    bio: "Disponibilità immediata. Equitazione, danza classica, scherma.",
    skills: ["Equitazione", "Danza", "Scherma"],
    lastWork: "Medici · 2024",
    photo: circleP1,
    cover: "linear-gradient(135deg,#1a2a3a,#4a6a8a)",
    wouldMatch: true,
    available: true,
  },
  {
    id: "cp-roberto",
    name: "Roberto Pini",
    age: 39,
    roleId: "location",
    roleLabel: "Location Manager",
    city: "Italia",
    experience: "14 anni",
    bio: "Network di 400+ location off-radar. Permessi rapidi, scout dedicati.",
    skills: ["Scout", "Permessi", "Network"],
    lastWork: "Spot Ferrari · 2025",
    photo: circleP4,
    cover: "linear-gradient(135deg,#2a1a0e,#5a3a1a)",
    wouldMatch: false,
    available: true,
  },
];
