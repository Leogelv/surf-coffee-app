import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large' | 'full';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children" | "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  ...props
}) => {
  // Основные классы стилей для кнопки
  const baseClasses = 'flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none';
  
  // Варианты цветов
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300',
    secondary: 'bg-gray-100 text-blue-600 hover:bg-gray-200 active:bg-gray-300 disabled:text-gray-400',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-400',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-gray-400',
  };

  // Варианты размеров
  const sizeClasses = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6',
    full: 'text-base py-3 w-full',
  };

  // Анимация для кнопки
  const buttonAnimation = {
    tap: { scale: 0.98 },
    hover: { scale: 1.02 },
  };

  // Дополнительные классы в зависимости от пропсов
  const widthClass = fullWidth ? 'w-full' : '';
  const loadingClass = isLoading ? 'opacity-70 cursor-wait' : '';
  const disabledClass = props.disabled ? 'cursor-not-allowed' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingClass} ${disabledClass} ${className}`}
      whileTap="tap"
      whileHover="hover"
      variants={buttonAnimation}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button; 