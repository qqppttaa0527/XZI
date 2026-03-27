export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'TV' | 'Computer' | 'Monitor';
  price: number;
  description: string;
  image: string;
  specs: string[];
  badge?: 'NEW' | 'HOT' | 'SALE';
}

export interface CartItem extends Product {
  quantity: number;
}
