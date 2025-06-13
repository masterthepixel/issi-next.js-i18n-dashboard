'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

// Products data moved outside component to follow React best practices
const allProducts = [
  {
    id: 1,
    title: 'Learning Management System',
    description: 'Comprehensive LMS platform for online education and training',
    category: 'E-Learning',
    icon: '📚',
    className: 'md:col-span-2',
  },
  {
    id: 2,
    title: 'Government Portal',
    description: 'Secure government services and citizen engagement platform',
    category: 'Government',
    icon: '🏛️',
    className: 'md:col-span-1',
  },
  {
    id: 3,
    title: 'Healthcare Management',
    description: 'Patient management and healthcare administration system',
    category: 'Healthcare',
    icon: '🏥',
    className: 'md:col-span-1',
  },
  {
    id: 4,
    title: 'Financial Analytics',
    description: 'Advanced financial reporting and analytics dashboard',
    category: 'Finance',
    icon: '💰',
    className: 'md:col-span-2',
  },
  {
    id: 5,
    title: 'Supply Chain Manager',
    description: 'End-to-end supply chain visibility and management',
    category: 'Enterprise',
    icon: '📦',
    className: 'md:col-span-1',
  },
  {
    id: 6,
    title: 'Data Visualization Suite',
    description: 'Interactive dashboards and business intelligence tools',
    category: 'Analytics',
    icon: '📊',
    className: 'md:col-span-1',
  },
]

interface ProductsBentoGridProps {
  lang: string
}

export default function ProductsBentoGrid({ lang }: ProductsBentoGridProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allProducts.map(product => product.category)))]

  // Filter products based on active filter
  const filteredProducts = activeFilter === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeFilter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
              'border border-gray-200 dark:border-gray-700',
              'hover:border-blue-500 dark:hover:border-blue-400',
              activeFilter === category
                ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <BentoGrid className="max-w-4xl mx-auto">
        {filteredProducts.map((product) => (
          <BentoGridItem
            key={product.id}
            title={product.title}
            description={product.description}
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
                <span className="text-4xl">{product.icon}</span>
              </div>
            }
            className={product.className}
          />
        ))}
      </BentoGrid>
    </div>
  )
}
