
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Book, 
  Star, 
  Users, 
  Globe, 
  Clock 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

// Mock data for the tutor profile
const tutorData = {
  tutor1: {
    id: 'tutor1',
    name: 'Dr. Alex Johnson',
    profileImage: undefined,
    qualifications: 'PhD in Mathematics, Stanford University',
    bio: 'Dr. Johnson is a passionate mathematician with over 15 years of teaching experience. Specializes in calculus, differential equations, and advanced algebra.',
    yearsExperience: 15,
    languages: ['English', 'Spanish', 'French'],
    totalCourses: 8,
    averageRating: 4.8,
    totalStudents: 520,
    monthlyEngagement: [
      { month: 'Jan', students: 42 },
      { month: 'Feb', students: 48 },
      { month: 'Mar', students: 53 },
      { month: 'Apr', students: 57 },
      { month: 'May', students: 62 },
      { month: 'Jun', students: 58 }
    ],
    ratings: [
      { month: 'Jan', rating: 4.6 },
      { month: 'Feb', rating: 4.7 },
      { month: 'Mar', rating: 4.7 },
      { month: 'Apr', rating: 4.8 },
      { month: 'May', rating: 4.9 },
      { month: 'Jun', rating: 4.8 }
    ]
  },
  tutor2: {
    id: 'tutor2',
    name: 'Prof. Sarah Williams',
    profileImage: undefined,
    qualifications: 'PhD in Physics, MIT',
    bio: 'Experienced physics professor with a focus on quantum mechanics and theoretical physics. Known for making complex concepts accessible to students.',
    yearsExperience: 12,
    languages: ['English', 'German'],
    totalCourses: 5,
    averageRating: 4.6,
    totalStudents: 380,
    monthlyEngagement: [
      { month: 'Jan', students: 35 },
      { month: 'Feb', students: 38 },
      { month: 'Mar', students: 42 },
      { month: 'Apr', students: 46 },
      { month: 'May', students: 50 },
      { month: 'Jun', students: 52 }
    ],
    ratings: [
      { month: 'Jan', rating: 4.5 },
      { month: 'Feb', rating: 4.5 },
      { month: 'Mar', rating: 4.6 },
      { month: 'Apr', rating: 4.6 },
      { month: 'May', rating: 4.7 },
      { month: 'Jun', rating: 4.6 }
    ]
  },
  tutor3: {
    id: 'tutor3',
    name: 'Michael Chen',
    profileImage: undefined,
    qualifications: 'MS in Computer Science, UC Berkeley',
    bio: 'Full-stack developer and educator specializing in web development, algorithms, and software engineering principles. Creates practical, project-based learning experiences.',
    yearsExperience: 8,
    languages: ['English', 'Mandarin', 'Cantonese'],
    totalCourses: 7,
    averageRating: 4.9,
    totalStudents: 430,
    monthlyEngagement: [
      { month: 'Jan', students: 40 },
      { month: 'Feb', students: 45 },
      { month: 'Mar', students: 52 },
      { month: 'Apr', students: 58 },
      { month: 'May', students: 65 },
      { month: 'Jun', students: 72 }
    ],
    ratings: [
      { month: 'Jan', rating: 4.8 },
      { month: 'Feb', rating: 4.8 },
      { month: 'Mar', rating: 4.9 },
      { month: 'Apr', rating: 4.9 },
      { month: 'May', rating: 4.9 },
      { month: 'Jun', rating: 5.0 }
    ]
  }
};

type TutorId = keyof typeof tutorData;

const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get tutor data based on ID from the URL
  const tutor = id && tutorData[id as TutorId] ? tutorData[id as TutorId] : null;
  
  if (!tutor) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6">
          <h1 className="text-2xl font-bold mb-4">Tutor Not Found</h1>
          <p className="mb-6">The tutor profile you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate(-1)} 
            className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <Layout>
      <div className="p-6">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={tutor.profileImage} />
            <AvatarFallback className="bg-[#8A5BB7] text-white text-4xl">
              {tutor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{tutor.name}</h1>
            <p className="text-lg text-muted-foreground">{tutor.qualifications}</p>
          </div>
        </div>
        
        {/* Basic Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>About the Tutor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{tutor.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#8A5BB7]" />
                  <div>
                    <p className="font-medium">Years of Experience</p>
                    <p className="text-muted-foreground">{tutor.yearsExperience} years</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#8A5BB7]" />
                  <div>
                    <p className="font-medium">Languages Spoken</p>
                    <p className="text-muted-foreground">{tutor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Statistics Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Book className="h-6 w-6 text-[#8A5BB7]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold">{tutor.totalCourses}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold mr-2">{tutor.averageRating}</p>
                      <div className="flex">
                        {renderStarRating(tutor.averageRating)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{tutor.totalStudents}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Student Engagement</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tutor.monthlyEngagement} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value) => [`${value} students`, 'Engagement']}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Bar dataKey="students" fill="#8A5BB7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rating Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tutor.ratings} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[4, 5]} />
                  <RechartsTooltip 
                    formatter={(value) => [`${value}/5.0`, 'Rating']}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    name="Average Rating"
                    stroke="#8A5BB7" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button 
            className="bg-[#8A5BB7] hover:bg-[#8A5BB7]/90"
            onClick={() => navigate(`/messages`)}
          >
            Message Tutor
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TutorProfile;
