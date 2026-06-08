'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CaseStudyCarousel() {
  const caseStudies = [
    { client: "Acme SaaS", result: "300% ROI", desc: "How we lowered CPA by 40% in 60 days." },
    { client: "TechCorp", result: "$1.2M Pipeline", desc: "Scaling B2B lead gen through LinkedIn Ads." }
  ]

  return (
    <section className="w-full py-24 px-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Results</h2>
            <p className="text-muted-foreground">Real numbers from real campaigns.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-border bg-card relative"
            >
              <div className="h-64 bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <span className="text-4xl font-bold text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500">{cs.client}</span>
              </div>
              <div className="p-8 relative z-20 -mt-16">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4 backdrop-blur-md">
                  {cs.result}
                </div>
                <h3 className="text-2xl font-bold mb-2">{cs.client}</h3>
                <p className="text-muted-foreground mb-6">{cs.desc}</p>
                <div className="text-primary font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read Case Study <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
