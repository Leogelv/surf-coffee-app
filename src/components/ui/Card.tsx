import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

export type CardElevation = 'none' | 'small' | 'medium' | 'large';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

interface CardProps extends MotionProps {
  children: ReactNode;
  elevation?: CardElevation;
  padding?: CardPadding;
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  elevation = 'small',
  padding = 'medium',
  backgroundColor = 'white',
  borderRadius = 12,
  className = '',
  onClick,
  ...motionProps
}) => {
  // Настройки тени для разных уровней elevation
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg',
  };

  // Настройки отступов
  const paddingClasses = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  // Анимация для карточки при клике
  const tapAnimation = onClick ? { scale: 0.98 } : {};

  return (
    <motion.div
      className={`card overflow-hidden ${shadowClasses[elevation]} ${paddingClasses[padding]} ${className}`}
      style={{ 
        backgroundColor,
        borderRadius: `${borderRadius}px`,
      }}
      whileTap={onClick ? tapAnimation : undefined}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card; 