export const trackMarketingEvent = {
  // Track funnel progression
  caseStudyViewed: (slug: string, scrollPercent: number) => {
    console.log(`[Analytics] Case Study Viewed: ${slug} (${scrollPercent}%)`);
  },
  contactFunnelSelected: (option: 'audit' | 'call' | 'pricing' | string) => {
    console.log(`[Analytics] Funnel Option Selected: ${option}`);
  },
  metricsSeen: (metric: string, duration: number) => {
    console.log(`[Analytics] Metrics Seen: ${metric} for ${duration}ms`);
  },
  
  // Conversion tracking
  formAbandoned: (step: number, fieldsFilled: string[]) => {
    console.log(`[Analytics] Form Abandoned: Step ${step}, Fields: ${fieldsFilled.join(', ')}`);
  },
  formCompleted: (type: string, source: string) => {
    console.log(`[Analytics] Form Completed: ${type} via ${source}`);
  },
  
  // Scroll depth per section
  sectionViewed: (section: string, timeOnSection: number) => {
    console.log(`[Analytics] Section Viewed: ${section} for ${timeOnSection}s`);
  }
};
