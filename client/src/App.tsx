import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import VideoDetails from "./pages/VideoDetails";
import AIVideoGenerator from "./pages/AIVideoGenerator";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Route path="/" component={Index} />
        <Route path="/video/:id" component={VideoDetails} />
        <Route path="/ai-video-generator" component={AIVideoGenerator} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route component={NotFound} />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
