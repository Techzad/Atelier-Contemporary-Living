import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (category: 'all' | 'living-room' | 'bedroom' | 'kitchen') => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const categoriesList = [
    {
      id: 'living-room',
      title: 'Living Room',
      description: 'The social center of the contemporary home.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      items: ['Sofas', 'Coffee Tables', 'TV Units', 'Side Tables', 'Armchairs'],
      ctaText: 'Shop Living Room'
    },
    {
      id: 'bedroom',
      title: 'Bedroom',
      description: 'Your sanctuary of tactile rest and calm.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      items: ['Beds', 'Wardrobes', 'Bedside Tables', 'Dressers', 'Mattresses'],
      ctaText: 'Shop Bedroom'
    },
    {
      id: 'kitchen',
      title: 'Dining & Kitchen',
      description: 'Functional durability engineered for hosting.',
      image: '/src/assets/images/strata_marble_table_1786615104547.jpg',
      items: ['Dining Tables', 'Chairs', 'Kitchen Cabinets', 'Storage & Stools'],
      ctaText: 'Shop Kitchen'
    }
  ] as const;

  return (
    <section id="categories-section" className="py-20 bg-surface-primary border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-semibold mb-2 block">
              Curated Showrooms
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
              Designed around how you live.
            </h2>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm font-light mt-4 md:mt-0 max-w-sm leading-relaxed">
            Explore carefully structured product lines configured to solve the visual and spatial needs of the modern premium layout.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoriesList.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => onSelectCategory(category.id)}
              className="group cursor-pointer flex flex-col h-full border border-border-warm bg-bg-warm overflow-hidden rounded-[24px]"
            >
              
              {/* Category Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <img
                  src={category.image}
                  alt={`${category.title} showroom view`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
                
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />
                
                {/* Title inside bottom left of image */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <p className="text-[10px] uppercase tracking-widest text-[#EFEBE4] font-medium mb-1">Showroom</p>
                  <h3 className="text-2xl font-semibold tracking-tight font-sans text-white">{category.title}</h3>
                </div>
              </div>

              {/* Category Info Container */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  {/* Detailed list of sub-items */}
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-wider text-accent-gold font-bold mb-3">Included Lines</p>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-text-secondary font-light">
                      {category.items.map(item => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-accent-gold/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button Link */}
                <div className="pt-4 border-t border-border-warm/50 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-text-main group-hover:text-accent-gold transition-colors duration-200">
                  <span>{category.ctaText}</span>
                  <div className="w-8 h-8 rounded-full border border-border-warm group-hover:border-accent-gold flex items-center justify-center transition-colors duration-200">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
