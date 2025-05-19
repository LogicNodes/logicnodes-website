import type { ImageMetadata } from 'astro';

export type Card = {
  icon: string;
  title: string;
  body: string;
};

export type Media =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string };

export type Solution = {
  id: string;
  title: string;
  body: string;
  media: Media;
  cards: Card[];
};

const platformImg = '/images/platform-image.png';
const virkImg = '/images/virk-image.png';
const rackImg = '/images/rackbeat-image.png';
const SCSRDvid = '/videos/scsrd-video.mp4';
const SCSRDposter = '/images/scsrd-poster.png';
const serviceImg = '/images/service-image.jpg';


export const SOLUTIONS: Solution[] = [
  {
    id: 'logicnodes-platformen',
    title: 'LogicNodes Platformen',
    body: `
LogicNodes Platformen samler alle jeres AI-løsninger i én central platform.

Med færdiglavede AI-workflows og integrationer til populære systemer kan I komme hurtigt i gang — uden tung opsætning. Standardløsninger kan aktiveres med få klik, og tilpasninger kan bygges fra bunden eller ovenpå eksisterende løsninger, efter behov.
`,
    media: { type: 'image', src: platformImg, alt: 'Skærmbillede af LogicNodes Platformen' },
    cards: [
      { icon: 'shield', title: 'Sikkerhed', body: 'Platformen er bygget med enterprise-sikkerhed og SSO-integration via Auth0 og OAuth2.' },
      { icon: 'sliders', title: 'Kontrol', body: 'Samlet kontrolpanel med godkendelse af kritiske handlinger og fuld sporbarhed.' },
      { icon: 'layers', title: 'Skalerbarhed', body: 'Modulært plug-and-play design gør det nemt at tilpasse og udvide funktionalitet.' },
    ],
  },
  {
    id: 'virk-agenten',
    title: 'Virk Agenten',
    body: `
Virk-agenten er din genvej til dybdegående information om danske virksomheder.

Den trækker direkte på data fra CVR og Regnskabsregisteret og kan supplere med kilder som presse, hjemmesider og sociale medier.
`,
    media: { type: 'image', src: virkImg, alt: 'Skærmbillede af Virk-agenten' },
    cards: [
      { icon: 'factory', title: 'Offentlige data', body: 'Live-data fra CVR, regnskaber og ejerforhold.' },
      { icon: 'eye', title: 'Kildegennemsigtighed', body: 'Alle oplysninger vises med kilde, så troværdigheden kan vurderes.' },
      { icon: 'search', title: 'Online berigelse', body: 'Kan søge online og supplere med artikler og sociale data.' },
    ],
  },
  {
    id: 'rackbeat-agenten',
    title: 'Rackbeat Agenten',
    body: `
Rackbeat-agenten integrerer direkte med jeres lagersystem og automatiserer både forespørgsler og ordrer.

Den forstår ustruktureret input, finder relevante kunder og produkter og opretter færdige ordrer med korrekt rabatstruktur.
`,
    media: { type: 'image', src: rackImg, alt: 'Skærmbillede af Rackbeat Agenten' },
    cards: [
      { icon: 'box', title: 'Fuld integration med Rackbeat', body: 'Læser og skriver direkte til jeres lagersystem.' },
      { icon: 'zap-white', title: 'Automatisk ordreoprettelse', body: 'Konverterer e-mails eller beskeder til færdige ordrer.' },
      { icon: 'check', title: 'Valgfri godkendelse', body: 'Mulighed for manuel godkendelse af ordrer før afsendelse.' },
    ],
  },
  {
    id: 'smart-csrd',
    title: 'Smart CSRD',
    body: `
Smart CSRD automatiserer hele processen omkring dobbelte væsentlighedsanalyse (DMA).

Agenten vurderer og dokumenterer alle CSRD-krav og leverer en godkendelsesklar løsning på ned til 2 uger.
`,
    media: { type: 'video', src: SCSRDvid, poster: SCSRDposter },
    cards: [
      { icon: 'chart', title: 'AI-drevet analyse', body: 'Gennemgår og vurderer alle 1.100 CSRD-datapunkter objektivt.' },
      { icon: 'sliders', title: 'Fuld kontrol, minimal indsats', body: 'Ledelsen styrer ambitionsniveauet — resten klares af agenten.' },
      { icon: 'clipboard-check', title: 'Revisorparat dokumentation', body: 'Alle grafer, beslutninger og filer genereres automatisk.' },
    ],
  },
  {
    id: 'kundeservice-agenten',
    title: 'Kundeservice Agenten',
    body: `
Agenten håndterer automatiseret svar og handling på de mest gængse kundehenvendelser — fx fakturaforespørgsler, opsigelser eller ændringer.

LogicNodes kan hjælpe med at sætte agenten op til jeres IT-landskab.
`,
    media: { type: 'image', src: serviceImg, alt: 'Skærmbillede af Kundeservice Agenten' },
    cards: [
      { icon: 'mail-white', title: 'Svar på autopilot', body: 'Forstår indgående e-mails og svarer baseret på systemdata.' },
      { icon: 'action', title: 'Handling, ikke bare svar', body: 'Kan gensende fakturaer, oprette sager eller ændre abonnement.' },
      { icon: 'plug', title: 'Integreret med jeres system', body: 'LogicNodes kan håndtere opsætningen til jeres eksisterende værktøjer.' },
    ],
  },
];
