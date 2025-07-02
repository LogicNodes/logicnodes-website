// src/features/ekspertise/ekspertise.data.ts

export interface ExpertiseArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  primaryLink: {
    text: string;
    url: string;
  };
  secondaryLink: {
    text: string;
    url: string;
  };
  icon: {
    name: string;
    altText: string;
  };
}

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'raadgivning',
    title: 'Rådgivning',
    subtitle: 'Gør AI til en fast del af jeres arbejdsgange',
    description: 'Med et introforløb fra LogicNodes får I styr på hvordan AI kan give reel værdi i jeres forretning. Ledelsen får strategisk overblik og medarbejderne får konkrete værktøjer og metoder, der virker i praksis.',
    features: [
      'Identificering af relevante processer',
      'Undervisning i brugen af ChatGPT og andre værktøjer',
      'Prompt-engineering og opgaveløsning',
      'Løsningsforslag til netop jeres hverdag'
    ],
    primaryLink: {
      text: 'Se hvordan introforløbet fungerer',
      url: '/introforloeb'
    },
    secondaryLink: {
      text: 'Tag fat i os',
      url: '/kontakt'
    },
    icon: {
      name: 'brain-checklist',
      altText: 'Illustration af LogicNodes\' AI-rådgivning: strategi og daglig anvendelse'
    }
  },
  {
    id: 'assistenter',
    title: 'AI-assistenter',
    subtitle: 'Skræddersyede AI-partnere til jeres vigtigste opgaver',
    description: 'Nogle gange er det nok at vide hvordan man bruger de generelle AI-værktøjer rigtigt. Andre gange skal der bygges noget mere specialiseret. Vi hjælper jer med begge dele.',
    features: [
      'Hente viden fra egne dokumenter eller systemer',
      'Levere ekspertsvar inden for fx lovgivning, tilbud eller projekter',
      'Gøre hverdagen nemmere med skræddersyet viden og funktion'
    ],
    primaryLink: {
      text: 'Se vores guide til AI-assistenter',
      url: '/viden#assistenter'
    },
    secondaryLink: {
      text: 'Tag fat i os',
      url: '/kontakt'
    },
    icon: {
      name: 'chat-gear',
      altText: 'Illustration af LogicNodes\' AI-assistenter: specialiseret viden og support'
    }
  },
  {
    id: 'agenter',
    title: 'AI-agenter',
    subtitle: 'AI der handler på egen hånd – og skaber resultater',
    description: 'AI-agenter går skridtet videre: De kan selv igangsætte handlinger i jeres systemer, udfylde skabeloner, sende mails eller følge workflows fra A til Z. Vi gør det muligt at bruge AI som en fuldt integreret kollega.',
    features: [
      'At finde de rigtige agent-opgaver',
      'Udvikling og sikker implementering',
      'Fuldt overblik og kontrol via vores platform'
    ],
    primaryLink: {
      text: 'Læs om platformens agent-funktioner',
      url: '/platform'
    },
    secondaryLink: {
      text: 'Tag fat i os',
      url: '/kontakt'
    },
    icon: {
      name: 'robot-screen',
      altText: 'Illustration af LogicNodes\' AI-agenter: selvkørende og handlekraftige systemer'
    }
  },
  {
    id: 'traening',
    title: 'Træning af AI',
    subtitle: 'Finetun jeres egen model – eller byg noget helt nyt',
    description: 'For virksomheder med høje ambitioner tilbyder vi træning og udvikling af egne AI-modeller. Det kan være alt fra en finetunet sprogmodel til et dybtlærende system bygget fra bunden.',
    features: [
      'Hjælp til finetuning med egne data',
      'Sparring og udvikling af ML- og DL-løsninger',
      'Åben og ansvarlig proces hele vejen'
    ],
    primaryLink: {
      text: 'Se hvordan AI-træning fungerer',
      url: '/viden#modeltraening'
    },
    secondaryLink: {
      text: 'Tag fat i os',
      url: '/kontakt'
    },
    icon: {
      name: 'diagram-code',
      altText: 'Illustration af LogicNodes\' AI-træning: modeludvikling og finetuning'
    }
  }
];

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  caseLink: {
    text: string;
    url: string;
  };
  videoThumbnail?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'mercura',
    name: 'Martin Johansen',
    title: 'Founder',
    company: 'Mercura',
    quote: 'Alle har være præget af en lille smule skepsis, men vi er faktisk nået lang længere end vi turde håbe på.',
    caseLink: {
      text: 'Se casen',
      url: '/ekspertise/mercura'
    }
  },
  {
    id: 'raundahl-moesby',
    name: 'Carsten Raundahl',
    title: 'CEO',
    company: 'Raundahl & Moesby',
    quote: 'Vi har været i fuld kontrol over løsningen, og så har vi måske sparet et eller andet sted mellem 250.000 og 500.000 kr.',
    caseLink: {
      text: 'Se casen',
      url: '/ekspertise/R&M'
    }
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Hvad er forskellen på en AI-assistent og en AI-agent?',
    answer: 'En assistent støtter medarbejdere med viden. En agent handler selvstændigt i jeres systemer.'
  },
  {
    question: 'Hvor lang tid tager et introforløb?',
    answer: 'De fleste forløb varer 1-2 uger afhængig af behov og antal deltagere.'
  },
  {
    question: 'Kan vi træne en model på egne data?',
    answer: 'Ja, vi hjælper jer med at finetune modeller med egne dokumenter og cases.'
  },
  {
    question: 'Kræver jeres AI-løsninger stor teknisk viden?',
    answer: 'Nej, vi står for det tekniske og leverer brugervenlige løsninger med konkret oplæring.'
  }
];
