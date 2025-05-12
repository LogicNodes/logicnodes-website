// src/config/graph.ts

import logicnodesIcon from '/logo.svg?url'
import emailIcon      from '/icons/email.svg?url'
import folderIcon     from '/icons/folder.svg?url'
import gearIcon       from '/icons/gear.svg?url'
import searchIcon     from '/icons/search.svg?url'
import graduationIcon from '/icons/graduation.svg?url'

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
    gear: gearIcon,
    search: searchIcon,
    graduation: graduationIcon,
  }
  
  export const NODES: GraphNode[] = [
    { id: 'root', x: 80,  y: 200, icon: 'logicnodes',
      info: { title: 'LogicNodes', text: 'AI-hub & system connector' } },
    { id: 'a',    x: 180, y: 100 },
    { id: 'b',    x: 180, y: 200, icon: 'email',
      info: { title: 'Email', text: 'Let AI read and act on your inbox.' } },
    { id: 'c',    x: 180, y: 300 },
    { id: 'd1',   x: 280, y:  70 },
    { id: 'd2',   x: 280, y: 160 },
    { id: 'd3',   x: 280, y: 240 },
    { id: 'd4',   x: 280, y: 330 },
    { id: 'e1',   x: 380, y:  70 },
    { id: 'e2',   x: 380, y: 160, icon: 'gear',
      info: { title: 'Automation', text: 'Connect workflows to act automatically.' } },
    { id: 'e3',   x: 380, y: 240 },
    { id: 'e4',   x: 380, y: 330 },
    { id: 'f1',   x: 480, y:  70 },
    { id: 'f2',   x: 480, y: 160 },
    { id: 'f3',   x: 480, y: 240, icon: 'search',
      info: { title: 'Enrichment', text: 'Search and fetch external data sources.' } },
    { id: 'f4',   x: 480, y: 330 },
    { id: 'g1',   x: 580, y:  70 },
    { id: 'g2',   x: 580, y: 160 },
    { id: 'g3',   x: 580, y: 240 },
    { id: 'g4',   x: 580, y: 330, icon: 'graduation',
      info: { title: 'Knowledge', text: 'Let AI learn from documents and structure.' } },
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
  