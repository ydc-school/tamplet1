"use client"
import { useEffect, useRef } from "react"
import Matter from "matter-js"
import { BookOpen, GraduationCap, Award, Book, Cpu, Code, Briefcase, Sparkles, Shield, Database, Brain, Landmark, BarChart } from "lucide-react"

const ALL_COURSES = [
  { name: "M.Tech (CSE)", code: "Post Graduate", bg: "#2563EB", border: "#60A5FA", text: "#FFFFFF", Icon: Code },
  { name: "M.Tech (ECE)", code: "Post Graduate", bg: "#059669", border: "#34D399", text: "#FFFFFF", Icon: Cpu },
  { name: "M.Ed.", code: "Post Graduate", bg: "#7C3AED", border: "#A78BFA", text: "#FFFFFF", Icon: GraduationCap },
  { name: "M.A. Hindi", code: "Post Graduate", bg: "#E11D48", border: "#FB7185", text: "#FFFFFF", Icon: Book },
  { name: "M.A. English", code: "Post Graduate", bg: "#D97706", border: "#FBBF24", text: "#FFFFFF", Icon: BookOpen },
  { name: "M.A. Sanskrit", code: "Post Graduate", bg: "#0D9488", border: "#2DD4BF", text: "#FFFFFF", Icon: Book },
  { name: "M.A. History", code: "Post Graduate", bg: "#EA580C", border: "#FB923C", text: "#FFFFFF", Icon: Award },
  { name: "M.A. Political Science", code: "Post Graduate", bg: "#DB2777", border: "#F472B6", text: "#FFFFFF", Icon: Landmark },
  { name: "M.Com", code: "Post Graduate", bg: "#4B5563", border: "#9CA3AF", text: "#FFFFFF", Icon: Briefcase },
  { name: "M.Sc Physics", code: "Post Graduate", bg: "#047857", border: "#6EE7B7", text: "#FFFFFF", Icon: Sparkles },
  { name: "M.Sc Chemistry", code: "Post Graduate", bg: "#DC2626", border: "#FCA5A5", text: "#FFFFFF", Icon: Sparkles },
  { name: "M.Sc Maths", code: "Post Graduate", bg: "#4F46E5", border: "#818CF8", text: "#FFFFFF", Icon: Award },
  { name: "M.Sc Zoology", code: "Post Graduate", bg: "#16A34A", border: "#4ADE80", text: "#FFFFFF", Icon: BookOpen },
  { name: "M.Sc Botany", code: "Post Graduate", bg: "#15803D", border: "#86EFAC", text: "#FFFFFF", Icon: BookOpen },
  { name: "M.Sc Computer Sci.", code: "Post Graduate", bg: "#0284C7", border: "#38BDF8", text: "#FFFFFF", Icon: Cpu },
  { name: "M.Sc Geography", code: "Post Graduate", bg: "#B45309", border: "#FCD34D", text: "#FFFFFF", Icon: Book },

  { name: "B.Tech (CSE)", code: "Under Graduate", bg: "#1D4ED8", border: "#93C5FD", text: "#FFFFFF", Icon: Code },
  { name: "B.Tech (CE)", code: "Under Graduate", bg: "#C2410C", border: "#FFEDD5", text: "#FFFFFF", Icon: Briefcase },
  { name: "B.Tech (ME)", code: "Under Graduate", bg: "#374151", border: "#D1D5DB", text: "#FFFFFF", Icon: Cpu },
  { name: "B.Tech (ECE)", code: "Under Graduate", bg: "#15803D", border: "#BBF7D0", text: "#FFFFFF", Icon: Cpu },
  { name: "B.Tech (EE)", code: "Under Graduate", bg: "#CA8A04", border: "#FEF08A", text: "#FFFFFF", Icon: Sparkles },
  { name: "B.Ed.", code: "Under Graduate", bg: "#6D28D9", border: "#DDD6FE", text: "#FFFFFF", Icon: GraduationCap },
  { name: "B.A.-B.Ed.", code: "Under Graduate", bg: "#BE185D", border: "#FBCFE8", text: "#FFFFFF", Icon: GraduationCap },
  { name: "B.Sc.-B.Ed.", code: "Under Graduate", bg: "#047857", border: "#A7F3D0", text: "#FFFFFF", Icon: GraduationCap },
  { name: "B.P.Ed.", code: "Under Graduate", bg: "#BE123C", border: "#FECDD3", text: "#FFFFFF", Icon: Award },
  { name: "B.A.", code: "Under Graduate", bg: "#B45309", border: "#FDE68A", text: "#FFFFFF", Icon: BookOpen },
  { name: "B.A. Yoga", code: "Under Graduate", bg: "#0F766E", border: "#99F6E4", text: "#FFFFFF", Icon: Sparkles },
  { name: "B.A. Hons English", code: "Under Graduate", bg: "#4338CA", border: "#C7D2FE", text: "#FFFFFF", Icon: Book },
  { name: "B.Com", code: "Under Graduate", bg: "#1F2937", border: "#E5E7EB", text: "#FFFFFF", Icon: Briefcase },
  { name: "B.Com Hons", code: "Under Graduate", bg: "#92400E", border: "#FDE68A", text: "#FFFFFF", Icon: Briefcase },
  { name: "B.Sc Medical", code: "Under Graduate", bg: "#065F46", border: "#D1FAE5", text: "#FFFFFF", Icon: BookOpen },
  { name: "B.Sc Non Medical", code: "Under Graduate", bg: "#0369A1", border: "#BAE6FD", text: "#FFFFFF", Icon: BookOpen },
  { name: "B.Sc Hons Physics", code: "Under Graduate", bg: "#1E3A8A", border: "#DBEAFE", text: "#FFFFFF", Icon: Sparkles },
  { name: "B.Sc Hons Chemistry", code: "Under Graduate", bg: "#991B1B", border: "#FEE2E2", text: "#FFFFFF", Icon: Sparkles },
  { name: "B.Sc Hons Maths", code: "Under Graduate", bg: "#312E81", border: "#E0E7FF", text: "#FFFFFF", Icon: Award },
  { name: "B.Sc Hons Zoology", code: "Under Graduate", bg: "#14532D", border: "#DCFCE7", text: "#FFFFFF", Icon: BookOpen },
  { name: "B.Sc Hons Botany", code: "Under Graduate", bg: "#064E3B", border: "#A7F3D0", text: "#FFFFFF", Icon: BookOpen },
  { name: "B.Sc Computer Sci.", code: "Under Graduate", bg: "#134E4A", border: "#99F6E4", text: "#FFFFFF", Icon: Code },
  { name: "BBA", code: "Under Graduate", bg: "#9A3412", border: "#FFEDD5", text: "#FFFFFF", Icon: Briefcase },
  { name: "BCA", code: "Under Graduate", bg: "#581C87", border: "#E9D5FF", text: "#FFFFFF", Icon: Code },

  { name: "Polytechnic (ME)", code: "Diploma", bg: "#374151", border: "#9CA3AF", text: "#FFFFFF", Icon: Cpu },
  { name: "Polytechnic (ECE)", code: "Diploma", bg: "#166534", border: "#86EFAC", text: "#FFFFFF", Icon: Cpu },
  { name: "Polytechnic (EE)", code: "Diploma", bg: "#854D0E", border: "#FEF08A", text: "#FFFFFF", Icon: Sparkles },
  { name: "Polytechnic (CE)", code: "Diploma", bg: "#9A3412", border: "#FFEDD5", text: "#FFFFFF", Icon: Briefcase },
  { name: "ITI (Electrician)", code: "Diploma", bg: "#A16207", border: "#FEF08A", text: "#FFFFFF", Icon: Sparkles },
  { name: "ITI (Fitter)", code: "Diploma", bg: "#111827", border: "#9CA3AF", text: "#FFFFFF", Icon: Cpu },
  { name: "ITI (Draughtsman)", code: "Diploma", bg: "#115E59", border: "#99F6E4", text: "#FFFFFF", Icon: Book },
  { name: "D.El.Ed.", code: "Diploma", bg: "#6B21A8", border: "#E9D5FF", text: "#FFFFFF", Icon: GraduationCap },
  { name: "D.P.Ed.", code: "Diploma", bg: "#9F1239", border: "#FECDD3", text: "#FFFFFF", Icon: Award },

  { name: "M.Com", code: "Distance Learning", bg: "#1F2937", border: "#9CA3AF", text: "#FFFFFF", Icon: Briefcase },
  { name: "M.Sc Maths", code: "Distance Learning", bg: "#3730A3", border: "#C7D2FE", text: "#FFFFFF", Icon: Award },
  { name: "B.A.", code: "Distance Learning", bg: "#92400E", border: "#FDE68A", text: "#FFFFFF", Icon: BookOpen },
  { name: "M.A. English", code: "Distance Learning", bg: "#1D4ED8", border: "#BFDBFE", text: "#FFFFFF", Icon: BookOpen },
  { name: "M.A. Hindi", code: "Distance Learning", bg: "#9F1239", border: "#FECDD3", text: "#FFFFFF", Icon: Book },
  { name: "B.Com", code: "Distance Learning", bg: "#374151", border: "#D1D5DB", text: "#FFFFFF", Icon: Briefcase },

  { name: "Computer Applications & Data Science", code: "Distance Diploma", bg: "#0369A1", border: "#7DD3FC", text: "#FFFFFF", Icon: Database },
  { name: "Artificial Intelligence", code: "Distance Diploma", bg: "#6B21A8", border: "#D8B4FE", text: "#FFFFFF", Icon: Brain },
  { name: "Cyber Security", code: "Distance Diploma", bg: "#991B1B", border: "#FCA5A5", text: "#FFFFFF", Icon: Shield },
  { name: "Business Analytics", code: "Distance Diploma", bg: "#047857", border: "#6EE7B7", text: "#FFFFFF", Icon: BarChart },
  { name: "Banking & Finance", code: "Distance Diploma", bg: "#78350F", border: "#FCD34D", text: "#FFFFFF", Icon: Landmark },
  { name: "Financial Market", code: "Distance Diploma", bg: "#C2410C", border: "#FFEDD5", text: "#FFFFFF", Icon: Briefcase },
]

const M = Matter

function makeWalls(bounding, world, opts) {
  const { width: w, height: h } = bounding
  const t = 200
  const walls = []
  if (opts.top)
    walls.push(
      M.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true })
    )
  if (opts.bottom)
    walls.push(
      M.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, {
        isStatic: true,
      })
    )
  if (opts.left)
    walls.push(
      M.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true })
    )
  if (opts.right)
    walls.push(
      M.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, {
        isStatic: true,
      })
    )
  M.Composite.add(world, walls)
  return walls
}

export default function Physics(props) {
  props = { ...COMPONENT_DEFAULTS, ...props }
  const {
    courses = ALL_COURSES,
    friction = 1,
    mouseEnable = true,
    mouseStiffness = 0.991,
    mouseAngularStiffness = 0,
    gravX = 0,
    gravY = 1,
    wallOptions = { top: true, bottom: true, right: true, left: true },
    style,
  } = props

  const containerRef = useRef(null)
  const rafRef = useRef(0)

  const getCardDimensions = (item) => {
    const textLength = item.name.length
    const width = Math.max(130, Math.min(320, textLength * 9.5 + 65))
    const height = 68
    return { width, height }
  }

  const depKey = JSON.stringify({
    coursesLength: courses.length,
    gravX,
    gravY,
    wallOptions,
    friction,
    mouseEnable,
    mouseStiffness,
    mouseAngularStiffness,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const engine = M.Engine.create({
      enableSleeping: false,
      gravity: { x: gravX, y: gravY },
    })

    const bounding = container.getBoundingClientRect()
    makeWalls(bounding, engine.world, wallOptions)

    let mouseConstraint = null
    const onLeave = () =>
      mouseConstraint?.mouse?.mouseup(new Event("mouseup"))
    if (mouseEnable) {
      const mouse = M.Mouse.create(container)
      mouseConstraint = M.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          angularStiffness: mouseAngularStiffness,
          stiffness: mouseStiffness,
        },
      })
      M.Composite.add(engine.world, mouseConstraint)
      const el = mouseConstraint.mouse.element
      el.removeEventListener(
        "mousewheel",
        mouseConstraint.mouse.mousewheel
      )
      el.removeEventListener(
        "DOMMouseScroll",
        mouseConstraint.mouse.mousewheel
      )
      container.addEventListener("mouseleave", onLeave)
    }

    const bodyOpts = {
      friction: Math.max(1, Math.min(10, friction)) / 10,
      frictionAir: 0.02,
      chamfer: { radius: 12 },
    }

    const made = []
    const total = courses.length
    for (let i = 0; i < total; i++) {
      const item = courses[i]
      const { width, height } = getCardDimensions(item)
      const x = ((i % 10 + 0.5) / 10) * bounding.width
      const y = height / 2 + Math.floor(i / 10) * 45
      const body = M.Bodies.rectangle(x, y, width, height, bodyOpts)
      made.push(body)
    }
    M.Composite.add(engine.world, made)

    const els = Array.from(
      container.querySelectorAll("[data-physics-body]")
    )

    const update = () => {
      rafRef.current = requestAnimationFrame(update)
      for (let i = 0; i < made.length; i++) {
        const el = els[i]
        if (!el) continue
        const { position, angle } = made[i]
        el.style.visibility = "visible"
        el.style.left = `${position.x}px`
        el.style.top = `${position.y}px`
        el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`
      }
      M.Engine.update(engine)
    }
    update()

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (mouseEnable)
        container.removeEventListener("mouseleave", onLeave)
      M.World.clear(engine.world, false)
      M.Engine.clear(engine)
    }
  }, [depKey])

  return (
    <div className="w-full h-screen min-h-[600px] relative overflow-hidden">
      <div
        ref={containerRef}
        style={{
          ...style,
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        {courses.map((item, i) => {
          const { width, height } = getCardDimensions(item)
          const Icon = item.Icon || BookOpen
          return (
            <div
              key={i}
              data-physics-body=""
              style={{
                position: "absolute",
                visibility: "hidden",
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: item.bg,
                border: `2px solid ${item.border}`,
                color: item.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "8px 12px",
                textAlign: "left",
                userSelect: "none",
                cursor: "grab",
                whiteSpace: "nowrap",
                zIndex: 10,
              }}
              draggable={false}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span style={{ fontWeight: "700", fontSize: "12px", lineHeight: "1.2" }}>
                  {item.name}
                </span>
                {item.code && (
                  <span style={{ fontSize: "10px", opacity: 0.9, marginTop: "2px" }}>
                    {item.code}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const COMPONENT_DEFAULTS = {
  courses: ALL_COURSES,
  gravY: 1,
  gravX: 0,
  wallOptions: {
    top: true,
    bottom: true,
    left: true,
    right: true,
  },
  friction: 1,
  mouseEnable: true,
  mouseStiffness: 0.991,
  mouseAngularStiffness: 0,
}

Physics.displayName = "Physics"