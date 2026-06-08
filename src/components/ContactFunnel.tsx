'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Activity, Calendar, DollarSign, Check } from 'lucide-react'

export default function ContactFunnel() {
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select')
  const [selectedType, setSelectedType] = useState('')

  const handleSelect = (type: string) => {
    setSelectedType(type)
    setStep('form')
  }

  return (
    <section className="w-full py-24 px-4 bg-secondary/20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-muted-foreground">Choose the path that best fits your immediate needs.</p>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div 
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <div onClick={() => handleSelect('audit')} className="cursor-pointer group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg text-center">
                  <Activity className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Free Audit</h3>
                  <p className="text-sm text-muted-foreground mb-6">Get a 30-min website conversion & ad account audit.</p>
                  <div className="text-primary font-medium flex justify-center items-center gap-1 group-hover:gap-2 transition-all">Request <ArrowRight className="w-4 h-4" /></div>
                </div>

                <div onClick={() => handleSelect('call')} className="cursor-pointer group p-8 rounded-2xl bg-primary text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-xl text-center transform relative z-10">
                  <Calendar className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Strategy Call</h3>
                  <p className="text-sm text-primary-foreground/80 mb-6">30-min discovery call with actionable takeaways.</p>
                  <div className="font-bold flex justify-center items-center gap-1 group-hover:gap-2 transition-all">Book Call <ArrowRight className="w-4 h-4" /></div>
                </div>

                <div onClick={() => handleSelect('pricing')} className="cursor-pointer group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg text-center">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">View Pricing</h3>
                  <p className="text-sm text-muted-foreground mb-6">Transparent packages tailored for your budget.</p>
                  <div className="text-primary font-medium flex justify-center items-center gap-1 group-hover:gap-2 transition-all">Show Prices <ArrowRight className="w-4 h-4" /></div>
                </div>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-md mx-auto bg-card p-8 rounded-3xl border border-border shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-2 capitalize">{selectedType} Request</h3>
                <p className="text-sm text-muted-foreground mb-6">Fill out the details below and I'll get back to you within 24 hours.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-4">
                  <div>
                    <input type="text" placeholder="Name" required className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div>
                    <input type="email" placeholder="Work Email" required className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div>
                    <input type="url" placeholder="Website URL" className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setStep('select')} className="px-6 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
                      Back
                    </button>
                    <button type="submit" className="flex-1 bg-primary text-primary-foreground font-bold rounded-xl py-3 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Submit Details
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 mx-auto flex items-center justify-center mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Request Received</h3>
                <p className="text-muted-foreground mb-8">Thanks for reaching out! I'll review your details and be in touch shortly.</p>
                <button onClick={() => setStep('select')} className="text-primary font-medium hover:underline">
                  Return to options
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
