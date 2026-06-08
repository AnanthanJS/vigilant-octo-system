'use client';

export default function CreativeTimeline() {
  const experiences = [
    { year: "2022", role: "Techno-Commercial Expert", company: "Malayalam Mobikes", desc: "Customer relations & brand visibility" },
    { year: "2025", role: "System Operations Intern", company: "Vensure HCM", desc: "QA & platform validation" },
    { year: "2026", role: "Sales Manager", company: "SAJ Motors", desc: "Revenue targets & promotional campaigns" },
    { year: "Future", role: "VFX & Creative Direction", company: "The Infinite Setup", desc: "Merging cinematic visuals with strategy" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-8 relative pointer-events-auto flex flex-col justify-center h-full">
      <div className="mb-16">
        <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">Temporal Archive</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-pure-white">Career Trajectory</h3>
      </div>

      <div className="relative">
        {/* Interstellar chronological timeline line */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-gradient-to-b from-cosmic-violet via-soft-amber to-transparent opacity-50" />

        <div className="space-y-12 md:space-y-24">
          {experiences.map((exp, index) => (
            <div key={exp.year} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-space-black border-2 border-soft-amber rounded-full z-10 shadow-[0_0_15px_rgba(212,163,115,0.8)]" />
              
              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <div className="group border border-deep-indigo hover:border-cosmic-violet bg-space-black/60 backdrop-blur-md p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(61,32,80,0.3)]">
                  <span className="font-mono text-sm tracking-widest text-soft-amber block mb-2">{exp.year}</span>
                  <h4 className="text-2xl font-serif text-pure-white mb-1 group-hover:text-soft-amber transition-colors">{exp.role}</h4>
                  <p className="font-mono text-xs text-cosmic-violet tracking-widest uppercase mb-4">{exp.company}</p>
                  <p className="text-pure-white/60 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
