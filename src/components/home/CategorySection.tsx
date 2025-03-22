
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '@/types/product';

const CategorySection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">
            Shop By Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Explore our wide range of cricket equipment categories to find exactly what you need
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <Link
              key={category.value}
              to={`/products/${category.value}`}
              className={`group relative overflow-hidden rounded-lg shadow-md h-48 animate-fade-in animation-delay-${index * 200}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/src/assets/category-${category.value}.jpg)` }}
              ></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <span className="text-5xl mb-2">{category.icon}</span>
                <h3 className="text-xl font-bold mb-2">{category.label}</h3>
                <div className="w-12 h-1 bg-white/70 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
