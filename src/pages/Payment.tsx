
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Check, CreditCard, Calendar, ChevronsUpDown, User, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/ui/page-header';

const Payment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'Nepal',
    saveCard: false,
  });

  // Generate an array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  // Generate an array of next 10 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add a space after every 4 digits
    const formattedValue = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formattedValue.substring(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    });
  };

  const validateForm = () => {
    if (paymentMethod === 'card') {
      if (!formData.cardName) {
        toast({ title: "Error", description: "Please enter the cardholder name" });
        return false;
      }
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        toast({ title: "Error", description: "Please enter a valid 16-digit card number" });
        return false;
      }
      if (!formData.expiryMonth || !formData.expiryYear) {
        toast({ title: "Error", description: "Please select card expiry date" });
        return false;
      }
      if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
        toast({ title: "Error", description: "Please enter a valid CVV (3 or 4 digits)" });
        return false;
      }
    }
    
    if (!formData.billingAddress) {
      toast({ title: "Error", description: "Please enter your billing address" });
      return false;
    }
    if (!formData.city) {
      toast({ title: "Error", description: "Please enter your city" });
      return false;
    }
    if (!formData.postalCode) {
      toast({ title: "Error", description: "Please enter your postal code" });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
        variant: "default"
      });
      
      // Clear cart and redirect to home page
      clearCart();
      navigate('/');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20 pb-16">
        <PageHeader
          title="Checkout"
          description="Complete your purchase securely"
          className="container mx-auto px-4 py-6"
        />
        
        {items.length === 0 ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to your cart and come back to checkout.</p>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-medium">${(total * 0.13).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(total + total * 0.13).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Form */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-6">Payment Method</h3>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4 mb-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                      <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            className="pl-10"
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            className="pl-10"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Select
                              value={formData.expiryMonth}
                              onValueChange={(value) => handleSelectChange('expiryMonth', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Select
                              value={formData.expiryYear}
                              onValueChange={(value) => handleSelectChange('expiryYear', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="YY" />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="000"
                              className="pl-10"
                              maxLength={4}
                              value={formData.cvv}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-4">Billing Address</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        placeholder="123 Main St"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Biratnagar"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          placeholder="56613"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange('country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nepal">Nepal</SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                          <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="saveCard"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save my information for faster checkout
                      </Label>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Lock className="h-3 w-3 mr-1" />
                      Secure Payment
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full py-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">&#9696;</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ${(total + total * 0.13).toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default Payment;
