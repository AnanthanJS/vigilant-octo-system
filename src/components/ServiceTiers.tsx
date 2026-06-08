'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ServiceTiers({ tiers }: { tiers: string[] }) {
  const services = [
    { title: "Growth Audit", price: "$1,500", desc: "One-time comprehensive audit of your funnels, tracking, and ad accounts.", features: ["Ad Account Review", "Tracking Verification", "Landing Page UX Audit", "Actionable PDF Report"] },
    { title: "Done-For-You", price: "Custom", desc: "Full-service management of your paid acquisition channels.", features: ["Copy & Creative", "Campaign Management", "A/B Testing", "Weekly Reporting"], popular: true },
    { title: "Fractional CMO", price: "$5k/mo", desc: "High-level strategy and team management for scaling startups.", features: ["Weekly Strategy Calls", "Team Leadership", "Budget Allocation", "MarTech Stack Setup"] }
  ]

  return (
    <section className="w-full py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Can Work Together</h2>
          <p className="text-muted-foreground">Flexible engagements designed for your current growth stage.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border ${s.popular ? 'border-primary ring-2 ring-primary/20 bg-secondary/10' : 'border-border bg-card'} relative`}
            >
              {s.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
              
              <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">{s.desc}</p>
              <div className="text-3xl font-extrabold mb-8">{s.price}</div>
              
              <ul className="space-y-4 mb-8">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${s.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
