import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  return (
    <section id="hero-section" className="relative min-h-[calc(100vh-130px)] flex items-center bg-bg-warm py-8 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 z-10">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[84px] leading-[0.95] sm:leading-[0.85] text-text-main mb-6 font-montserrat font-black tracking-tighter"
            >
              Furniture<br/>made for<br/>living.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-text-secondary text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 max-w-md"
            >
              Thoughtfully designed pieces for living rooms, bedrooms, and kitchens. Crafted in solid hardwoods and premium natural fabrics to last a lifetime.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={onExploreClick}
                className="bg-dark-main text-[#F7F5F0] hover:bg-accent-gold text-xs font-semibold uppercase tracking-widest py-4.5 px-8 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer rounded-full"
              >
                Shop Furniture
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={onCustomClick}
                className="bg-transparent text-text-main border border-border-warm hover:border-text-main hover:bg-white text-xs font-semibold uppercase tracking-widest py-4.5 px-8 transition-all duration-300 text-center cursor-pointer rounded-full"
              >
                Custom Design Room
              </button>
            </motion.div>

            {/* Trust Metrics Sub-bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 pt-8 border-t border-border-warm/60"
            >
              <div>
                <span className="block text-xl md:text-2xl font-semibold text-text-main">100%</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">Solid Wood</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-semibold text-text-main">10 yr</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">Warranty</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-semibold text-text-main">4.9 ★</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">Average Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[1.35/1] overflow-hidden bg-stone-200 rounded-[32px]"
            >
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural minimal interior with premium wood paneling and natural light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none scale-102 hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Image Floating Captions for organic editorial feel */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs py-2.5 px-4 max-w-xs border border-border-warm shadow-sm hidden sm:block rounded-2xl">
                <span className="block text-[9px] uppercase tracking-wider text-accent-gold font-bold">Featured Concept</span>
                <span className="block text-xs text-text-main font-medium mt-0.5">Soren Lounge Chair in Chalk Bouclé</span>
                <span className="block text-[10px] text-text-secondary font-light mt-0.5">paired with Modena Travertine Side Table</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
