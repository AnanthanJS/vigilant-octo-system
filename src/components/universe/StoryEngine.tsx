'use client';

// The Story Engine - Very important per user request
// Highlights Audience Insight -> Concept -> Design -> Result
export default function StoryEngine() {
  const process = [
    { step: "01", title: "Audience Insight", desc: "Understanding the psychology, market gaps, and what drives the customer to care.", icon: "⌕" },
    { step: "02", title: "Creative Concept", desc: "Forging the narrative hook that connects the product to the human experience.", icon: "✧" },
    { step: "03", title: "Visual Design", desc: "Translating the concept into premium aesthetics across static and motion.", icon: "◧" },
    { step: "04", title: "Business Result", desc: "Measuring the impact on sales, engagement, and brand perception.", icon: "↗" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col justify-center">
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left side: The USP Statement */}
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">The Story Engine</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-pure-white leading-tight">
              Design is not just art.<br />
              <span className="text-soft-amber">It is applied psychology.</span>
            </h3>
          </div>
          <p className="text-pure-white/70 text-lg leading-relaxed font-serif">
            My background in sales and marketing means I don't just create visuals that look good. 
            I architect narratives that convert. Every pixel serves the strategy. Every frame drives the business objective.
          </p>
          <div className="pt-4 border-t border-white/10 flex gap-4">
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-pure-white/80">Sales Background</span>
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-pure-white/80">Customer Psychology</span>
          </div>
        </div>

        {/* Right side: The Pipeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-cosmic-violet via-soft-amber to-cosmic-violet opacity-30" />
          
          <div className="space-y-8">
            {process.map((item, index) => (
              <div key={item.step} className="flex gap-8 group">
                <div className="relative flex-shrink-0 w-14 h-14 rounded-full border border-cosmic-violet bg-space-black flex items-center justify-center z-10 transition-colors group-hover:border-soft-amber group-hover:bg-soft-amber/10">
                  <span className="text-xl text-pure-white/50 group-hover:text-soft-amber">{item.icon}</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-xs text-soft-amber">{item.step}</span>
                    <h4 className="text-xl font-serif text-pure-white">{item.title}</h4>
                  </div>
                  <p className="text-sm text-pure-white/50 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
