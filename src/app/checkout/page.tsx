"use client";

import React from 'react';
import TelegramLayout from '@/components/layout/TelegramLayout';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { locations } from '@/utils/mockData';

export default function CheckoutPage() {
  return (
    <TelegramLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center sticky top-0 z-10">
          <a href="/cart" className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-xl font-bold">Оформление заказа</h1>
        </header>
        
        {/* Checkout Form */}
        <div className="flex-1 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Выбор кофейни */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="text-lg font-semibold mb-3">Выберите кофейню</h2>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div 
                    key={location.id}
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                    <div className="flex text-xs text-gray-500 mt-2">
                      <div className="mr-4">
                        <span className="font-medium">Пн-Пт:</span> {location.workingHours['Пн-Пт']?.open}-{location.workingHours['Пн-Пт']?.close}
                      </div>
                      {location.workingHours['Сб-Вс'] && (
                        <div>
                          <span className="font-medium">Сб-Вс:</span> {location.workingHours['Сб-Вс'].open}-{location.workingHours['Сб-Вс'].close}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Выбор времени */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="text-lg font-semibold mb-3">Время получения</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Как можно скорее</span>
                  </div>
                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Выбрать время</span>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Способ оплаты */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="text-lg font-semibold mb-3">Способ оплаты</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Онлайн оплата</span>
                  </div>
                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span>Оплата при получении</span>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Детали заказа */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="text-lg font-semibold mb-3">Детали заказа</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Сумма заказа</span>
                  <span className="font-medium">650 ₽</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Итого к оплате</span>
                    <span className="text-blue-600">650 ₽</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Кнопка заказа */}
            <div className="pt-4 pb-8">
              <Button
                fullWidth
                size="large"
                onClick={() => {
                  // В клиентском компоненте будет переход на успешное оформление
                  alert('Заказ успешно оформлен!');
                  window.location.href = '/menu';
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </TelegramLayout>
  );
} 