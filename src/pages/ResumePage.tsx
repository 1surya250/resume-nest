import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Download, FileText, PenLine, Plus, Trash2, LayoutTemplate } from "lucide-react";
import { ResumeHeader } from "@/components/resume/ResumeHeader";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  summary: z.string().optional(),
  experienceLevel: z.string(),
});

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  popular: boolean;
};

type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  current: boolean;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  current: boolean;
  description: string;
};

type Skill = {
  id: string;
  name: string;
  level: number;
};

export default function ResumePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateId = params.get('template');
    if (templateId) {
      setSelectedTemplate(templateId);
      setActiveTab("personal");
    } else {
      navigate("/resume/templates");
    }
  }, [location.search, navigate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      summary: "",
      experienceLevel: "entry",
    },
  });
  
  const templates: ResumeTemplate[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and modern design suitable for most industries",
      thumbnail: "https://via.placeholder.com/150x200?text=Modern",
      tags: ["Professional", "Clean", "Corporate"],
      popular: true,
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Eye-catching design for creative professionals",
      thumbnail: "https://via.placeholder.com/150x200?text=Creative",
      tags: ["Creative", "Bold", "Design"],
      popular: true,
    },
    {
      id: "minimal",
      name: "Minimal Classic",
      description: "Traditional layout with clean minimalist styling",
      thumbnail: "https://via.placeholder.com/150x200?text=Minimal",
      tags: ["Minimal", "Traditional", "Simple"],
      popular: false,
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Sophisticated design for senior professionals",
      thumbnail: "https://via.placeholder.com/150x200?text=Executive",
      tags: ["Executive", "Formal", "Corporate"],
      popular: false,
    },
    {
      id: "tech",
      name: "Tech Innovator",
      description: "Modern layout for tech industry professionals",
      thumbnail: "https://via.placeholder.com/150x200?text=Tech",
      tags: ["Tech", "Modern", "Digital"],
      popular: true,
    },
    {
      id: "academic",
      name: "Academic CV",
      description: "Comprehensive layout for academic professionals",
      thumbnail: "https://via.placeholder.com/150x200?text=Academic",
      tags: ["Academic", "Detailed", "Research"],
      popular: false,
    },
  ];
  
  const handleAddExperience = () => {
    setCurrentExperience({
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      current: false,
      description: "",
    });
  };
  
  const handleSaveExperience = (experience: Experience) => {
    if (experiences.find(e => e.id === experience.id)) {
      setExperiences(experiences.map(e => e.id === experience.id ? experience : e));
    } else {
      setExperiences([...experiences, experience]);
    }
    setCurrentExperience(null);
  };
  
  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };
  
  const handleAddEducation = () => {
    setCurrentEducation({
      id: Date.now().toString(),
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: undefined,
      endDate: undefined,
      current: false,
      description: "",
    });
  };
  
  const handleSaveEducation = (edu: Education) => {
    if (education.find(e => e.id === edu.id)) {
      setEducation(education.map(e => e.id === edu.id ? edu : e));
    } else {
      setEducation([...education, edu]);
    }
    setCurrentEducation(null);
  };
  
  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter(e => e.id !== id));
  };
  
  const handleAddSkill = () => {
    setCurrentSkill({
      id: Date.now().toString(),
      name: "",
      level: 3,
    });
  };
  
  const handleSaveSkill = (skill: Skill) => {
    if (skills.find(s => s.id === skill.id)) {
      setSkills(skills.map(s => s.id === skill.id ? skill : s));
    } else {
      setSkills([...skills, skill]);
    }
    setCurrentSkill(null);
  };
  
  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    console.log("Experiences:", experiences);
    console.log("Education:", education);
    console.log("Skills:", skills);
    console.log("Template:", selectedTemplate);
    // In a real application, you would process this data to generate the resume
  };

  if (!selectedTemplate) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Select a Template First</h1>
          <p className="mb-6">Please choose a resume template to continue building your resume</p>
          <Button onClick={() => navigate("/resume/templates")}>
            <LayoutTemplate className="mr-2 h-4 w-4" /> Browse Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <ResumeHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>Your Resume Journey</CardTitle>
                <CardDescription>
                  Follow these steps to create a professional resume
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center py-1">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">1</div>
                    <span>Choose a professional template</span>
                    <span className="ml-auto text-green-600">✓ Done</span>
                  </div>
                  <div className="flex items-center py-1">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">2</div>
                    <span>Fill in your personal information</span>
                    <span className="ml-auto">{activeTab === "personal" ? "In progress" : ""}</span>
                  </div>
                  <div className="flex items-center py-1">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">3</div>
                    <span>Add work experience</span>
                    <span className="ml-auto">{activeTab === "experience" ? "In progress" : ""}</span>
                  </div>
                  <div className="flex items-center py-1">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">4</div>
                    <span>Include education history</span>
                    <span className="ml-auto">{activeTab === "education" ? "In progress" : ""}</span>
                  </div>
                  <div className="flex items-center py-1">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">5</div>
                    <span>List your skills</span>
                    <span className="ml-auto">{activeTab === "skills" ? "In progress" : ""}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Selected Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden mb-4 border">
                  <img 
                    src={`https://via.placeholder.com/300x400?text=${selectedTemplate}`}
                    alt="Selected template preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate("/resume/templates")}>
                  Change Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid-Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Summary</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe your professional background, strengths, and career goals..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A compelling summary helps grab the employer's attention. Keep it concise (2-4 sentences).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="experience">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <Button variant="outline" onClick={handleAddExperience}>
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </div>
              
              {experiences.length === 0 && !currentExperience && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground mb-4">No work experience added yet</p>
                    <Button variant="secondary" onClick={handleAddExperience}>
                      <Plus className="mr-2 h-4 w-4" /> Add Work Experience
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription>
                          {exp.company}{exp.location ? ` • ${exp.location}` : ""}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setCurrentExperience(exp)}
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-2">
                      {exp.startDate && format(exp.startDate, "MMM yyyy")} - {
                        exp.current 
                          ? "Present" 
                          : exp.endDate ? format(exp.endDate, "MMM yyyy") : ""
                      }
                    </div>
                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
              
              {currentExperience && (
                <Card>
                  <CardHeader>
                    <CardTitle>{currentExperience.id ? "Edit" : "Add"} Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="title">
                            Job Title
                          </label>
                          <Input 
                            id="title"
                            value={currentExperience.title}
                            onChange={(e) => setCurrentExperience({
                              ...currentExperience, 
                              title: e.target.value
                            })}
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="company">
                            Company
                          </label>
                          <Input 
                            id="company"
                            value={currentExperience.company}
                            onChange={(e) => setCurrentExperience({
                              ...currentExperience, 
                              company: e.target.value
                            })}
                            placeholder="Acme Inc."
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="location">
                          Location
                        </label>
                        <Input 
                          id="location"
                          value={currentExperience.location}
                          onChange={(e) => setCurrentExperience({
                            ...currentExperience, 
                            location: e.target.value
                          })}
                          placeholder="New York, NY"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Start Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !currentExperience.startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {currentExperience.startDate ? format(currentExperience.startDate, "MMM yyyy") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={currentExperience.startDate}
                                onSelect={(date) => setCurrentExperience({
                                  ...currentExperience, 
                                  startDate: date
                                })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            End Date
                          </label>
                          <div className="flex items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "flex-1 justify-start text-left font-normal",
                                    (!currentExperience.endDate && !currentExperience.current) && "text-muted-foreground",
                                    currentExperience.current && "opacity-50"
                                  )}
                                  disabled={currentExperience.current}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {currentExperience.endDate ? format(currentExperience.endDate, "MMM yyyy") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={currentExperience.endDate}
                                  onSelect={(date) => setCurrentExperience({
                                    ...currentExperience, 
                                    endDate: date
                                  })}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <input
                              type="checkbox"
                              id="current-job"
                              checked={currentExperience.current}
                              onChange={(e) => setCurrentExperience({
                                ...currentExperience,
                                current: e.target.checked,
                                endDate: e.target.checked ? undefined : currentExperience.endDate
                              })}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="current-job" className="text-sm">
                              I currently work here
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="description">
                          Description
                        </label>
                        <Textarea 
                          id="description"
                          value={currentExperience.description}
                          onChange={(e) => setCurrentExperience({
                            ...currentExperience, 
                            description: e.target.value
                          })}
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[120px]"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use bullet points to highlight accomplishments. Start each bullet with an action verb.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" onClick={() => setCurrentExperience(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveExperience(currentExperience)}>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="education">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Education</h2>
                <Button variant="outline" onClick={handleAddEducation}>
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </div>
              
              {education.length === 0 && !currentEducation && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground mb-4">No education added yet</p>
                    <Button variant="secondary" onClick={handleAddEducation}>
                      <Plus className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* List of education entries would go here */}
              
              {/* Form for adding/editing education would go here, similar to experience */}
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Skills</h2>
                <Button variant="outline" onClick={handleAddSkill}>
                  <Plus className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </div>
              
              {skills.length === 0 && !currentSkill && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground mb-4">No skills added yet</p>
                    <Button variant="secondary" onClick={handleAddSkill}>
                      <Plus className="mr-2 h-4 w-4" /> Add Skill
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* List of skills would go here */}
              
              {/* Form for adding/editing skills would go here */}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline"
            onClick={() => {
              const prevTabs = {
                personal: "personal",
                experience: "personal",
                education: "experience",
                skills: "education",
              };
              //@ts-ignore
              setActiveTab(prevTabs[activeTab]);
            }}
            disabled={activeTab === "personal"}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => console.log("Save as draft")}
            >
              Save Draft
            </Button>
            {activeTab === "skills" ? (
              <Button onClick={() => console.log("Preview resume")}>
                <FileText className="mr-2 h-4 w-4" />
                Preview Resume
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const nextTabs = {
                    personal: "experience",
                    experience: "education",
                    education: "skills",
                  };
                  //@ts-ignore
                  setActiveTab(nextTabs[activeTab]);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Download Resume</h3>
            <Button disabled={!selectedTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Complete all sections and select a template to download your resume.
          </p>
        </div>
      </div>
    </div>
  );
}
