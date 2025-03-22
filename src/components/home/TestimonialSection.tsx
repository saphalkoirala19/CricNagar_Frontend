
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Bijay Sharma',
    role: 'Professional Cricketer',
    avatar: '/src/assets/testimonial-1.jpg',
    content: 'The quality of equipment I\'ve purchased from CricNagar has truly elevated my game. Their professional-grade bats have the perfect balance and pickup, giving me confidence at the crease.',
  },
  {
    id: 2,
    name: 'Aarav Patel',
    role: 'Cricket Coach',
    avatar: '/src/assets/testimonial-2.jpg',
    content: 'As a coach, I recommend CricNagar to all my students. Their junior equipment is well-designed for developing proper technique, and the staff provides excellent guidance for selecting the right gear.',
  },
  {
    id: 3,
    name: 'Priya Singh',
    role: 'Club Player',
    avatar: '/src/assets/testimonial-3.jpg',
    content: 'The protective gear from CricNagar offers superior comfort without compromising on safety. I\'ve been using their gloves and pads for years, and they\'ve stood the test of time through numerous matches.',
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Hear from customers who have experienced the quality and service of CricNagar
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -left-8 -top-8 opacity-30">
            <Quote size={64} className="text-primary" />
          </div>
          
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg">
            <div className="min-h-[200px] flex flex-col justify-between animate-fade-in">
              <p className="text-lg italic mb-8">{testimonials[currentIndex].content}</p>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <div className="absolute -bottom-4 right-4 flex space-x-2">
            <Button size="icon" variant="outline" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
