export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  country: string;
  price: number;
  status: 'For Sale' | 'For Rent' | 'New Listing';
  listingType: 'sale' | 'rent' | 'lease';
  category: 'Villa' | 'Penthouse' | 'Townhouse' | 'Apartment' | 'Estate';
  beds: number;
  baths: number;
  area: number;
  year: number;
  image: string;
  gallery: string[];
  description: string;
  summary: string;
  features: string[];
  amenities: string[];
  agentId: string;
  neighborhood: string;
  coords: [number, number];
};

export type Agent = {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  image: string;
  specialty: string[];
  languages: string[];
  phone: string;
  email: string;
};

export type Neighborhood = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  averagePrice: string;
  vibe: string;
  properties: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  readTime: string;
  image: string;
  content: string[];
};

export const stats = [
  { label: 'Luxury listings sold', value: '1,280+' },
  { label: 'Average days on market', value: '18 days' },
  { label: 'Client satisfaction', value: '98%' },
  { label: 'Global buyers served', value: '42 countries' },
];

export const properties: Property[] = [
  {
    id: 'p-101',
    slug: 'harbor-view-penthouse',
    title: 'Harbor View Penthouse',
    location: 'The Marina District',
    city: 'Dubai',
    country: 'UAE',
    price: 4250000,
    status: 'For Sale',
    listingType: 'sale',
    category: 'Penthouse',
    beds: 4,
    baths: 3,
    area: 3820,
    year: 2023,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A panoramic waterfront penthouse designed for open-plan entertaining, quiet mornings, and world-class city access.',
    summary: 'Skyline living with 360° terrace views and private wellness amenities.',
    features: ['Panoramic glazing', 'Private marina access', 'Double-height lounge', 'Smart home automation'],
    amenities: ['Pool', 'Spa', 'Concierge', 'Private cinema', 'Valet parking'],
    agentId: 'agent-1',
    neighborhood: 'Marina',
    coords: [25.0784, 55.1392],
  },
  {
    id: 'p-102',
    slug: 'cypress-estate',
    title: 'Cypress Estate',
    location: 'Beverly Hills',
    city: 'Los Angeles',
    country: 'USA',
    price: 12900000,
    status: 'For Sale',
    listingType: 'sale',
    category: 'Estate',
    beds: 7,
    baths: 6,
    area: 8600,
    year: 2021,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A gated hillside estate with a resort-style garden, chef’s kitchen, and a cinematic indoor-outdoor entertainment layout.',
    summary: 'Private serenity and event-ready entertaining in one of LA’s most coveted enclaves.',
    features: ['Guest wing', 'Solar-heated pool', 'Wine cellar', 'Landscape architecture'],
    amenities: ['Gym', 'Garage', 'Home theater', 'Outdoor kitchen', 'Guest suite'],
    agentId: 'agent-2',
    neighborhood: 'Beverly Hills',
    coords: [34.0736, -118.4004],
  },
  {
    id: 'p-103',
    slug: 'midtown-atelier-loft',
    title: 'Midtown Atelier Loft',
    location: 'Soho',
    city: 'New York',
    country: 'USA',
    price: 2800,
    status: 'For Rent',
    listingType: 'rent',
    category: 'Apartment',
    beds: 2,
    baths: 2,
    area: 1640,
    year: 2024,
    image:
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Designed for creative professionals, this loft pairs raw texture, natural light, and elevated essentials in a walkable lifestyle district.',
    summary: 'Flexible luxury living with gallery walls and a refined boutique address.',
    features: ['Exposed brick', 'North-facing windows', 'Chef’s kitchen', 'Media wall'],
    amenities: ['Bike room', 'Doorman', 'Package concierge', 'Roof deck', 'Pet friendly'],
    agentId: 'agent-3',
    neighborhood: 'Soho',
    coords: [40.7242, -74.0028],
  },
  {
    id: 'p-104',
    slug: 'verdant-terrace',
    title: 'Verdant Terrace',
    location: 'Chelsea Green',
    city: 'London',
    country: 'UK',
    price: 6250000,
    status: 'New Listing',
    listingType: 'sale',
    category: 'Townhouse',
    beds: 5,
    baths: 4,
    area: 4310,
    year: 2022,
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A contemporary townhouse with layered landscaping, sculpted interiors, and an entertaining terrace designed for effortless entertaining.',
    summary: 'Garden-led living with a masculine palette and world-class proportions.',
    features: ['Private courtyard', 'Double-height dining room', 'Integrated sound system', 'Garden studio'],
    amenities: ['Fitness studio', 'Secure parking', 'Dedicated staff suite', 'Terrace lounge'],
    agentId: 'agent-1',
    neighborhood: 'Chelsea',
    coords: [51.4871, -0.1687],
  },
  {
    id: 'p-105',
    slug: 'saffron-hills-villa',
    title: 'Saffron Hills Villa',
    location: 'Al Barari',
    city: 'Dubai',
    country: 'UAE',
    price: 8200000,
    status: 'For Sale',
    listingType: 'sale',
    category: 'Villa',
    beds: 6,
    baths: 5,
    area: 7420,
    year: 2023,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Set among lush landscaping, this family villa merges wellness amenities with open-air hospitality and elevated craftsmanship.',
    summary: 'Resort living crafted around privacy, wellness, and grand entertaining.',
    features: ['Palm-lined entry', 'Wellness pavilion', 'Alfresco dining pavilion', 'Private cinema'],
    amenities: ['Infinity pool', 'Private gym', 'Steam room', 'Airy guest suite', 'Landscape lighting'],
    agentId: 'agent-2',
    neighborhood: 'Al Barari',
    coords: [25.0697, 55.2493],
  },
  {
    id: 'p-106',
    slug: 'waterfront-vista',
    title: 'Waterfront Vista Residence',
    location: 'Sydney Harbour',
    city: 'Sydney',
    country: 'Australia',
    price: 9600000,
    status: 'For Sale',
    listingType: 'sale',
    category: 'Apartment',
    beds: 5,
    baths: 4,
    area: 4970,
    year: 2022,
    image:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'An iconic residence overlooking the harbor with immaculate detailing, sunrise terraces, and tailored full-service amenities.',
    summary: 'A residence where the harbor becomes part of the architecture.',
    features: ['Harbour-facing terraces', 'Curved limestone interiors', 'Private lift lobby', 'Custom joinery'],
    amenities: ['Sky lounge', 'Harbour pool', 'Wellness spa', 'Doorman', 'Club room'],
    agentId: 'agent-3',
    neighborhood: 'Sydney Harbour',
    coords: [-33.8696, 151.2093],
  },
];

export const agents: Agent[] = [
  {
    id: 'agent-1',
    slug: 'sophia-marin',
    name: 'Sophia Marin',
    title: 'Managing Partner',
    location: 'Dubai & London',
    bio: 'Sophia advises private clients across waterfront villas, trophy apartments, and global second-home portfolios.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    specialty: ['Luxury villas', 'Private client advisory', 'International buyers'],
    languages: ['English', 'French', 'Arabic'],
    phone: '+971 555 013 248',
    email: 'sophia@atlasestate.com',
  },
  {
    id: 'agent-2',
    slug: 'nicolas-ross',
    name: 'Nicolas Ross',
    title: 'Director of Residential Sales',
    location: 'Los Angeles & Miami',
    bio: 'Nicolas specializes in design-led homes, lifestyle-managed estates, and highly strategic listing plans.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    specialty: ['Beachfront homes', 'Architectural properties', 'Off-market mandates'],
    languages: ['English', 'Spanish'],
    phone: '+1 (310) 555-0148',
    email: 'nicolas@atlasestate.com',
  },
  {
    id: 'agent-3',
    slug: 'amelia-chan',
    name: 'Amelia Chan',
    title: 'Commercial & Investment Advisor',
    location: 'New York & Singapore',
    bio: 'Amelia helps investors source premium mixed-use assets and resilient long-term property growth opportunities.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    specialty: ['Commercial acquisitions', 'Portfolio strategy', 'Capital growth'],
    languages: ['English', 'Mandarin'],
    phone: '+65 9123 8471',
    email: 'amelia@atlasestate.com',
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'marina',
    name: 'The Marina',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    blurb: 'Waterfront living with marina access, wellness clubs, and sunset dining.',
    averagePrice: 'AED 5.8M',
    vibe: 'Live-work-luxury',
    properties: ['Harbor View Penthouse', 'Saffron Hills Villa'],
  },
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
    blurb: 'Ritzy enclaves and expressive architecture for private, design-forward buyers.',
    averagePrice: '$12.4M',
    vibe: 'Prestige estate market',
    properties: ['Cypress Estate', 'Silver Crest Villa'],
  },
  {
    slug: 'soho',
    name: 'Soho',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    blurb: 'Creative living, walkable streets, and elevated urban culture.',
    averagePrice: '$2.9M',
    vibe: 'Boutique city elegance',
    properties: ['Midtown Atelier Loft', 'Hudson Courtyard'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-navigate-a-luxury-home-buying-offer',
    title: 'How to navigate a luxury home buying offer with confidence',
    category: 'Buying Guide',
    summary: 'A sharper decision framework for evaluating premium offers, exclusivity periods, and negotiation positioning.',
    author: 'A. Chen',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80',
    content: [
      'The most successful buyers focus on certainty instead of urgency. In luxury markets, speed often gets mistaken for advantage.',
      'A well-structured offer should balance price, time, and terms. Consider the certainty of closing, the condition of the property, and any bespoke seller needs that may influence your negotiating position.',
      'When you are aligned to local market context and have a clear view of risk, you can move with calm confidence and more leverage. The best offers are not simply the highest; they are the most credible.',
    ],
  },
  {
    slug: 'what-private-buyers-look-for-in-a-second-home',
    title: 'What private buyers look for in a second home',
    category: 'Investment',
    summary: 'From lifestyle utility to income resilience, here is what defines a premium second-home purchase.',
    author: 'S. Marin',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Second homes are never chosen solely for their imagery. Buyers look for physical comfort, a functional future, and a location with a resilient lifestyle ecosystem.',
      'That means proximity to schools or travel hubs, local service quality, and the right balance of privacy versus activity. Smart buyers also think about how the property will perform when they are absent.',
      'Design, maintenance expectations, and management quality are a part of the investment return. The highest-value homes feel effortless to live in and effortless to let when needed.',
    ],
  },
  {
    slug: 'estate-portfolio-strategies-for-2026',
    title: 'Estate portfolio strategies for 2026',
    category: 'Market Insights',
    summary: 'Creative portfolio thinking can help multi-market buyers diversify while protecting lifestyle value.',
    author: 'N. Ross',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    content: [
      'A strong portfolio strategy is not only about asset allocation. It is about matching property type, timing, and geography to personal priorities.',
      'Buyers who are able to balance income-producing assets and lifestyle residences create a more resilient portfolio than those driven by headline market movement alone.',
      'The right mix creates optionality, from seasonal rental yields to long-term capital appreciation or family legacy planning.',
    ],
  },
];

export const luxuryCollections = [
  'Waterfront residences',
  'Design-led penthouses',
  'Investment-ready villas',
  'Charter homes',
  'Commercial flagship assets',
];
