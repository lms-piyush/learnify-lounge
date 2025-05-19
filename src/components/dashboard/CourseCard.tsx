
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  tutor: string;
  rating: number;
  image: string;
  onClick?: () => void;
}

const CourseCard = ({ id, title, tutor, rating, image, onClick }: CourseCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer min-w-[240px] max-w-xs"
      onClick={onClick}
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{tutor}</p>
        <div className="flex items-center mt-2">
          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
