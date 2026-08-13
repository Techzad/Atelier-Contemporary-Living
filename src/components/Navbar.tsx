import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface NavbarProps {
  products: Product[];
  onSelectCategory: (category: 'all' | 'living-room' | 'bedroom' | 'kitchen') => void;
  onOpenProductDetail: (product: Product) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onScrollToSection: (sectionId: string) => void;
  currentCategory: string;
}

export default function Navbar({
  products,
  onSelectCategory,
  onOpenProductDetail,
  cartCount,
  onOpenCart,
  wishlist,
  onToggleWishlist,
  onScrollToSection,
  currentCategory
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, products]);

  const handleCategoryClick = (cat: 'all' | 'living-room' | 'bedroom' | 'kitchen') => {
    onSelectCategory(cat);
    onScrollToSection('product-catalog');
    setIsMobileMenuOpen(false);
  };

  const handleSearchSelect = (product: Product) => {
    onOpenProductDetail(product);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div id="top-banner" className="bg-dark-main text-[#EFEBE4] text-xs py-2 px-4 text-center tracking-wider font-light flex justify-between items-center md:px-8 border-b border-stone-800">
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-accent-gold" /> +44 (0) 20 7456 9012</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent-gold" /> Shoreditch Showroom, London</span>
        </div>
        <div className="mx-auto md:mx-0 font-medium">
          Complimentary White Glove Delivery on Orders Over $1,500
        </div>
        <div className="hidden md:block text-[11px] hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onScrollToSection('showroom-section')}>
          Book a Showroom Visit <span className="ml-1">→</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-stone-900 py-3 shadow-lg text-white'
            : 'bg-black backdrop-blur-md border-b border-stone-900/50 py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 text-white hover:text-accent-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Nav Categories - Desktop Left */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs lg:text-[13px] font-extrabold uppercase tracking-widest text-white">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`hover:text-accent-gold transition-colors py-1.5 relative group font-black ${
                currentCategory === 'all' ? 'text-accent-gold' : 'text-white'
              }`}
            >
              <span>Shop All</span>
              {currentCategory === 'all' ? (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </button>
            <button
              onClick={() => handleCategoryClick('living-room')}
              className={`hover:text-accent-gold transition-colors py-1.5 relative group font-black ${
                currentCategory === 'living-room' ? 'text-accent-gold' : 'text-white'
              }`}
            >
              <span>Living Room</span>
              {currentCategory === 'living-room' ? (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </button>
            <button
              onClick={() => handleCategoryClick('bedroom')}
              className={`hover:text-accent-gold transition-colors py-1.5 relative group font-black ${
                currentCategory === 'bedroom' ? 'text-accent-gold' : 'text-white'
              }`}
            >
              <span>Bedroom</span>
              {currentCategory === 'bedroom' ? (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </button>
            <button
              onClick={() => handleCategoryClick('kitchen')}
              className={`hover:text-accent-gold transition-colors py-1.5 relative group font-black ${
                currentCategory === 'kitchen' ? 'text-accent-gold' : 'text-white'
              }`}
            >
              <span>Kitchen</span>
              {currentCategory === 'kitchen' ? (
                <motion.span layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </button>
            <button
              onClick={() => onScrollToSection('inspiration-section')}
              className="text-stone-300 hover:text-accent-gold transition-colors py-1.5 relative group font-black"
            >
              <span>Inspiration</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
            <button
              onClick={() => onScrollToSection('custom-furniture-section')}
              className="text-stone-300 hover:text-accent-gold transition-colors py-1.5 relative group font-black"
            >
              <span>Custom</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </nav>

          {/* Logo Center */}
          <div
            id="logo-container"
            onClick={() => onScrollToSection('hero-section')}
            className="flex flex-col items-center cursor-pointer text-center select-none group"
          >
            <span className="text-2xl md:text-3xl font-black tracking-[-0.04em] text-white transition-transform group-hover:scale-102">
              ATELIER.
            </span>
            <span className="text-[8px] uppercase tracking-[0.45em] text-accent-gold font-extrabold mt-0.5 leading-none transition-colors group-hover:text-white">
              contemporary living
            </span>
          </div>

          {/* Action Icons Right */}
          <div id="navbar-actions" className="flex items-center space-x-3 md:space-x-5">
            {/* Search Toggle */}
            <button
              id="search-toggle-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-white hover:text-accent-gold transition-colors relative"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>

            {/* Wishlist Trigger */}
            <div className="relative">
              <button
                id="wishlist-trigger-btn"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="p-1.5 text-white hover:text-accent-gold transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 md:w-[22px] md:h-[22px] ${wishlist.length > 0 ? 'fill-accent-gold text-accent-gold' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent-gold text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Wishlist Quick Dropdown */}
              <AnimatePresence>
                {isWishlistOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsWishlistOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-neutral-950 border border-neutral-800 shadow-xl rounded-2xl p-4.5 z-20 text-white"
                    >
                      <h4 className="text-xs font-semibold tracking-wider text-white uppercase border-b border-neutral-800 pb-2 mb-3">
                        My Wishlist ({wishlist.length})
                      </h4>
                      {wishlist.length === 0 ? (
                        <p className="text-xs text-stone-400 py-4 text-center">Your wishlist is currently empty.</p>
                      ) : (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {products
                            .filter(p => wishlist.includes(p.id))
                            .map(p => (
                              <div key={p.id} className="flex items-center justify-between gap-2 text-xs border-b border-neutral-800 pb-2">
                                <div
                                  className="flex items-center gap-2.5 cursor-pointer flex-1"
                                  onClick={() => {
                                    onOpenProductDetail(p);
                                    setIsWishlistOpen(false);
                                  }}
                                >
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    referrerPolicy="no-referrer"
                                    className="w-10 h-10 object-cover bg-stone-900 rounded-lg"
                                  />
                                  <div className="truncate">
                                    <p className="font-medium text-white truncate w-36">{p.name}</p>
                                    <p className="text-accent-gold font-light">£{p.price.toLocaleString()}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => onToggleWishlist(p.id)}
                                  className="text-stone-500 hover:text-red-500 transition-colors p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                        </div>
                      )}
                      <div className="mt-3 text-center border-t border-neutral-800 pt-3">
                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onScrollToSection('product-catalog');
                          }}
                          className="text-[11px] font-medium text-accent-gold hover:underline"
                        >
                          Continue shopping
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="p-1.5 text-white hover:text-accent-gold transition-colors relative"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent-gold text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-0 left-0 right-0 bg-white border-b border-border-warm z-50 shadow-xl overflow-hidden"
          >
            <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
              <div className="flex items-center justify-between border-b border-text-main pb-2">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search by furniture name, category, or material (e.g. Sofa, Walnut)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-base md:text-lg focus:outline-none placeholder-text-secondary/70 text-text-main"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1.5 hover:text-accent-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live Search Results */}
              <div className="mt-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                {searchQuery.trim() === '' ? (
                  <div>
                    <h5 className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-3">Popular Searches</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Sofa', 'Platform Bed', 'Dining Table', 'Travertine', 'Saddle Leather', 'Walnut'].map(term => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="bg-bg-warm hover:bg-surface-secondary text-text-main text-xs px-3.5 py-1.5 transition-colors duration-200"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-sm text-text-secondary">No products match "{searchQuery}"</p>
                    <p className="text-xs text-stone-400 mt-1">Try refining your terms or looking for "sofa", "bed", or "table".</p>
                  </div>
                ) : (
                  <div>
                    <h5 className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-4">
                      Matching Products ({searchResults.length})
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {searchResults.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSearchSelect(p)}
                          className="flex items-center gap-3 p-2 hover:bg-bg-warm transition-colors cursor-pointer group"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover bg-stone-100 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-xs text-text-main truncate group-hover:text-accent-gold transition-colors">{p.name}</p>
                            <p className="text-[10px] text-text-secondary">{p.categoryLabel} • {p.subCategory}</p>
                            <p className="text-xs font-semibold text-text-main mt-0.5">£{p.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Menu Body */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-bg-warm z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <span className="font-display text-base font-semibold tracking-[0.25em] text-text-main">
                      ATELIER
                    </span>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-accent-gold leading-none mt-0.5">contemporary living</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:text-accent-gold transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-semibold mb-3">Shop Categories</h3>
                    <div className="space-y-4 text-base font-medium">
                      <button
                        onClick={() => handleCategoryClick('all')}
                        className="flex items-center justify-between w-full text-left py-1 text-text-main hover:text-accent-gold transition-colors"
                      >
                        Shop All <ChevronRightIcon />
                      </button>
                      <button
                        onClick={() => handleCategoryClick('living-room')}
                        className="flex items-center justify-between w-full text-left py-1 text-text-main hover:text-accent-gold transition-colors"
                      >
                        Living Room <ChevronRightIcon />
                      </button>
                      <button
                        onClick={() => handleCategoryClick('bedroom')}
                        className="flex items-center justify-between w-full text-left py-1 text-text-main hover:text-accent-gold transition-colors"
                      >
                        Bedroom <ChevronRightIcon />
                      </button>
                      <button
                        onClick={() => handleCategoryClick('kitchen')}
                        className="flex items-center justify-between w-full text-left py-1 text-text-main hover:text-accent-gold transition-colors"
                      >
                        Kitchen & Dining <ChevronRightIcon />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border-warm pt-6">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-semibold mb-3">Experiences</h3>
                    <div className="space-y-3.5 text-sm font-medium text-text-main">
                      <button
                        onClick={() => {
                          onScrollToSection('inspiration-section');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-left w-full hover:text-accent-gold"
                      >
                        Interior Inspiration
                      </button>
                      <button
                        onClick={() => {
                          onScrollToSection('custom-furniture-section');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-left w-full hover:text-accent-gold"
                      >
                        Custom Furnishing
                      </button>
                      <button
                        onClick={() => {
                          onScrollToSection('materials-section');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-left w-full hover:text-accent-gold"
                      >
                        Our Craft & Materials
                      </button>
                      <button
                        onClick={() => {
                          onScrollToSection('showroom-section');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block text-left w-full hover:text-accent-gold"
                      >
                        Visit the Showroom
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showroom Contacts Bottom */}
              <div className="border-t border-border-warm pt-6 mt-6">
                <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-2">Visit Us</p>
                <p className="text-xs text-text-main leading-relaxed mb-1">
                  84 Great Eastern Street, Shoreditch
                </p>
                <p className="text-[11px] text-text-secondary mb-4">London, EC2A 3JL</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/442074569012"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-dark-main text-[#F7F5F0] text-center text-xs py-2 px-3 tracking-wider hover:bg-accent-gold transition-colors duration-200"
                  >
                    WhatsApp Chat
                  </a>
                  <a
                    href="tel:+442074569012"
                    className="bg-white border border-border-warm p-2 text-text-main hover:border-accent-gold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronRightIcon() {
  return <ArrowRight className="w-4 h-4 text-stone-400" />;
}
