
import React, { useState } from "react";
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

const ExploreClasses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  const [activeTab, setActiveTab] = useState(filterParam === "saved" ? "saved" : "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  
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
      title: "Artificial Intelligence",
      tutor: "Emma Watson",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300"
    },
    {
      id: "course6",
      title: "Digital Marketing",
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
    
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tutor.toLowerCase().includes(searchQuery.toLowerCase())
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
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses, tutors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </Layout>
  );
};

export default ExploreClasses;
