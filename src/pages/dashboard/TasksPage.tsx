
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, BookOpen, CheckCircle, MessageSquare, ChevronRight, BookMarked, Briefcase, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  category: "resume" | "guide" | "test" | "course" | "interview" | "job";
  priority: "low" | "medium" | "high";
}

export default function TasksPage() {
  const [activeTaskTab, setActiveTaskTab] = useState<string>("all");
  
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
  ];
  
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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Tasks</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Tasks
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
      </div>
    </div>
  );
}
