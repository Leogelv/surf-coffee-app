"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { categories, products } from '@/utils/mockData';
import TelegramLayout from '@/components/layout/TelegramLayout';
import TabBar from '@/components/ui/TabBar';
import ProductCard from '@/components/ui/ProductCard';
import CartButton from '@/components/ui/CartButton';
import { motion } from 'framer-motion';

export default function MenuPage() {
  return (
    <TelegramLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold">Surf Coffee</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </header>
        
        {/* Categories */}
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold mb-3">Категории</h2>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex space-x-3 pb-2">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex-shrink-0 w-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <a href={`#${category.id}`} className="block">
                    <div className="h-24 bg-gray-200 relative flex items-center justify-center">
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center text-gray-500 px-2">
                          {category.name}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium text-center truncate">{category.name}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products by Category */}
        <div className="px-4 py-2 flex-1">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{category.name}</h2>
              <div className="space-y-3">
                {products
                  .filter((product) => product.category === category.id)
                  .map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onPress={() => window.location.href = `/product/${product.id}`}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Button */}
        <CartButton />
      </div>
    </TelegramLayout>
  );
} 