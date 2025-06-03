// src/config/graph.ts

import logicnodesIcon from '@assets/icons/graph/logo.svg?url'
import emailIcon      from '@assets/icons/graph/email.svg?url'
import folderIcon     from '@assets/icons/graph/folder.svg?url'
import gearIcon       from '@assets/icons/graph/gear.svg?url'
import searchIcon     from '@assets/icons/graph/search.svg?url'
import graduationIcon from '@assets/icons/graph/graduation.svg?url'
import personIcon     from '@assets/icons/graph/person.svg?url'
import sendIcon       from '@assets/icons/graph/send.svg?url'
import earIcon        from '@assets/icons/graph/ear.svg?url'
import workflowIcon   from '@assets/icons/graph/workflow.svg?url'
import actionIcon     from '@assets/icons/graph/action.svg?url'
import imageIcon      from '@assets/icons/graph/image.svg?url'
import decisionsIcon  from '@assets/icons/graph/decisions.svg?url'
import notifyIcon     from '@assets/icons/graph/notify.svg?url'
import syncIcon       from '@assets/icons/graph/sync.svg?url'
import reportIcon     from '@assets/icons/graph/report.svg?url'
import { COLORS } from '@lib/colors'

/* ------------------------------------------------------------------ *
 *  Base dimensions for reference size calculation                     *
 * ------------------------------------------------------------------ */
export const BASE_W = 1000;
export const BASE_H = 700;

export type GraphNode = {
    id: string
    u: number
    v: number
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
    node: COLORS.dark,
    line: COLORS.dark,
    accent: COLORS.accent,
  }
  
  export const DESIGN_SIZE = {
    node: 32,
    nodeHover: 40,
    pulse: 3,   // width (= height) of the travelling rectangle
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
      id: 'root', u: 0.025, v: 0.5, icon: 'logicnodes',
      info: {
        title: 'LogicNodes',
        text: 'LogicNodes hjælper dig med at orkestrere og automatisere AI-processer.'
      }
    },
  
    // ─── Lag 1: Inputkilder ───
    {
      id: 'a', u: 0.2, v: 0.25, icon: 'email',
      info: {
        title: 'Email',
        text: 'Lad AI læse og reagere intelligent på indkommende mails'
      }
    },
    {
      id: 'b', u: 0.2, v: 0.5, icon: 'ear',
      info: {
        title: 'Lytte',
        text: 'Transskriber møder og lad AI tage handling baseret på indholdet'
      }
    },
    {
      id: 'c', u: 0.2, v: 0.75, icon: 'graduation',
      info: {
        title: 'Viden',
        text: 'Byg AI-agenter med ekspertviden om lovgivning og regler inden for din branche'
      }
    },
  
    // ─── Lag 2: Databehandling ───
    {
      id: 'd1', u: 0.4, v: 0.1, icon: 'image',
      info: {
        title: 'Billeder',
        text: 'Udtræk og analyser information fra billeder og visuelle dokumenter'
      }
    },
    {
      id: 'd2', u: 0.4, v: 0.375, icon: 'folder',
      info: {
        title: 'Dokumenter',
        text: 'Læs, forstå og konkludér ud fra interne dokumenter og mapper'
      }
    },
    {
      id: 'd3', u: 0.4, v: 0.625, icon: 'gear',
      info: {
        title: 'Automatisering',
        text: 'Automatisér gentagne manuelle opgaver, så medarbejderne kan fokusere på mere værdiskabende arbejde'
      }
    },
    {
      id: 'd4', u: 0.4, v: 0.9, icon: 'workflow',
      info: {
        title: 'Arbejdsgange',
        text: 'Kombinér flere AI-agenter i en sammenhængende arbejdsgang'
      }
    },
  
    // ─── Lag 3: Analyse og beslutning ───
    {
      id: 'e1', u: 0.6, v: 0.1, icon: 'search',
      info: {
        title: 'Berigelse',
        text: 'Berig eksisterende data med information fra eksterne kilder og data'
      }
    },
    {
      id: 'e2', u: 0.6, v: 0.375, icon: 'sync',
      info: {
        title: 'Synkronisering',
        text: 'Opdatér dine interne systemer med ny og relevant information'
      }
    },
    {
      id: 'e3', u: 0.6, v: 0.625, icon: 'decisions',
      info: {
        title: 'Beslutninger',
        text: 'Lad AI træffe intelligente beslutninger på baggrund af data og kontekst'
      }
    },
    {
      id: 'e4', u: 0.6, v: 0.9, icon: 'person',
      info: {
        title: 'Tilsyn',
        text: 'Indbyg menneskelig kontrol, så AI-beslutninger kan godkendes manuelt'
      }
    },
  
    // ─── Lag 4: Handling ───
    {
      id: 'f1', u: 0.8, v: 0.1, icon: 'send',
      info: {
        title: 'Send',
        text: 'Send e-mails eller beskeder automatisk fra AI-agenten'
      }
    },
    {
      id: 'f2', u: 0.8, v: 0.375, icon: 'action',
      info: {
        title: 'Handling',
        text: 'Udløs eksterne handlinger i andre systemer, f.eks. CRM, ERP eller API-kald'
      }
    },
    {
      id: 'f3', u: 0.8, v: 0.625, icon: 'notify',
      info: {
        title: 'Notifikation',
        text: 'Send alarmer, påmindelser eller daglige opdateringer til brugerne'
      }
    },
    {
      id: 'f4', u: 0.8, v: 0.9, icon: 'report',
      info: {
        title: 'Rapport',
        text: 'Generér konklusioner, opsummeringer eller eksportér data i rapportform'
      }
    },  
  
    // ─── Layer 5: Output ───
    { id: 'g1', u: 1, v: 0.1 },
    { id: 'g2', u: 1, v: 0.375 },
    { id: 'g3', u: 1, v: 0.625 },
    { id: 'g4', u: 1, v: 0.9 },
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
  