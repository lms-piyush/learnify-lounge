
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

interface ClassCardProps {
  id: string;
  title: string;
  tutor: string;
  type: string;
  format: string;
  payment: string;
  status: string;
  students: number;
  image: string;
  onClick: () => void;
}

const ClassCard = ({
  title,
  tutor,
  type,
  format,
  payment,
  status,
  students,
  image,
  onClick,
}: ClassCardProps) => {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex h-full">
        <div className="h-auto w-32">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-base">{title}</h3>
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
          
          <p className="text-sm text-gray-500 mt-1">by {tutor}</p>
          
          <div className="flex justify-between mt-auto pt-2">
            <div className="flex space-x-4">
              <div className="text-xs">
                <span className="text-gray-500">Type:</span> {type}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Format:</span> {format}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Students:</span> {students}
              </div>
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
  
  // Sample class data
  const classes = [
    {
      id: "class1",
      title: "Introduction to Calculus",
      tutor: "Dr. Smith",
      type: "Online",
      format: "Live",
      payment: "Fixed",
      status: "Ongoing",
      students: 15,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300",
    },
    {
      id: "class2",
      title: "Advanced Algorithms",
      tutor: "Prof. Johnson",
      type: "Online",
      format: "Recorded",
      payment: "Subscription",
      status: "Enrolled",
      students: 42,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300",
    },
    {
      id: "class3",
      title: "Chemistry Lab",
      tutor: "Sarah Lee",
      type: "Offline",
      format: "Inbound",
      payment: "Fixed",
      status: "Completed",
      students: 8,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300",
    },
  ];
  
  const filteredClasses = classes.filter(cls => {
    if (activeTab === "all") return true;
    return cls.status.toLowerCase() === activeTab;
  });
  
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <ClassCard
                  key={cls.id}
                  {...cls}
                  onClick={() => navigate(`/classes/${cls.id}`)}
                />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">No classes found</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default MyClasses;
