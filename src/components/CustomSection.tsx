import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Compass, Ruler, HelpCircle, FileText } from 'lucide-react';

export default function CustomSection() {
  // Configurator states
  const [selectedFabric, setSelectedFabric] = useState({ name: 'Chalk Bouclé', hex: '#F0ECE6', cost: 0, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' });
  const [selectedWood, setSelectedWood] = useState({ name: 'American Walnut', hex: '#4B382A', cost: 150 });
  const [sofaLength, setSofaLength] = useState(220); // in cm
  const [cushionFirmness, setCushionFirmness] = useState('Medium-Plush');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic calculations
  const basePrice = 2200;
  const pricePerCm = 6;
  const lengthCost = (sofaLength - 180) * pricePerCm;
  const totalPrice = basePrice + lengthCost + selectedFabric.cost + selectedWood.cost;

  const fabricOptions = [
    { name: 'Chalk Bouclé', hex: '#F0ECE6', cost: 0, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80' },
    { name: 'Oatmeal Belgian Linen', hex: '#EAE6DF', cost: 100, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
    { name: 'Olive Cotton Velvet', hex: '#5E604F', cost: 180, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Saddle Tuscan Leather', hex: '#9E744F', cost: 550, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' }
  ];

  const woodOptions = [
    { name: 'American Walnut', hex: '#4B382A', cost: 150 },
    { name: 'Natural White Oak', hex: '#DFD4C5', cost: 0 },
    { name: 'Smoked Charcoal Ash', hex: '#2B2B28', cost: 80 }
  ];

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="custom-furniture-section" className="py-20 bg-bg-warm border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
            The Custom Studio
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
            Made to fit your space.
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm font-light mt-4 leading-relaxed">
            Do not compromise on layout scale. Our custom studio allows you to tailor dimensions, cushion specifications, premium wood feet, and cover fabrics. Configure your custom piece below for an instant quote.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white border border-border-warm p-6 md:p-10 shadow-xs rounded-[24px]">
          
          {/* Interactive visualizer Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-bg-warm/75 border border-border-warm/50 p-6 relative min-h-[350px] rounded-2xl">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-accent-gold font-bold">Interactive Preview</span>
              <h3 className="text-lg font-semibold text-text-main font-sans mt-1">
                Atelier Modular Sofa Configurator
              </h3>
            </div>

            {/* Dynamic Rendering Image Frame */}
            <div className="my-8 relative flex items-center justify-center h-48 sm:h-56">
              <motion.div
                key={selectedFabric.name}
                initial={{ opacity: 0.3, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <img
                  src={selectedFabric.image}
                  alt={selectedFabric.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-3xl"
                  style={{
                    boxShadow: '0 12px 30px rgba(23, 23, 21, 0.08)'
                  }}
                />
              </motion.div>

              {/* Specs Overlay */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs py-1.5 px-3 border border-border-warm text-[10px] space-y-0.5 rounded-xl">
                <p className="font-medium text-text-main">Custom Specs:</p>
                <p className="text-text-secondary">Length: {sofaLength}cm</p>
                <p className="text-text-secondary">Base: {selectedWood.name}</p>
                <p className="text-text-secondary">Fill: {cushionFirmness}</p>
              </div>
            </div>

            {/* Price Estimator footer */}
            <div className="border-t border-border-warm/60 pt-4 flex items-end justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary">Estimated Price</span>
                <span className="text-2xl font-bold text-text-main">£{totalPrice.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wider text-text-secondary">Delivery Estimate</span>
                <span className="text-xs font-semibold text-accent-gold">6–8 Weeks (Crafted to Order)</span>
              </div>
            </div>
          </div>

          {/* Configuration Form Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <form onSubmit={handleCustomSubmit} className="space-y-6">
              
              {/* Fabric Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-3">
                  Step 1: Choose Cover Fabric
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {fabricOptions.map(option => (
                    <button
                      type="button"
                      key={option.name}
                      onClick={() => setSelectedFabric(option)}
                      className={`p-3 text-left border flex items-center gap-3 transition-all cursor-pointer rounded-full ${
                        selectedFabric.name === option.name
                          ? 'border-accent-gold bg-accent-gold/[0.03]'
                          : 'border-border-warm hover:border-text-secondary bg-white'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full block border border-stone-200" style={{ backgroundColor: option.hex }} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-main truncate">{option.name}</p>
                        <p className="text-[10px] text-text-secondary">
                          {option.cost === 0 ? 'Included' : `+$${option.cost}`}
                        </p>
                      </div>
                      {selectedFabric.name === option.name && (
                        <Check className="w-3.5 h-3.5 text-accent-gold ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wood Base Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-3">
                  Step 2: Timber Base plinth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {woodOptions.map(option => (
                    <button
                      type="button"
                      key={option.name}
                      onClick={() => setSelectedWood(option)}
                      className={`p-2 text-center border flex flex-col items-center justify-center transition-all cursor-pointer rounded-2xl ${
                        selectedWood.name === option.name
                          ? 'border-accent-gold bg-accent-gold/[0.03]'
                          : 'border-border-warm hover:border-text-secondary bg-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full block mb-1 border border-stone-200" style={{ backgroundColor: option.hex }} />
                      <span className="text-[10px] font-medium text-text-main leading-tight truncate w-full">{option.name}</span>
                      <span className="text-[9px] text-text-secondary mt-0.5">
                        {option.cost === 0 ? 'Standard' : `+£${option.cost}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for length */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-main">
                    Step 3: Define Custom Length
                  </label>
                  <span className="text-xs font-bold text-accent-gold">{sofaLength} cm</span>
                </div>
                <input
                  type="range"
                  min="180"
                  max="280"
                  step="10"
                  value={sofaLength}
                  onChange={(e) => setSofaLength(parseInt(e.target.value))}
                  className="w-full accent-accent-gold h-1 bg-stone-100 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-secondary mt-1 font-light">
                  <span>180cm (Small Love Seat)</span>
                  <span>220cm (Standard 3-Seater)</span>
                  <span>280cm (Grand Salon Scale)</span>
                </div>
              </div>

              {/* Cushion Fill selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-2.5">
                  Step 4: Cushion Core Filling
                </label>
                <div className="flex items-center gap-4 text-xs font-light">
                  {['Cloud Feather-Plush', 'Medium-Plush', 'Support High-Resilience'].map(firm => (
                    <label key={firm} className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-main">
                      <input
                        type="radio"
                        name="firmness"
                        checked={cushionFirmness === firm}
                        onChange={() => setCushionFirmness(firm)}
                        className="accent-accent-gold w-3.5 h-3.5"
                      />
                      <span>{firm}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-border-warm/60">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full text-xs font-semibold uppercase tracking-widest py-4.5 px-6 transition-all duration-300 text-center rounded-full ${
                    isSubmitted
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-dark-main text-[#F7F5F0] hover:bg-accent-gold cursor-pointer'
                  }`}
                >
                  {isSubmitted ? '✓ Specification Saved Successfully' : 'Request Consult & Digital Mockup'}
                </button>
                <p className="text-[10px] text-text-secondary text-center font-light mt-2.5">
                  No credit card required. Our design advisors will email you a 3D architectural render of your setup in 24 hours.
                </p>
              </div>

            </form>
          </div>

        </div>

        {/* Floating Success Alert */}
        <AnimatePresence>
          {isSubmitted && (
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
                <h5 className="text-xs font-bold uppercase tracking-wider text-white">Consultation Requested</h5>
                <p className="text-[11px] text-text-secondary mt-1 font-light leading-relaxed">
                  We have saved your modular configuration. A design specialist from our London showroom will contact you at <strong>techseries358@gmail.com</strong> within 2 hours.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
