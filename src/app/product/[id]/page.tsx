"use client";

import React from 'react';
import { products } from '@/utils/mockData';
import Button from '@/components/ui/Button';
import TelegramLayout from '@/components/layout/TelegramLayout';
import { motion } from 'framer-motion';
import { ModifierOption, ProductModifier } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <TelegramLayout>
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Товар не найден</h1>
          <p className="text-gray-600 mb-6">К сожалению, товар с указанным ID не найден</p>
          <a 
            href="/menu" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Вернуться в меню
          </a>
        </div>
      </TelegramLayout>
    );
  }

  // Client component for interactivity
  return (
    <TelegramLayout>
      <div className="relative min-h-screen">
        {/* Product Image Header */}
        <div 
          className="w-full h-80 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${product.imageUrl})`,
            height: '40vh'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <a
            href="/menu"
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          
          {product.popular && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Популярный выбор
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-blue-600">{product.price} ₽</span>
                {product.calories && (
                  <span className="ml-2 text-sm text-gray-500">{product.calories} ккал</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Модификаторы */}
            {product.modifiers && product.modifiers.length > 0 && (
              <div className="space-y-6 mb-8">
                {product.modifiers.map((modifier) => (
                  <ProductModifierSection 
                    key={modifier.id}
                    modifier={modifier}
                  />
                ))}
              </div>
            )}
            
            <div className="sticky bottom-0 left-0 right-0 bg-white pt-2 pb-8">
              <Button
                fullWidth
                size="large"
                onClick={() => {
                  // В клиентском компоненте будет работать
                  alert('Товар добавлен в корзину');
                  window.location.href = '/cart';
                }}
              >
                Добавить в корзину
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </TelegramLayout>
  );
}

// Это будет клиентский компонент в полной реализации
const ProductModifierSection = ({ modifier }: { modifier: ProductModifier }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        {modifier.name}
        {modifier.required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      <div className="space-y-2">
        {modifier.options.map((option) => (
          <ModifierOptionItem
            key={option.id}
            option={option}
            selected={option.default}
          />
        ))}
      </div>
    </div>
  );
};

// Это будет клиентский компонент в полной реализации
const ModifierOptionItem = ({ option, selected }: { option: ModifierOption, selected: boolean | undefined }) => {
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg border ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div>
        <p className="font-medium">{option.name}</p>
        {option.price > 0 && (
          <p className="text-sm text-gray-500">+{option.price} ₽</p>
        )}
      </div>
      {selected && (
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
}; 