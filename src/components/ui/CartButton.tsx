"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CartButtonProps {
  itemCount?: number;
  totalPrice?: number;
}

const CartButton: React.FC<CartButtonProps> = ({ 
  itemCount = 2, // Mock data for UI demo
  totalPrice = 650 // Mock data for UI demo
}) => {
  const hasItems = itemCount > 0;
  
  if (!hasItems) {
    return null;
  }
  
  return (
    <motion.div
      className="fixed bottom-6 left-0 right-0 px-4 z-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/cart">
        <motion.div
          className="bg-blue-600 text-white rounded-lg shadow-lg py-4 px-5 flex items-center justify-between w-full"
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span>{itemCount} {getItemsText(itemCount)}</span>
          </div>
          <div className="font-semibold">{totalPrice} ₽</div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Функция для склонения слова "товар" 
function getItemsText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'товар';
  } else if (
    [2, 3, 4].includes(lastDigit) && 
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return 'товара';
  } else {
    return 'товаров';
  }
}

export default CartButton; 