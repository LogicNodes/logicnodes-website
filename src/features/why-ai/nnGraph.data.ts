import aiIcon       from '@assets/icons/graph/ai.svg?url'
import anvilIcon    from '@assets/icons/graph/anvil.svg?url'
import batteryIcon  from '@assets/icons/graph/battery.svg?url'
import computerIcon from '@assets/icons/graph/computer.svg?url'
import geneIcon     from '@assets/icons/graph/gene.svg?url'
import penIcon      from '@assets/icons/graph/pen.svg?url'
import wheelIcon    from '@assets/icons/graph/wheel.svg?url'
import radioIcon    from '@assets/icons/graph/radio.svg?url'
import bulbIcon     from '@assets/icons/graph/bulb.svg?url'
import fireIcon     from '@assets/icons/graph/fire.svg?url'
import flaskIcon    from '@assets/icons/graph/flask.svg?url'
import globeIcon    from '@assets/icons/graph/globe.svg?url'
import factoryIcon  from '@assets/icons/graph/factory.svg?url'
import cornIcon     from '@assets/icons/graph/corn.svg?url'
import scrollIcon   from '@assets/icons/graph/scroll.svg?url'
import { COLORS } from '@lib/colors'


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
    node: COLORS.dark,
    line: COLORS.dark,
    accent: COLORS.accent,
  }
  
  export const SIZE = {
    r: 20,
  }
  
  // Using imported SVG URLs to ensure they work correctly with React 18
  export const ICONS = {
    ai: aiIcon,
    anvil: anvilIcon,
    battery: batteryIcon,
    computer: computerIcon,
    gene: geneIcon,
    pen: penIcon,
    wheel: wheelIcon,
    radio: radioIcon,
    bulb: bulbIcon,
    fire: fireIcon,
    flask: flaskIcon,
    globe: globeIcon,
    factory: factoryIcon,
    corn: cornIcon,
    scroll: scrollIcon,
  }
export const NN_NODES: GraphNode[] = [

    { id:'0-0', x:150,  y: 60, icon: 'fire' },

    { id:'1-0', x:75,   y: 120, icon: 'corn'},
    { id:'1-1', x:225,  y: 120, icon: 'wheel' },
  
    { id:'2-0', x:0,    y: 200, icon: 'pen' },
    { id:'2-1', x:150,  y: 200, icon: 'anvil' },
    { id:'2-2', x:300,  y: 200, icon: 'scroll' },
  
    { id:'3-0', x:0,    y:300, icon: 'flask' },
    { id:'3-1', x:150,  y:300, icon: 'bulb' },
    { id:'3-2', x:300,  y:300, icon: 'factory' },

    { id:'4-0', x:0,    y:400, icon: 'globe' },
    { id:'4-1', x:150,  y:400, icon: 'computer' },
    { id:'4-2', x:300,  y:400, icon: 'radio' },
  
    { id:'5-0', x:75,   y:480, icon: 'gene' },
    { id:'5-1', x:225,  y:480, icon: 'battery' },

    { id:'6-0', x:150,  y:540, icon: 'ai' },
  ];  

/* --------------------------------------------------------------------------
 *  Links –– fully-connected between neighbouring layers (52 links total)
 * ------------------------------------------------------------------------ */
export const NN_LINKS: GraphLink[] = [
    // 0 → 1  (2)
    { from: '0-0', to: '1-0' },
    { from: '0-0', to: '1-1' },
  
    // 1 → 2  (4)
    { from: '1-0', to: '2-0' },
    { from: '1-0', to: '2-1' },
    { from: '1-1', to: '2-1' },
    { from: '1-1', to: '2-2' },
  
    // 2 → 3  (6) – allow overlap
    { from: '2-0', to: '3-0' },
    { from: '2-0', to: '3-1' },
    { from: '2-1', to: '3-1' },
    { from: '2-1', to: '3-2' },
    { from: '2-1', to: '3-0' },
    { from: '2-2', to: '3-1' },
    { from: '2-2', to: '3-2' },
  
    // 3 → 4  (6) – allow overlap
    { from: '3-0', to: '4-0' },
    { from: '3-0', to: '4-1' },
    { from: '3-1', to: '4-1' },
    { from: '3-1', to: '4-2' },
    { from: '3-1', to: '4-0' },
    { from: '3-2', to: '4-1' },
    { from: '3-2', to: '4-2' },
  
    // 4 → 5  (4)
    { from: '4-0', to: '5-0' },
    { from: '4-1', to: '5-0' },
    { from: '4-1', to: '5-1' },
    { from: '4-2', to: '5-1' },
  
    // 5 → 6  (2)
    { from: '5-0', to: '6-0' },
    { from: '5-1', to: '6-0' },
  ];
  
