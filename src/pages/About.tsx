
import React, { useEffect, useRef } from 'react';
import PageHeader from '@/components/ui/page-header';
import ParallaxSection from '@/components/ui/parallax-section';
import AnimatedCounter from '@/components/ui/animated-counter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
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
      
      <main className="min-h-screen pt-20">
        <PageHeader
          title="About CricNagar"
          description="Learn about our journey and commitment to cricket excellence"
          className="container mx-auto px-4 py-12"
        />
        
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-6 animate-on-scroll opacity-0">Our Story</h2>
              <p className="mb-4 animate-on-scroll opacity-0">
                Founded in 2013, CricNagar began as a small shop with a big dream: to provide 
                high-quality cricket equipment to enthusiasts in Nepal. What started as a 
                passion project quickly grew into one of the country's most trusted cricket 
                equipment retailers.
              </p>
              <p className="mb-4 animate-on-scroll opacity-0">
                Our journey has been guided by our love for cricket and our commitment to 
                excellence. We believe that every player, from beginners to professionals, 
                deserves access to high-quality equipment that enhances their performance and 
                keeps them safe on the field.
              </p>
              <p className="animate-on-scroll opacity-0">
                Today, CricNagar stands as a premier destination for cricket gear, serving 
                thousands of customers across Nepal and beyond. Our success is built on our 
                dedication to quality, our expertise in cricket equipment, and our unwavering 
                customer service.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg animate-on-scroll opacity-0">
              <img
                src="/src/assets/about-store.jpg"
                alt="CricNagar store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        <ParallaxSection
          bgImage="/src/assets/about-parallax.jpg"
          className="py-24"
        >
          <div className="container mx-auto px-4 text-white text-center">
            <h2 className="text-3xl font-bold mb-12 animate-fade-in">
              Our Mission & Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-fade-in animation-delay-200">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏏</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Quality Excellence</h3>
                <p className="opacity-90">
                  We are committed to offering only the highest quality cricket equipment. 
                  Every product in our store undergoes rigorous quality checks to ensure it 
                  meets our standards of excellence.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-fade-in animation-delay-400">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Customer First</h3>
                <p className="opacity-90">
                  Our customers are at the heart of everything we do. We are dedicated to 
                  providing exceptional service, expert advice, and a seamless shopping 
                  experience both online and in-store.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-fade-in animation-delay-600">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Growing Cricket</h3>
                <p className="opacity-90">
                  We are passionate about growing the sport of cricket in Nepal. Through 
                  sponsorships, community events, and youth programs, we are committed to 
                  nurturing the next generation of cricket players.
                </p>
              </div>
            </div>
          </div>
        </ParallaxSection>
        
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-12 text-center animate-on-scroll opacity-0">
            Why Choose CricNagar?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center animate-on-scroll opacity-0">
              <AnimatedCounter end={15000} suffix="+" className="text-4xl font-bold mb-2" />
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0">
              <AnimatedCounter end={500} suffix="+" className="text-4xl font-bold mb-2" />
              <p className="text-muted-foreground">Products</p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0">
              <AnimatedCounter end={10} suffix="+" className="text-4xl font-bold mb-2" />
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0">
              <AnimatedCounter end={98} suffix="%" className="text-4xl font-bold mb-2" />
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-bold mb-4">Expert Advice</h3>
              <p className="text-muted-foreground">
                Our team consists of cricket enthusiasts with extensive knowledge of the game and 
                its equipment. Whether you're a beginner looking for your first bat or a professional 
                seeking specialized gear, we're here to provide expert advice tailored to your needs.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                We partner with renowned cricket equipment manufacturers and brands to bring you 
                products of the highest quality. Each item in our store is carefully selected to 
                ensure it meets our standards of durability, performance, and safety.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-bold mb-4">Community Engagement</h3>
              <p className="text-muted-foreground">
                CricNagar is more than just a store; we're an active part of the cricket community. 
                We sponsor local tournaments, support youth development programs, and organize events 
                to promote the sport and bring cricket enthusiasts together.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center animate-on-scroll opacity-0">
              Meet Our Team
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card shadow-md rounded-xl overflow-hidden animate-on-scroll opacity-0">
                <img
                  src="/src/assets/team-1.jpg"
                  alt="Rajesh Sharma"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Rajesh Sharma</h3>
                  <p className="text-sm text-muted-foreground mb-4">Founder & CEO</p>
                  <p className="text-sm">
                    A former national cricket player with a passion for the sport and business. 
                    Rajesh founded CricNagar with a vision to provide high-quality cricket equipment 
                    to players across Nepal.
                  </p>
                </div>
              </div>
              
              <div className="bg-card shadow-md rounded-xl overflow-hidden animate-on-scroll opacity-0">
                <img
                  src="/src/assets/team-2.jpg"
                  alt="Priya Patel"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Priya Patel</h3>
                  <p className="text-sm text-muted-foreground mb-4">Operations Manager</p>
                  <p className="text-sm">
                    With over 15 years of experience in retail management, Priya ensures that 
                    CricNagar runs smoothly. She is dedicated to maintaining our high standards 
                    of customer service and operational excellence.
                  </p>
                </div>
              </div>
              
              <div className="bg-card shadow-md rounded-xl overflow-hidden animate-on-scroll opacity-0">
                <img
                  src="/src/assets/team-3.jpg"
                  alt="Anil Gurung"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Anil Gurung</h3>
                  <p className="text-sm text-muted-foreground mb-4">Cricket Equipment Specialist</p>
                  <p className="text-sm">
                    A cricket enthusiast with deep knowledge of equipment and techniques. Anil is our 
                    go-to expert for product recommendations and technical advice. His passion for 
                    the sport is evident in every interaction with customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
