import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visakh P S - Resume',
  description: 'Resume of Visakh P S - Graphic Designer & VFX Artist',
};

export default function ResumePage() {
  return (
    <main className="w-full h-dvh overflow-hidden bg-space-black">
      <iframe 
        src="/resume.pdf" 
        className="w-full h-full border-none"
        title="Visakh P S - Resume"
      />
    </main>
  );
}
