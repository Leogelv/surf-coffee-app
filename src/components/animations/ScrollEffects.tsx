import React, { ReactNode, useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

interface ScrollEffectsProps {
  children: ReactNode;
  headerComponent: ReactNode;
  headerHeight: number;
  onScroll?: (scrollY: MotionValue<number>) => void;
  disableVerticalSwipe?: boolean;
  backgroundColor?: string;
}

const ScrollEffects: React.FC<ScrollEffectsProps> = ({
  children,
  headerComponent,
  headerHeight,
  onScroll,
  disableVerticalSwipe = false,
  backgroundColor = 'white',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  
  // Эффекты для хедера
  const headerScale = useTransform(scrollY, [-100, 0], [1.2, 1]);
  const headerOpacity = useTransform(scrollY, [0, headerHeight / 2, headerHeight], [1, 0.8, 0.6]);
  const headerY = useTransform(scrollY, [0, headerHeight], [0, headerHeight * 0.3]);
  
  // Эффект для контента
  const contentOffsetY = useTransform(scrollY, [0, headerHeight], [headerHeight, 0]);
  
  // Вызов callback с текущим скроллом
  if (onScroll) {
    onScroll(scrollY);
  }

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{ 
        backgroundColor, 
        overflowX: 'hidden',
        touchAction: disableVerticalSwipe ? 'pan-x' : 'auto',
      }}
    >
      {/* Фиксированный хедер с параллакс эффектом */}
      <motion.div
        className="fixed top-0 left-0 w-full z-20 overflow-hidden"
        style={{ 
          height: headerHeight,
          scale: headerScale,
          opacity: headerOpacity,
          y: headerY,
        }}
      >
        {headerComponent}
      </motion.div>
      
      {/* Скроллируемый контент */}
      <motion.div 
        className="relative z-10 bg-white rounded-t-3xl"
        style={{ 
          marginTop: headerHeight,
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <div className="w-full h-6 bg-white rounded-t-3xl -mt-6"></div>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollEffects; 