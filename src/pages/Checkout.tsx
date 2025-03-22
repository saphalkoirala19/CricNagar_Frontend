
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Check, CreditCard, Calendar, User, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/ui/page-header';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Format price in NPR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate total
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.13; // 13% tax
  const total = subtotal + tax;

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: 'Biratnagar',
    province: 'Province 1',
    postalCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false,
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentInfo({
      ...paymentInfo,
      paymentMethod: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setPaymentInfo({
      ...paymentInfo,
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
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: formattedValue,
    });
  };

  const validateShippingInfo = () => {
    if (!shippingInfo.fullName) {
      toast({ title: "Error", description: "Please enter your full name" });
      return false;
    }
    if (!shippingInfo.address) {
      toast({ title: "Error", description: "Please enter your address" });
      return false;
    }
    if (!shippingInfo.city) {
      toast({ title: "Error", description: "Please enter your city" });
      return false;
    }
    if (!shippingInfo.postalCode) {
      toast({ title: "Error", description: "Please enter your postal code" });
      return false;
    }
    if (!shippingInfo.phone) {
      toast({ title: "Error", description: "Please enter your phone number" });
      return false;
    }
    return true;
  };

  const validatePaymentInfo = () => {
    if (paymentInfo.paymentMethod === 'card') {
      if (!paymentInfo.cardName) {
        toast({ title: "Error", description: "Please enter the cardholder name" });
        return false;
      }
      if (!paymentInfo.cardNumber || paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
        toast({ title: "Error", description: "Please enter a valid 16-digit card number" });
        return false;
      }
      if (!paymentInfo.expiryMonth || !paymentInfo.expiryYear) {
        toast({ title: "Error", description: "Please select card expiry date" });
        return false;
      }
      if (!paymentInfo.cvv || !/^\d{3,4}$/.test(paymentInfo.cvv)) {
        toast({ title: "Error", description: "Please enter a valid CVV (3 or 4 digits)" });
        return false;
      }
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      setActiveStep('payment');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentInfo()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be processed shortly.",
        variant: "default"
      });
      
      // Clear cart and redirect to home page
      clearCart();
      navigate('/');
    }, 2000);
  };

  // Generate an array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  // Generate an array of next 10 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 min-h-screen pt-28 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 min-h-screen pt-28">
        <PageHeader 
          title="Checkout" 
          description="Complete your order securely" 
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content - Checkout Steps */}
          <div className="lg:col-span-2">
            {/* Checkout Progress */}
            <div className="flex mb-8">
              <div className={`flex-1 text-center ${activeStep === 'shipping' ? 'border-b-2 border-primary' : 'border-b border-gray-200'}`}>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${activeStep === 'shipping' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  1
                </span>
                <p className={activeStep === 'shipping' ? 'font-medium' : 'text-muted-foreground'}>Shipping</p>
              </div>
              <div className={`flex-1 text-center ${activeStep === 'payment' ? 'border-b-2 border-primary' : 'border-b border-gray-200'}`}>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${activeStep === 'payment' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  2
                </span>
                <p className={activeStep === 'payment' ? 'font-medium' : 'text-muted-foreground'}>Payment</p>
              </div>
            </div>

            {/* Shipping Information */}
            {activeStep === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="Biratnagar"
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province</Label>
                      <Select 
                        defaultValue={shippingInfo.province}
                        onValueChange={(value) => setShippingInfo({...shippingInfo, province: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Province 1">Province 1</SelectItem>
                          <SelectItem value="Madhesh">Madhesh</SelectItem>
                          <SelectItem value="Bagmati">Bagmati</SelectItem>
                          <SelectItem value="Gandaki">Gandaki</SelectItem>
                          <SelectItem value="Lumbini">Lumbini</SelectItem>
                          <SelectItem value="Karnali">Karnali</SelectItem>
                          <SelectItem value="Sudurpashchim">Sudurpashchim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        name="postalCode" 
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        placeholder="56613"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleContinueToPayment}>
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Payment Information */}
            {activeStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your payment method and enter details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup 
                    value={paymentInfo.paymentMethod} 
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                      <Label htmlFor="cashOnDelivery" className="cursor-pointer">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentInfo.paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            className="pl-10"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
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
                            value={paymentInfo.cardNumber}
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
                              value={paymentInfo.expiryMonth}
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
                              value={paymentInfo.expiryYear}
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
                              value={paymentInfo.cvv}
                              onChange={handlePaymentChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveCard"
                      checked={paymentInfo.saveCard}
                      onChange={handlePaymentChange}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="saveInfo" className="text-sm cursor-pointer">
                      Save my payment information for faster checkout next time
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveStep('shipping')}>
                    Back to Shipping
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">&#9696;</span>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}

                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (13%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
