
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 glass-morphism shadow-lg'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-bold tracking-tight">
              CricNagar
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>
          
          {/* Right Section - Theme Toggle, Cart, User */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {getTotalItems() === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <Link to="/cart">
                      <Button className="w-full">View Cart ({getTotalItems()} items)</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/src/assets/avatar.jpg" alt={user?.name} />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Your Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Your Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <MobileNavLinks />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            location.pathname === link.to
              ? 'text-primary font-bold'
              : 'text-foreground/80 hover:text-primary'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

const MobileNavLinks = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            location.pathname === link.to
              ? 'text-primary font-bold'
              : 'text-foreground/80 hover:text-primary'
          }`}
        >
          {link.label}
        </Link>
      ))}
      
      <div className="h-px bg-border my-2" />
      
      {isAuthenticated ? (
        <>
          <Link
            to="/profile"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary"
          >
            Your Profile
          </Link>
          
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary"
            >
              Admin Dashboard
            </Link>
          )}
          
          <button
            onClick={logout}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary text-left w-full"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary"
        >
          Login / Register
        </Link>
      )}
    </>
  );
};

export default Navbar;
