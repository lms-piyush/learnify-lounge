
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CourseCard from "@/components/dashboard/CourseCard";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ExploreClasses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const filterParam = searchParams.get("filter");
  
  const [activeTab, setActiveTab] = useState(filterParam === "saved" ? "saved" : "all");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [sortBy, setSortBy] = useState("popular");
  
  // Filter states
  const [classMode, setClassMode] = useState<"online" | "offline">("online");
  const [classFormat, setClassFormat] = useState<"live" | "recorded" | "inbound" | "outbound">("live");
  const [classSize, setClassSize] = useState<"group" | "1-on-1">("group");
  const [classDuration, setClassDuration] = useState<"finite" | "infinite">("finite");
  const [paymentModel, setPaymentModel] = useState<"one-time" | "subscription">("one-time");
  
  // Effect to handle format options based on class mode
  useEffect(() => {
    if (classMode === "online") {
      setClassFormat("live");
    } else {
      setClassFormat("inbound");
    }
  }, [classMode]);

  // Effect to handle class size options based on format
  useEffect(() => {
    if (classFormat === "outbound") {
      setClassSize("1-on-1");
    }
  }, [classFormat]);

  // Effect to handle payment model based on duration
  useEffect(() => {
    if (classDuration === "infinite") {
      setPaymentModel("subscription");
    }
  }, [classDuration]);
  
  // Sample courses data
  const allCourses = [
    {
      id: "course1",
      title: "Introduction to Python",
      tutor: "Dr. Smith",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300"
    },
    {
      id: "course2",
      title: "Advanced Mathematics",
      tutor: "Prof. Johnson",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300"
    },
    {
      id: "course3",
      title: "Web Development",
      tutor: "Sarah Lee",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300"
    },
    {
      id: "course4",
      title: "Data Science Fundamentals",
      tutor: "Michael Chang",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300"
    },
    {
      id: "course5",
      title: "Advanced UI/UX Design",
      tutor: "Emma Watson",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300"
    },
    {
      id: "course6",
      title: "Advanced Machine Learning",
      tutor: "Chris Brown",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300"
    },
  ];
  
  const savedCourses = [
    allCourses[2],
    allCourses[4],
  ];
  
  // Filter and sort courses
  const filterCourses = () => {
    let filtered = activeTab === "saved" ? savedCourses : allCourses;
    
    // Apply search filtering
    if (localSearchQuery || searchQuery) {
      const query = (localSearchQuery || searchQuery || "").toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.tutor.toLowerCase().includes(query)
      );
    }
    
    // Sort the courses
    switch (sortBy) {
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...filtered]; // In a real app, we'd sort by date
      case "popular":
      default:
        return filtered; // Assuming the default order is by popularity
    }
  };
  
  const displayedCourses = filterCourses();
  
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Explore Classes</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Panel - Left Side */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Class Mode */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Class Mode</h3>
                <RadioGroup 
                  value={classMode} 
                  onValueChange={(value) => setClassMode(value as "online" | "offline")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="mode-online" />
                    <Label htmlFor="mode-online">Online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offline" id="mode-offline" />
                    <Label htmlFor="mode-offline">Offline</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* Class Format - Dependent on Class Mode */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Class Format</h3>
                {classMode === "online" ? (
                  <RadioGroup 
                    value={classFormat} 
                    onValueChange={(value) => setClassFormat(value as "live" | "recorded")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="live" id="format-live" />
                      <Label htmlFor="format-live">Live</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recorded" id="format-recorded" />
                      <Label htmlFor="format-recorded">Recorded</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <RadioGroup 
                    value={classFormat} 
                    onValueChange={(value) => setClassFormat(value as "inbound" | "outbound")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inbound" id="format-inbound" />
                      <Label htmlFor="format-inbound">Inbound</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outbound" id="format-outbound" />
                      <Label htmlFor="format-outbound">Outbound</Label>
                    </div>
                  </RadioGroup>
                )}
              </div>
              
              <Separator />
              
              {/* Class Size - Dependent on Class Format */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Class Size</h3>
                <RadioGroup 
                  value={classSize} 
                  onValueChange={(value) => setClassSize(value as "group" | "1-on-1")}
                  className="flex flex-col space-y-1"
                  disabled={classFormat === "outbound"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="size-group" disabled={classFormat === "outbound"} />
                    <Label htmlFor="size-group" className={classFormat === "outbound" ? "text-gray-400" : ""}>Group</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-on-1" id="size-1on1" />
                    <Label htmlFor="size-1on1">1-on-1</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* Class Duration */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Class Duration</h3>
                <RadioGroup 
                  value={classDuration} 
                  onValueChange={(value) => setClassDuration(value as "finite" | "infinite")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="finite" id="duration-finite" />
                    <Label htmlFor="duration-finite">Finite classes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="infinite" id="duration-infinite" />
                    <Label htmlFor="duration-infinite">Infinite classes</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* Payment Model - Dependent on Class Duration */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Model</h3>
                <RadioGroup 
                  value={paymentModel} 
                  onValueChange={(value) => setPaymentModel(value as "one-time" | "subscription")}
                  className="flex flex-col space-y-1"
                  disabled={classDuration === "infinite"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="payment-onetime" disabled={classDuration === "infinite"} />
                    <Label htmlFor="payment-onetime" className={classDuration === "infinite" ? "text-gray-400" : ""}>One-time payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subscription" id="payment-subscription" />
                    <Label htmlFor="payment-subscription">Subscription</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content - Right Side */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses, tutors..."
                className="pl-10"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="saved">Saved Classes</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {displayedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      onClick={() => navigate(`/classes/${course.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-gray-500">
                  No courses found. Try adjusting your search or filters.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreClasses;
