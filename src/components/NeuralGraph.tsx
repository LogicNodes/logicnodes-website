// src/components/LogicNodesGraph.tsx

import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    type MouseEvent
  } from 'react'
  import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
  import { NODES, LINKS, ICONS, GRAPH_COLORS, SIZE } from '../config/graph'
  
  /** A small type helper to hold {node, x, y} for tooltip data. */
  type HoverData = {
    node: typeof NODES[number]
    x: number
    y: number
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
  
    // We store which node (if any) is currently hovered, plus the mouse coords
    const [hoverData, setHoverData] = useState<HoverData>(null)
  
    // Animation fraction [0..1] that drives the traveling pulse along the links
    const [animT, setAnimT] = useState(0)
  
    // Pre-build adjacency from config
    const adjacency = useMemo(() => buildAdjacency(), [])
  
    // Center the graph on initial render
    useEffect(() => {
      // Center the graph at these coordinates
      fgRef.current.centerAt(585, 310, 0);
      // Set a larger zoom level (0.7 is zoomed out, >1 is zoomed in)
      fgRef.current.zoom(1.8, 0);
    }, []);
  
    // Identify the node that's hovered (if any)
    const hoveredNodeId = hoverData?.node?.id
  
    // On each hover, we BFS to find all outbound links from the hovered node
    const activeLinks = useMemo(
      () => computeActiveLinks(hoveredNodeId, adjacency),
      [hoveredNodeId, adjacency]
    )
  
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
      const radius = isHovered ? SIZE.rHover : SIZE.r
  
      // Draw a circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = GRAPH_COLORS.node
      ctx.fill()
  
      // If hovered, draw a stroke ring in accent color
      if (isHovered) {
        ctx.lineWidth = SIZE.stroke
        ctx.strokeStyle = GRAPH_COLORS.accent
        ctx.stroke()
      }
  
      // If there's an icon, draw it centered using the cached image
      if (icon) {
        const img = imagesCache[icon as keyof typeof ICONS]
        // Only draw if fully loaded
        if (img?.complete) {
          const iconSize = radius * 1.2 // scale up/down as desired
          ctx.drawImage(
            img,
            node.x - iconSize / 2,
            node.y - iconSize / 2,
            iconSize,
            iconSize
          )
        }
      }
    }
  
    /**
     * Optionally draw an animated "pulse" along outbound links that are active.
     * We'll do it in "after" mode so the normal edge line is already drawn.
     */
    function drawLinkPulse(
      link: any,
      ctx: CanvasRenderingContext2D
    ) {
      // Is this link in the BFS set from the hovered node?
      const linkId = `${link.source.id}->${link.target.id}`
      if (!activeLinks.has(linkId)) return
  
      // The traveling pulse is at fraction = animT of the way from source->target
      const sx = link.source.x
      const sy = link.source.y
      const tx = link.target.x
      const ty = link.target.y
  
      // Interpolate
      const pulseX = sx + (tx - sx) * animT
      const pulseY = sy + (ty - sy) * animT
  
      // Draw the small traveling dot
      ctx.beginPath()
      ctx.arc(pulseX, pulseY, SIZE.pulse, 0, 2 * Math.PI, false)
      ctx.fillStyle = GRAPH_COLORS.accent
      ctx.fill()
    }
  
    /** Called when mouse hovers a node (or leaves it). */
    function handleNodeHover(node: any, previousNode: any) {
      if (node?.info) {
        // Use node position as fallback since we can't reliably get mouse coords
        setHoverData({
          node,
          x: node.x + 50, // offset from node position
          y: node.y - 50
        })
      } else {
        // If no node or no info, clear hover
        setHoverData(null)
      }
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
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
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
          width={undefined}
          height={undefined}
        />
  
        {/* Tooltip */}
        {hoverData && hoverData.node.info && (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '0.5rem 1rem',
              fontSize: 14,
              color: '#333',
              maxWidth: 220,
              transform: 'translate(-50%, -110%)',
              left: hoverData.x,
              top: hoverData.y
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
              {hoverData.node.info.title}
            </div>
            <div style={{ lineHeight: 1.4 }}>
              {hoverData.node.info.text}
            </div>
          </div>
        )}
      </div>
    )
  }
  