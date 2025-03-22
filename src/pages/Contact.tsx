
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/ui/page-header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: 'We have received your message and will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20">
        <PageHeader
          title="Contact Us"
          description="Get in touch with our team for any inquiries or assistance"
          className="container mx-auto px-4 py-12"
        />
        
        <section className="container mx-auto px-4 py-6 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-in">
              <div className="bg-card p-6 rounded-lg shadow-sm h-full">
                <div className="flex mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Cricket Street<br />
                      Kathmandu, Nepal
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in animation-delay-200">
              <div className="bg-card p-6 rounded-lg shadow-sm h-full">
                <div className="flex mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Phone Number</h3>
                    <p className="text-muted-foreground">
                      +977 1234567890<br />
                      +977 9876543210
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <div className="bg-card p-6 rounded-lg shadow-sm h-full">
                <div className="flex mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Address</h3>
                    <p className="text-muted-foreground">
                      info@cricnagar.com<br />
                      support@cricnagar.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-6 mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here..."
                    rows={6}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">&#9696;</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <h2 className="text-2xl font-bold mb-6">Store Hours</h2>
              <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-bold">Monday - Friday</h3>
                      <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-bold">Saturday</h3>
                      <p className="text-muted-foreground">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-bold">Sunday</h3>
                      <p className="text-muted-foreground">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="rounded-lg overflow-hidden h-[300px] shadow-sm">
                {/* Embed Google Maps iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27776845128!2d85.28493158324855!3d27.709856622029446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1686779112123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CricNagar Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6 animate-fade-in">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-200">
              Our customer support team is available to help you with any questions or concerns 
              about our products, orders, or services.
            </p>
            <div className="flex justify-center animate-fade-in animation-delay-400">
              <Button size="lg" variant="default">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
