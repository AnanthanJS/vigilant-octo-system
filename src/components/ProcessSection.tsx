'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, Rocket, LineChart } from 'lucide-react'

export default function ProcessSection({ steps = 4 }: { steps?: number }) {
  const processSteps = [
    { title: "Audit & Analytics", icon: <Search />, desc: "Deep dive into your current metrics, tracking setup, and historical data to find leaks." },
    { title: "Strategy & Creative", icon: <PenTool />, desc: "Crafting the messaging, offers, and creative assets designed to convert your specific ICP." },
    { title: "Execution & Launch", icon: <Rocket />, desc: "Deploying campaigns across optimal channels with robust tracking and segmenting." },
    { title: "Scale & Optimize", icon: <LineChart />, desc: "Continuous A/B testing and budget reallocation to scale winning variations." }
  ]

  return (
    <section className="w-full py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Methodology</h2>
          <p className="text-muted-foreground">A systemized approach to predictable growth.</p>
        </div>

        <div className="relative border-l border-border/50 ml-4 md:ml-0 md:border-none">
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-border/50" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.slice(0, steps).map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-8 md:pl-0 pt-8 md:pt-0"
              >
                {/* Mobile line node */}
                <div className="md:hidden absolute top-10 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary" />
                
                {/* Desktop line node */}
                <div className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center text-primary font-bold z-10">
                  {i + 1}
                </div>

                <div className="md:mt-24 text-center md:px-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary mx-auto flex items-center justify-center text-foreground mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
