"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from './Card';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onPress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex"
      onClick={onPress}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
    >
      {/* Изображение продукта */}
      <div className="w-24 h-24 bg-gray-200 relative flex-shrink-0 flex items-center justify-center">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHXv7SlwAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="text-gray-400 text-xs text-center">Нет фото</div>
        )}
        {product.popular && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-sm font-medium z-10">
            Хит
          </div>
        )}
      </div>
      
      {/* Информация о продукте */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-blue-600">{product.price} ₽</span>
          <button 
            className="p-1.5 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // В клиентском компоненте здесь будет функция добавления в корзину
              alert(`Добавлено в корзину: ${product.name}`);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 