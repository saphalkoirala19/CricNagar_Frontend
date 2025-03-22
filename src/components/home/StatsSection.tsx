
import React from 'react';
import AnimatedCounter from '@/components/ui/animated-counter';

const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Our Success in Numbers</h2>
          <p className="opacity-80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            The trust of our customers and our commitment to quality speaks through our achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 animate-fade-in">
            <AnimatedCounter end={15000} suffix="+" className="text-4xl font-bold mb-2" />
            <p className="opacity-80">Happy Customers</p>
          </div>
          
          <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 animate-fade-in animation-delay-200">
            <AnimatedCounter end={500} suffix="+" className="text-4xl font-bold mb-2" />
            <p className="opacity-80">Products</p>
          </div>
          
          <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 animate-fade-in animation-delay-400">
            <AnimatedCounter end={10} suffix="+" className="text-4xl font-bold mb-2" />
            <p className="opacity-80">Years Experience</p>
          </div>
          
          <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 animate-fade-in animation-delay-600">
            <AnimatedCounter end={98} suffix="%" className="text-4xl font-bold mb-2" />
            <p className="opacity-80">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
