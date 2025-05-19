
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Star, MapPin, User } from "lucide-react";

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would come from an API call
  const classData = {
    id,
    title: "Introduction to Python",
    tutor: {
      name: "Dr. Smith",
      qualifications: "Ph.D in Computer Science",
      totalCourses: 8,
      totalStudents: 1240,
    },
    type: "Online",
    format: "Live",
    duration: "8 weeks",
    enrolled: 34,
    maxStudents: 40,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    overview: "This course introduces students to the Python programming language and its fundamental concepts. Students will learn about variables, data types, control structures, functions, and basic object-oriented programming principles.",
    lessons: [
      {
        title: "Introduction and Setup",
        description: "Overview of Python and setting up the development environment.",
        resources: ["Setup Guide.pdf", "Introduction Slides.ppt"],
      },
      {
        title: "Variables and Data Types",
        description: "Understanding Python variables, strings, numbers, and lists.",
        resources: ["Variables Cheatsheet.pdf", "Practice Problems.py"],
      },
      {
        title: "Control Structures",
        description: "If statements, loops, and conditional expressions.",
        resources: ["Control Flow Diagram.png", "Examples.py"],
      },
      {
        title: "Functions and Modules",
        description: "Creating and using functions, importing modules.",
        resources: ["Function Reference.pdf", "Module Examples.zip"],
      },
      {
        title: "Introduction to Object-Oriented Programming",
        description: "Classes, objects, inheritance, and polymorphism.",
        resources: ["OOP Concepts.pdf", "Class Examples.py"],
      },
    ],
    rating: 4.8,
    reviews: 128,
    address: id === "class3" ? "123 Learning St, New York, NY" : undefined,
  };

  const handleEnroll = () => {
    toast({
      title: "Enrollment successful!",
      description: `You've been enrolled in ${classData.title}`,
    });
    
    // Redirect to my classes in a real app
    setTimeout(() => {
      navigate("/my-classes");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold">{classData.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={classData.image}
                alt={classData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center text-white">
                  <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
                  <span className="font-medium text-sm mr-2">{classData.rating}</span>
                  <span className="text-sm">({classData.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="p-6">
                <h2 className="text-lg font-semibold mb-2">Course Overview</h2>
                <p className="text-gray-700 mb-4">{classData.overview}</p>
                
                <h3 className="text-md font-medium mb-2">Course Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="font-medium w-24">Type:</span>
                    <span>{classData.type}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Format:</span>
                    <span>{classData.format}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Duration:</span>
                    <span>{classData.duration}</span>
                  </li>
                  {classData.address && (
                    <li className="flex items-start">
                      <span className="font-medium w-24">Address:</span>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-[#8A5BB7] mr-1" />
                        <span>{classData.address}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </TabsContent>
              
              <TabsContent value="lessons" className="p-6">
                <div className="space-y-4">
                  {classData.lessons.map((lesson, index) => (
                    <Card key={index}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">
                          {index + 1}. {lesson.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-1">
                        <p className="text-sm text-gray-700">
                          {lesson.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classData.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex}>
                      <h3 className="text-sm font-medium mb-2">
                        {lessonIndex + 1}. {lesson.title}
                      </h3>
                      <ul className="space-y-2">
                        {lesson.resources.map((resource, resourceIndex) => (
                          <li key={resourceIndex}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-left"
                            >
                              {resource}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tutor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-[#8A5BB7] rounded-full flex items-center justify-center text-white">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{classData.tutor.name}</h3>
                  <p className="text-sm text-gray-500">
                    {classData.tutor.qualifications}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="border rounded-md p-2">
                  <p className="text-lg font-bold">{classData.tutor.totalCourses}</p>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
                <div className="border rounded-md p-2">
                  <p className="text-lg font-bold">{classData.tutor.totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Enrollment</CardTitle>
              <CardDescription>
                Join this class to get access to all lessons and resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Availability</span>
                    <span className="font-medium text-sm">
                      {classData.enrolled}/{classData.maxStudents} enrolled
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#8A5BB7] h-2.5 rounded-full"
                      style={{
                        width: `${(classData.enrolled / classData.maxStudents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleEnroll} 
                  className="w-full bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
                >
                  Enroll Now
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  7-day satisfaction guarantee
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ClassDetail;
