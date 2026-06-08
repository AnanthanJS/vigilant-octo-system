'use client';

// Inspired by Doctor Strange - Geometric interactive playground
export default function DesignLab() {
  const elements = [
    { name: "Branding", rotate: "rotate-12", delay: "delay-0" },
    { name: "Logos", rotate: "-rotate-6", delay: "delay-100" },
    { name: "Campaigns", rotate: "rotate-6", delay: "delay-200" },
    { name: "Posters", rotate: "-rotate-12", delay: "delay-300" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col justify-center items-center text-center">
      
      <div className="mb-16">
        <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-4">The Mirror Dimension</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-pure-white">The Design Lab</h3>
      </div>

      {/* Geometric Interactive Playground */}
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        
        {/* Background intricate geometry */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none animate-spin-slow">
          <div className="w-64 h-64 border border-soft-amber rotate-45" />
          <div className="absolute w-64 h-64 border border-cosmic-violet rounded-full" />
          <div className="absolute w-80 h-80 border border-deep-indigo rotate-12" />
        </div>

        {/* Floating Cards */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 group">
          {elements.map((el) => (
            <div 
              key={el.name}
              className={`w-40 h-56 border border-cosmic-violet bg-space-black/80 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out transform ${el.rotate} hover:!rotate-0 hover:scale-110 hover:border-soft-amber hover:z-20 hover:shadow-[0_0_30px_rgba(212,163,115,0.2)]`}
            >
              <div className="w-12 h-12 mb-6 border border-pure-white/20 flex items-center justify-center">
                <span className="text-soft-amber font-mono text-[10px]">GFX</span>
              </div>
              <span className="font-serif text-pure-white tracking-wider">{el.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-16 font-mono text-xs text-pure-white/40 tracking-widest uppercase">
        Hover to stabilize geometry
      </p>
    </div>
  );
}
