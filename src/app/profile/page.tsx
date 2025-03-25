"use client";

import React from 'react';
import TelegramLayout from '@/components/layout/TelegramLayout';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  // Данные пользователя могут быть получены из хранилища состояний или API
  const user = {
    name: 'Александр',
    phone: '+7 (999) 123-45-67',
    bonusPoints: 320,
    favoriteLocations: [
      {
        id: '1',
        name: 'SURF COFFEE × LUMIERE',
        address: 'Москва, пр-т Вернадского 29, БЦ Лето'
      }
    ]
  };
  
  // Данные о заказах пользователя
  const orders = [
    {
      id: 'A-1234',
      date: '12 июня 2023',
      time: '14:30',
      status: 'completed',
      location: 'SURF COFFEE × LUMIERE',
      total: 650
    },
    {
      id: 'A-1156',
      date: '5 июня 2023',
      time: '10:15',
      status: 'completed',
      location: 'SURF COFFEE × CENTRE',
      total: 480
    }
  ];
  
  return (
    <TelegramLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold mx-auto">Профиль</h1>
        </header>
        
        <div className="p-4">
          {/* User Info */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-5 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 mt-1">{user.phone}</p>
              </div>
              <button className="text-blue-600 text-sm">
                Изменить
              </button>
            </div>
            
            <div className="mt-4 py-3 px-4 bg-blue-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Бонусы</p>
                <p className="text-xl font-semibold text-blue-600">{user.bonusPoints}</p>
              </div>
              <button className="text-blue-600 text-sm">
                История →
              </button>
            </div>
          </motion.div>
          
          {/* Favorite Locations */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-5 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-3">Избранные кофейни</h2>
            
            {user.favoriteLocations.length > 0 ? (
              <div className="space-y-3">
                {user.favoriteLocations.map(location => (
                  <div key={location.id} className="border border-gray-100 rounded-lg p-3">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">У вас пока нет избранных кофеен</p>
            )}
          </motion.div>
          
          {/* Order History */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-5 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">История заказов</h2>
              {orders.length > 2 && (
                <button className="text-blue-600 text-sm">
                  Все заказы
                </button>
              )}
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Заказ #{order.id}</h3>
                      <span className="text-sm text-green-600">Выполнен</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.date} в {order.time} • {order.location}
                    </p>
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-sm">Сумма</span>
                      <span className="font-medium">{order.total} ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">У вас пока нет заказов</p>
            )}
          </motion.div>
          
          {/* Logout Button */}
          <div className="mt-6 mb-8">
            <Button
              variant="outline"
              fullWidth
              size="large"
              onClick={() => {
                // В реальном приложении здесь был бы выход из аккаунта
                alert('Выход из аккаунта');
              }}
            >
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </div>
    </TelegramLayout>
  );
} 