
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS, getProductsByCategory, searchProducts } from '@/data/products';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid';
import PageHeader from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  
  // Initialize state from URL params on mount
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | 'all' || 'all';
    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort') || 'featured';
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 20000;
    
    setSelectedCategory(category);
    setSearchQuery(query);
    setSortBy(sort);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);
  
  // Update filtered products whenever filters change
  useEffect(() => {
    let result = [...MOCK_PRODUCTS];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery).filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
      );
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    result = sortProducts(result, sortBy);
    
    setFilteredProducts(result);
    
    // Update URL params
    const params: Record<string, string> = {};
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (searchQuery) params.query = searchQuery;
    if (sortBy !== 'featured') params.sort = sortBy;
    if (priceRange[0] > 0) params.minPrice = priceRange[0].toString();
    if (priceRange[1] < 20000) params.maxPrice = priceRange[1].toString();
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, searchQuery, priceRange, sortBy, setSearchParams]);
  
  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'rating':
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'featured':
      default:
        return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };
  
  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
  };
  
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 20000]);
    setSortBy('featured');
    setSearchParams({});
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <PageHeader 
            title="Cricket Equipment" 
            description="Browse our comprehensive collection of high-quality cricket gear"
          />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            
            <div className="flex flex-wrap items-center gap-2 animate-fade-in animation-delay-200">
              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Categories</h3>
                      <div className="space-y-1.5">
                        <Button
                          variant={selectedCategory === 'all' ? 'default' : 'outline'}
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => handleCategoryChange('all')}
                        >
                          All
                        </Button>
                        {PRODUCT_CATEGORIES.map((category) => (
                          <Button
                            key={category.value}
                            variant={
                              selectedCategory === category.value ? 'default' : 'outline'
                            }
                            size="sm"
                            className="mr-2 mb-2"
                            onClick={() => handleCategoryChange(category.value)}
                          >
                            {category.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={priceRange}
                          max={20000}
                          step={500}
                          value={priceRange}
                          onValueChange={handlePriceChange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>NPR {priceRange[0].toLocaleString()}</span>
                          <span>NPR {priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <SheetClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </SheetClose>
                      
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Clear Filters Button - Only show if filters are applied */}
              {(selectedCategory !== 'all' || searchQuery || priceRange[0] > 0 || priceRange[1] < 20000) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-2 mb-6 animate-fade-in animation-delay-400">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryChange('all')}
            >
              All Products
            </Button>
            {PRODUCT_CATEGORIES.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.icon} {category.label}
              </Button>
            ))}
          </div>
          
          {/* Price Range - Desktop Only */}
          <div className="hidden md:block mb-8 max-w-md animate-fade-in animation-delay-600">
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                max={20000}
                step={500}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>NPR {priceRange[0].toLocaleString()}</span>
                <span>NPR {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6 animate-fade-in">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={handleClearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Products;
