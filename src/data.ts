import { Product, Testimonial, RoomOption, InspirationScene } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'luna-sofa',
    name: 'Luna Linen 3-Seater Sofa',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subCategory: 'Sofas',
    price: 2450,
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Oatmeal Linen', hex: '#EAE6DF' },
      { name: 'Olive Velvet', hex: '#5E604F' },
      { name: 'Charcoal Wool', hex: '#3E4142' }
    ],
    materials: ['Solid Birch Frame', 'High-Density Foam', 'Belgian Linen', 'Polished Oak Feet'],
    dimensions: 'W: 220cm x D: 95cm x H: 82cm',
    description: 'A deep-seated contemporary sofa upholstered in premium Belgian linen with feather-wrapped cushion cores.',
    longDescription: 'The Luna Sofa combines structured sophistication with sink-in comfort. Each frame is bench-made by skilled craftsmen using sustainably sourced timber. Upholstered in our signature Belgian linen weave, it features a heavy-duty rub rating making it suitable for high-use living rooms while maintaining a luxurious aesthetic. Cushion covers are fully removable for easy care.',
    features: [
      'Sustainably harvested solid hardwood frame, double-doweled and glued',
      'High-resiliency foam core wrapped in hypoallergenic duck feathers',
      'Removable, dry-cleanable cushion covers',
      'Includes two matching bolster pillows'
    ],
    careInstructions: 'Rotate and plump cushions weekly. Vacuum upholstery regularly with a soft brush attachment. Professional dry cleaning recommended.',
    deliveryEstimate: 'Delivered in 4-6 weeks (White Glove Service)',
    inStock: true,
    featured: true
  },
  {
    id: 'soren-chair',
    name: 'Soren Bouclé Lounge Chair',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subCategory: 'Armchairs',
    price: 1120,
    rating: 4.8,
    reviewCount: 32,
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Chalk Bouclé', hex: '#F0ECE6' },
      { name: 'Sage Bouclé', hex: '#ADB5A4' },
      { name: 'Saddle Leather', hex: '#9E744F' }
    ],
    materials: ['Sculpted Beech Frame', 'Premium Italian Bouclé', 'Matte Black Steel'],
    dimensions: 'W: 84cm x D: 80cm x H: 76cm',
    description: 'A sculptural, organic accent chair wrapped in heavy-textured bouclé for supreme tactical warmth.',
    longDescription: 'With a silhouette inspired by mid-century Danish modernism, the Soren Lounge Chair is as comfortable as it is artistically striking. The continuous form cradles the body, while the dense, high-performance bouclé fabric adds warmth and depth to any corner of your living space or study.',
    features: [
      'Curved beech wood structural shell',
      'Double-stitched premium textured bouclé upholstery',
      'Slimline matte black steel leg base with protective feet glides',
      'Ergonomically angled lumbar profile'
    ],
    careInstructions: 'Spot clean spills immediately with a damp white cloth. Do not use harsh chemical cleaners.',
    deliveryEstimate: 'Delivered in 2-3 weeks',
    inStock: true,
    featured: true
  },
  {
    id: 'arco-coffee-table',
    name: 'Arco Walnut Coffee Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subCategory: 'Coffee Tables',
    price: 890,
    rating: 4.7,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'American Walnut', hex: '#4B382A' },
      { name: 'Natural White Oak', hex: '#CDBCA9' }
    ],
    materials: ['FSC Solid Walnut Wood', 'Honed Matte Lacquer Finish'],
    dimensions: 'L: 120cm x W: 70cm x H: 38cm',
    description: 'An organic, shield-shaped solid walnut coffee table with clean tapered legs and beautiful exposed joinery.',
    longDescription: 'Designed around fluid geometry, the Arco Coffee Table offers an elegant centerpiece without crowding your room. Crafted entirely from premium North American walnut, each table showcases a unique grain pattern protected by a ultra-matte water-resistant finish that feels natural to the touch.',
    features: [
      '100% solid North American Walnut wood',
      'Under-beveled table edge details for a light, floating appearance',
      'Traditional mortise and tenon leg joinery',
      'Sustainably certified wood with low-VOC protective oil'
    ],
    careInstructions: 'Wipe with a clean, dry, lint-free cloth. Use coasters for hot and cold beverages to protect the natural finish.',
    deliveryEstimate: 'Delivered in 1-2 weeks',
    inStock: true,
    featured: false
  },
  {
    id: 'linear-media-unit',
    name: 'Linear Oak Slatted Sideboard',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subCategory: 'TV Units',
    price: 1650,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Smoked Oak', hex: '#554A42' },
      { name: 'Warm Natural Oak', hex: '#DFD4C5' }
    ],
    materials: ['Solid White Oak', 'Oak Veneered Cabinets', 'Brass Inlays'],
    dimensions: 'W: 180cm x D: 45cm x H: 55cm',
    description: 'A striking oak media console with slide-away slatted doors that permit infrared remote signals to pass through.',
    longDescription: 'Hide your media components in plain sight. The Linear Slatted Media Unit features doors that slide smoothly along integrated tracks, creating an ever-changing graphic aesthetic. The slatted front allows remotes and electronics to work even when fully closed, while integrated cable ports in the back keep wires tidy.',
    features: [
      'Full slatted front sliding doors',
      'Adjustable internal shelves with cable ventilation holes',
      'Soft-close cabinet hinges and premium drawer slides',
      'Sturdy steel reinforcement sub-frame'
    ],
    careInstructions: 'Dust regularly. Clean with a soft, slightly damp cloth, wiping with the wood grain.',
    deliveryEstimate: 'Delivered in 4-5 weeks',
    inStock: true,
    featured: false
  },
  {
    id: 'modena-table',
    name: 'Modena Travertine Side Table',
    category: 'living-room',
    categoryLabel: 'Living Room',
    subCategory: 'Side Tables',
    price: 520,
    rating: 4.6,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Honed Travertine', hex: '#EBE4DA' },
      { name: 'Nero Marquina Marble', hex: '#262626' }
    ],
    materials: ['Solid Italian Travertine Stone', 'Suede Bottom Protector'],
    dimensions: 'Diameter: 40cm x H: 48cm',
    description: 'A sculptural cylindrical side table carved from solid honed Italian travertine, showcasing unique geological patterns.',
    longDescription: 'The Modena Table is a dense, grounding block of pure Italian stone. Carved into a perfect fluted cylinder, its matte, unfilled travertine surface retains the authentic, tiny volcanic craters that give this classic architectural stone its renowned organic character.',
    features: [
      'Carved from premium single-source Italian Travertine',
      'Subtle vertical fluting details carved by hand',
      'Matte natural honed finish (unsealed for absolute texture authenticity)',
      'Felt under-base protection'
    ],
    careInstructions: 'Clean immediate spills with a mild stone soap. Avoid placing acidic items (vinegar, lemon juice) directly on raw stone.',
    deliveryEstimate: 'Delivered in 1 week',
    inStock: true,
    featured: false
  },
  {
    id: 'dusk-bed',
    name: 'Dusk Wool Platform Bed',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subCategory: 'Beds',
    price: 1850,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Melange Grey Wool', hex: '#7D8083' },
      { name: 'Oatmeal Tweed', hex: '#DFD8CE' },
      { name: 'Midnight Velvet', hex: '#1C2938' }
    ],
    materials: ['Sprung Beech Slats', 'Felted Virgin Wool', 'Steel Framing'],
    dimensions: 'W: 168cm x L: 215cm x H: 105cm (King)',
    description: 'A low-profile platform bed frame wrapped in rich felted wool, featuring a soft cushioned headboard.',
    longDescription: 'Transform your bedroom into a sanctuary of calm. The Dusk Platform Bed boasts a clean, contemporary form wrapped fully in heavy felted wool sourced from historical Italian mills. The design eliminates the need for box springs, relying instead on high-end flex sprung slats that respond dynamically to your mattress choice.',
    features: [
      'Low, grounded platform design with internal steel crossbar supports',
      'Generously padded headboard stuffed with structural upholstery fiber',
      'High-grade multi-layer sprung beech wood slat system',
      'Recessed structural legs that create a floating profile'
    ],
    careInstructions: 'Gently brush wool with a garment brush to remove dust. Spot clean with fabric-safe dry solvent.',
    deliveryEstimate: 'Delivered in 5-6 weeks (White Glove Installation Included)',
    inStock: true,
    featured: true
  },
  {
    id: 'nox-nightstand',
    name: 'Nox Walnut Bedside Chest',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subCategory: 'Bedside Tables',
    price: 480,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'American Walnut', hex: '#4B382A' },
      { name: 'Charcoal Stained Oak', hex: '#2B2B28' }
    ],
    materials: ['Solid Walnut Framing', 'Soft-Close Blum Runners', 'Solid Brass Details'],
    dimensions: 'W: 50cm x D: 40cm x H: 45cm',
    description: 'A sophisticated bedside unit with two soft-closing drawers detailed with solid brass bar-pull inserts.',
    longDescription: 'A perfect compact storage companion. The Nox Chest is detailed with classic mitered corners and grain-matched drawers so the walnut flow is continuous across the face of the chest. It sits atop a subtle recessed wood plinth for an architectural, shadow-line highlight.',
    features: [
      'Two spacious drawers with German-engineered Blum soft-close under-mount runners',
      'Book-matched premium solid walnut veneers',
      'Recessed solid brass handle inserts',
      'Constructed with formaldehyde-free eco-binders'
    ],
    careInstructions: 'Wipe with soft wood cloths. Avoid pooling liquids or moisture on the top wood veneer surface.',
    deliveryEstimate: 'Delivered in 1-2 weeks',
    inStock: true,
    featured: false
  },
  {
    id: 'haven-dresser',
    name: 'Haven Oak 6-Drawer Dresser',
    category: 'bedroom',
    categoryLabel: 'Bedroom',
    subCategory: 'Dressers',
    price: 1390,
    rating: 4.7,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural White Oak', hex: '#DFD4C5' },
      { name: 'Smoked Walnut', hex: '#3E342D' }
    ],
    materials: ['Solid European White Oak', 'Soft Touch Push-to-Open Tracks'],
    dimensions: 'W: 160cm x D: 50cm x H: 78cm',
    description: 'A minimalist handleless chest of six massive drawers featuring a clean bevel-joint outer casing.',
    longDescription: 'Offering abundant storage without compromising on sleek interior design, the Haven Dresser uses seamless push-to-open drawer hardware to eliminate physical pulls. Crafted with clean lines, the wood grain runs vertically to draw the eye up, making rooms feel more spacious.',
    features: [
      'Beveled 45-degree corner casing for seamless outer framing',
      'Six ultra-deep drawers with heavy-load bearing capability',
      'Italian push-to-open hardware with silent buffer dampening',
      'Includes structural anti-tip hardware kit'
    ],
    careInstructions: 'Dust with clean dry microfiber cloth. Treat twice a year with premium furniture oil or wax.',
    deliveryEstimate: 'Delivered in 4-5 weeks',
    inStock: true,
    featured: false
  },
  {
    id: 'talon-dining-table',
    name: 'Talon Solid Oak Dining Table',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    subCategory: 'Dining Tables',
    price: 2100,
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1db207faf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural White Oak', hex: '#DFD4C5' },
      { name: 'Warm Charcoal Oak', hex: '#31302D' }
    ],
    materials: ['A-Grade Solid French Oak', 'Matte Eco-Resin Oil'],
    dimensions: 'L: 200cm x W: 95cm x H: 75cm',
    description: 'A structural, clean-lined dining table built from solid French oak planks with thick cylindrical legs.',
    longDescription: 'Built with thick timber segments, the Talon Dining Table stands as a masterpiece of absolute joinery. Crafted to accommodate up to 8 guests comfortably, the raw strength of solid French oak is contrasted by under-table beveling that lends it a soft, hovering presence.',
    features: [
      'Massive 4cm-thick solid A-grade oak tabletop planks',
      'Sculptural thick doweled leg frame supports',
      'Heat-resistant, stain-resistant natural matte seal coats',
      'Modular expandable leaf attachments available separately'
    ],
    careInstructions: 'Clean immediately after meals with a warm soapy washcloth. Dry thoroughly. Avoid scrubbing abrasive surfaces.',
    deliveryEstimate: 'Delivered in 3-4 weeks',
    inStock: true,
    featured: true
  },
  {
    id: 'finn-chair',
    name: 'Finn Saddle Leather Chair',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    subCategory: 'Chairs',
    price: 340,
    rating: 4.8,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#A85E39' },
      { name: 'Nero Black Leather', hex: '#1C1C1C' },
      { name: 'Stone Grey Leather', hex: '#878683' }
    ],
    materials: ['Full-Grain Italian Saddle Leather', 'Welded Steel Frame'],
    dimensions: 'W: 48cm x D: 52cm x H: 81cm',
    description: 'An elegant dining or accent chair featuring hand-stitched thick saddle leather stretched over steel legs.',
    longDescription: 'The Finn Chair gets better with age. Crafted from premium full-grain Italian saddle leather, the seat and back slowly mold to your shape and develop a rich, personal patina over years of use. Tight hand-stitched borders highlight its architectural geometric profile.',
    features: [
      'Premium thick full-grain Italian saddle leather',
      'Visible contrast double-stitching along leather borders',
      'High-tensile rigid powder-coated steel leg frame',
      'Ergonomic flexible curved lumbar comfort'
    ],
    careInstructions: 'Dust with clean dry cloth. Apply leather moisturizer or balm once a year to prevent drying.',
    deliveryEstimate: 'Delivered in 1-2 weeks',
    inStock: true,
    featured: true
  },
  {
    id: 'aero-barstool',
    name: 'Aero Ribbed Kitchen Barstool',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    subCategory: 'Kitchen Storage & Accessories',
    price: 290,
    rating: 4.6,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Smoked Ash', hex: '#48443F' },
      { name: 'Natural Ash', hex: '#DDD0BF' }
    ],
    materials: ['FSC Molded Ash Wood', 'Brushed Brass Footrests'],
    dimensions: 'W: 42cm x D: 44cm x H: 65cm (Counter Height)',
    description: 'A contemporary counter barstool with a beautifully ribbed low-back wood shell and brushed brass details.',
    longDescription: 'Inject luxury showroom style into your kitchen island. The Aero Barstool boasts a micro-ribbed back shell that captures light dynamically. It features a heavy steel inner structure with a warm brass footrest tube designed to withstand years of casual mornings and dinners.',
    features: [
      'Micro-ribbed outer shell detailing',
      'Comfort-molded solid ash seat and low support backrest',
      'Heavy-duty brushed solid brass footrest bars',
      'Integrated thick plastic glide caps protect kitchen tiles'
    ],
    careInstructions: 'Clean wood with dry cloth. Polish brass ring with specialized brass polish if tarnished.',
    deliveryEstimate: 'Delivered in 2 weeks',
    inStock: true,
    featured: false
  },
  {
    id: 'strata-dining-table',
    name: 'Strata Round Marble Table',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    subCategory: 'Dining Tables',
    price: 3200,
    rating: 4.9,
    reviewCount: 12,
    images: [
      '/src/assets/images/strata_marble_table_1786615104547.jpg',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'White Carrara Marble', hex: '#EEEEEE' },
      { name: 'Arabescato Orobico', hex: '#635F5B' }
    ],
    materials: ['Italian Carrara Marble', 'Ribbed Ash Base Column', 'Steel Frame Support'],
    dimensions: 'Diameter: 130cm x H: 75cm',
    description: 'A majestic statement circular table crafted with an Italian Carrara marble top sitting on a fluted wood base.',
    longDescription: 'The Strata table stands as an elegant sculpture for your dining pavilion. The massive Italian Carrara marble slab is cut to a circular perimeter, honed to a smooth satin touch, and set perfectly atop a heavy structural column fluted with premium solid white ash vertical slats.',
    features: [
      'A-Grade 3cm-thick authentic Carrara marble top plate',
      'Beveled anti-impact marble table borders',
      'Architectural column base with full solid wood slatted details',
      'Steel sub-plate that prevents heavy marble shifting'
    ],
    careInstructions: 'Avoid cutting directly or acidic liquids. Protect with natural marble sealers annually.',
    deliveryEstimate: 'Delivered in 5-6 weeks (Special Heavy Handling Included)',
    inStock: false,
    featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    quote: 'The Luna sofa completely transformed our living room. The quality was even better than we expected. Fabric has survived pets, kids, and daily lounge activities beautifully.',
    author: 'Eleanor Vance',
    location: 'London, UK',
    rating: 5,
    product: 'Luna Linen 3-Seater Sofa'
  },
  {
    id: 'rev-2',
    quote: 'Absolutely flawless wood finish. You can feel the weight of authentic solid wood in the Talon dining table immediately. Delivery was perfectly coordinated and white-glove setup took 15 minutes.',
    author: 'Marcus Aurel',
    location: 'Copenhagen, DK',
    rating: 5,
    product: 'Talon Solid Oak Dining Table'
  },
  {
    id: 'rev-3',
    quote: 'Designed around real ergonomics. The Finn leather dining chairs are incredibly supportive for working at the dining table, and the leather tone has aged into a deep honey cognac beautifully.',
    author: 'Sarah Jenkins',
    location: 'New York, US',
    rating: 5,
    product: 'Finn Saddle Leather Chair'
  }
];

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Deep sofas, modular tables and striking media units designed for rest.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Tactile platform beds and low chests crafted for peaceful nights.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kitchen',
    name: 'Dining & Kitchen',
    description: 'Solid oak tables and saddle-leather seating engineered for hosting.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  }
];

export const INSPIRATION_SCENES: InspirationScene[] = [
  {
    id: 'scene-1',
    title: 'Warm Minimalism',
    style: 'Living Room',
    description: 'Focusing on natural Travertine stone, organic seating, and simple oak elements to create an airy yet inviting sanctuary.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    featuredProducts: ['soren-chair', 'arco-coffee-table', 'modena-table']
  },
  {
    id: 'scene-2',
    title: 'Contemporary Sleep',
    style: 'Bedroom',
    description: 'Pairing deep mitered American walnut bedside chests with soft wool felted beds for textured elegance and ultimate sleep wellness.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    featuredProducts: ['dusk-bed', 'nox-nightstand']
  },
  {
    id: 'scene-3',
    title: 'Modern Culinary Lounge',
    style: 'Kitchen & Dining',
    description: 'Where solid French oak and hand-stitched thick saddle leather host intimate daily breakfast and weekend banquets alike.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db207faf?auto=format&fit=crop&w=800&q=80',
    featuredProducts: ['talon-dining-table', 'finn-chair', 'aero-barstool']
  }
];

export const MATERIAL_CRAFTS = [
  {
    title: 'A-Grade Solid Woods',
    description: 'We source only premium, certified French Oak and North American Black Walnut. No low-end particleboards or cheap synthetic veneers are used.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Authentic Stones',
    description: 'Our Travertine and Carrara Marble are imported directly from legendary Italian quarry hillsides, honed to perfection with beautiful, natural variations.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Full-Grain Leathers',
    description: 'We source high-durability, vegetable-tanned saddle leather from traditional Tuscan tanneries, developing a gorgeous patina with time and care.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80'
  }
];

export const SHOWROOM_DETAILS = {
  address: '84 Great Eastern Street, Shoreditch, London, EC2A 3JL',
  phone: '+44 (0) 20 7456 9012',
  email: 'showroom@contemporaryfurniture.com',
  hours: [
    { days: 'Monday – Friday', times: '10:00 AM – 7:00 PM' },
    { days: 'Saturday', times: '10:00 AM – 6:00 PM' },
    { days: 'Sunday', times: '11:00 AM – 5:00 PM' }
  ]
};
