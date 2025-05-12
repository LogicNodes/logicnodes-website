// src/config/graph.ts

import logicnodesIcon from '/icons/logo.svg?url'
import emailIcon      from '/icons/email.svg?url'
import folderIcon     from '/icons/folder.svg?url'
import gearIcon       from '/icons/gear.svg?url'
import searchIcon     from '/icons/search.svg?url'
import graduationIcon from '/icons/graduation.svg?url'
import personIcon     from '/icons/person.svg?url'
import sendIcon       from '/icons/send.svg?url'
import earIcon        from '/icons/ear.svg?url'
import workflowIcon   from '/icons/workflow.svg?url'
import actionIcon     from '/icons/action.svg?url'
import imageIcon      from '/icons/image.svg?url'
import decisionsIcon  from '/icons/decisions.svg?url'
import notifyIcon     from '/icons/notify.svg?url'
import syncIcon       from '/icons/sync.svg?url'
import reportIcon     from '/icons/report.svg?url'

export type GraphNode = {
    id: string
    x: number
    y: number
    icon?: keyof typeof ICONS
    info?: {
      title: string
      text: string
    }
  }
  
  export type GraphLink = {
    from: string
    to: string
  }
  
  // Colors
  export const GRAPH_COLORS = {
    node: '#3f495d',     // ln.dark
    line: '#3f495d',     // ln.dark
    accent: '#ff931e',   // ln.accent
  }
  
  export const SIZE = {
    r: 16,
    rHover: 20,
    pulse: 3,
    stroke: 2,
  }
  
  // Using imported SVG URLs to ensure they work correctly with React 18
  export const ICONS = {
    logicnodes: logicnodesIcon,
    email: emailIcon,
    folder: folderIcon,
    gear: gearIcon, // automation
    search: searchIcon,
    graduation: graduationIcon,
    person: personIcon,
    ear: earIcon, // listening
    send: sendIcon,
    workflow: workflowIcon,
    action: actionIcon,
    image: imageIcon,
    decisions: decisionsIcon,
    notify: notifyIcon,
    sync: syncIcon,
    report: reportIcon,
  }
  
  export const NODES: GraphNode[] = [
    // ─── Lag 0: Indgangspunkt ───
    {
      id: 'root', x: 80, y: 200, icon: 'logicnodes',
      info: {
        title: 'LogicNodes',
        text: 'LogicNodes hjælper dig med at orkestrere og automatisere AI-processer.'
      }
    },
  
    // ─── Lag 1: Inputkilder ───
    {
      id: 'a', x: 180, y: 100, icon: 'email',
      info: {
        title: 'Email',
        text: 'Lad AI læse og reagere intelligent på indkommende mails'
      }
    },
    {
      id: 'b', x: 180, y: 200, icon: 'ear',
      info: {
        title: 'Lytte',
        text: 'Transskriber møder og lad AI tage handling baseret på indholdet'
      }
    },
    {
      id: 'c', x: 180, y: 300, icon: 'graduation',
      info: {
        title: 'Viden',
        text: 'Byg AI-agenter med ekspertviden om lovgivning og regler inden for din branche'
      }
    },
  
    // ─── Lag 2: Databehandling ───
    {
      id: 'd1', x: 280, y: 70, icon: 'image',
      info: {
        title: 'Billeder',
        text: 'Udtræk og analyser information fra billeder og visuelle dokumenter'
      }
    },
    {
      id: 'd2', x: 280, y: 160, icon: 'folder',
      info: {
        title: 'Dokumenter',
        text: 'Læs, forstå og konkludér ud fra interne dokumenter og mapper'
      }
    },
    {
      id: 'd3', x: 280, y: 240, icon: 'gear',
      info: {
        title: 'Automatisering',
        text: 'Automatisér gentagne manuelle opgaver, så medarbejderne kan fokusere på mere værdiskabende arbejde'
      }
    },
    {
      id: 'd4', x: 280, y: 330, icon: 'workflow',
      info: {
        title: 'Arbejdsgange',
        text: 'Kombinér flere AI-agenter i en sammenhængende arbejdsgang'
      }
    },
  
    // ─── Lag 3: Analyse og beslutning ───
    {
      id: 'e1', x: 380, y: 70, icon: 'search',
      info: {
        title: 'Berigelse',
        text: 'Berig eksisterende data med information fra eksterne kilder og data'
      }
    },
    {
      id: 'e2', x: 380, y: 160, icon: 'sync',
      info: {
        title: 'Synkronisering',
        text: 'Opdatér dine interne systemer med ny og relevant information'
      }
    },
    {
      id: 'e3', x: 380, y: 240, icon: 'decisions',
      info: {
        title: 'Beslutninger',
        text: 'Lad AI træffe intelligente beslutninger på baggrund af data og kontekst'
      }
    },
    {
      id: 'e4', x: 380, y: 330, icon: 'person',
      info: {
        title: 'Tilsyn',
        text: 'Indbyg menneskelig kontrol, så AI-beslutninger kan godkendes manuelt'
      }
    },
  
    // ─── Lag 4: Handling ───
    {
      id: 'f1', x: 480, y: 70, icon: 'send',
      info: {
        title: 'Send',
        text: 'Send e-mails eller beskeder automatisk fra AI-agenten'
      }
    },
    {
      id: 'f2', x: 480, y: 160, icon: 'action',
      info: {
        title: 'Handling',
        text: 'Udløs eksterne handlinger i andre systemer, f.eks. CRM, ERP eller API-kald'
      }
    },
    {
      id: 'f3', x: 480, y: 240, icon: 'notify',
      info: {
        title: 'Notifikation',
        text: 'Send alarmer, påmindelser eller daglige opdateringer til brugerne'
      }
    },
    {
      id: 'f4', x: 480, y: 330, icon: 'report',
      info: {
        title: 'Rapport',
        text: 'Generér konklusioner, opsummeringer eller eksportér data i rapportform'
      }
    },  
  
    // ─── Layer 5: Output ───
    { id: 'g1', x: 580, y: 70 },
    { id: 'g2', x: 580, y: 160 },
    { id: 'g3', x: 580, y: 240 },
    { id: 'g4', x: 580, y: 330 },
  ]  
  
  export const LINKS: GraphLink[] = [
    { from: 'root', to: 'a' },
    { from: 'root', to: 'b' },
    { from: 'root', to: 'c' },
  
    { from: 'a', to: 'd1' }, { from: 'a', to: 'd2' },
    { from: 'b', to: 'd2' }, { from: 'b', to: 'd3' },
    { from: 'c', to: 'd3' }, { from: 'c', to: 'd4' },
  
    { from: 'd1', to: 'e1' }, { from: 'd1', to: 'e2' },
    { from: 'd2', to: 'e1' }, { from: 'd2', to: 'e2' }, { from: 'd2', to: 'e3' },
    { from: 'd3', to: 'e2' }, { from: 'd3', to: 'e3' }, { from: 'd3', to: 'e4' },
    { from: 'd4', to: 'e3' }, { from: 'd4', to: 'e4' },
  
    { from: 'e1', to: 'f1' }, { from: 'e1', to: 'f2' },
    { from: 'e2', to: 'f1' }, { from: 'e2', to: 'f2' }, { from: 'e2', to: 'f3' },
    { from: 'e3', to: 'f2' }, { from: 'e3', to: 'f3' }, { from: 'e3', to: 'f4' },
    { from: 'e4', to: 'f3' }, { from: 'e4', to: 'f4' },
  
    { from: 'f1', to: 'g1' }, { from: 'f1', to: 'g2' },
    { from: 'f2', to: 'g1' }, { from: 'f2', to: 'g2' }, { from: 'f2', to: 'g3' },
    { from: 'f3', to: 'g2' }, { from: 'f3', to: 'g3' }, { from: 'f3', to: 'g4' },
    { from: 'f4', to: 'g3' }, { from: 'f4', to: 'g4' },
  ]
  