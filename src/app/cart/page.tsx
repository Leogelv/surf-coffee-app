"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TelegramLayout from '@/components/layout/TelegramLayout';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  // Это будет клиентский компонент 
  // Здесь создаем макет для серверного рендеринга
  return (
    <TelegramLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center sticky top-0 z-10">
          <a href="/menu" className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-xl font-bold">Корзина</h1>
        </header>
        
        {/* Cart Content - это будет заменено на клиентском компоненте */}
        <div className="flex-1 p-4">
          <CartContent />
        </div>
      </div>
    </TelegramLayout>
  );
}

// Клиентский компонент для корзины
function CartContent() {
  // В реальном приложении будет использоваться store
  const mockCartItems = [
    {
      id: '1',
      product: {
        id: 'cappuccino',
        name: 'Капучино',
        price: 260,
        imageUrl: '/assets/images/cappuccino.jpg',
      },
      quantity: 1,
      modifiers: 'S, Обычное молоко',
      totalPrice: 260
    },
    {
      id: '2',
      product: {
        id: 'panini-con-carne',
        name: 'Кон Карне',
        price: 390,
        imageUrl: '/assets/images/panini-con-carne.jpg',
      },
      quantity: 1,
      modifiers: '',
      totalPrice: 390
    }
  ];
  
  const totalPrice = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const isEmpty = mockCartItems.length === 0;
  
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Ваша корзина пуста</h2>
        <p className="text-gray-500 mb-6">Добавьте что-нибудь из меню, чтобы сделать заказ</p>
        <a href="/menu" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
          Перейти в меню
        </a>
      </div>
    );
  }
  
  return (
    <div>
      <AnimatePresence>
        <div className="mb-6">
          {mockCartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex-shrink-0">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <span className="font-semibold text-blue-600">{item.totalPrice} ₽</span>
                  </div>
                  
                  {item.modifiers && (
                    <p className="text-xs text-gray-500 mt-1">{item.modifiers}</p>
                  )}
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
                        +
                      </button>
                    </div>
                    
                    <button className="text-red-500 hover:text-red-700 text-sm">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Сумма заказа</span>
          <span className="font-medium">{totalPrice} ₽</span>
        </div>
      </div>
      
      <div className="pt-4 pb-8">
        <Button
          fullWidth
          size="large"
          onClick={() => {
            window.location.href = '/checkout';
          }}
        >
          Оформить заказ
        </Button>
        
        <a href="/menu" className="mt-3 block text-center text-blue-600 font-medium">
          Добавить еще товары
        </a>
      </div>
    </div>
  );
} 