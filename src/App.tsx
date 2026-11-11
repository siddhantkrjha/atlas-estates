import { type FormEvent, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import {
  Bath,
  BedDouble,
  Building2,
  ChartColumn,
  ChevronRight,
  Heart,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { agents, blogPosts, luxuryCollections, neighborhoods, properties, stats } from './data';
import './App.css';
import 'leaflet/dist/leaflet.css';

type PropertyContextValue = {
  savedIds: string[];
  comparisonIds: string[];
  toggleSaved: (id: string) => void;
  toggleComparison: (id: string) => void;
};

const PropertyContext = createContext<PropertyContextValue | null>(null);

const getStoredList = (key: string): string[] => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const saveList = (key: string, value: string[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in demo mode.
  }
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const getStatusTone = (status: string) => {
  switch (status) {
    case 'For Sale':
      return 'status status-sale';
    case 'For Rent':
      return 'status status-rent';
    default:
      return 'status status-new';
  }
};

const mapMarker = (color: string) =>
  L.divIcon({
    className: 'map-marker-pin',
    html: `<span style="background: ${color};"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

const usePropertyState = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error('PropertyContext must be used inside App provider');
  }

  return context;
};

function App() {
  const [savedIds, setSavedIds] = useState<string[]>(() => getStoredList('atlas-saved'));
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => getStoredList('atlas-compare'));

  useEffect(() => {
    saveList('atlas-saved', savedIds);
  }, [savedIds]);

  useEffect(() => {
    saveList('atlas-compare', comparisonIds);
  }, [comparisonIds]);

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const toggleComparison = (id: string) => {
    setComparisonIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id].slice(-3),
    );
  };

  return (
    <PropertyContext.Provider value={{ savedIds, comparisonIds, toggleSaved, toggleComparison }}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </PropertyContext.Provider>
  );
}

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { savedIds, comparisonIds } = usePropertyState();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/agents', label: 'Agents' },
    { to: '/blog', label: 'Insights' },
    { to: '/valuation', label: 'Valuation' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">A</span>
            <span>
              Atlas Estates
              <small>Private advisory</small>
            </span>
          </Link>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="chip" to="/compare">
              Compare {comparisonIds.length > 0 ? `(${comparisonIds.length})` : ''}
            </Link>
            <Link className="chip" to="/saved">
              Saved {savedIds.length > 0 ? `(${savedIds.length})` : ''}
            </Link>
            <Link className="button button-primary" to="/contact">
              Book a consult
            </Link>
            <button className="menu-button" type="button" onClick={() => setMenuOpen((current) => !current)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:slug" element={<AgentDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/neighborhoods/:slug" element={<NeighborhoodPage />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link className="brand footer-brand" to="/">
              <span className="brand-mark">A</span>
              <span>
                Atlas Estates
                <small>Private advisory</small>
              </span>
            </Link>
            <p>
              Premium property advisory for investors, families, and design-led buyers seeking exceptional spaces.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/properties">Featured listings</Link>
              </li>
              <li>
                <Link to="/agents">Advisory team</Link>
              </li>
              <li>
                <Link to="/blog">Market insight</Link>
              </li>
              <li>
                <Link to="/valuation">Property valuation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Global offices</h4>
            <ul>
              <li>Dubai Marina</li>
              <li>Los Angeles</li>
              <li>London</li>
              <li>Singapore</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>+971 4 381 9124</li>
              <li>hello@atlasestate.com</li>
              <li>Mon–Sat · 9am–7pm</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Atlas Estates. Demo mode with sample data.</span>
          <span>Built for luxury property marketing and advisory experiences.</span>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Any');
  const [category, setCategory] = useState('All');
  const heroProperties = properties.slice(0, 3);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/properties', {
      state: {
        keyword: query,
        location,
        category,
      },
    });
  };

  return (
    <>
      <motion.section className="hero-section" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Curated global real estate</span>
            <h1>Exceptional homes for individual visionaries.</h1>
            <p>
              We match discerning buyers and investors with landmark properties, portfolio strategy, and private advisory backed by deep market intelligence.
            </p>

            <form className="search-panel" onSubmit={handleSubmit}>
              <div className="search-field search-wide">
                <Search size={18} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by location, property, or keyword" />
              </div>
              <div className="search-field">
                <MapPin size={18} />
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Any">Any city</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="London">London</option>
                  <option value="New York">New York</option>
                </select>
              </div>
              <div className="search-field">
                <Building2 size={18} />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="All">All types</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Estate">Estate</option>
                </select>
              </div>
              <button type="submit" className="button button-primary search-button">
                Search homes
              </button>
            </form>

            <div className="hero-meta">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury property exterior"
              />
              <div className="floating-card hero-card">
                <span className="floating-label">Featured property</span>
                <h3>Cypress Estate</h3>
                <p>Beverly Hills • $12.9M</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="container brand-trust">
        <div className="brand-bar">
          <span>Trusted by family offices</span>
          <span>Global buyer network</span>
          <span>Design-led advisory</span>
          <span>Private treaty access</span>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured collection</span>
            <h2>Signature residences across the world’s most desirable markets.</h2>
          </div>
          <Link className="button button-ghost" to="/properties">
            Explore all listings
          </Link>
        </div>

        <div className="card-grid property-grid three-up">
          {heroProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="section-surface">
        <div className="container section-block">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Lifestyle by neighborhood</span>
              <h2>Curated addresses defined by atmosphere and opportunity.</h2>
            </div>
          </div>

          <div className="card-grid city-grid">
            {neighborhoods.map((neighborhood) => (
              <Link key={neighborhood.slug} to={`/neighborhoods/${neighborhood.slug}`} className="location-card">
                <img src={neighborhood.image} alt={neighborhood.name} />
                <div className="location-card-body">
                  <div className="meta-row">
                    <span>{neighborhood.vibe}</span>
                    <span>{neighborhood.averagePrice}</span>
                  </div>
                  <h3>{neighborhood.name}</h3>
                  <p>{neighborhood.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Business-ready platform</span>
            <h2>Built to serve boutique agencies, investors, and property teams.</h2>
          </div>
        </div>

        <div className="cards-row split-row">
          {luxuryCollections.map((collection) => (
            <div className="info-card" key={collection}>
              <Sparkles size={18} />
              <h3>{collection}</h3>
              <p>Configurable customer journeys for luxury, investment, and commercial mandates.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Our advisors</span>
            <h2>See the people guiding each transaction.</h2>
          </div>
          <Link className="button button-ghost" to="/agents">
            Meet the team
          </Link>
        </div>

        <div className="card-grid agent-grid">
          {agents.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <section className="section-surface">
        <div className="container section-block insight-layout">
          <div className="insight-copy">
            <span className="eyebrow">Editorial insight</span>
            <h2>Market intelligence designed for global buyers and investors.</h2>
            <p>Original guidance and property education written for clients who expect clarity and strategic execution.</p>
            <Link className="button button-primary" to="/blog">
              Read our journals
            </Link>
          </div>

          <div className="card-grid article-grid">
            {blogPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section-block testimonial-wrap">
        <div className="testimonial-card">
          <div className="testimonial-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} fill="currentColor" />
            ))}
          </div>
          <p>
            “Atlas handled our cross-border purchase with calm precision. The quality of presentation, negotiation aptitude, and project management felt aligned with a true luxury private office.”
          </p>
          <div className="testimonial-person">
            <strong>Leah & Adrian D.</strong>
            <span>Private buyers • Dubai</span>
          </div>
        </div>
      </section>

      <section className="container section-block cta-banner">
        <div>
          <span className="eyebrow">Need a private conversation?</span>
          <h2>Start with a tailored acquisition or investment strategy.</h2>
        </div>
        <div className="cta-actions">
          <Link className="button button-primary" to="/contact">
            Enquire now
          </Link>
          <Link className="button button-ghost" to="/valuation">
            Request valuation
          </Link>
        </div>
      </section>
    </>
  );
}

function PropertiesPage() {
  const location = useLocation();
  const [keyword, setKeyword] = useState((location.state as { keyword?: string } | null)?.keyword ?? '');
  const [city, setCity] = useState((location.state as { location?: string } | null)?.location ?? 'Any');
  const [category, setCategory] = useState((location.state as { category?: string } | null)?.category ?? 'All');
  const [listingType, setListingType] = useState('All');
  const [bedrooms, setBedrooms] = useState('Any');
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesKeyword =
        normalizedKeyword.length === 0 ||
        `${property.title} ${property.location} ${property.city} ${property.summary}`
          .toLowerCase()
          .includes(normalizedKeyword);

      const matchesCity = city === 'Any' || property.city === city;
      const matchesCategory = category === 'All' || property.category === category;
      const matchesListingType = listingType === 'All' || property.listingType === listingType;
      const matchesBedrooms = bedrooms === 'Any' || property.beds >= Number(bedrooms);
      const matchesPrice = property.price <= maxPrice;

      return matchesKeyword && matchesCity && matchesCategory && matchesListingType && matchesBedrooms && matchesPrice;
    });
  }, [keyword, city, category, listingType, bedrooms, maxPrice]);

  const resetFilters = () => {
    setKeyword('');
    setCity('Any');
    setCategory('All');
    setListingType('All');
    setBedrooms('Any');
    setMaxPrice(15000000);
  };

  return (
    <div className="container section-block page-intro-stack">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Listing search</span>
          <h1>Explore exceptional homes and investment opportunities.</h1>
        </div>
      </div>

      <div className="filter-shell">
        <div className="filter-row-top">
          <div className="grouping">
            <Search size={18} />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search by name or keyword" />
          </div>
          <div className="view-toggle">
            <button type="button" className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
              Grid
            </button>
            <button type="button" className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
              List
            </button>
          </div>
        </div>

        <div className="filter-row">
          <label>
            City
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="Any">Any city</option>
              <option value="Dubai">Dubai</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
              <option value="Sydney">Sydney</option>
            </select>
          </label>

          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All categories</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Estate">Estate</option>
            </select>
          </label>

          <label>
            Status
            <select value={listingType} onChange={(e) => setListingType(e.target.value)}>
              <option value="All">All</option>
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
              <option value="lease">Lease</option>
            </select>
          </label>

          <label>
            Bedrooms
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
              <option value="Any">Any</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </label>

          <label>
            Max price
            <input type="range" min="500000" max="15000000" step="250000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <span className="range-value">{formatCurrency(maxPrice)}</span>
          </label>

          <button type="button" className="button button-ghost" onClick={resetFilters}>
            <SlidersHorizontal size={16} />
            Clear all
          </button>
        </div>
      </div>

      <div className="results-meta">
        <span>{filteredProperties.length} results</span>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="empty-state">
          <h3>No homes match your filters.</h3>
          <p>Try broadening your price, city, or bedroom criteria.</p>
        </div>
      ) : null}

      {filteredProperties.length > 0 ? (
        <>
          <div className={viewMode === 'grid' ? 'card-grid property-grid' : 'card-grid property-grid list-mode'}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} compact={viewMode === 'list'} />
            ))}
          </div>

          <MapPreview properties={filteredProperties.slice(0, 6)} />
        </>
      ) : null}
    </div>
  );
}

function PropertyDetailPage() {
  const { slug } = useParams();
  const { savedIds, comparisonIds, toggleSaved, toggleComparison } = usePropertyState();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    return <NotFoundPage />;
  }

  const similarProperties = properties.filter((item) => item.category === property.category && item.id !== property.id).slice(0, 3);

  const handleShare = async () => {
    const url = `${window.location.origin}/properties/${property.slug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container section-block property-detail">
      <div className="property-hero">
        <img src={property.gallery[0]} alt={property.title} />
        <div className="property-hero-meta">
          <span className={getStatusTone(property.status)}>{property.status}</span>
          <h1>{property.title}</h1>
          <div className="location-line">
            <MapPin size={16} />
            <span>
              {property.location}, {property.city}
            </span>
          </div>
          <div className="property-price-row">
            <strong>{formatCurrency(property.price)}</strong>
            <span>{property.category}</span>
          </div>
        </div>
      </div>

      <div className="gallery-strip">
        {property.gallery.map((image) => (
          <img key={image} src={image} alt={property.title} />
        ))}
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-summary-card">
            <div className="pills-row">
              <span><BedDouble size={16} />{property.beds} beds</span>
              <span><Bath size={16} />{property.baths} baths</span>
              <span><Landmark size={16} />{property.area.toLocaleString()} sq ft</span>
            </div>
            <p>{property.description}</p>
          </div>

          <div className="data-panel">
            <h3>Home overview</h3>
            <ul>
              {property.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="data-panel">
            <h3>Amenities</h3>
            <div className="chip-list">
              {property.amenities.map((amenity) => (
                <span key={amenity}>{amenity}</span>
              ))}
            </div>
          </div>

          <div className="data-panel map-panel">
            <h3>Location</h3>
            <MapPreview properties={[property]} compact />
          </div>
        </div>

        <aside className="detail-aside">
          <div className="stage-card">
            <div className="aside-actions">
              <button type="button" className="button button-ghost" onClick={() => toggleSaved(property.id)}>
                <Heart size={16} fill={savedIds.includes(property.id) ? 'currentColor' : 'none'} />
                {savedIds.includes(property.id) ? 'Saved' : 'Save'}
              </button>
              <button type="button" className="button button-ghost" onClick={() => toggleComparison(property.id)}>
                <ChartColumn size={16} />
                {comparisonIds.includes(property.id) ? 'Added' : 'Add to compare'}
              </button>
            </div>
            <button type="button" className="button button-primary full-width" onClick={handleShare}>
              {copied ? 'Copied link' : 'Share property'}
            </button>

            <div className="agent-card-mini">
              <img src={agents.find((agent) => agent.id === property.agentId)?.image ?? agents[0].image} alt="Agent" />
              <div>
                <strong>{agents.find((agent) => agent.id === property.agentId)?.name ?? 'Atlas Team'}</strong>
                <span>{agents.find((agent) => agent.id === property.agentId)?.title ?? 'Advisory team'}</span>
              </div>
            </div>

            <form className="form-card" onSubmit={handleSubmit}>
              <h3>Request a private viewing</h3>
              <input type="text" placeholder="Full name" required />
              <input type="email" placeholder="Email address" required />
              <input type="tel" placeholder="Phone" required />
              <textarea rows={4} placeholder="Tell us when you would like to view" required />
              <button type="submit" className="button button-primary full-width">
                Submit enquiry
              </button>
              {submitted ? <p className="success-text">Demo enquiry recorded. Connect backend for live delivery.</p> : null}
            </form>
          </div>
        </aside>
      </div>

      <div className="section-block no-padding-top">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Similar homes</span>
            <h2>Continue exploring nearby opportunities.</h2>
          </div>
        </div>
        <div className="card-grid property-grid three-up">
          {similarProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentsPage() {
  return (
    <div className="container section-block">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Advisory team</span>
          <h1>Private advisors for complex transactions and lifestyle-led buying.</h1>
        </div>
      </div>

      <div className="card-grid agent-grid">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

function AgentDetailPage() {
  const { slug } = useParams();
  const agent = agents.find((item) => item.slug === slug);

  if (!agent) {
    return <NotFoundPage />;
  }

  const agentProperties = properties.filter((property) => property.agentId === agent.id);

  return (
    <div className="container section-block agent-detail">
      <div className="agent-profile">
        <img src={agent.image} alt={agent.name} />
        <div className="agent-profile-copy">
          <span className="eyebrow">Sample profile</span>
          <h1>{agent.name}</h1>
          <strong>{agent.title}</strong>
          <p>{agent.bio}</p>
          <div className="chip-list">
            {agent.specialty.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="agent-contact-row">
            <span>{agent.location}</span>
            <span>{agent.languages.join(' · ')}</span>
          </div>
          <div className="agent-contact-row">
            <a href={`mailto:${agent.email}`}>{agent.email}</a>
            <a href={`tel:${agent.phone}`}>{agent.phone}</a>
          </div>
        </div>
      </div>

      <div className="section-block no-padding-top">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2>{agent.name}&rsquo;s active listings</h2>
          </div>
        </div>
        <div className="card-grid property-grid three-up">
          {agentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ComparePage() {
  const { comparisonIds } = usePropertyState();
  const compareProperties = properties.filter((property) => comparisonIds.includes(property.id));

  if (compareProperties.length === 0) {
    return (
      <div className="container section-block">
        <div className="empty-state">
          <h3>No properties selected for comparison.</h3>
          <p>Add up to three homes to compare price, location, and amenities.</p>
          <Link className="button button-primary" to="/properties">
            Browse listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-block compare-page">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Side-by-side review</span>
          <h1>Compare selected properties.</h1>
        </div>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Property</th>
              {compareProperties.map((property) => (
                <th key={property.id}>{property.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{formatCurrency(property.price)}</td>
              ))}
            </tr>
            <tr>
              <td>Location</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{property.location}</td>
              ))}
            </tr>
            <tr>
              <td>Area</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{property.area.toLocaleString()} sq ft</td>
              ))}
            </tr>
            <tr>
              <td>Bedrooms</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{property.beds}</td>
              ))}
            </tr>
            <tr>
              <td>Bathrooms</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{property.baths}</td>
              ))}
            </tr>
            <tr>
              <td>Amenities</td>
              {compareProperties.map((property) => (
                <td key={property.id}>{property.amenities.slice(0, 3).join(', ')}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SavedPage() {
  const { savedIds } = usePropertyState();
  const savedProperties = properties.filter((property) => savedIds.includes(property.id));

  if (savedProperties.length === 0) {
    return (
      <div className="container section-block">
        <div className="empty-state">
          <h3>Your shortlist is empty.</h3>
          <p>Save a few properties to revisit them later.</p>
          <Link className="button button-primary" to="/properties">
            Discover homes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-block">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Saved homes</span>
          <h1>Your curated short list.</h1>
        </div>
      </div>
      <div className="card-grid property-grid">
        {savedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

function NeighborhoodPage() {
  const { slug } = useParams();
  const neighborhood = neighborhoods.find((item) => item.slug === slug);

  if (!neighborhood) {
    return <NotFoundPage />;
  }

  const neighborhoodProperties = properties.filter((property) => property.neighborhood === neighborhood.name);

  return (
    <div className="container section-block neighborhood-page">
      <div className="location-hero">
        <img src={neighborhood.image} alt={neighborhood.name} />
        <div className="location-hero-copy">
          <span className="eyebrow">Location spotlight</span>
          <h1>{neighborhood.name}</h1>
          <p>{neighborhood.blurb}</p>
          <div className="meta-row">
            <span>{neighborhood.vibe}</span>
            <span>{neighborhood.averagePrice}</span>
          </div>
        </div>
      </div>

      <div className="section-block no-padding-top">
        <div className="section-heading">
          <div>
            <span className="eyebrow">What makes it special</span>
            <h2>Local atmosphere and standout property opportunities.</h2>
          </div>
        </div>

        <div className="card-grid property-grid three-up">
          {neighborhoodProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ValuationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container section-block valuation-page">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Property valuation</span>
          <h1>Request an illustrative property estimate.</h1>
        </div>
      </div>

      <div className="valuation-layout">
        <div className="valuation-copy">
          <h3>How this works</h3>
          <p>We can help you understand likely market positioning, but any automated estimate is illustrative only unless a verified methodology and reliable data source are connected.</p>
          <ul>
            <li>Location and comparable sales context</li>
            <li>Property type and size assessment</li>
            <li>Condition and finishing quality</li>
            <li>Timing and upcoming market dynamics</li>
          </ul>
        </div>

        <form className="form-card valuation-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Property location" required />
          <select defaultValue="Apartment">
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Estate">Estate</option>
          </select>
          <input type="number" placeholder="Approximate size (sq ft)" required />
          <input type="number" placeholder="Bedrooms" required />
          <select defaultValue="Well maintained">
            <option value="Well maintained">Well maintained</option>
            <option value="Excellent">Excellent</option>
            <option value="Luxury finish">Luxury finish</option>
            <option value="Renovation required">Renovation required</option>
          </select>
          <input type="email" placeholder="Contact email" required />
          <textarea rows={4} placeholder="Additional details" />
          <button type="submit" className="button button-primary full-width">Request valuation</button>
          {submitted ? <p className="success-text">Demo request received. Connect backend and verified data source to enable live valuation delivery.</p> : null}
        </form>
      </div>
    </div>
  );
}

function BlogPage() {
  return (
    <div className="container section-block">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Editorial library</span>
          <h1>Guidance for buyers, investors, and modern property professionals.</h1>
        </div>
      </div>

      <div className="card-grid article-grid">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="container section-block blog-post">
      <div className="article-header">
        <span className="eyebrow">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="article-meta">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <img className="article-hero" src={post.image} alt={post.title} />

      <div className="article-body">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container section-block contact-page">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Contact us</span>
          <h1>Start a conversation with our advisory team.</h1>
        </div>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-card">
            <Mail size={18} />
            <h3>General enquiries</h3>
            <p>hello@atlasestate.com</p>
          </div>
          <div className="info-card">
            <Users size={18} />
            <h3>Partnerships</h3>
            <p>agency@atlasestate.com</p>
          </div>
          <div className="info-card">
            <ShieldCheck size={18} />
            <h3>Privacy</h3>
            <p>We protect client data and never claim a secure delivery unless configured.</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" required />
          <input type="email" placeholder="Email address" required />
          <input type="tel" placeholder="Phone number" />
          <select defaultValue="General enquiry">
            <option value="General enquiry">General enquiry</option>
            <option value="Property enquiry">Property enquiry</option>
            <option value="Viewing request">Viewing request</option>
            <option value="Business partnership">Business partnership</option>
          </select>
          <textarea rows={5} placeholder="Tell us what you are looking for" required />
          <button type="submit" className="button button-primary full-width">Send enquiry</button>
          {submitted ? <p className="success-text">Demo enquiry queued. Live delivery requires a configured backend.</p> : null}
        </form>
      </div>
    </div>
  );
}

function DashboardPage() {
  const metrics = [
    { label: 'Properties tracked', value: '86' },
    { label: 'New enquiries', value: '19' },
    { label: 'Avg. response time', value: '2.4h' },
    { label: 'Portfolio ROI', value: '14.6%' },
  ];

  return (
    <div className="container section-block dashboard-page">
      <div className="section-heading page-heading">
        <div>
          <span className="eyebrow">Demo dashboard</span>
          <h1>Business overview for a luxury property operation.</h1>
        </div>
      </div>

      <div className="dashboard-metrics">
        {metrics.map((item) => (
          <div key={item.label} className="metric-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h3>Recent enquiries</h3>
          <ul>
            <li>New private viewing request • Marina penthouse</li>
            <li>Investor valuation request • London townhouse</li>
            <li>Partnership enquiry • Boutique agency</li>
          </ul>
        </div>

        <div className="dashboard-panel">
          <h3>Portfolio mix</h3>
          <ul>
            <li>54% residential</li>
            <li>21% commercial</li>
            <li>13% rentals</li>
            <li>12% investment sites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container section-block">
      <div className="empty-state">
        <h3>Page not found.</h3>
        <p>The page you requested does not exist in this demo experience.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </div>
    </div>
  );
}

function PropertyCard({ property, compact = false }: { property: (typeof properties)[number]; compact?: boolean }) {
  const { savedIds, comparisonIds, toggleSaved, toggleComparison } = usePropertyState();

  return (
    <motion.article whileHover={{ y: -6 }} className={`property-card ${compact ? 'compact' : ''}`}>
      <div className="property-image-wrap">
        <img src={property.image} alt={property.title} />
        <span className={getStatusTone(property.status)}>{property.status}</span>
        <button type="button" className="icon-button" onClick={() => toggleSaved(property.id)} aria-label="Toggle save property">
          <Heart size={16} fill={savedIds.includes(property.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="property-body">
        <div className="meta-row property-meta">
          <span>{property.category}</span>
          <span>{property.city}</span>
        </div>
        <Link to={`/properties/${property.slug}`} className="property-link">
          <h3>{property.title}</h3>
        </Link>
        <div className="location-line small">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <div className="spec-row">
          <span><BedDouble size={15} />{property.beds}</span>
          <span><Bath size={15} />{property.baths}</span>
          <span><Landmark size={15} />{property.area.toLocaleString()}</span>
        </div>

        <div className="property-footer">
          <strong>{formatCurrency(property.price)}</strong>
          <button type="button" className="button button-ghost small-button" onClick={() => toggleComparison(property.id)}>
            {comparisonIds.includes(property.id) ? 'Compared' : 'Compare'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function AgentCard({ agent }: { agent: (typeof agents)[number] }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="agent-card">
      <img src={agent.image} alt={agent.name} />
      <div className="agent-card-body">
        <div className="meta-row">
          <span>{agent.title}</span>
        </div>
        <Link to={`/agents/${agent.slug}`} className="property-link">
          <h3>{agent.name}</h3>
        </Link>
        <p>{agent.bio}</p>
        <div className="chip-list">
          {agent.specialty.slice(0, 2).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <Link className="text-link" to={`/agents/${agent.slug}`}>
          View profile <ChevronRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <article className="article-card">
      <img src={post.image} alt={post.title} />
      <div className="article-card-body">
        <div className="meta-row">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="property-link">
          <h3>{post.title}</h3>
        </Link>
        <p>{post.summary}</p>
      </div>
    </article>
  );
}

function MapPreview({ properties: propertyList, compact = false }: { properties: typeof properties; compact?: boolean }) {
  const center = propertyList[0]?.coords ?? [25.2048, 55.2708];

  return (
    <div className={`map-shell ${compact ? 'compact-map' : ''}`}>
      <MapContainer center={center} zoom={compact ? 10 : 11} scrollWheelZoom={false} className="property-map">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap contributors &copy; CARTO" />
        {propertyList.map((property) => (
          <Marker key={property.id} position={property.coords} icon={mapMarker('#a77a4b')}>
            <Popup>
              <div className="map-popup">
                <strong>{property.title}</strong>
                <span>{property.location}</span>
                <Link to={`/properties/${property.slug}`}>View detail</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
