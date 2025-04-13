
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Laptop,
  MessageSquareText,
  PenTool,
  UserRound,
  Triangle,
  Star,
  Hexagon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-careercraft-purple" />,
      title: "Resume Builder",
      description: "Create professional resumes with customizable templates in minutes.",
      link: "/resume",
    },
    {
      icon: <PenTool className="h-6 w-6 text-careercraft-purple" />,
      title: "Cover Letter Creator",
      description: "Craft compelling cover letters tailored to specific job applications.",
      link: "/resume",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-careercraft-purple" />,
      title: "Career Guides",
      description: "Access comprehensive guides on resume writing and job searching.",
      link: "/guide",
    },
    {
      icon: <Award className="h-6 w-6 text-careercraft-purple" />,
      title: "Knowledge Tests",
      description: "Test your understanding and earn badges to showcase your expertise.",
      link: "/test",
    },
    {
      icon: <Laptop className="h-6 w-6 text-careercraft-purple" />,
      title: "Skill Courses",
      description: "Enhance your skills with coding and non-coding courses.",
      link: "/courses",
    },
    {
      icon: <MessageSquareText className="h-6 w-6 text-careercraft-purple" />,
      title: "Interview Training",
      description: "Practice for interviews with AI-powered mock interviews.",
      link: "/interview",
    },
    {
      icon: <BriefcaseBusiness className="h-6 w-6 text-careercraft-purple" />,
      title: "Job Pathways",
      description: "Discover different career paths and job opportunities.",
      link: "/jobs",
    },
    {
      icon: <UserRound className="h-6 w-6 text-careercraft-purple" />,
      title: "Personal Dashboard",
      description: "Track your progress, badges, and completed tasks in one place.",
      link: "/dashboard",
    }
  ];

  return (
    <>
      {/* Hero Section with enhanced background */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 hero-bg-overlay">
        {/* More dynamic gradient blobs */}
        <div className="gradient-blob w-[800px] h-[800px] bg-careercraft-purple/20 top-[-200px] right-[-300px] animate-pulse"></div>
        <div className="gradient-blob w-[700px] h-[700px] bg-careercraft-green/20 bottom-[-200px] left-[-300px] animate-pulse delay-500"></div>
        
        {/* Background pattern and overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/2 dark:from-black/20 dark:via-black/10 dark:to-black/5"></div>
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(127,130,187,0.1)_50%,transparent_75%)]"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Decorative icons */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <Triangle className="absolute top-20 left-10 text-careercraft-purple/20 w-24 h-24 animate-float" />
            <Star className="absolute top-1/3 right-20 text-careercraft-green/20 w-16 h-16 animate-spin-slow" />
            <Hexagon className="absolute bottom-1/4 left-1/3 text-careercraft-purple/20 w-20 h-20 animate-bounce-slow" />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12 relative">
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-careercraft-purple to-careercraft-green animate-slide-up">
              Craft Your Career Success Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              Build professional resumes, enhance your skills, and land your dream job with our AI-powered career platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button asChild size="lg" className="rounded-full bg-careercraft-purple hover:bg-careercraft-purple/90">
                <Link to="/resume">
                  Create Resume
                  <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/guide">
                  Explore Guides
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info Section with subtle background */}
      <section className="py-16 bg-muted/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold font-montserrat mb-4">Start Your Career Journey</h2>
                <p className="text-muted-foreground mb-6">
                  Begin by filling out your personal information. This will help us personalize your experience and 
                  save time when creating your resume and cover letter.
                </p>
                <div className="hidden md:block">
                  <div className="relative">
                    <div className="absolute -left-6 top-0 bottom-0 border-l-2 border-dashed border-primary/30"></div>
                    {[
                      "Complete your personal info",
                      "Learn resume best practices",
                      "Create your professional resume",
                      "Prepare for interviews",
                      "Apply for your dream job"
                    ].map((step, idx) => (
                      <div key={idx} className="ml-6 mb-4 relative">
                        <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary"></div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <Card className="shadow-lg border-primary/10">
                  <CardContent className="pt-6">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="text-sm font-medium mb-1 block">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={personalInfo.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border bg-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium mb-1 block">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border bg-transparent"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={personalInfo.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border bg-transparent"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="text-sm font-medium mb-1 block">
                          Address
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={personalInfo.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border bg-transparent"
                          placeholder="City, State, Country"
                        />
                      </div>
                      <Button className="w-full glass-card bg-gradient-to-r from-careercraft-purple/80 to-careercraft-purple hover:opacity-90" size="lg">
                        Save Information
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="gradient-blob w-[700px] h-[700px] bg-careercraft-yellow/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to build your career and land your dream job.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Link 
                to={feature.link} 
                key={idx}
                className="group"
              >
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1",
                  "dark:hover:bg-primary/5"
                )}>
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with subtle gradient background */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-montserrat text-3xl font-bold mb-6">
              Ready to Advance Your Career?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start building your professional resume today and take the first step towards your dream job.
              Our AI-powered tools will guide you through every step of the process.
            </p>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-careercraft-purple to-careercraft-green hover:opacity-90 border-none">
              <Link to="/resume">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
