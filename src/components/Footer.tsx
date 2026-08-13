import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, MessageSquare, Phone } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: 'all' | 'living-room' | 'bedroom' | 'kitchen') => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onSelectCategory, onScrollToSection }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const handleCategoryLink = (cat: 'living-room' | 'bedroom' | 'kitchen') => {
    onSelectCategory(cat);
    onScrollToSection('product-catalog');
  };

  return (
    <footer id="editorial-footer" className="bg-dark-main text-[#EFEBE4] pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter and Logo row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-2xl font-black tracking-tighter text-white">
                ATELIER.
              </span>
              <p className="text-[10px] uppercase tracking-[0.35em] text-accent-gold font-bold mt-1">
                contemporary living
              </p>
            </div>
            <p className="text-xs text-[#A8A49C] font-light leading-relaxed max-w-sm">
              Thoughtfully curated living rooms, bedrooms, and dining spaces. Built with premium solid hardwoods and high-end natural materials to withstand real, daily living.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 lg:text-right">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Stay Connected
            </h4>
            <p className="text-xs text-[#A8A49C] font-light max-w-md lg:ml-auto">
              Subscribe to receive private collection releases, architectural showroom ideas, and structural craft tutorials.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md lg:ml-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="bg-stone-900 border border-stone-800 text-white placeholder-stone-500 text-xs px-4 py-3.5 focus:outline-none focus:border-accent-gold flex-1 text-left"
              />
              <button
                type="submit"
                className="bg-accent-gold text-white text-[11px] font-bold uppercase tracking-wider py-3 px-6 hover:bg-[#9c7b52] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {newsletterSubscribed ? 'Subscribed ✓' : (
                  <>
                    <span>Join Curation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-[#A8A49C] font-light">
              <li>
                <button onClick={() => handleCategoryLink('living-room')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Living Room Furniture
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryLink('bedroom')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Bedroom Furniture
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryLink('kitchen')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Dining & Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('product-catalog')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Shop All Pieces
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Our Showroom
            </h4>
            <ul className="space-y-2.5 text-[#A8A49C] font-light">
              <li>
                <button onClick={() => onScrollToSection('showroom-section')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Visit Shoreditch Showroom
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('trust-testimonials-section')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('materials-section')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Sourcing & Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('custom-furniture-section')} className="hover:text-accent-gold transition-colors text-left cursor-pointer">
                  Custom Modular Design
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Client Support
            </h4>
            <ul className="space-y-2.5 text-[#A8A49C] font-light">
              <li>
                <span className="text-stone-500 block">Complimentary White Glove Delivery</span>
              </li>
              <li>
                <span className="text-stone-500 block">10-Year Structural Frame Warranty</span>
              </li>
              <li>
                <span className="text-stone-500 block">30-Day Material Satisfaction Returns</span>
              </li>
              <li>
                <a href="tel:+442074569012" className="hover:text-accent-gold transition-colors flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Showroom phone line
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Follow Us
            </h4>
            <ul className="space-y-2.5 text-[#A8A49C] font-light">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-[#8A6A45]" /> Instagram Curation
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors flex items-center gap-2">
                  <Facebook className="w-3.5 h-3.5 text-[#8A6A45]" /> Facebook Journal
                </a>
              </li>
              <li>
                <a href="https://wa.me/442074569012" target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8A6A45]" /> WhatsApp Advisor Chat
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider bg-stone-900 border border-stone-800 px-2 py-0.5 text-accent-gold inline-block">
                  Studio Active
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800 pt-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-500 tracking-wider">
          <p>© {new Date().getFullYear()} ATELIER Contemporary Furniture Ltd. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-accent-gold cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-accent-gold cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-accent-gold cursor-pointer">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
