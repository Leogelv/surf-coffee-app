"use client";

import React from 'react';
import TelegramLayout from '@/components/layout/TelegramLayout';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function OrderSuccessPage() {
  // Номер заказа и время получения могут быть получены из параметров URL или состояния
  const orderNumber = "A-1234";
  const pickupTime = "14:30";
  
  return (
    <TelegramLayout>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold mx-auto">Заказ оформлен</h1>
        </header>
        
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Order Details */}
          <h2 className="text-2xl font-bold mb-2">Спасибо за заказ!</h2>
          <p className="text-gray-600 mb-6">
            Ваш заказ #{orderNumber} успешно оформлен и будет готов к {pickupTime}
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8 w-full max-w-md">
            <h3 className="font-semibold text-lg mb-4">Детали заказа</h3>
            
            {/* Pickup Location */}
            <div className="mb-4">
              <h4 className="text-sm text-gray-500 mb-1">Место получения</h4>
              <p className="font-medium">SURF COFFEE × LUMIERE</p>
              <p className="text-sm">Москва, пр-т Вернадского 29, БЦ Лето</p>
            </div>
            
            {/* Pickup Time */}
            <div className="mb-4">
              <h4 className="text-sm text-gray-500 mb-1">Время получения</h4>
              <p className="font-medium">Сегодня, {pickupTime}</p>
            </div>
            
            {/* Order Amount */}
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Сумма заказа</h4>
              <p className="font-medium">650 ₽</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-4">
            <Button
              fullWidth
              size="large"
              onClick={() => window.location.href = '/menu'}
            >
              Вернуться в меню
            </Button>
            
            <Button
              fullWidth
              variant="outline"
              size="large"
              onClick={() => {
                // В реальном приложении здесь бы была функция для связи с поддержкой
                alert('Связь с поддержкой');
              }}
            >
              Связаться с поддержкой
            </Button>
          </div>
        </motion.div>
      </div>
    </TelegramLayout>
  );
} 