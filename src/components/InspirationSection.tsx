import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowRight, ShoppingBag } from 'lucide-react';
import { INSPIRATION_SCENES } from '../data';
import { Product } from '../types';

interface InspirationSectionProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
}

export default function InspirationSection({ products, onOpenProductDetail }: InspirationSectionProps) {
  const [activeSceneId, setActiveSceneId] = useState(INSPIRATION_SCENES[0].id);

  const activeScene = INSPIRATION_SCENES.find(s => s.id === activeSceneId) || INSPIRATION_SCENES[0];

  // Retrieve actual matching product objects featured in this scene
  const featuredProductsList = products.filter(p => activeScene.featuredProducts.includes(p.id));

  return (
    <section id="inspiration-section" className="py-20 bg-surface-primary border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold mb-2 block">
              Editorial Curation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
              Ideas for your space.
            </h2>
          </div>
          <div className="md:w-1/3 flex gap-2 overflow-x-auto no-scrollbar py-1 mt-4 md:mt-0">
            {INSPIRATION_SCENES.map(scene => (
              <button
                key={scene.id}
                onClick={() => setActiveSceneId(scene.id)}
                className={`text-[11px] uppercase tracking-widest font-semibold px-4.5 py-2 whitespace-nowrap transition-all border cursor-pointer rounded-full ${
                  activeSceneId === scene.id
                    ? 'bg-dark-main text-[#F7F5F0] border-dark-main'
                    : 'bg-white text-text-secondary border-border-warm hover:border-text-secondary'
                }`}
              >
                {scene.style}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Big Lifestyle Image on Left */}
          <div className="lg:col-span-8 overflow-hidden relative min-h-[380px] lg:min-h-[500px] rounded-[24px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-stone-200"
              >
                <img
                  src={activeScene.image}
                  alt={activeScene.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Visual marker dots placed on top of images (simulated showroom coordinates) */}
                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Curation details on Right */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-bg-warm border border-border-warm p-6 md:p-8 rounded-[24px]">
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">
                    Currently Viewing: {activeScene.style} Look
                  </span>
                  <h3 className="text-2xl font-semibold text-text-main font-sans leading-tight">
                    {activeScene.title}
                  </h3>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {activeScene.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Shop the Look Box */}
              <div className="pt-6 border-t border-border-warm/60">
                <h4 className="text-[10px] uppercase tracking-wider text-text-main font-bold mb-4">
                  Shop the Look ({featuredProductsList.length})
                </h4>
                
                <div className="space-y-3.5">
                  <AnimatePresence mode="popLayout">
                    {featuredProductsList.map(p => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenProductDetail(p)}
                        className="flex items-center gap-3 bg-white border border-border-warm/50 p-2.5 hover:border-accent-gold cursor-pointer group transition-colors rounded-2xl overflow-hidden"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover shrink-0 bg-stone-100 group-hover:scale-103 transition-transform rounded-xl"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-text-main group-hover:text-accent-gold transition-colors truncate">{p.name}</p>
                          <p className="text-[10px] text-text-secondary font-light mt-0.5">{p.subCategory}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-text-main">£{p.price.toLocaleString()}</p>
                          <span className="text-[9px] text-accent-gold hover:underline font-semibold flex items-center gap-0.5 mt-0.5">
                            View <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Quote of interior concept */}
            <div className="pt-6 border-t border-border-warm/60 mt-8 hidden lg:block">
              <p className="text-[10px] italic text-text-secondary font-light leading-relaxed">
                "Our homes are an extension of our psychology. Fill them only with pieces that command visual weight and simple material honesty."
              </p>
              <span className="block text-[9px] uppercase tracking-wider text-text-main font-bold mt-1.5">
                — Arthur Pendelton, Creative Lead
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
