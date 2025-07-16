export interface JobPosting {
  id: string;          // slug (bruges som value/key)
  title: string;       // vises i grid + dropdown
  category: string;    // f.eks. 'TECH', 'SALES' ...
  description: string; // kort teaser-tekst (markdown / plain)
}

export const JOBS: JobPosting[] = [
  {
    id: 'kundeansvarlig',
    title: 'Kundeansvarlig – AI-løsninger & vækst',
    category: 'KUNDER',
    description:`
      Er du stærk i relationer, struktur og strategisk tænkning?
      
      Som kundeansvarlig hos LogicNodes bliver du bindeleddet mellem vores kunder og de AI-løsninger, vi udvikler.

      Du får ansvar for onboarding, vedligeholdelse af relationer, salgsdialoger og koordinering af nye initiativer.

      Din indsats er med til at sikre, at vores løsninger skaber reel værdi for danske virksomheder.
      `
  },
  {
    id: 'student-it',
    title: 'Studenter­medhjælper – IT & AI-udvikling',
    category: 'TECH',
    description:`
      Læser du datalogi, softwareteknologi eller lignende – og vil du have et studierelevant job i krydsfeltet mellem AI, software og rådgivning?
      
      Som student hos LogicNodes får du hands-on erfaring med Python, PostgreSQL, frontend-udvikling og AI-agenter.
      
      Du bliver en del af et lille team med højt tempo, højt til loftet og mulighed for stor faglig udvikling.
      `
  }
]; 