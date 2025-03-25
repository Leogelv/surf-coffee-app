import React, { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface WowScrollEffectProps {
  scrollY: MotionValue<number>;
  headerHeight: number;
  children: ReactNode;
  imageUrl?: string;
}

const WowScrollEffect: React.FC<WowScrollEffectProps> = ({
  scrollY,
  headerHeight,
  children,
  imageUrl,
}) => {
  // Трансформации для эффекта WOW при скролле
  const imageRadius = useTransform(
    scrollY,
    [0, headerHeight * 0.5, headerHeight],
    [0, 20, 100]
  );

  const imageSize = useTransform(
    scrollY,
    [0, headerHeight],
    [headerHeight, 80]
  );

  const imageX = useTransform(
    scrollY,
    [0, headerHeight],
    [0, 0]
  );

  const imageY = useTransform(
    scrollY,
    [0, headerHeight],
    [0, -headerHeight / 2 + 40]
  );

  const contentY = useTransform(
    scrollY,
    [0, headerHeight],
    [headerHeight, 0]
  );

  const opacity = useTransform(
    scrollY,
    [0, headerHeight * 0.4, headerHeight * 0.8],
    [1, 0.8, 0.7]
  );

  return (
    <div className="relative w-full" style={{ height: `${headerHeight * 2}px` }}>
      {/* Фиксированное изображение с эффектом трансформации */}
      {imageUrl && (
        <motion.div
          className="fixed top-0 left-0 w-full flex justify-center z-10"
          style={{
            height: imageSize,
            borderRadius: imageRadius,
            x: imageX,
            y: imageY,
            opacity,
            originX: 0.5,
            originY: 0.5,
          }}
        >
          <motion.div
            className="overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              width: imageSize,
              height: imageSize,
              borderRadius: imageRadius,
            }}
          />
        </motion.div>
      )}

      {/* Скроллируемый контент */}
      <motion.div
        className="absolute top-0 left-0 w-full z-20 bg-white rounded-t-3xl"
        style={{
          y: contentY,
          minHeight: `calc(100vh - ${headerHeight / 2}px)`,
        }}
      >
        <div className="w-full h-6 bg-white rounded-t-3xl"></div>
        {children}
      </motion.div>
    </div>
  );
};

export default WowScrollEffect;