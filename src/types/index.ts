export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  calories?: number;
  modifiers?: ProductModifier[];
  popular?: boolean;
}

export interface ProductModifier {
  id: string;
  name: string;
  required: boolean;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  default?: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedModifiers: {
    [modifierId: string]: ModifierOption;
  };
  totalPrice: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'new' | 'processing' | 'ready' | 'completed' | 'cancelled';
  location: Location;
  pickupTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: string;
  phone?: string;
  bonusPoints?: number;
  favoriteProducts?: string[];
  orders?: Order[];
} 