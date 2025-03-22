
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const animationDelay = `animation-delay-${(index % 5) * 200}`;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  // Format price in NPR
  const formattedPrice = new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(product.price);
  
  // Calculate discounted price
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  
  const formattedDiscountedPrice = new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(discountedPrice);

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={`product-card h-full overflow-hidden animate-fade-in ${animationDelay}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-destructive text-white">
              {product.discount}% OFF
            </Badge>
          )}
          {product.featured && !product.discount && (
            <Badge className="absolute top-2 right-2">Featured</Badge>
          )}
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-base truncate">{product.name}</CardTitle>
          <CardDescription className="flex items-center">
            {product.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-lg">
              {product.discount ? formattedDiscountedPrice : formattedPrice}
            </span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through">
                {formattedPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
