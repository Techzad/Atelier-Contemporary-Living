import { motion } from 'motion/react';
import { Star, Shield, Award, Sparkles, Truck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TrustTestimonials() {
  const pillars = [
    {
      icon: Award,
      title: 'Quality Materials',
      desc: 'Furniture fully constructed with sustainably harvested solid wood, Italian stone, and high-performance Oeko-Tex upholstery fabrics.'
    },
    {
      icon: Shield,
      title: 'Built to Last',
      desc: 'Engineered with premium double-doweled mortise and tenon joints to withstand decades of daily family movement.'
    },
    {
      icon: Sparkles,
      title: 'Thoughtful Design',
      desc: 'Clean geometric proportions, under-beveled panels, and custom details that fit organically into architectural floor plans.'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      desc: 'Complimentary white-glove inside placement, full room assembly, and cardboard recycling on orders over $1,500.'
    }
  ];

  return (
    <section id="trust-testimonials-section" className="py-20 bg-bg-warm border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Choose Us Pillars */}
        <div className="border-b border-border-warm/60 pb-16 mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
              Our Core Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
              Why leading designers choose Atelier.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="w-11 h-11 bg-white border border-border-warm flex items-center justify-center text-accent-gold rounded-full">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-main">
                  {p.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12">
            <div className="max-w-xl">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
                Real Home Owners
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
                Furniture people live with—and love.
              </h2>
            </div>
            <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mt-4 lg:mt-0 max-w-sm">
              We focus on absolute customer fulfillment. See what design connoisseurs write about our structural durability and visual beauty.
            </p>
          </div>

          {/* Testimonial Editorial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white border border-border-warm p-6 md:p-8 flex flex-col justify-between rounded-[24px]"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-gold fill-accent-gold" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <blockquote className="text-xs text-text-main font-light leading-relaxed mb-6 italic">
                    "{review.quote}"
                  </blockquote>
                </div>

                <div className="border-t border-border-warm/40 pt-4 flex justify-between items-center text-[10px]">
                  <div>
                    <cite className="block not-italic font-bold text-text-main uppercase tracking-wider">
                      — {review.author}
                    </cite>
                    <span className="text-text-secondary font-light block mt-0.5">{review.location}</span>
                  </div>
                  <span className="bg-bg-warm text-accent-gold font-medium px-2.5 py-1 uppercase tracking-wider text-[9px] border border-border-warm/40 rounded-full">
                    Verified Purchase
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
