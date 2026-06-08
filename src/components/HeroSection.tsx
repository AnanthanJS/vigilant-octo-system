'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart3 } from 'lucide-react'

export default function HeroSection({ headline, metrics }: { headline: string, metrics: any[] }) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium mb-8 border border-white/10 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          Accepting new clients for Q3
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-primary-foreground to-white/60 bg-clip-text text-transparent">
          {headline}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Stop wasting ad spend. Start scaling efficiently with data-driven performance marketing engineered for revenue growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(99,102,241,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors border border-border">
            View Case Studies
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {metrics.map((metric, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
            <BarChart3 className="w-8 h-8 text-primary mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
