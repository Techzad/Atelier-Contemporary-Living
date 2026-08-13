import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, SlidersHorizontal, ArrowUpDown, X, Check, ShoppingBag } from 'lucide-react';
import { Product, FilterState } from '../types';

interface ProductSectionProps {
  products: Product[];
  currentCategory: 'all' | 'living-room' | 'bedroom' | 'kitchen';
  onSelectCategory: (category: 'all' | 'living-room' | 'bedroom' | 'kitchen') => void;
  onOpenProductDetail: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, quantity: number, color: string) => void;
}

export default function ProductSection({
  products,
  currentCategory,
  onSelectCategory,
  onOpenProductDetail,
  wishlist,
  onToggleWishlist,
  onAddToCart
}: ProductSectionProps) {
  // Mobile filter drawer toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Local state for product active color index for cards
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({}); // id -> hex value

  // Detailed Filter States
  const [filters, setFilters] = useState<FilterState>({
    category: currentCategory,
    priceRange: [0, 4000],
    material: 'all',
    color: 'all',
    availability: 'all',
    sortBy: 'featured'
  });

  // Keep filters.category in sync when parent triggers category changes (e.g. from nav clicks)
  useMemo(() => {
    setFilters(f => ({ ...f, category: currentCategory }));
  }, [currentCategory]);

  const materialsList = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => p.materials.forEach(m => {
      if (m.toLowerCase().includes('oak')) list.add('Oak');
      if (m.toLowerCase().includes('walnut')) list.add('Walnut');
      if (m.toLowerCase().includes('travertine') || m.toLowerCase().includes('stone')) list.add('Stone');
      if (m.toLowerCase().includes('leather')) list.add('Leather');
      if (m.toLowerCase().includes('linen') || p.name.includes('Linen')) list.add('Linen');
      if (m.toLowerCase().includes('bouclé')) list.add('Bouclé');
      if (m.toLowerCase().includes('wool') || p.name.includes('Wool')) list.add('Wool');
    }));
    return Array.from(list);
  }, [products]);

  const colorsList = useMemo(() => {
    const map: Record<string, string> = {};
    products.forEach(p => p.colors.forEach(c => {
      map[c.name] = c.hex;
    }));
    return Object.entries(map);
  }, [products]);

  // Handle setting filters
  const setFilterField = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      // if updating category, notify parent to keep navbar highlighted
      if (key === 'category') {
        onSelectCategory(value as any);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 4000],
      material: 'all',
      color: 'all',
      availability: 'all',
      sortBy: 'featured'
    });
    onSelectCategory('all');
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Price Filter
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Material Filter
    if (filters.material !== 'all') {
      const matLower = filters.material.toLowerCase();
      result = result.filter(p => p.materials.some(m => m.toLowerCase().includes(matLower)) || p.name.toLowerCase().includes(matLower));
    }

    // Color Filter
    if (filters.color !== 'all') {
      result = result.filter(p => p.colors.some(c => c.name === filters.color));
    }

    // Availability Filter
    if (filters.availability === 'in-stock') {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'best-selling') {
      result.sort((a, b) => b.reviewCount - a.reviewCount); // Proxy for bestseller
    } else if (filters.sortBy === 'newest') {
      // Proxy: newest is reverse order of data
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Featured: prioritizes p.featured === true
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, filters]);

  return (
    <section id="product-catalog" className="py-20 bg-bg-warm border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
            The Living Collection
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[64px] font-extrabold tracking-tighter text-text-main leading-tight md:leading-[0.95] font-sans">
            Made for your space.
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Beautiful proportions, durable natural textures, and elegant finishes crafted to make daily living a serene experience.
          </p>
        </div>

        {/* Toolbar Bar */}
        <div className="bg-white border border-border-warm py-4.5 px-6 mb-8 flex flex-wrap items-center justify-between gap-4 select-none rounded-[24px]">
          {/* Active Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All Furniture' },
              { id: 'living-room', label: 'Living Room' },
              { id: 'bedroom', label: 'Bedroom' },
              { id: 'kitchen', label: 'Kitchen & Dining' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterField('category', cat.id as any)}
                className={`text-[11px] font-medium uppercase tracking-wider px-4 py-2 transition-all duration-200 cursor-pointer rounded-full ${
                  filters.category === cat.id
                    ? 'bg-dark-main text-[#F7F5F0]'
                    : 'bg-transparent text-text-secondary hover:text-text-main'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Desktop Filters Info label */}
            <span className="text-xs text-text-secondary font-light hidden lg:inline">
              Showing {filteredProducts.length} premium pieces
            </span>

            {/* Filter Toggle (Collapsible panel on desktop / Drawer on mobile) */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-bg-warm hover:bg-surface-secondary border border-border-warm px-4 py-2 text-xs font-semibold text-text-main uppercase tracking-wider transition-colors cursor-pointer rounded-full"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Quick Sort Selector */}
            <div className="flex items-center gap-2 border border-border-warm bg-white px-3.5 py-2 text-xs rounded-full">
              <ArrowUpDown className="w-3.5 h-3.5 text-text-secondary" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilterField('sortBy', e.target.value as any)}
                className="bg-transparent text-text-main focus:outline-none font-semibold text-xs uppercase tracking-wider pr-2 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="best-selling">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Main Layout (Filter sidebar + main grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filter Sidebar - Visible on Desktop */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-border-warm p-6 sticky top-28 rounded-[24px]">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm/60 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-main">Filter Collection</h3>
              <button onClick={resetFilters} className="text-[10px] text-accent-gold hover:underline font-medium">
                Reset All
              </button>
            </div>

            {/* Price Slider */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Price Budget</h4>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                <span>£{filters.priceRange[0]}</span>
                <span className="font-semibold text-text-main">£{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="4000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilterField('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-accent-gold h-1 bg-stone-200 cursor-pointer mb-4"
              />
              
              {/* Preset Price Buckets */}
              <div className="space-y-1 pt-2 border-t border-border-warm/40">
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">Quick Presets</span>
                {[
                  { label: 'All Budgets', range: [0, 4000] as [number, number] },
                  { label: 'Under £1,000', range: [0, 1000] as [number, number] },
                  { label: 'Under £2,000', range: [0, 2000] as [number, number] },
                  { label: '£1,000 - £3,000', range: [1000, 3000] as [number, number] },
                  { label: 'Over £2,000', range: [2000, 4000] as [number, number] }
                ].map((bucket) => {
                  const isActive = filters.priceRange[0] === bucket.range[0] && filters.priceRange[1] === bucket.range[1];
                  return (
                    <button
                      key={bucket.label}
                      onClick={() => setFilterField('priceRange', bucket.range)}
                      className={`flex items-center justify-between text-xs w-full text-left py-1 px-2.5 transition-colors rounded-full ${
                        isActive 
                          ? 'bg-accent-gold/10 text-accent-gold font-semibold' 
                          : 'text-text-secondary hover:text-text-main hover:bg-stone-50'
                      }`}
                    >
                      <span>{bucket.label}</span>
                      {isActive && <Check className="w-3 h-3 text-accent-gold" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Materials Filter */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Material</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterField('material', 'all')}
                  className={`flex items-center gap-2 text-xs w-full text-left py-1 transition-colors ${
                    filters.material === 'all' ? 'text-accent-gold font-semibold' : 'text-text-secondary hover:text-text-main'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filters.material === 'all' ? 'bg-accent-gold' : 'bg-transparent'}`} />
                  All Materials
                </button>
                {materialsList.map(mat => (
                  <button
                    key={mat}
                    onClick={() => setFilterField('material', mat)}
                    className={`flex items-center gap-2 text-xs w-full text-left py-1 transition-colors ${
                      filters.material === mat ? 'text-accent-gold font-semibold' : 'text-text-secondary hover:text-text-main'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${filters.material === mat ? 'bg-accent-gold' : 'bg-transparent'}`} />
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Colour</h4>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setFilterField('color', 'all')}
                  className={`text-[10px] col-span-4 text-center py-1 bg-bg-warm border border-border-warm text-text-secondary hover:text-text-main rounded-full ${
                    filters.color === 'all' ? 'border-accent-gold text-accent-gold font-medium' : ''
                  }`}
                >
                  All Colours
                </button>
                {colorsList.map(([name, hex]) => (
                  <button
                    key={name}
                    onClick={() => setFilterField('color', name)}
                    className={`group relative h-7 flex items-center justify-center border transition-all rounded-full ${
                      filters.color === name ? 'border-accent-gold' : 'border-border-warm hover:border-text-secondary'
                    }`}
                    title={name}
                  >
                    <span className="w-5 h-5 block rounded-full" style={{ backgroundColor: hex }} />
                    {filters.color === name && (
                      <Check className="w-3 h-3 text-white absolute mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Availability</h4>
              <label className="flex items-center gap-2.5 text-xs text-text-secondary hover:text-text-main cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability === 'in-stock'}
                  onChange={(e) => setFilterField('availability', e.target.checked ? 'in-stock' : 'all')}
                  className="w-4 h-4 accent-accent-gold rounded-none border-border-warm cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Main Products Grid Column */}
          <div className="col-span-1 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-border-warm py-24 px-6 text-center rounded-[24px]">
                <p className="text-text-secondary text-sm font-light">
                  No pieces match your filter specifications.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent-gold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((p, idx) => {
                  const cardColor = selectedColors[p.id] || p.colors[0].name;
                  const activeColorObj = p.colors.find(c => c.name === cardColor) || p.colors[0];
                  const hasSecondaryImage = p.images.length > 1;

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                      className="group flex flex-col h-full bg-white border border-border-warm/60 hover:border-border-warm transition-all duration-300 relative rounded-[24px] overflow-hidden"
                      onMouseEnter={() => setHoveredCardId(p.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      {/* Wishlist Heart Top Right */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-xs border border-border-warm flex items-center justify-center text-text-secondary hover:text-red-500 transition-colors shadow-xs rounded-full"
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-accent-gold text-accent-gold' : ''}`} />
                      </button>

                      {/* Image Frame */}
                      <div
                        onClick={() => onOpenProductDetail(p)}
                        className="relative aspect-square w-full bg-stone-100 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                            hoveredCardId === p.id && hasSecondaryImage ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
                          }`}
                        />
                        {hasSecondaryImage && (
                          <img
                            src={p.images[1]}
                            alt={`${p.name} alternate angle`}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                              hoveredCardId === p.id ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
                            }`}
                          />
                        )}

                        {/* Out of stock label */}
                        {!p.inStock && (
                          <div className="absolute top-4 left-4 bg-dark-main text-[#F7F5F0] text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                            Sold Out
                          </div>
                        )}

                        {/* Quick View Button overlay */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <button className="bg-white text-text-main text-[10px] font-semibold uppercase tracking-widest py-2.5 px-4 shadow-md flex items-center gap-1.5 hover:bg-dark-main hover:text-white transition-colors duration-200 rounded-full">
                            <Eye className="w-3.5 h-3.5" />
                            Quick View
                          </button>
                        </div>
                      </div>

                      {/* Card Meta Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-text-secondary uppercase tracking-wider mb-1.5 font-medium">
                            <span>{p.categoryLabel}</span>
                            <span>{p.subCategory}</span>
                          </div>
                          
                          <h4
                            onClick={() => onOpenProductDetail(p)}
                            className="text-sm font-semibold text-text-main hover:text-accent-gold transition-colors cursor-pointer line-clamp-1 mb-1 font-sans"
                          >
                            {p.name}
                          </h4>

                          <p className="text-xs text-text-secondary font-light line-clamp-2 leading-relaxed mb-4">
                            {p.description}
                          </p>
                        </div>

                        <div>
                          {/* Color Swatch Selectors */}
                          <div className="flex items-center gap-1.5 mb-4">
                            {p.colors.map(color => (
                              <button
                                key={color.name}
                                onClick={() => setSelectedColors(prev => ({ ...prev, [p.id]: color.name }))}
                                className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                                  cardColor === color.name ? 'border-accent-gold scale-110' : 'border-stone-200 hover:border-stone-400'
                                }`}
                                title={color.name}
                              >
                                <span className="w-3.5 h-3.5 rounded-full block" style={{ backgroundColor: color.hex }} />
                              </button>
                            ))}
                            <span className="text-[10px] text-text-secondary font-light ml-auto truncate max-w-[120px]">
                              {activeColorObj.name}
                            </span>
                          </div>

                          {/* Price & Action Bottom */}
                          <div className="flex items-center justify-between pt-4 border-t border-border-warm/40 mt-1">
                            <span className="text-sm font-bold text-text-main">
                              £{p.price.toLocaleString()}
                            </span>
                            
                            {p.inStock ? (
                              <button
                                onClick={() => onAddToCart(p, 1, activeColorObj.name)}
                                className="text-[10px] font-bold text-accent-gold uppercase tracking-widest flex items-center gap-1.5 hover:text-text-main transition-colors py-1.5 px-3 bg-bg-warm border border-border-warm rounded-full cursor-pointer"
                                title="Add to cart"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            ) : (
                              <span className="text-[9px] text-text-secondary uppercase tracking-widest font-semibold">
                                Unavailable
                              </span>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slideover Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-border-warm mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-main">Filter Catalog</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 hover:text-accent-gold transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar">
                  {/* Category Filter */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Room</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'all', label: 'All Rooms' },
                        { id: 'living-room', label: 'Living' },
                        { id: 'bedroom', label: 'Bedroom' },
                        { id: 'kitchen', label: 'Kitchen' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setFilterField('category', cat.id as any)}
                          className={`text-xs py-2 text-center border font-medium ${
                            filters.category === cat.id
                              ? 'border-accent-gold bg-accent-gold/5 text-accent-gold'
                              : 'border-border-warm text-text-secondary'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price limit */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Price Budget</h4>
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                      <span>£{filters.priceRange[0]}</span>
                      <span className="font-semibold text-text-main">£{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilterField('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent-gold h-1 bg-stone-200 cursor-pointer mb-3"
                    />

                    {/* Quick presets for mobile */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-warm/40">
                      {[
                        { label: 'All Budgets', range: [0, 4000] as [number, number] },
                        { label: 'Under £1,000', range: [0, 1000] as [number, number] },
                        { label: 'Under £2,000', range: [0, 2000] as [number, number] },
                        { label: '£1,000 - £3,000', range: [1000, 3000] as [number, number] },
                        { label: 'Over £2,000', range: [2000, 4000] as [number, number] }
                      ].map((bucket) => {
                        const isActive = filters.priceRange[0] === bucket.range[0] && filters.priceRange[1] === bucket.range[1];
                        return (
                          <button
                            key={bucket.label}
                            onClick={() => setFilterField('priceRange', bucket.range)}
                            className={`flex items-center justify-between text-[11px] py-1.5 px-3 transition-colors rounded-full ${
                              isActive 
                                ? 'bg-accent-gold/10 text-accent-gold font-semibold border border-accent-gold/20' 
                                : 'text-text-secondary hover:text-text-main border border-border-warm'
                            }`}
                          >
                            <span>{bucket.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Material</h4>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setFilterField('material', 'all')}
                        className={`text-xs px-3 py-1.5 border ${
                          filters.material === 'all'
                            ? 'border-accent-gold text-accent-gold font-medium bg-accent-gold/5'
                            : 'border-border-warm text-text-secondary'
                        }`}
                      >
                        All Materials
                      </button>
                      {materialsList.map(mat => (
                        <button
                          key={mat}
                          onClick={() => setFilterField('material', mat)}
                          className={`text-xs px-3 py-1.5 border ${
                            filters.material === mat
                              ? 'border-accent-gold text-accent-gold font-medium bg-accent-gold/5'
                              : 'border-border-warm text-text-secondary'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatch Selectors */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Colour</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setFilterField('color', 'all')}
                        className={`text-[10px] col-span-4 text-center py-1.5 bg-bg-warm border border-border-warm text-text-secondary ${
                          filters.color === 'all' ? 'border-accent-gold text-accent-gold font-medium' : ''
                        }`}
                      >
                        All Colours
                      </button>
                      {colorsList.map(([name, hex]) => (
                        <button
                          key={name}
                          onClick={() => setFilterField('color', name)}
                          className={`group h-8 flex items-center justify-center border transition-all ${
                            filters.color === name ? 'border-accent-gold bg-accent-gold/5' : 'border-border-warm'
                          }`}
                          title={name}
                        >
                          <span className="w-5 h-5 block" style={{ backgroundColor: hex }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">Availability</h4>
                    <label className="flex items-center gap-2.5 text-xs text-text-secondary cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.availability === 'in-stock'}
                        onChange={(e) => setFilterField('availability', e.target.checked ? 'in-stock' : 'all')}
                        className="w-4 h-4 accent-accent-gold rounded-none border-border-warm cursor-pointer"
                      />
                      <span>In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* View Results Button bottom */}
              <div className="border-t border-border-warm pt-4">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-dark-main text-[#F7F5F0] text-center text-xs py-4 uppercase font-semibold tracking-widest hover:bg-accent-gold transition-colors"
                >
                  Show {filteredProducts.length} Results
                </button>
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full text-center text-xs text-text-secondary hover:text-text-main py-2.5 mt-2"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
