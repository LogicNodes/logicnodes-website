export type CoursePart = {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  benefits: string[];
  icon?: string;
};

export const COURSE_PARTS: CoursePart[] = [
  {
    id: 'oplaeg',
    number: 1,
    title: 'Oplæg',
    duration: 'Fysisk møde – ca. 1,5 time',
    description: 'Et praksisnært oplæg, der sikrer fælles forståelse blandt ledelse og nøglepersoner. Vi gennemgår hvad AI egentlig er, hvordan det skaber værdi – og hvad der adskiller simple assistenter fra avancerede automatiseringer.',
    benefits: [
      'Praktisk forståelse for AI i en virksomhedskontekst',
      'Fælles sprog og ramme til at vurdere muligheder',
      'Konkrete værktøjer der kan tages i brug samme dag'
    ],
    icon: 'presentation'
  },
  {
    id: 'brainstorm',
    number: 2,
    title: 'Brainstorm',
    duration: 'Fysisk møde – ca. 1 time',
    description: 'Efter oplægget laver vi en fælles brainstorm. Vi kortlægger jeres forretningsområder og finder frem til de vigtigste AI-muligheder – fx hvor I kan spare tid, reducere fejl eller styrke jeres service.',
    benefits: [
      'Identificeret jeres største AI-potentialer',
      'Konkrete ideer til assistenter, automatiseringer og agenter',
      'Afdækning af både quick wins og strategiske indsatser'
    ],
    icon: 'lightbulb'
  },
  {
    id: 'indsigt',
    number: 3,
    title: 'Indsigt',
    duration: 'Online interviews – 1–2 timer pr. indsatsområde',
    description: 'Vi taler med nøglepersoner, som kender de udvalgte processer bedst. Formålet er at forstå hvordan opgaverne løses i dag, og hvor AI kan støtte, effektivisere eller overtage.',
    benefits: [
      'Detaljeret forståelse for de vigtigste arbejdsgange',
      'Afdækning af data, beslutningspunkter og flaskehalse',
      'Realistisk vurdering af automatiseringsmuligheder'
    ],
    icon: 'search'
  },
  {
    id: 'losningsmatrice',
    number: 4,
    title: 'Løsningsmatrice',
    duration: 'PDF + online gennemgang – ca. 1 time',
    description: 'Vi samler alt i en visuel oversigt over jeres AI-muligheder – og rangerer dem efter værdi, risiko og implementerbarhed. Klar til at danne grundlag for næste skridt.',
    benefits: [
      'En matrix med alle forslag – let at præsentere for ledelsen',
      'Estimeret effekt og tid pr. forslag',
      'Anbefalet prioritering med udgangspunkt i jeres forretning'
    ],
    icon: 'chart-bar'
  }
];
