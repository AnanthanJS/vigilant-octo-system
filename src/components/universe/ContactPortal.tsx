'use client';

// Inspired by Contact - Atmospheric communication portal
export default function ContactPortal() {
  return (
    <div className="w-full max-w-4xl mx-auto px-8 relative pointer-events-auto h-full flex flex-col justify-center items-center text-center pb-32 pt-12">
      
      <div className="mb-12">
        <h2 className="text-sm font-mono tracking-[0.5em] text-soft-amber uppercase mb-4 animate-pulse">Signal Entanglement</h2>
        <h3 className="text-5xl md:text-7xl font-serif text-pure-white">Let's Build Something Memorable</h3>
      </div>

      <div className="w-full max-w-md bg-space-black/80 backdrop-blur-xl border border-cosmic-violet p-8 shadow-[0_0_50px_rgba(26,16,37,0.8)]">
        <form className="flex flex-col gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-mono text-xs tracking-widest text-pure-white/50 uppercase block mb-2">Identification</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-pure-white focus:outline-none focus:border-soft-amber transition-colors font-serif"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="font-mono text-xs tracking-widest text-pure-white/50 uppercase block mb-2">Frequency</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-pure-white focus:outline-none focus:border-soft-amber transition-colors font-serif"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="font-mono text-xs tracking-widest text-pure-white/50 uppercase block mb-2">Transmission</label>
            <textarea 
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-pure-white focus:outline-none focus:border-soft-amber transition-colors font-serif resize-none h-24"
              placeholder="What are we building?"
            />
          </div>
          <button className="w-full py-4 mt-4 bg-pure-white text-space-black font-mono text-xs tracking-[0.2em] uppercase hover:bg-soft-amber transition-colors flex justify-center items-center gap-2 group">
            Transmit Signal
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </form>
      </div>
      
      {/* Cinematic Footer */}
      <footer className="absolute bottom-0 pb-2 left-0 right-0 px-8 w-full">
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-pure-white/60 font-mono text-[10px] tracking-widest uppercase gap-4">
          
          <div className="text-center md:text-left">
            <p>Visakh P S © {new Date().getFullYear()} — The Creative Universe</p>
          </div>
          
          <div className="flex gap-8">
            <a href="https://linkedin.com/in/visakh-p-s" target="_blank" rel="noopener noreferrer" className="hover:text-pure-white hover:text-shadow-glow transition-all">LinkedIn</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-pure-white transition-all">Resume</a>
            <a href="mailto:visakhspadmakumar@gmail.com" className="hover:text-pure-white transition-all">Email</a>
          </div>
          
          <div className="text-center md:text-right">
            <p>System Status: <span className="text-soft-amber animate-pulse">Online</span></p>
          </div>

        </div>
      </footer>
    </div>
  );
}
