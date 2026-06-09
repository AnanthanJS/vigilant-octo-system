export type ProjectCategory = 'VFX' | 'Branding' | 'Motion Graphics' | '3D Design';

export interface GalleryProject {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  videoUrl?: string; // For Cinematic/Hero mode
  rawImageUrl?: string; // For Before/After slider
  finalImageUrl?: string; // For Before/After slider
  description: string;
  layers?: {
    name: string;
    imageUrl: string;
  }[];
  technicalStats?: {
    renderTime: string;
    software: string[];
    polyCount?: string;
    resolution: string;
    nodes: number;
  };
}

export const galleryData: GalleryProject[] = [
  {
    id: 'glimpse-of-trivandrum',
    title: 'Glimpse of Trivandrum',
    client: 'Personal Project',
    category: 'Motion Graphics',
    thumbnailUrl: '/memories/Sequence 06_1.mp4',
    videoUrl: '/memories/Sequence 06_1.mp4',
    rawImageUrl: '/memories/Business-Card-Mockup-1.jpg', // Placeholder for before/after demo
    finalImageUrl: '/memories/Captain A mockup.png', // Placeholder for before/after demo
    description: 'A cinematic showcase capturing the vibrant essence and cultural heritage of Trivandrum, utilizing advanced video editing and color grading techniques to bring the city to life.',
    layers: [
      { name: 'Beauty Pass', imageUrl: '/memories/product cover.jpeg' },
      { name: 'Reflection', imageUrl: '/memories/Magzine cover mockup.jpeg' },
      { name: 'Ambient Occlusion', imageUrl: '/memories/flyer.jpeg' },
      { name: 'Final Composite', imageUrl: '/memories/Captain A mockup.png' }
    ],
    technicalStats: {
      renderTime: '45 hrs',
      software: ['Premiere Pro'],
      resolution: '4K (3840x2160)',
      nodes: 234
    }
  },
  {
    id: 'captain-a',
    title: 'Captain A Character Model',
    client: 'Studio X',
    category: '3D Design',
    thumbnailUrl: '/memories/Captain A mockup.png',
    rawImageUrl: '/memories/Captain A mockup.png',
    finalImageUrl: '/memories/Captain A mockup.png',
    description: 'High-poly character modeling and texturing for cinematic production.',
    technicalStats: {
      renderTime: '12 hrs/frame',
      software: ['Illustrator'],
      polyCount: '4.2M',
      resolution: '8K',
      nodes: 56
    }
  },
  {
    id: 'branding-business-card',
    title: 'Premium Brand Identity',
    client: 'Stellar Corp',
    category: 'Branding',
    thumbnailUrl: '/memories/Business-Card-Mockup-1.jpg',
    rawImageUrl: '/memories/Business-Card-Mockup-1.jpg',
    finalImageUrl: '/memories/Logo mockup2.jpeg',
    description: 'Complete brand overhaul including logo design, business cards, and stationery mockups.',
    technicalStats: {
      renderTime: 'Real-time',
      software: ['Illustrator'],
      resolution: 'Print Ready (300dpi)',
      nodes: 0
    }
  },
  {
    id: 'magazine-cover',
    title: 'Future Tech Magazine',
    client: 'Future Editorial',
    category: 'Branding',
    thumbnailUrl: '/memories/Magzine cover mockup.jpeg',
    rawImageUrl: '/memories/Magzine cover mockup.jpeg',
    finalImageUrl: '/memories/Magzine cover mockup.jpeg',
    description: 'Cover design and typography for a leading technology publication.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Print Ready',
      nodes: 12
    }
  },
  {
    id: 'product-concept',
    title: 'Product Visualization',
    client: 'Aero Dynamics',
    category: '3D Design',
    thumbnailUrl: '/memories/product cover.jpeg',
    rawImageUrl: '/memories/product cover.jpeg',
    finalImageUrl: '/memories/product cover.jpeg',
    description: 'Product visualization emphasizing lighting and material properties in a studio environment.',
    technicalStats: {
      renderTime: '2 hrs/frame',
      software: ['Photoshop'],
      resolution: '4K',
      nodes: 89
    }
  },
  {
    id: 'event-flyer',
    title: 'Event Flyer',
    client: 'Club Vertex',
    category: 'Branding',
    thumbnailUrl: '/memories/flyer.jpeg',
    rawImageUrl: '/memories/flyer.jpeg',
    finalImageUrl: '/memories/flyer.jpeg',
    description: 'Vibrant promotional material designed for high impact on both print and social media.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Various',
      nodes: 5
    }
  },
  {
    id: 'malabar-logistics',
    title: 'Malabar Logistics Branding',
    client: 'Malabar Logistics',
    category: 'Branding',
    thumbnailUrl: '/memories/malabar_logistics.jpeg',
    rawImageUrl: '/memories/malabar_logistics.jpeg',
    finalImageUrl: '/memories/malabar_logistics.jpeg',
    description: 'Corporate branding and visual identity for Malabar Logistics.',
    technicalStats: {
      renderTime: 'N/A',
      software: ['Photoshop'],
      resolution: 'Print Ready',
      nodes: 0
    }
  }
];
