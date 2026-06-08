'use client'

import { motion } from 'framer-motion'

export default function ResultsWall() {
  const stats = [
    { label: "Ad Spend Managed", value: "$5M+" },
    { label: "Leads Generated", value: "10k+" },
    { label: "Avg Cost Reduction", value: "35%" },
    { label: "Win Rate Increase", value: "2.5x" }
  ]

  return (
    <section className="w-full py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-extrabold mb-2 text-white drop-shadow-md">{stat.value}</div>
              <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
