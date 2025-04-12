
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { FileCheck, BookOpen, Award, Calendar, CheckCircle, Star, MessageSquare, ChevronRight, BookMarked, Briefcase, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
  category: "resume" | "test" | "course" | "interview";
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  category: "resume" | "guide" | "test" | "course" | "interview" | "job";
  priority: "low" | "medium" | "high";
}

export default function DashboardPage() {
  const [activeTaskTab, setActiveTaskTab] = useState<string>("all");
  
  const badges: Badge[] = [
    {
      id: "resume-expert",
      name: "Resume Expert",
      description: "Completed the resume creation process with all sections",
      icon: "📄",
      color: "careercraft-purple",
      earned: true,
      earnedDate: "2023-05-01",
      category: "resume",
    },
    {
      id: "cover-master",
      name: "Cover Letter Master",
      description: "Created a professional cover letter",
      icon: "✉️",
      color: "careercraft-purple",
      earned: true,
      earnedDate: "2023-05-03",
      category: "resume",
    },
    {
      id: "resume-quiz",
      name: "Resume Knowledge",
      description: "Scored 80% or higher on the resume knowledge test",
      icon: "🎯",
      color: "careercraft-yellow",
      earned: true,
      earnedDate: "2023-04-28",
      category: "test",
    },
    {
      id: "cover-quiz",
      name: "Cover Letter Knowledge",
      description: "Scored 80% or higher on the cover letter test",
      icon: "🎓",
      color: "careercraft-yellow",
      earned: false,
      category: "test",
    },
    {
      id: "html-css",
      name: "HTML/CSS Basics",
      description: "Completed the HTML & CSS Fundamentals course",
      icon: "🌐",
      color: "careercraft-green",
      earned: true,
      earnedDate: "2023-04-15",
      category: "course",
    },
    {
      id: "js-master",
      name: "JavaScript Starter",
      description: "Completed the JavaScript for Beginners course",
      icon: "⚡",
      color: "careercraft-green",
      earned: false,
      category: "course",
    },
    {
      id: "interview-ready",
      name: "Interview Ready",
      description: "Completed 5 mock interview sessions",
      icon: "🎤",
      color: "careercraft-purple",
      earned: false,
      category: "interview",
    },
    {
      id: "communication-pro",
      name: "Communication Pro",
      description: "Completed the Professional Communication Skills course",
      icon: "🗣️",
      color: "careercraft-green",
      earned: true,
      earnedDate: "2023-04-20",
      category: "course",
    },
  ];
  
  const tasks: Task[] = [
    {
      id: "task1",
      title: "Update Resume Skills Section",
      description: "Add your recently learned technical skills to your resume.",
      completed: false,
      dueDate: "2023-05-15",
      category: "resume",
      priority: "high",
    },
    {
      id: "task2",
      title: "Complete Cover Letter Knowledge Test",
      description: "Test your knowledge about cover letter best practices.",
      completed: false,
      dueDate: "2023-05-18",
      category: "test",
      priority: "medium",
    },
    {
      id: "task3",
      title: "Finish JavaScript Course Module 3",
      description: "Complete the Functions and Objects module of your JavaScript course.",
      completed: false,
      dueDate: "2023-05-20",
      category: "course",
      priority: "medium",
    },
    {
      id: "task4",
      title: "Practice Behavioral Interview Questions",
      description: "Complete at least one behavioral mock interview session.",
      completed: true,
      dueDate: "2023-05-10",
      category: "interview",
      priority: "high",
    },
    {
      id: "task5",
      title: "Apply for Software Developer Position",
      description: "Submit your application to the TechCorp Software Developer role.",
      completed: false,
      dueDate: "2023-05-25",
      category: "job",
      priority: "high",
    },
    {
      id: "task6",
      title: "Review Resume Guide Section 2",
      description: "Read the guide on structuring your work experience section effectively.",
      completed: true,
      dueDate: "2023-05-05",
      category: "guide",
      priority: "low",
    },
  ];
  
  const completedBadges = badges.filter(badge => badge.earned).length;
  const totalBadges = badges.length;
  const badgeCompletionPercentage = (completedBadges / totalBadges) * 100;
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const taskCompletionPercentage = (completedTasks / totalTasks) * 100;
  
  const filteredTasks = tasks.filter(task => {
    if (activeTaskTab === "all") return true;
    if (activeTaskTab === "completed") return task.completed;
    if (activeTaskTab === "pending") return !task.completed;
    return task.category === activeTaskTab;
  });
  
  const [toggleTask, setToggleTask] = useState<string | null>(null);
  
  const handleToggleTask = (taskId: string) => {
    setToggleTask(toggleTask === taskId ? null : taskId);
  };
  
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "resume":
        return <FileCheck className="h-4 w-4 text-careercraft-purple" />;
      case "guide":
        return <BookOpen className="h-4 w-4 text-careercraft-yellow" />;
      case "test":
        return <CheckCircle className="h-4 w-4 text-careercraft-yellow" />;
      case "course":
        return <BookMarked className="h-4 w-4 text-careercraft-green" />;
      case "interview":
        return <MessageSquare className="h-4 w-4 text-careercraft-purple" />;
      case "job":
        return <Briefcase className="h-4 w-4 text-careercraft-green" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold font-montserrat">Your Dashboard</h1>
              <Button variant="outline" className="rounded-full">
                <Calendar className="mr-2 h-4 w-4" />
                May 2023
              </Button>
            </div>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="mr-2 h-5 w-5 text-careercraft-yellow" />
                    Badges Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {completedBadges} of {totalBadges} badges earned
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(badgeCompletionPercentage)}%
                    </span>
                  </div>
                  <Progress value={badgeCompletionPercentage} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-careercraft-green" />
                    Tasks Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(taskCompletionPercentage)}%
                    </span>
                  </div>
                  <Progress value={taskCompletionPercentage} className="h-2" />
                </CardContent>
              </Card>
            </div>
            
            {/* Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Your Tasks
                </CardTitle>
                <CardDescription>
                  Track and manage your career development tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTaskTab} onValueChange={setActiveTaskTab} className="mb-6">
                  <TabsList className="grid grid-cols-3 sm:grid-cols-7 gap-1 h-auto p-1">
                    <TabsTrigger value="all" className="text-xs py-1.5 px-2">All</TabsTrigger>
                    <TabsTrigger value="resume" className="text-xs py-1.5 px-2">Resume</TabsTrigger>
                    <TabsTrigger value="guide" className="text-xs py-1.5 px-2">Guide</TabsTrigger>
                    <TabsTrigger value="test" className="text-xs py-1.5 px-2">Tests</TabsTrigger>
                    <TabsTrigger value="course" className="text-xs py-1.5 px-2">Courses</TabsTrigger>
                    <TabsTrigger value="interview" className="text-xs py-1.5 px-2">Interview</TabsTrigger>
                    <TabsTrigger value="job" className="text-xs py-1.5 px-2">Jobs</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-4">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-muted-foreground">No tasks found</p>
                    </div>
                  ) : (
                    filteredTasks.map(task => (
                      <div 
                        key={task.id}
                        className={`border rounded-md p-4 transition-all ${
                          task.completed ? "bg-muted/50 border-muted" : "hover:border-primary"
                        }`}
                      >
                        <div 
                          className="flex items-start justify-between cursor-pointer"
                          onClick={() => handleToggleTask(task.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex items-center h-5 mt-0.5">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={(e) => e.stopPropagation()}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center">
                                {renderCategoryIcon(task.category)}
                                <p className={`ml-2 ${task.completed ? "text-muted-foreground line-through" : "font-medium"}`}>
                                  {task.title}
                                </p>
                              </div>
                              {toggleTask === task.id && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {task.dueDate && (
                              <span className={`text-xs mr-4 ${
                                new Date(task.dueDate) < new Date() && !task.completed 
                                  ? "text-destructive" 
                                  : "text-muted-foreground"
                              }`}>
                                Due {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full
                              ${task.priority === "high" 
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              }
                            `}>
                              {task.priority}
                            </span>
                            <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${toggleTask === task.id ? "rotate-90" : ""}`} />
                          </div>
                        </div>
                        {toggleTask === task.id && (
                          <div className="mt-4 pl-8 flex justify-end">
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border">
                  <div className="relative pl-8">
                    <div className="absolute left-0 bg-primary rounded-full w-6 h-6 flex items-center justify-center -translate-x-1/2">
                      <Award className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Earned "Resume Expert" Badge</p>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Completed your professional resume with all sections filled out.
                    </p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 bg-primary rounded-full w-6 h-6 flex items-center justify-center -translate-x-1/2">
                      <FileCheck className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Created Cover Letter</p>
                      <span className="text-xs text-muted-foreground">5 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created a professional cover letter using the Modern template.
                    </p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 bg-primary rounded-full w-6 h-6 flex items-center justify-center -translate-x-1/2">
                      <Star className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Completed Resume Knowledge Test</p>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scored 90% on the Resume Knowledge Test.
                    </p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 bg-primary rounded-full w-6 h-6 flex items-center justify-center -translate-x-1/2">
                      <MessageSquare className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Completed Mock Interview</p>
                      <span className="text-xs text-muted-foreground">2 weeks ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Completed your first behavioral mock interview session.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Badges Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Your Badges
                </CardTitle>
                <CardDescription>
                  Achievements unlocked through completed tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="earned">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="earned">Earned</TabsTrigger>
                    <TabsTrigger value="all">All Badges</TabsTrigger>
                  </TabsList>
                  <TabsContent value="earned">
                    {badges.filter(badge => badge.earned).length === 0 ? (
                      <div className="text-center py-8">
                        <Award className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                        <p className="text-muted-foreground mb-2">No badges earned yet</p>
                        <p className="text-sm text-muted-foreground">
                          Complete tasks to earn achievement badges
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                        {badges
                          .filter(badge => badge.earned)
                          .map(badge => (
                            <BadgeDisplay
                              key={badge.id}
                              badge={badge}
                              className="flex flex-col items-center justify-center"
                              showTooltip
                            />
                          ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="all">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                      {badges.map(badge => (
                        <BadgeDisplay
                          key={badge.id}
                          badge={badge}
                          className="flex flex-col items-center justify-center"
                          showTooltip
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Recommended Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileCheck className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Update your resume with recent skills</p>
                      <p className="text-xs text-muted-foreground">
                        Add newly acquired skills to your resume
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Complete the Cover Letter Knowledge Test</p>
                      <p className="text-xs text-muted-foreground">
                        Test your knowledge and earn a new badge
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Try a technical mock interview</p>
                      <p className="text-xs text-muted-foreground">
                        Practice answering technical questions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Apply for recommended job positions</p>
                      <p className="text-xs text-muted-foreground">
                        5 new jobs match your profile
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Your Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Career Profile Completion</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-md p-4 text-center">
                      <p className="text-3xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Badges Earned</p>
                    </div>
                    <div className="bg-muted/50 rounded-md p-4 text-center">
                      <p className="text-3xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Courses Completed</p>
                    </div>
                    <div className="bg-muted/50 rounded-md p-4 text-center">
                      <p className="text-3xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">Resume Created</p>
                    </div>
                    <div className="bg-muted/50 rounded-md p-4 text-center">
                      <p className="text-3xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Test Scores</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
