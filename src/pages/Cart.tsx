
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/ui/page-header';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  
  // Format price in NPR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container mx-auto px-4 py-12">
            <PageHeader title="Your Cart" />
            
            <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
              <ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-20" />
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button size="lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 py-12">
          <PageHeader title="Your Cart" />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 animate-fade-in">
              <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    
                    return (
                      <div key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-bold hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <span className="font-bold">
                              {formatPrice(itemTotal)}
                            </span>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-4">
                            {formatPrice(item.product.price)} each
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.product.id,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-12 h-8 text-center border-0"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="animate-fade-in animation-delay-200">
              <div className="bg-card rounded-lg shadow-sm sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Including VAT
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center mt-4">
                    <Link to="/products" className="text-primary hover:underline text-sm">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
