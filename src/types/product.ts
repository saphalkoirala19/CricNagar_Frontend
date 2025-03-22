
export type ProductCategory = 'bat' | 'ball' | 'pad' | 'gloves' | 'helmet' | 'apparel' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
  rating?: number;
  createdAt: string;
}

export const PRODUCT_CATEGORIES: { label: string; value: ProductCategory; icon: string }[] = [
  { label: 'Bats', value: 'bat', icon: '🏏' },
  { label: 'Balls', value: 'ball', icon: '🏐' },
  { label: 'Pads', value: 'pad', icon: '🛡️' },
  { label: 'Gloves', value: 'gloves', icon: '🧤' },
  { label: 'Helmets', value: 'helmet', icon: '⛑️' },
  { label: 'Apparel', value: 'apparel', icon: '👕' },
  { label: 'Accessories', value: 'accessories', icon: '🎒' },
];
