
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/src/assets/hero-bg.jpg)',
          backgroundPosition: 'center 30%' 
        }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-16">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fade-in">
            Premium Cricket Equipment
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in animation-delay-200">
            Elevate Your Game With Quality Gear
          </h1>
          
          <p className="text-lg text-white/90 mb-8 animate-fade-in animation-delay-400">
            Professional-grade cricket equipment for players at every level. 
            From premium bats to specialized protective gear, experience 
            the best in cricket accessories.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-600">
            <Link to="/products">
              <Button size="lg" className="rounded-md">
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 rounded-md">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-80">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-3">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
