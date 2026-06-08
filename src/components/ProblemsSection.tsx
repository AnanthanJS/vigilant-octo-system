'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function ProblemsSection({ items }: { items: string[] }) {
  return (
    <section className="w-full py-24 px-4 relative overflow-hidden bg-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Sound Familiar?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the most common growth bottlenecks I solve for my clients.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-lg font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
