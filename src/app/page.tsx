"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TelegramLayout from '@/components/layout/TelegramLayout';
import { useTelegram } from '@/hooks/useTelegram';

export default function Home() {
  const router = useRouter();
  const { getUserInfo, isInTelegram } = useTelegram();
  const user = getUserInfo();
  const [redirecting, setRedirecting] = useState(false);

  // Автоматический редирект на меню после 3 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirecting(true);
      router.push('/menu');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  // Определяем имя для приветствия
  const userName = user.firstName || user.username || 'Гость';

  return (
    <TelegramLayout fullWidth={true} topPadding={50}>
      <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 bg-blue-50">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src="https://static.tildacdn.com/tild6135-6261-4365-a530-373835323037/sc_logo_script.jpg" 
            alt="Surf Coffee Logo" 
            className="w-40 h-auto" 
          />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-center mb-3 text-blue-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Привет, {userName}!
        </motion.h1>
        
        <motion.p 
          className="text-center mb-8 text-gray-600 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Добро пожаловать в Surf Coffee! Океан удовольствия в каждой чашке ждет тебя.
        </motion.p>
        
        <div className="space-y-4 w-full max-w-xs">
          {redirecting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-blue-600"
            >
              Переходим в меню...
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link href="/menu">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Начать заказ
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/menu">
                  <button className="w-full bg-transparent border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Смотреть меню
                  </button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
        
        <motion.div
          className="mt-12 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          © 2024 Surf Coffee
        </motion.div>
      </div>
    </TelegramLayout>
  );
}
