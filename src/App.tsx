import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, MessageSquare, Phone } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductSection from './components/ProductSection';
import MaterialsSection from './components/MaterialsSection';
import CustomSection from './components/CustomSection';
import InspirationSection from './components/InspirationSection';
import ShowroomSection from './components/ShowroomSection';
import TrustTestimonials from './components/TrustTestimonials';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';

import { PRODUCTS } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('atelier_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to initialize cart from storage', e);
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const savedWish = localStorage.getItem('atelier_wishlist');
      return savedWish ? JSON.parse(savedWish) : [];
    } catch (e) {
      console.error('Failed to initialize wishlist from storage', e);
      return [];
    }
  });
  const [currentCategory, setCurrentCategory] = useState<'all' | 'living-room' | 'bedroom' | 'kitchen'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart state', e);
    }
  }, [cart]);

  // Save wishlist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist state', e);
    }
  }, [wishlist]);

  // Handle section scrolling
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add item to cart
  const handleAddToCart = (product: Product, quantity: number, color: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
  };

  // Buy Now (Adds to cart and goes immediately to checkout inside the CartDrawer)
  const handleBuyNow = (product: Product, color: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity = Math.max(next[existingIdx].quantity, 1);
        return next;
      }
      return [...prev, { product, quantity: 1, selectedColor: color }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateCartQuantity = (productId: string, color: string, delta: number) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === productId && item.selectedColor === color);
      if (idx === -1) return prev;
      
      const next = [...prev];
      const newQty = next[idx].quantity + delta;
      
      if (newQty <= 0) {
        return next.filter((_, i) => i !== idx);
      } else {
        next[idx].quantity = newQty;
        return next;
      }
    });
  };

  // Remove item from cart
  const handleRemoveCartItem = (productId: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedColor === color)));
  };

  // Toggle wishlist
  const handleToggleWishlist = (id: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectCategory = (cat: 'all' | 'living-room' | 'bedroom' | 'kitchen') => {
    setCurrentCategory(cat);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-bg-warm text-text-main flex flex-col justify-between selection:bg-accent-gold/20 selection:text-text-main">
      
      {/* Navigation Header */}
      <Navbar
        products={PRODUCTS}
        onSelectCategory={handleSelectCategory}
        onOpenProductDetail={setSelectedProduct}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onScrollToSection={handleScrollToSection}
        currentCategory={currentCategory}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleScrollToSection('product-catalog')}
          onCustomClick={() => handleScrollToSection('custom-furniture-section')}
        />

        {/* Categories Section */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* Product Catalog Section */}
        <ProductSection
          products={PRODUCTS}
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          onOpenProductDetail={setSelectedProduct}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        {/* Materials & Sourcing Section */}
        <MaterialsSection />

        {/* Custom Furniture Configurator */}
        <CustomSection />

        {/* Interior Inspiration Scene Section */}
        <InspirationSection
          products={PRODUCTS}
          onOpenProductDetail={setSelectedProduct}
        />

        {/* Trust Value Pillars & Testimonials Section */}
        <TrustTestimonials />

        {/* Showroom Physical Experience Section */}
        <ShowroomSection />

        {/* Final conversion CTA (Section 19: "Ready to find your next piece?") */}
        <section id="final-cta-section" className="py-20 bg-dark-main text-[#EFEBE4] text-center border-t border-stone-800 relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block">
              Architectural Showroom Experience
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-extrabold tracking-tighter text-white font-sans leading-tight md:leading-[0.95]">
              Ready to find your next piece?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#A8A49C] font-light max-w-lg mx-auto leading-relaxed">
              Explore our comprehensive collection of contemporary furniture designed around natural materials, solid oak framing, and organic fabrics. Visit our London floor or speak directly to a custom coordinator.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleScrollToSection('product-catalog')}
                className="bg-accent-gold text-white text-xs font-semibold uppercase tracking-widest py-4.5 px-8 hover:bg-[#9c7b52] transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2 cursor-pointer rounded-full"
              >
                <span>Shop Catalog Furniture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollToSection('showroom-section')}
                className="bg-transparent text-[#EFEBE4] border border-stone-800 hover:border-white hover:bg-white/5 text-xs font-semibold uppercase tracking-widest py-4.5 px-8 transition-colors w-full sm:w-auto text-center cursor-pointer rounded-full"
              >
                Book Showroom Consult
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Multi-column Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToSection={handleScrollToSection}
      />

      {/* Slide-over Cart Drawer Experience */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Full-screen / Overlay Product Detail Experience */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            allProducts={PRODUCTS}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToProduct={(p) => setSelectedProduct(p)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
