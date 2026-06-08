'use client';

// Inspired by 2001: A Space Odyssey & Interstellar trajectory
export default function FutureDimension() {
  const trajectory = [
    { step: "Graphic Design", status: "Mastered", opacity: "opacity-40" },
    { step: "Motion Design", status: "Integrating", opacity: "opacity-60" },
    { step: "VFX", status: "Learning", opacity: "opacity-80" },
    { step: "Film Making", status: "The Future", opacity: "opacity-100", highlight: true }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col justify-center text-center">
      
      <h2 className="text-sm font-mono tracking-[0.5em] text-cosmic-violet uppercase mb-8">Trajectory</h2>
      <h3 className="text-4xl md:text-6xl font-serif text-pure-white mb-20 leading-tight">
        Beyond the<br />Current Dimension
      </h3>

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        {trajectory.map((item, index) => (
          <div key={item.step} className={`flex flex-col items-center w-full ${item.opacity}`}>
            <div className={`py-4 px-8 border transition-all duration-500 w-64 ${
              item.highlight 
                ? 'border-soft-amber bg-soft-amber/10 text-soft-amber scale-110 shadow-[0_0_30px_rgba(212,163,115,0.4)]' 
                : 'border-white/10 text-pure-white'
            }`}>
              <h4 className="font-serif text-xl mb-1">{item.step}</h4>
              <span className="font-mono text-[10px] uppercase tracking-widest">{item.status}</span>
            </div>
            
            {/* Connecting line to next stage, except for the last one */}
            {index < trajectory.length - 1 && (
              <div className="h-12 w-px bg-gradient-to-b from-pure-white/20 to-pure-white/60 my-2" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
