import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true);
      try {
        const foundProduct = getProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Get related products (same category, excluding current product)
          const related = getProductsByCategory(foundProduct.category)
            .filter(p => p.id !== foundProduct.id)
            .slice(0, 4);
          
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
    
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  // Format price in NPR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Find category label
  const getCategoryLabel = (categoryValue) => {
    const category = PRODUCT_CATEGORIES.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Calculate discounted price
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  
  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 min-h-screen pt-28">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8 animate-fade-in">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.category}`}>
              {getCategoryLabel(product.category)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center p-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[500px] w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="animate-fade-in animation-delay-200">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {product.rating && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              {product.discount ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-3">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-3 bg-destructive text-white px-2 py-1 rounded-md text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <div className="mb-8">
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">Category:</span>
                <Link
                  to={`/products/${product.category}`}
                  className="text-primary hover:underline"
                >
                  {getCategoryLabel(product.category)}
                </Link>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Link to="/checkout" onClick={() => addItem(product, quantity)}>
                <Button size="lg" variant="secondary" className="flex-1 sm:flex-none">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="animate-fade-in animation-delay-400">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
};

// Helper function to get related products
const getProductsByCategory = (category) => {
  return getProductById
    ? getProductById('1')?.category === category
      ? [getProductById('1')]
      : []
    : [];
};

export default ProductDetail;
