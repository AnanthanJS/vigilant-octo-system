'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Users } from 'lucide-react'

export default function IdealClientSection({ industries }: { industries: string[] }) {
  const avatars = [
    { title: "B2B SaaS", icon: <TrendingUp className="w-6 h-6" />, desc: "Scaling MRR efficiently with targeted demand generation." },
    { title: "E-commerce", icon: <Users className="w-6 h-6" />, desc: "Lowering CAC and maximizing LTV across multiple channels." },
    { title: "High-Ticket Services", icon: <Target className="w-6 h-6" />, desc: "Driving qualified sales calls and pipeline volume." }
  ]

  return (
    <section className="w-full py-24 px-4 bg-background relative border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Who I Partner With</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I don't work with everyone. My frameworks yield the highest ROI for these specific models.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {avatars.map((avatar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-secondary/30 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {avatar.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{avatar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{avatar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
