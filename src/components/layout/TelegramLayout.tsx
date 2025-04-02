"use client";

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@/hooks/useTelegram';

interface TelegramLayoutProps {
  children: ReactNode;
  noVerticalSwipe?: boolean;
  topPadding?: number;
  fullWidth?: boolean;
}

const TelegramLayout: React.FC<TelegramLayoutProps> = ({
  children,
  noVerticalSwipe = true,
  topPadding = 100,
  fullWidth = true,
}) => {
  const { isInTelegram } = useTelegram();
  const containerRef = useRef<HTMLDivElement>(null);

  // Обработка вертикальных свайпов только на клиенте
  useEffect(() => {
    if (typeof window === 'undefined' || !noVerticalSwipe || !containerRef.current) return;

    const container = containerRef.current;
    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
      if (keys[e.keyCode as keyof typeof keys]) {
        e.preventDefault();
        return false;
      }
      return true;
    };

    // Предотвращение вертикальных свайпов
    const preventVerticalSwipe = (e: TouchEvent) => {
      const touchStartY = e.touches[0].clientY;
      
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const touchY = moveEvent.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Если вертикальный свайп значительный, блокируем его
        if (Math.abs(deltaY) > 10) {
          moveEvent.preventDefault();
        }
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    // Применяем обработчики
    container.addEventListener('touchstart', preventVerticalSwipe, { passive: false });
    document.addEventListener('keydown', preventDefaultForScrollKeys, false);
    
    return () => {
      container.removeEventListener('touchstart', preventVerticalSwipe);
      document.removeEventListener('keydown', preventDefaultForScrollKeys);
    };
  }, [noVerticalSwipe]);

  return (
    <div 
      ref={containerRef}
      className={`telegram-layout ${fullWidth ? 'w-full' : 'max-w-md mx-auto'}`}
      style={{
        minHeight: '100vh',
        paddingTop: isInTelegram ? `${topPadding}px` : '0',
        overflowX: 'hidden',
        overflowY: noVerticalSwipe ? 'hidden' : 'auto',
        touchAction: noVerticalSwipe ? 'pan-x' : 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TelegramLayout; 