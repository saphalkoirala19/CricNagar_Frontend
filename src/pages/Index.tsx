
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import TestimonialSection from '@/components/home/TestimonialSection';
import StatsSection from '@/components/home/StatsSection';
import ParallaxSection from '@/components/ui/parallax-section';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Helper function to handle scroll animations
  const observeElements = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return observer;
  };

  useEffect(() => {
    const observer = observeElements();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      
      <main>
        <Hero />
        
        <FeaturedProducts />
        
        <CategorySection />
        
        <ParallaxSection
          bgImage="/src/assets/parallax-bg.jpg"
          className="py-24 px-4 text-white"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Professional Quality for Every Player
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-200">
              Whether you're a professional athlete or an enthusiastic beginner,
              we have the perfect cricket equipment for your needs.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 animate-fade-in animation-delay-400">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </ParallaxSection>
        
        <TestimonialSection />
        
        <StatsSection />
        
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 animate-on-scroll opacity-0">
                  Premium Cricket Equipment for Every Player
                </h2>
                <p className="text-muted-foreground mb-6 animate-on-scroll opacity-0">
                  At CricNagar, we believe that quality equipment is essential for improving 
                  your game. Our carefully selected range of cricket bats, balls, pads, 
                  gloves, and accessories are designed to enhance your performance and provide 
                  the protection you need on the field.
                </p>
                <p className="text-muted-foreground mb-6 animate-on-scroll opacity-0">
                  With extensive experience in the cricket industry, we offer expert advice 
                  to help you choose the right equipment for your playing style and level.
                </p>
                <div className="animate-on-scroll opacity-0">
                  <Link to="/about">
                    <Button>Learn More About Us</Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg animate-on-scroll opacity-0">
                <img 
                  src="/src/assets/about-preview.jpg" 
                  alt="Cricket equipment" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 animate-on-scroll opacity-0">
              Ready to Elevate Your Cricket Game?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
              Explore our premium collection of cricket equipment and take your game to the next level.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-on-scroll opacity-0">
              <Link to="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
