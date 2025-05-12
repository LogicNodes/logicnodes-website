// src/components/LogicNodesGraph.tsx

import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useLayoutEffect,
    type MouseEvent
  } from 'react'
  import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
  import { NODES, LINKS, ICONS, GRAPH_COLORS, SIZE } from '../config/graph'
  
  // --- constants -------------------------------------------------------------
  const SPEED = 150;               // px / second that a pulse travels
  const JITTER = 0.2;             // max extra seconds of random delay
  const PULSES_PER_LINK = 2;       // how many rectangles you want per link

  // Fast lookup: id → {x,y}
  const NODE_POS = new Map<string, { x: number; y: number }>(
    NODES.map(n => [n.id, { x: n.x, y: n.y }])
  );
  
  /** A small type helper to hold {node, x, y} for tooltip data. */
  type HoverData = {
    node: typeof NODES[number]
    x: number
    y: number
    tx: string
    ty: string
  } | null
  
  /**
   * Build adjacency from { from, to } link definitions.
   * Returns a Map: nodeId -> array of connected child nodeIds (outbound).
   */
  function buildAdjacency() {
    const adjacency = new Map<string, string[]>()
    for (const { from, to } of LINKS) {
      if (!adjacency.has(from)) adjacency.set(from, [])
      adjacency.get(from)!.push(to)
    }
    return adjacency
  }
  
  /**
   * BFS outward from the hovered node to find all reachable links.
   * We store each link in "from->to" form in a Set for quick membership checks.
   */
  function computeActiveLinks(
    startId: string | undefined,
    adjacency: Map<string, string[]>
  ): Set<string> {
    const linkSet = new Set<string>()
    if (!startId) return linkSet
  
    const visited = new Set<string>()
    const queue = [startId]
    visited.add(startId)
  
    while (queue.length > 0) {
      const current = queue.shift()!
      const children = adjacency.get(current) || []
      for (const child of children) {
        if (!visited.has(child)) {
          visited.add(child)
          linkSet.add(`${current}->${child}`)
          queue.push(child)
        }
      }
    }
    return linkSet
  }
  
  export default function LogicNodesGraph() {
    const fgRef = useRef<ForceGraphMethods>(null!)
    const containerRef = useRef<HTMLDivElement>(null!)
  
    // We store which node (if any) is currently hovered, plus the mouse coords
    const [hoverData, setHoverData] = useState<HoverData>(null)
  
    // Animation fraction [0..1] that drives the traveling pulse along the links
    const [animT, setAnimT] = useState(0)
  
    // Pre-build adjacency from config
    const adjacency = useMemo(() => buildAdjacency(), [])
  
    // Center the graph on initial render
    useEffect(() => {
      fgRef.current.centerAt(380, 200, 0); // was 280
      fgRef.current.zoom(1.8, 0);
    }, []);
  
    // Identify the node that's hovered (if any)
    const hoveredNodeId = hoverData?.node?.id
  
    // On each hover, we BFS to find all outbound links from the hovered node
    const activeLinks = useMemo(
      () => computeActiveLinks(hoveredNodeId, adjacency),
      [hoveredNodeId, adjacency]
    )
    
    // linkId → { start: seconds, duration: seconds }
    const linkTimings = useMemo(() => {
      if (!hoveredNodeId) return new Map<string, { start: number; duration: number }>();
    
      const timings = new Map<string, { start: number; duration: number }>();
      const arrival = new Map<string, number>();
      arrival.set(hoveredNodeId, 0);          // root node is "active" at t=0
    
      const q: string[] = [hoveredNodeId];
    
      while (q.length) {
        const nid = q.shift()!;
        const t0  = arrival.get(nid)!;        // when this node was reached
        for (const child of adjacency.get(nid) ?? []) {
          const linkId = `${nid}->${child}`;
          if (timings.has(linkId)) continue;  // already scheduled
    
          // distance & travel time
          const { x: sx, y: sy } = NODE_POS.get(nid)!;
          const { x: tx, y: ty } = NODE_POS.get(child)!;
          const dist = Math.hypot(tx - sx, ty - sy);
          const travel = dist / SPEED;
    
          timings.set(linkId, { start: t0, duration: travel });
          const childArrive = t0 + travel + Math.random() * JITTER;
          if (!arrival.has(child)) {
            arrival.set(child, childArrive);
            q.push(child);
          }
        }
      }
      return timings;
    }, [hoveredNodeId, adjacency]);
    
    const hoverStartRef = useRef<number>(0);
    useEffect(() => { hoverStartRef.current = performance.now(); }, [hoveredNodeId]);
  
    // --- Cache icon images to prevent flicker ---
    const imagesCache = useMemo(() => {
      const cache: Record<string, HTMLImageElement> = {}
      Object.entries(ICONS).forEach(([key, url]) => {
        const img = new Image()
        img.src = url
        cache[key] = img
      })
      return cache
    }, [])
  
    // Kick off an animation loop to update `animT` continuously from 0..1
    useEffect(() => {
      let frameId: number
      let lastTime = performance.now()
  
      const animate = (time: number) => {
        const dt = time - lastTime
        lastTime = time
  
        // If a node is hovered, animate pulses, otherwise keep t=0
        if (hoveredNodeId) {
          // Move at 1 "cycle" per ~1 second (adjust factor as you wish)
          setAnimT(t => (t + dt * 0.001) % 1)
        } else {
          // Not hovered => reset
          setAnimT(0)
        }
  
        // request a new animation frame
        frameId = requestAnimationFrame(animate)
      }
  
      frameId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frameId)
    }, [hoveredNodeId])
  
    /**
     * Customize how nodes are drawn on the canvas.
     * We "replace" default rendering to control circle color, stroke, icon, etc.
     */
    function drawNode(node: any, ctx: CanvasRenderingContext2D, globalScale: number) {
      const { id, icon } = node
      const isHovered = hoveredNodeId === id
  
      // Determine circle radius
      const radius = isHovered ? SIZE.rHover : SIZE.r;
      
      // Add a drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
  
      // 1) background circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = GRAPH_COLORS.node;
      ctx.fill();
  
      // Clear shadow for the stroke and icon
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // optional accent ring on hover
      if (isHovered) {
        ctx.lineWidth = SIZE.stroke;
        ctx.strokeStyle = GRAPH_COLORS.accent;
        ctx.stroke();
      }
  
      // 2) icon – keep its aspect ratio
      if (icon) {
        const img = imagesCache[icon as keyof typeof ICONS];
        if (img?.complete && img.naturalWidth && img.naturalHeight) {
          const maxSide = radius * 1.3;               // how "big" it may appear
          const ratio   = img.naturalWidth / img.naturalHeight;
  
          // fit longest side to maxSide
          const w = ratio >= 1 ? maxSide : maxSide * ratio;
          const h = ratio >= 1 ? maxSide / ratio : maxSide;
  
          // clip so only the circular area shows
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
          ctx.clip();
  
          ctx.drawImage(img, node.x - w / 2, node.y - h / 2, w, h);
          ctx.restore();
        }
      }
    }
  
    /**
     * Optionally draw an animated "pulse" along outbound links that are active.
     * We'll do it in "after" mode so the normal edge line is already drawn.
     */
    function drawLinkPulse(link: any, ctx: CanvasRenderingContext2D) {
      const linkId = `${link.source.id}->${link.target.id}`;
      const sched  = linkTimings.get(linkId);
      if (!sched) return;                                   // not in cascade
    
      const nowSec = (performance.now() - hoverStartRef.current) / 1000;
      if (nowSec < sched.start) return;                     // not yet begun
    
      // progress in [0..1)
      const baseT = ((nowSec - sched.start) / sched.duration) % 1;
    
      const sx = link.source.x, sy = link.source.y;
      const tx = link.target.x, ty = link.target.y;
      const angle = Math.atan2(ty - sy, tx - sx);
    
      const rectWidth  = 20;
      const rectHeight = 2;
    
      // ----- gradient (reuse for every rectangle) -----
      const grad = ctx.createLinearGradient(-rectWidth / 2, 0, rectWidth / 2, 0);
      grad.addColorStop(0,   'rgba(255,147,30,0)');
      grad.addColorStop(0.2, 'rgba(255,147,30,1)');
      grad.addColorStop(0.8, 'rgba(255,147,30,1)');
      grad.addColorStop(1,   'rgba(255,147,30,0)');
      ctx.fillStyle = grad;
    
      // draw N rectangles, offset evenly around the loop
      for (let i = 0; i < PULSES_PER_LINK; i++) {
        const t = (baseT + i / PULSES_PER_LINK) % 1;
        const x = sx + (tx - sx) * t;
        const y = sy + (ty - sy) * t;
    
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
        ctx.restore();
      }
    }      
      
  
    /** Called when mouse hovers a node (or leaves it). */
    function handleNodeHover(node: any) {
      if (!node?.info) return setHoverData(null);
    
      // 1. graph → screen coordinates
      const { x: sx, y: sy } = fgRef.current!.graph2ScreenCoords(node.x, node.y);
    
      // 2. Decide how to anchor the tooltip so it never overflows
      const container = containerRef.current!;
      const PAD   = 16;    // px from edges
      const BOX_W = 260;   // tooltip max-width
      const BOX_H = 90;    // ≈ tooltip height (tweak if yours is taller)

      // ---------- horizontal anchoring ----------
      let tx = '-50%';                               // centred
      if (sx < PAD + BOX_W / 2)                      // too close to left edge
        tx = '0';
      if (sx > container.offsetWidth - PAD - BOX_W / 2) // right edge
        tx = '-100%';

      // ---------- vertical anchoring ----------
      // default above the node
      let ty = '-110%';
      // not enough space? put it below instead
      if (sy - 40 - BOX_H < PAD) ty = '10%';
    
      setHoverData({
        node,
        x: sx,
        y: sy - 40,
        tx,
        ty,
      });
    }
  
    // Match the node's circle in the pointer area paint
    function paintPointerArea(node: any, color: string, ctx: CanvasRenderingContext2D) {
      const isHovered = hoveredNodeId === node.id
      const radius = isHovered ? SIZE.rHover : SIZE.r
  
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = color
      ctx.fill()
    }
  
    // Convert our config nodes to fix them at (fx, fy) so there's no movement
    const graphData = useMemo(() => ({
      nodes: NODES.map(n => ({ ...n, fx: n.x, fy: n.y })),
      links: LINKS.map(l => ({
        ...l,
        source: l.from,
        target: l.to,
      }))
    }), [])
  
    /* ResizeObserver → always match parent's exact pixels            */
    const [size, setSize] = useState({ w: 600, h: 600 })
    useLayoutEffect(() => {
      if (!containerRef.current) return
      
      // Set initial size immediately
      setSize({
        w: containerRef.current.clientWidth || 600,
        h: containerRef.current.clientHeight || 600
      })
      
      const ro = new ResizeObserver(([entry]) => {
        const width = entry.contentRect.width || 600
        const height = entry.contentRect.height || 600
        setSize({ w: width, h: height })
      })
      
      ro.observe(containerRef.current)
      return () => ro.disconnect()
    }, [])
  
    return (
      <div
        ref={containerRef}
        className="w-full h-full"
      >
        {/* The ForceGraph2D Canvas */}
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          // Disable dragging, disable physics
          enableNodeDrag={false}
          enablePanInteraction={false}
          enableZoomInteraction={false}
          cooldownTicks={0}
          // We'll use our own color and line thickness for links
          linkColor={() => GRAPH_COLORS.line}
          linkWidth={1}
          // We fully replace the node with our custom drawing
          nodeCanvasObjectMode={() => 'replace'}
          nodeCanvasObject={drawNode}
          // Ensure the pointer area is the same shape/size
          nodePointerAreaPaint={paintPointerArea}
          // "After" mode so we can layer pulses on top of the drawn edge
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={drawLinkPulse}
          // Handle hovers
          onNodeHover={handleNodeHover}
          // Let the canvas fill the container
          width={size.w}
          height={size.h}
        />
  
        {/* Tooltip */}
        {hoverData && hoverData.node.info && (
          <div
            className="absolute pointer-events-none bg-white border border-gray-200 rounded-md
                       shadow-md px-4 py-2 max-w-xs w-max
                       text-ln-dark font-sans"
            style={{
              left: hoverData.x,
              top:  hoverData.y,
              transform: `translate(${hoverData.tx}, ${hoverData.ty})`
            }}
          >
            <h3 className="text-heading-md mb-1">
              {hoverData.node.info.title}
            </h3>
            <p className="text-sm leading-snug">
              {hoverData.node.info.text}
            </p>
          </div>
        )}
      </div>
    )
  }
  
