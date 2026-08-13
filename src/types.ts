export interface Product {
  id: string;
  name: string;
  category: 'living-room' | 'bedroom' | 'kitchen';
  categoryLabel: string;
  subCategory: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[]; // At least 2 images for hover secondary view!
  colors: { name: string; hex: string }[];
  materials: string[];
  dimensions: string;
  description: string;
  longDescription: string;
  features: string[];
  careInstructions: string;
  deliveryEstimate: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedMaterial?: string;
  customDimensions?: string;
}

export interface FilterState {
  category: 'all' | 'living-room' | 'bedroom' | 'kitchen';
  priceRange: [number, number];
  material: string;
  color: string;
  availability: 'all' | 'in-stock';
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  product: string;
}

export interface RoomOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface InspirationScene {
  id: string;
  title: string;
  style: string;
  description: string;
  image: string;
  featuredProducts: string[]; // Product IDs
}
