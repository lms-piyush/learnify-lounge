
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Filter,
  Star,
  Heart,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ClassCardProps {
  id: string;
  title: string;
  tutor: string;
  tutorId: string;
  type: string;
  format: string;
  payment: string;
  status: string;
  students: number;
  image: string;
  rating: number;
  description: string;
  classSize: string;
  onClick: () => void;
  onTutorClick: () => void;
  wishListed?: boolean;
  onWishlistToggle: () => void;
}

const ClassCard = ({
  title,
  tutor,
  tutorId,
  type,
  format,
  payment,
  status,
  students,
  image,
  rating,
  description,
  classSize,
  onClick,
  onTutorClick,
  wishListed = false,
  onWishlistToggle,
}: ClassCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative h-40 md:h-auto md:w-1/3 lg:w-1/4">
          <img src={image} alt={title} className="h-full w-full object-cover" />
          <button 
            className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle();
            }}
          >
            <Heart 
              className={`h-5 w-5 ${wishListed ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
            />
          </button>
        </div>
        <CardContent className="p-4 flex flex-col flex-1" onClick={onClick}>
          <div className="flex justify-between">
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                status === "Completed" 
                  ? "bg-gray-100 text-gray-800" 
                  : status === "Enrolled" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-green-100 text-green-800"
              }`}>
                {status}
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-[#E5D0FF] text-[#8A5BB7]">
                {payment}
              </span>
            </div>
          </div>
          
          <div className="flex items-center mt-1">
            <button 
              className="text-sm font-medium text-[#8A5BB7] hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onTutorClick();
              }}
            >
              {tutor}
            </button>
            <div className="flex items-center ml-4">
              <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description}</p>
          
          <div className="flex justify-between mt-auto pt-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-gray-100">
                {type}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100">
                {format}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100">
                {classSize}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100">
                Students: {students}
              </span>
            </div>
            <Button 
              size="sm" 
              className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
            >
              {status === "Completed" ? "View Certificate" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const MyClasses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter states
  const [classMode, setClassMode] = useState<"online" | "offline">("online");
  const [classFormat, setClassFormat] = useState<"live" | "recorded" | "inbound" | "outbound">("live");
  const [classSize, setClassSize] = useState<"group" | "1-on-1">("group");
  
  // Wishlist state
  const [wishlistedClasses, setWishlistedClasses] = useState<string[]>(["class2"]);
  
  // Sample class data
  const classes = [
    {
      id: "class1",
      title: "Introduction to Calculus",
      tutor: "Dr. Smith",
      tutorId: "tutor1",
      type: "Online",
      format: "Live",
      payment: "Fixed",
      status: "Ongoing",
      students: 15,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300",
      rating: 4.8,
      description: "Learn the foundations of calculus, including limits, derivatives, and integrals. This course provides a comprehensive introduction to mathematical concepts.",
      classSize: "Group",
    },
    {
      id: "class2",
      title: "Advanced Algorithms",
      tutor: "Prof. Johnson",
      tutorId: "tutor2",
      type: "Online",
      format: "Recorded",
      payment: "Subscription",
      status: "Enrolled",
      students: 42,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300",
      rating: 4.6,
      description: "Study complex algorithms and data structures. Learn about efficient problem-solving techniques for computational challenges.",
      classSize: "1-on-1",
    },
    {
      id: "class3",
      title: "Chemistry Lab",
      tutor: "Sarah Lee",
      tutorId: "tutor3",
      type: "Offline",
      format: "Inbound",
      payment: "Fixed",
      status: "Completed",
      students: 8,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300",
      rating: 4.9,
      description: "Hands-on laboratory experience covering various chemical reactions, lab safety, and experimental procedures.",
      classSize: "Group",
    },
  ];
  
  // Handle wishlist toggle
  const toggleWishlist = (classId: string) => {
    setWishlistedClasses((prev) => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId) 
        : [...prev, classId]
    );
  };
  
  const filteredClasses = classes.filter(cls => {
    // Filter by tab
    if (activeTab === "saved") {
      return wishlistedClasses.includes(cls.id);
    } else if (activeTab === "enrolled") {
      return cls.status === "Enrolled";
    } else if (activeTab === "ongoing") {
      return cls.status === "Ongoing";
    } else if (activeTab === "completed") {
      return cls.status === "Completed";
    } else {
      // For "all" tab
      return true;
    }
  }).filter(cls => {
    // Apply additional filters only if filter drawer has been opened
    if (!filterOpen) return true;
    
    // Apply mode filter
    if (classMode === "online" && cls.type !== "Online") return false;
    if (classMode === "offline" && cls.type !== "Offline") return false;
    
    // Apply format filter
    if (classMode === "online") {
      if (classFormat === "live" && cls.format !== "Live") return false;
      if (classFormat === "recorded" && cls.format !== "Recorded") return false;
    } else {
      if (classFormat === "inbound" && cls.format !== "Inbound") return false;
      if (classFormat === "outbound" && cls.format !== "Outbound") return false;
    }
    
    // Apply size filter
    if (classSize === "group" && cls.classSize !== "Group") return false;
    if (classSize === "1-on-1" && cls.classSize !== "1-on-1") return false;
    
    return true;
  });
  
  // Effect to handle format options based on class mode
  React.useEffect(() => {
    if (classMode === "online") {
      setClassFormat("live");
    } else {
      setClassFormat("inbound");
    }
  }, [classMode]);

  // Effect to handle class size options based on format
  React.useEffect(() => {
    if (classFormat === "outbound") {
      setClassSize("1-on-1");
    }
  }, [classFormat]);
  
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-6">
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
                  
                  {/* Class Format */}
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
                  
                  {/* Class Size */}
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
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <ClassCard
                    key={cls.id}
                    {...cls}
                    wishListed={wishlistedClasses.includes(cls.id)}
                    onClick={() => navigate(`/classes/${cls.id}`)}
                    onTutorClick={() => navigate(`/tutor/${cls.tutorId}`)}
                    onWishlistToggle={() => toggleWishlist(cls.id)}
                  />
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">No classes found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyClasses;

