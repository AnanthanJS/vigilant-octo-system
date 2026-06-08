import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Mock data for now until Sanity fetch is implemented
  const clientName = resolvedParams.slug.replace('-', ' ')
  
  return {
    title: `${clientName} | Case Study`,
    description: `How we grew ${clientName} through data-driven marketing.`,
  }
}

export async function generateStaticParams() {
  // Mock slugs for now
  return [{ slug: 'acme-saas' }, { slug: 'techcorp' }]
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <main className="min-h-screen py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-3xl">
        <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-8">
          300% ROI
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 capitalize text-foreground">
          {resolvedParams.slug.replace('-', ' ')} Growth Story
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
          <p className="lead text-2xl text-foreground mb-8">
            How we lowered CPA by 40% in 60 days using a full-funnel approach.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Challenge</h2>
          <p>
            The client was experiencing high customer acquisition costs (CAC) due to a fragmented tracking setup and poor audience segmentation.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Our Strategy</h2>
          <p>
            We audited their entire funnel, implemented server-side tracking, and restructured their ad accounts to focus on consolidated, high-intent targeting.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Results</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-primary">
            <li><span className="text-muted-foreground">40% reduction in blended CAC</span></li>
            <li><span className="text-muted-foreground">300% return on ad spend (ROAS)</span></li>
            <li><span className="text-muted-foreground">Predictable pipeline generation</span></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
