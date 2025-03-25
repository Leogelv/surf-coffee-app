import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ModifierOption } from '@/types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, selectedModifiers: { [modifierId: string]: ModifierOption }, quantity?: number) => void;
  removeFromCart: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const calculateItemPrice = (product: Product, selectedModifiers: { [modifierId: string]: ModifierOption }, quantity: number) => {
  const basePrice = product.price;
  const modifiersPrice = Object.values(selectedModifiers).reduce((sum, option) => sum + option.price, 0);
  return (basePrice + modifiersPrice) * quantity;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, selectedModifiers, quantity = 1) => {
        set((state) => {
          const totalPrice = calculateItemPrice(product, selectedModifiers, quantity);
          
          // Find if the same product with same modifiers already exists
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.product.id === product.id && 
              JSON.stringify(item.selectedModifiers) === JSON.stringify(selectedModifiers)
          );
          
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            const newItems = [...state.items];
            const newQuantity = newItems[existingItemIndex].quantity + quantity;
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newQuantity,
              totalPrice: calculateItemPrice(product, selectedModifiers, newQuantity)
            };
            return { items: newItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedModifiers,
                  totalPrice
                }
              ]
            };
          }
        });
      },
      
      removeFromCart: (itemIndex) => {
        set((state) => ({
          items: state.items.filter((_, index) => index !== itemIndex)
        }));
      },
      
      updateQuantity: (itemIndex, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((_, index) => index !== itemIndex)
            };
          }
          
          const newItems = [...state.items];
          const item = newItems[itemIndex];
          newItems[itemIndex] = {
            ...item,
            quantity,
            totalPrice: calculateItemPrice(item.product, item.selectedModifiers, quantity)
          };
          
          return { items: newItems };
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'surf-coffee-cart',
    }
  )
); 