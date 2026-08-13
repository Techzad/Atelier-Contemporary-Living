import { motion } from 'motion/react';
import { ShieldCheck, Trees, Hammer, Landmark } from 'lucide-react';
import { MATERIAL_CRAFTS } from '../data';

export default function MaterialsSection() {
  return (
    <section id="materials-section" className="py-20 bg-surface-primary border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold mb-2 block">
              Honest Construction
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
              Materials that get better with age.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-text-secondary text-xs sm:text-sm md:text-base font-light leading-relaxed">
              We design with raw structural authenticity in mind. Our furniture completely rejects cheap particleboards, toxic formaldehydes, and synthetic fast-fashion coverings. Instead, we collaborate with centuries-old European mills and high-grade quarries to manufacture products that accumulate beautiful, custom patinas through generations of family life.
            </p>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIAL_CRAFTS.map((craft, idx) => (
            <motion.div
              key={craft.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-bg-warm border border-border-warm overflow-hidden flex flex-col h-full rounded-[24px]"
            >
              <div className="aspect-[3/2] overflow-hidden bg-stone-100">
                <img
                  src={craft.image}
                  alt={craft.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-text-main mb-3 font-sans">
                    {craft.title}
                  </h3>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">
                    {craft.description}
                  </p>
                </div>
                
                {/* Visual authenticity tag */}
                <div className="mt-6 pt-4 border-t border-border-warm/50 flex items-center gap-2 text-[10px] uppercase tracking-wider text-accent-gold font-bold">
                  {idx === 0 && <Trees className="w-4 h-4" />}
                  {idx === 1 && <Landmark className="w-4 h-4" />}
                  {idx === 2 && <ShieldCheck className="w-4 h-4" />}
                  <span>100% Certified Sourcing</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supporting Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border-warm/60">
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-bg-warm border border-border-warm flex items-center justify-center rounded-full">
              <Trees className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-1">FSC Certified</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed font-light">Timber harvested only from responsibly managed, carbon-replenished forests.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-bg-warm border border-border-warm flex items-center justify-center rounded-full">
              <ShieldCheck className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-1">Oeko-Tex Standard</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed font-light">Fabrics certified entirely free of harmful chemicals and industrial allergy irritants.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-bg-warm border border-border-warm flex items-center justify-center rounded-full">
              <Hammer className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-1">Traditional Joinery</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed font-light">We use mortise & tenon joints and wooden dowels. Zero cheap plastic brackets.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-bg-warm border border-border-warm flex items-center justify-center rounded-full">
              <Landmark className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-main uppercase tracking-wider mb-1">Hand-Selected Stone</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed font-light">Every travertine slab is visually examined in Italian quarries for distinct graining.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
