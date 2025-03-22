
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl animate-fade-in animation-delay-200">
              Discover our selection of premium cricket equipment trusted by professionals
              and enthusiasts alike. Quality craftsmanship for exceptional performance.
            </p>
          </div>
          
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="group animate-fade-in animation-delay-400">
              View All Products
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
