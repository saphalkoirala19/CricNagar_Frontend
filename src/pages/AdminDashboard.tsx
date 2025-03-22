
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PRODUCTS } from '@/data/products';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import PageHeader from '@/components/ui/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Edit, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '' as ProductCategory,
    imageUrl: '',
    inStock: true,
    featured: false,
    createdAt: '',
  });
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productId = `product-${Date.now()}`;
    const createdDate = new Date().toISOString();
    
    const product = {
      ...newProduct,
      id: productId,
      createdAt: createdDate,
    };
    
    setProducts((prevProducts) => [...prevProducts, product]);
    
    toast({
      title: 'Product Added',
      description: `"${product.name}" has been added successfully.`,
    });
    
    // Reset form
    setNewProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: '' as ProductCategory,
      imageUrl: '',
      inStock: true,
      featured: false,
      createdAt: '',
    });
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    
    toast({
      title: 'Product Deleted',
      description: 'The product has been removed successfully.',
    });
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 py-12">
          <PageHeader title="Admin Dashboard" description="Manage your products and store" />
          
          <Tabs defaultValue="products" className="space-y-8">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add-product">Add Product</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Products</CardTitle>
                  <CardDescription>
                    View, edit or delete your products. You have {products.length} products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted">
                        <tr>
                          <th className="px-6 py-3">Product</th>
                          <th className="px-6 py-3">Category</th>
                          <th className="px-6 py-3">Price</th>
                          <th className="px-6 py-3">Stock</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {products.map((product) => (
                          <tr key={product.id} className="bg-card">
                            <td className="px-6 py-4 font-medium">
                              <div className="flex items-center">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                                {product.name}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {PRODUCT_CATEGORIES.find(cat => cat.value === product.category)?.label || product.category}
                            </td>
                            <td className="px-6 py-4">
                              NPR {product.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              {product.inStock ? (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  In Stock
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                  Out of Stock
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Add Product Tab */}
            <TabsContent value="add-product" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>
                    Create a new product to add to your store
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-name">Product Name</Label>
                          <Input
                            id="product-name"
                            placeholder="Enter product name"
                            value={newProduct.name}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="product-category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) =>
                              setNewProduct({
                                ...newProduct,
                                category: value as ProductCategory,
                              })
                            }
                            required
                          >
                            <SelectTrigger id="product-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {PRODUCT_CATEGORIES.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.icon} {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="product-price">Price (NPR)</Label>
                          <Input
                            id="product-price"
                            type="number"
                            min="0"
                            step="50"
                            placeholder="Enter price"
                            value={newProduct.price || ''}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: Number(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="product-image">Image URL</Label>
                          <Input
                            id="product-image"
                            placeholder="Enter image URL"
                            value={newProduct.imageUrl}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                imageUrl: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-description">Description</Label>
                          <Textarea
                            id="product-description"
                            placeholder="Enter product description"
                            rows={5}
                            value={newProduct.description}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                description: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="product-featured"
                            checked={newProduct.featured}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                featured: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="product-featured">Feature this product</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="product-stock"
                            checked={newProduct.inStock}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                inStock: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="product-stock">In Stock</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage your customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted">
                        <tr>
                          <th className="px-6 py-3">Order ID</th>
                          <th className="px-6 py-3">Customer</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Amount</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="bg-card">
                          <td className="px-6 py-4 font-medium">#ORD-12345</td>
                          <td className="px-6 py-4">John Doe</td>
                          <td className="px-6 py-4">Jul 12, 2023</td>
                          <td className="px-6 py-4">NPR 15,000</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-card">
                          <td className="px-6 py-4 font-medium">#ORD-12346</td>
                          <td className="px-6 py-4">Jane Smith</td>
                          <td className="px-6 py-4">Jul 11, 2023</td>
                          <td className="px-6 py-4">NPR 8,500</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Processing
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                        <tr className="bg-card">
                          <td className="px-6 py-4 font-medium">#ORD-12347</td>
                          <td className="px-6 py-4">Rajiv Kumar</td>
                          <td className="px-6 py-4">Jul 10, 2023</td>
                          <td className="px-6 py-4">NPR 22,000</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Shipped
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
