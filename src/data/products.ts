
import { Product, ProductCategory } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Professional Cricket Bat',
    description: 'Premium Kashmir willow cricket bat with excellent balance and perfect pickup.',
    price: 15000,
    category: 'bat',
    imageUrl: '/src/assets/bat-1.jpg',
    inStock: true,
    featured: true,
    rating: 4.8,
    createdAt: '2023-05-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Tournament Cricket Ball',
    description: 'Official tournament cricket ball made with genuine leather and perfect seam.',
    price: 1800,
    category: 'ball',
    imageUrl: '/src/assets/ball-1.jpg',
    inStock: true,
    featured: true,
    rating: 4.7,
    createdAt: '2023-06-10T10:00:00Z',
  },
  {
    id: '3',
    name: 'Premium Batting Pads',
    description: 'High-quality batting pads with maximum protection and comfort.',
    price: 5500,
    category: 'pad',
    imageUrl: '/src/assets/pad-1.jpg',
    inStock: true,
    rating: 4.5,
    createdAt: '2023-06-20T10:00:00Z',
  },
  {
    id: '4',
    name: 'Pro Batting Gloves',
    description: 'Professional batting gloves with superior grip and protection.',
    price: 3200,
    category: 'gloves',
    imageUrl: '/src/assets/gloves-1.jpg',
    inStock: true,
    featured: true,
    rating: 4.6,
    createdAt: '2023-07-05T10:00:00Z',
  },
  {
    id: '5',
    name: 'Junior Cricket Bat',
    description: 'Perfect cricket bat for junior players with proper weight distribution.',
    price: 7500,
    category: 'bat',
    imageUrl: '/src/assets/bat-2.jpg',
    inStock: true,
    discount: 10,
    rating: 4.3,
    createdAt: '2023-07-15T10:00:00Z',
  },
  {
    id: '6',
    name: 'Practice Cricket Ball',
    description: 'Durable practice cricket ball for training sessions.',
    price: 850,
    category: 'ball',
    imageUrl: '/src/assets/ball-2.jpg',
    inStock: true,
    rating: 4.2,
    createdAt: '2023-08-01T10:00:00Z',
  },
  {
    id: '7',
    name: 'Wicket Keeping Gloves',
    description: 'Professional wicket keeping gloves with optimal padding.',
    price: 4200,
    category: 'gloves',
    imageUrl: '/src/assets/gloves-2.jpg',
    inStock: true,
    rating: 4.4,
    createdAt: '2023-08-10T10:00:00Z',
  },
  {
    id: '8',
    name: 'Elite Batting Helmet',
    description: 'Advanced batting helmet with reinforced protection and comfort.',
    price: 6500,
    category: 'helmet',
    imageUrl: '/src/assets/helmet-1.jpg',
    inStock: true,
    featured: true,
    rating: 4.9,
    createdAt: '2023-08-20T10:00:00Z',
  },
  {
    id: '9',
    name: 'Cricket Jersey',
    description: 'Official cricket jersey with moisture-wicking fabric for maximum comfort.',
    price: 2500,
    category: 'apparel',
    imageUrl: '/src/assets/jersey-1.jpg',
    inStock: true,
    rating: 4.3,
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    id: '10',
    name: 'Cricket Shoes',
    description: 'High-performance cricket shoes with superior grip and comfort.',
    price: 8500,
    category: 'accessories',
    imageUrl: '/src/assets/shoes-1.jpg',
    inStock: true,
    discount: 15,
    rating: 4.7,
    createdAt: '2023-09-10T10:00:00Z',
  },
  {
    id: '11',
    name: 'Cricket Stumps Set',
    description: 'Complete set of high-quality wooden stumps with bails.',
    price: 4800,
    category: 'accessories',
    imageUrl: '/src/assets/stumps-1.jpg',
    inStock: true,
    rating: 4.5,
    createdAt: '2023-09-20T10:00:00Z',
  },
  {
    id: '12',
    name: 'Thigh Pad',
    description: 'Protective thigh pad for batsmen with comfortable fit.',
    price: 1500,
    category: 'pad',
    imageUrl: '/src/assets/thigh-pad-1.jpg',
    inStock: true,
    rating: 4.2,
    createdAt: '2023-10-01T10:00:00Z',
  },
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
