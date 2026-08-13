import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, ShoppingBag, Truck, Calendar, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: string) => void;
  onBuyNow: (product: Product, color: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onNavigateToProduct: (product: Product) => void;
}

type TabType = 'details' | 'specs' | 'care' | 'delivery';

export default function ProductDetail({
  product,
  allProducts,
  onClose,
  onAddToCart,
  onBuyNow,
  wishlist,
  onToggleWishlist,
  onNavigateToProduct
}: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Synchronize color selection when product changes
  useMemo(() => {
    setSelectedColor(product.colors[0].name);
    setActiveImageIndex(0);
    setQuantity(1);
  }, [product]);

  const activeColorObj = product.colors.find(c => c.name === selectedColor) || product.colors[0];

  // Related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [allProducts, product]);

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedColor);
    setShowAddSuccess(true);
    setTimeout(() => {
      setShowAddSuccess(false);
    }, 3000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-scrollbar">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Main Container */}
      <div className="flex min-h-screen items-center justify-center p-0 md:p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="relative bg-bg-warm w-full max-w-5xl shadow-2xl overflow-hidden border border-border-warm rounded-[32px]"
        >
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-25 bg-white border border-border-warm text-text-main hover:text-accent-gold transition-colors p-2 rounded-full shadow-xs cursor-pointer"
            aria-label="Close Product View"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:divide-x md:divide-border-warm bg-white">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                {/* Large Preview */}
                <div className="aspect-square w-full bg-bg-warm overflow-hidden border border-border-warm/40 relative rounded-[24px]">
                  <img
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} angle ${activeImageIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-dark-main text-[#F7F5F0] text-[9px] uppercase tracking-widest font-bold px-2.5 py-1">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Thumbnail selector */}
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-18 h-18 border transition-all overflow-hidden cursor-pointer bg-bg-warm rounded-xl ${
                        activeImageIndex === idx ? 'border-accent-gold scale-102 ring-1 ring-accent-gold/40' : 'border-border-warm/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-border-warm/40 text-center text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-accent-gold" />
                  <span>Free Setup</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-accent-gold" />
                  <span>10-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Calendar className="w-4 h-4 text-accent-gold" />
                  <span>Eco Materials</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information & Actions */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between bg-white">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
                  <span>{product.categoryLabel}</span>
                  <span>•</span>
                  <span>{product.subCategory}</span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-semibold text-text-main font-sans tracking-tight mb-2 leading-tight">
                  {product.name}
                </h1>

                {/* Price and Ratings */}
                <div className="flex items-center justify-between border-b border-border-warm/50 pb-5 mb-5">
                  <span className="text-xl lg:text-2xl font-bold text-text-main">
                    £{product.price.toLocaleString()}
                  </span>
                  
                  {/* Rating block */}
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-accent-gold text-accent-gold' : 'text-stone-300'}`} />
                      ))}
                    </div>
                    <span className="font-semibold text-text-main">{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color swatch picker */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2 text-xs uppercase tracking-wider text-text-main font-semibold">
                    <span>Finish/Color</span>
                    <span className="text-text-secondary font-light">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === col.name ? 'border-accent-gold scale-110' : 'border-stone-200 hover:border-stone-400'
                        }`}
                        title={col.name}
                      >
                        <span className="w-5 h-5 rounded-full block" style={{ backgroundColor: col.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specs Selector (Dimensions, Material summary) */}
                <div className="grid grid-cols-2 gap-4 bg-bg-warm/60 border border-border-warm/40 p-3.5 mb-8 rounded-2xl">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Dimensions</span>
                    <span className="text-[11px] font-semibold text-text-main">{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Primary Material</span>
                    <span className="text-[11px] font-semibold text-[#8A6A45]">{product.materials[2] || product.materials[0]}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="border-t border-border-warm/50 pt-5 space-y-4">
                {product.inStock ? (
                  <>
                    <div className="flex items-center gap-3">
                      {/* Quantity Incrementer */}
                      <div className="flex items-center border border-border-warm bg-bg-warm text-xs font-semibold rounded-full overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3.5 py-3 hover:text-accent-gold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-3 w-8 text-center text-text-main">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3.5 py-3 hover:text-accent-gold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={handleAddToCartClick}
                        className="flex-1 bg-white border border-text-main text-text-main hover:bg-bg-warm text-xs font-semibold uppercase tracking-widest py-3.5 px-6 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-full"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Cart</span>
                      </button>

                      {/* Wishlist toggle */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className={`border p-3.5 flex items-center justify-center transition-colors cursor-pointer rounded-full ${
                          wishlist.includes(product.id)
                            ? 'border-accent-gold bg-accent-gold/5 text-accent-gold'
                            : 'border-border-warm text-text-secondary hover:text-text-main'
                        }`}
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-accent-gold' : ''}`} />
                      </button>
                    </div>

                    {/* Buy Now Direct */}
                    <button
                      onClick={handleBuyNowClick}
                      className="w-full bg-dark-main text-[#F7F5F0] hover:bg-accent-gold text-xs font-semibold uppercase tracking-widest py-4.5 px-6 transition-colors duration-200 text-center flex items-center justify-center gap-2 cursor-pointer rounded-full"
                    >
                      <span>Buy Now (Direct Checkout)</span>
                    </button>
                  </>
                ) : (
                  <div className="bg-stone-100 border border-stone-200 py-4 px-4 text-center">
                    <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                      Temporarily Out of Stock
                    </p>
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="mt-2 text-[10px] font-bold text-accent-gold uppercase tracking-widest hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Alert Me When Available</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Tabs Details */}
          <div className="border-t border-border-warm bg-bg-warm/30">
            {/* Tabs Headers */}
            <div className="flex border-b border-border-warm divide-x divide-border-warm text-center font-semibold text-[10px] uppercase tracking-wider text-text-secondary bg-white select-none">
              {[
                { id: 'details', label: 'Craft & Features' },
                { id: 'specs', label: 'Dimensions & Materials' },
                { id: 'care', label: 'Care & Maintenance' },
                { id: 'delivery', label: 'Delivery & Returns' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 py-4 hover:text-text-main transition-colors relative cursor-pointer ${
                    activeTab === tab.id ? 'text-accent-gold bg-bg-warm/10 font-bold' : ''
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold animate-fade-in" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6 md:p-8 text-xs font-light text-text-secondary bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 leading-relaxed"
                >
                  {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Architectural Curation</h4>
                        <p>{product.longDescription}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Premium Features</h4>
                        <ul className="space-y-1.5 list-disc list-inside">
                          {product.features.map(feat => (
                            <li key={feat}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Exact Measurements</h4>
                        <p className="font-mono text-text-main">{product.dimensions}</p>
                        <p className="mt-2 text-[11px]">Designed to clear doorways easily. Contact showroom for layout scaling queries.</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Material Ingredients</h4>
                        <ul className="space-y-1">
                          {product.materials.map(mat => (
                            <li key={mat} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-accent-gold rounded-full" />
                              <span>{mat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Maintenance Instructions</h4>
                      <p className="max-w-xl">{product.careInstructions}</p>
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">White Glove Logistics</h4>
                        <p>{product.deliveryEstimate}</p>
                        <p className="mt-2">Our logistics specialists place items exactly where you request, execute full assembly, and recycle all cardboard packaging.</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-main mb-2">Returns Satisfaction</h4>
                        <p>We provide a 30-day, stress-free return period for undamaged, original-condition catalog furniture. Return transportation fee may apply.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Related / You May Also Like Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-border-warm p-6 md:p-8 bg-bg-warm/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-main mb-6">
                You May Also Like
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onNavigateToProduct(p)}
                    className="group bg-white border border-border-warm/50 hover:border-accent-gold p-3.5 cursor-pointer flex gap-3.5 items-center transition-all duration-300 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover shrink-0 bg-stone-100 group-hover:scale-103 transition-transform duration-300 rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] font-bold text-text-main group-hover:text-accent-gold transition-colors truncate">{p.name}</h4>
                      <p className="text-[9px] text-text-secondary mt-0.5">{p.subCategory}</p>
                      <p className="text-xs font-bold text-text-main mt-1">£{p.price.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4.5 h-4.5 text-stone-300 group-hover:text-accent-gold group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>

      {/* Floating Add to Cart success alert */}
      <AnimatePresence>
        {showAddSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-dark-main text-[#F7F5F0] border border-stone-800 p-4 shadow-2xl z-50 max-w-sm flex items-start gap-3 rounded-2xl"
          >
            <div className="p-1 rounded-full bg-green-500/10 text-green-500">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">Added to Basket</h5>
              <p className="text-[11px] text-text-secondary mt-1 font-light leading-relaxed">
                Successfully added {quantity}x <strong>{product.name}</strong> ({selectedColor}) to your cart.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
