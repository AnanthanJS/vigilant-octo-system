'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialGrid() {
  const testimonials = [
    { name: "Sarah J.", role: "CMO @ TechFlow", quote: "Our CAC dropped by 42% within the first month. The ROI is undeniable." },
    { name: "Mark R.", role: "Founder @ ScaleUp", quote: "Finally, a marketer who understands revenue, not just vanity metrics like clicks." },
    { name: "Elena B.", role: "VP Growth @ DataSync", quote: "The most transparent and results-driven agency partner we've ever worked with." }
  ]

  return (
    <section className="w-full py-24 px-4 bg-secondary/10 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't Just Take My Word For It</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-background border border-border relative group"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6 group-hover:text-primary/40 transition-colors" />
              <p className="text-lg mb-6 relative z-10 italic text-muted-foreground">"{t.quote}"</p>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-primary">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
