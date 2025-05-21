
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyClasses from "./pages/MyClasses";
import ExploreClasses from "./pages/ExploreClasses";
import ClassDetail from "./pages/ClassDetail";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Messages from "./pages/Messages";
import TutorProfile from "./pages/TutorProfile";
import CourseCheckout from "./pages/CourseCheckout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-classes" element={<MyClasses />} />
          <Route path="/explore" element={<ExploreClasses />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/checkout/:id" element={<CourseCheckout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
