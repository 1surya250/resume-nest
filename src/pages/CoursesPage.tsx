
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { FileCheck, Clock, Book, Users, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "coding" | "non-coding";
  subcategory: string;
  rating: number;
  students: number;
  image: string;
  badge?: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  popular?: boolean;
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "coding" | "non-coding">("all");
  
  const courses: Course[] = [
    {
      id: "html-css",
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of web development with HTML and CSS.",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      level: "Beginner",
      category: "coding",
      subcategory: "Web Development",
      rating: 4.8,
      students: 12536,
      image: "https://via.placeholder.com/300x180?text=HTML+CSS",
      badge: {
        id: "web-dev-basic",
        name: "Web Dev Basics",
        description: "Mastery of HTML and CSS fundamentals",
        icon: "🌐",
        color: "careercraft-purple",
      },
      popular: true,
    },
    {
      id: "javascript",
      title: "JavaScript for Beginners",
      description: "Master the basics of JavaScript programming and DOM manipulation.",
      instructor: "Michael Chen",
      duration: "12 hours",
      level: "Beginner",
      category: "coding",
      subcategory: "Web Development",
      rating: 4.7,
      students: 9845,
      image: "https://via.placeholder.com/300x180?text=JavaScript",
      badge: {
        id: "js-master",
        name: "JS Master",
        description: "JavaScript coding proficiency",
        icon: "⚡",
        color: "careercraft-yellow",
      },
      popular: true,
    },
    {
      id: "react",
      title: "React.js Fundamentals",
      description: "Build modern user interfaces with the React library.",
      instructor: "David Miller",
      duration: "10 hours",
      level: "Intermediate",
      category: "coding",
      subcategory: "Web Development",
      rating: 4.9,
      students: 8721,
      image: "https://via.placeholder.com/300x180?text=React",
      badge: {
        id: "react-dev",
        name: "React Developer",
        description: "Building applications with React",
        icon: "⚛️",
        color: "careercraft-green",
      },
    },
    {
      id: "python",
      title: "Python Programming Essentials",
      description: "Learn Python programming from scratch with practical examples.",
      instructor: "Emma Davis",
      duration: "14 hours",
      level: "Beginner",
      category: "coding",
      subcategory: "Programming",
      rating: 4.8,
      students: 15263,
      image: "https://via.placeholder.com/300x180?text=Python",
      badge: {
        id: "python-coder",
        name: "Python Coder",
        description: "Python programming expertise",
        icon: "🐍",
        color: "careercraft-purple",
      },
      popular: true,
    },
    {
      id: "communication",
      title: "Professional Communication Skills",
      description: "Develop effective communication skills for the workplace.",
      instructor: "Jennifer Wilson",
      duration: "6 hours",
      level: "Beginner",
      category: "non-coding",
      subcategory: "Soft Skills",
      rating: 4.6,
      students: 7845,
      image: "https://via.placeholder.com/300x180?text=Communication",
      badge: {
        id: "comm-pro",
        name: "Communication Pro",
        description: "Professional communication mastery",
        icon: "🗣️",
        color: "careercraft-yellow",
      },
    },
    {
      id: "leadership",
      title: "Leadership and Management",
      description: "Develop essential leadership skills to excel in management roles.",
      instructor: "Robert Taylor",
      duration: "9 hours",
      level: "Intermediate",
      category: "non-coding",
      subcategory: "Soft Skills",
      rating: 4.7,
      students: 5632,
      image: "https://via.placeholder.com/300x180?text=Leadership",
      badge: {
        id: "leader",
        name: "Leader",
        description: "Leadership skills mastery",
        icon: "👑",
        color: "careercraft-green",
      },
    },
    {
      id: "project-management",
      title: "Project Management Fundamentals",
      description: "Learn the principles of effective project management.",
      instructor: "Lisa Brown",
      duration: "8 hours",
      level: "Beginner",
      category: "non-coding",
      subcategory: "Business",
      rating: 4.5,
      students: 6821,
      image: "https://via.placeholder.com/300x180?text=Project+Management",
      badge: {
        id: "proj-manager",
        name: "Project Manager",
        description: "Project management expertise",
        icon: "📊",
        color: "careercraft-purple",
      },
      popular: true,
    },
    {
      id: "data-science",
      title: "Introduction to Data Science",
      description: "Explore the fundamentals of data analysis and visualization.",
      instructor: "Mark Johnson",
      duration: "16 hours",
      level: "Intermediate",
      category: "coding",
      subcategory: "Data Science",
      rating: 4.9,
      students: 7265,
      image: "https://via.placeholder.com/300x180?text=Data+Science",
      badge: {
        id: "data-analyst",
        name: "Data Analyst",
        description: "Data analysis proficiency",
        icon: "📈",
        color: "careercraft-green",
      },
    },
  ];
  
  const filteredCourses = courses.filter(course => {
    // Filter by search term
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 w-3 ${
              index < Math.floor(rating)
                ? "text-careercraft-yellow fill-careercraft-yellow"
                : index < rating
                ? "text-careercraft-yellow fill-careercraft-yellow opacity-50"
                : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-montserrat">Skill Certification Courses</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-3xl mx-auto">
            Enhance your skills with our curated collection of coding and non-coding courses.
            Earn badges, certificates, and boost your resume.
          </p>
          
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses by name, topic, or skill..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)} className="max-w-md mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="coding">Coding</TabsTrigger>
              <TabsTrigger value="non-coding">Non-Coding</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Popular Courses Section */}
        {activeCategory === "all" && searchTerm === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => course.popular)
                .map(course => (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge className={`bg-${course.category === "coding" ? "careercraft-purple" : "careercraft-green"} hover:bg-${course.category === "coding" ? "careercraft-purple" : "careercraft-green"}/90 text-white mb-2`}>
                          {course.subcategory}
                        </Badge>
                        <Badge variant="outline" className="bg-careercraft-yellow/10">
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{course.duration}</span>
                        <span className="mx-2">•</span>
                        <Users className="mr-1 h-3 w-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      {renderRatingStars(course.rating)}
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                          {course.instructor.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm">{course.instructor}</span>
                      </div>
                      
                      {course.badge && (
                        <BadgeDisplay
                          badge={{
                            ...course.badge,
                            earned: false,
                            earnedDate: "",
                          }}
                          size="sm"
                        />
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        )}
        
        {/* All Courses */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {activeCategory === "all" 
              ? "All Courses" 
              : activeCategory === "coding" 
                ? "Coding Courses" 
                : "Non-Coding Courses"}
          </h2>
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <FileCheck className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className={`bg-${course.category === "coding" ? "careercraft-purple" : "careercraft-green"} hover:bg-${course.category === "coding" ? "careercraft-purple" : "careercraft-green"}/90 text-white mb-2`}>
                        {course.subcategory}
                      </Badge>
                      <Badge variant="outline" className="bg-careercraft-yellow/10">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{course.duration}</span>
                      <span className="mx-2">•</span>
                      <Users className="mr-1 h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    {renderRatingStars(course.rating)}
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                        {course.instructor.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm">{course.instructor}</span>
                    </div>
                    
                    {course.badge && (
                      <BadgeDisplay
                        badge={{
                          ...course.badge,
                          earned: false,
                          earnedDate: "",
                        }}
                        size="sm"
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 font-montserrat">Unlock Your Full Potential</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Enroll in our certification courses to enhance your skills, earn badges, and 
            make your resume stand out to potential employers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="rounded-full">
              <Book className="mr-2 h-4 w-4" />
              Browse Categories
            </Button>
            <Button variant="outline" className="rounded-full">
              View All Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
