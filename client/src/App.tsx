import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Category from "@/pages/category";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/category/:category" component={Category} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
