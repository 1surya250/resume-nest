import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Search, MapPin, Building, Calendar, BookmarkPlus, Bookmark, Share2, ArrowUpRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary: string | null;
  description: string;
  requirements: string[];
  postedDate: string;
  logo: string;
  companySize: string;
  industry: string;
  saved: boolean;
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  
  const jobs: Job[] = [
    {
      id: "job1",
      title: "Software Developer",
      company: "TechCorp",
      location: "New York, NY (Remote)",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "We are seeking a talented software developer to join our growing team. In this role, you will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and implementing new features.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of experience in software development",
        "Proficiency in JavaScript, HTML, and CSS",
        "Experience with React or similar frameworks",
        "Knowledge of RESTful APIs and database design"
      ],
      postedDate: "2023-05-01",
      logo: "https://via.placeholder.com/40",
      companySize: "51-200 employees",
      industry: "Technology",
      saved: false
    },
    {
      id: "job2",
      title: "Data Analyst",
      company: "AnalyticsPro",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$70,000 - $90,000",
      description: "Join our data analytics team and help transform raw data into actionable insights. You will work with large datasets, develop visualization tools, and create reports for key stakeholders.",
      requirements: [
        "Bachelor's degree in Statistics, Mathematics, or related field",
        "Experience with SQL and data visualization tools",
        "Proficiency in Python or R",
        "Strong analytical and problem-solving skills",
        "Excellent communication skills"
      ],
      postedDate: "2023-05-03",
      logo: "https://via.placeholder.com/40",
      companySize: "201-500 employees",
      industry: "Business Intelligence",
      saved: false
    },
    {
      id: "job3",
      title: "UX/UI Designer",
      company: "CreativeSolutions",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      description: "Design intuitive and engaging user experiences for web and mobile applications. Collaborate with product managers and developers to create wireframes, prototypes, and visual designs.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "3+ years of experience in UX/UI design",
        "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
        "Strong portfolio demonstrating user-centered design principles",
        "Experience conducting user research and usability testing"
      ],
      postedDate: "2023-05-05",
      logo: "https://via.placeholder.com/40",
      companySize: "11-50 employees",
      industry: "Design",
      saved: false
    },
    {
      id: "job4",
      title: "Marketing Coordinator",
      company: "BrandBoost",
      location: "Remote",
      type: "Full-time",
      salary: "$50,000 - $65,000",
      description: "Support our marketing team in planning and executing campaigns across various channels. Coordinate with content creators, manage social media accounts, and analyze campaign performance.",
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "1+ years of experience in marketing or related role",
        "Familiarity with digital marketing tools and social media platforms",
        "Strong organizational and multitasking skills",
        "Excellent written and verbal communication"
      ],
      postedDate: "2023-05-07",
      logo: "https://via.placeholder.com/40",
      companySize: "51-200 employees",
      industry: "Marketing & Advertising",
      saved: false
    },
    {
      id: "job5",
      title: "Frontend Developer Intern",
      company: "WebWizards",
      location: "Boston, MA",
      type: "Internship",
      salary: "$25/hour",
      description: "Gain hands-on experience in frontend development by working on real projects. Learn from experienced developers and contribute to building responsive and accessible web applications.",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Familiarity with at least one frontend framework (React, Vue, Angular)",
        "Eagerness to learn and grow",
        "Strong problem-solving skills"
      ],
      postedDate: "2023-05-09",
      logo: "https://via.placeholder.com/40",
      companySize: "11-50 employees",
      industry: "Technology",
      saved: false
    },
    {
      id: "job6",
      title: "Project Manager",
      company: "GlobalTech",
      location: "Dallas, TX (Hybrid)",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      description: "Lead cross-functional teams to deliver complex technology projects on time and within budget. Develop project plans, manage resources, and report on project status to stakeholders.",
      requirements: [
        "Bachelor's degree in Business, Computer Science, or related field",
        "PMP certification preferred",
        "3+ years of experience in project management",
        "Strong leadership and communication skills",
        "Experience with Agile methodologies"
      ],
      postedDate: "2023-05-10",
      logo: "https://via.placeholder.com/40",
      companySize: "1,001-5,000 employees",
      industry: "Technology",
      saved: false
    }
  ];
  
  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };
  
  const filteredJobs = jobs.filter(job => {
    // Filter by search term (title or company)
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by location
    const matchesLocation = locationTerm === "" || 
                            job.location.toLowerCase().includes(locationTerm.toLowerCase());
    
    // Filter by job type
    const matchesJobType = jobTypeFilter === "all" || job.type.toLowerCase() === jobTypeFilter.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesJobType;
  });
  
  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    } else if (sortBy === "salary") {
      // Simple sorting based on the lower end of salary range
      const aSalary = a.salary ? parseInt(a.salary.split("-")[0].replace(/[^0-9]/g, "")) : 0;
      const bSalary = b.salary ? parseInt(b.salary.split("-")[0].replace(/[^0-9]/g, "")) : 0;
      return bSalary - aSalary;
    }
    // Default relevance sorting (keep original order)
    return 0;
  });
  
  // Format relative date (e.g., "2 days ago")
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 font-montserrat">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Discover job openings that match your skills and career goals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 max-w-4xl mx-auto">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, company, or keywords"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="City, state, or remote"
                  className="pl-10"
                  value={locationTerm}
                  onChange={(e) => setLocationTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Button className="w-full">Search</Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge
              variant={jobTypeFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("all")}
            >
              All Jobs
            </Badge>
            <Badge
              variant={jobTypeFilter === "full-time" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("full-time")}
            >
              Full-time
            </Badge>
            <Badge
              variant={jobTypeFilter === "part-time" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("part-time")}
            >
              Part-time
            </Badge>
            <Badge
              variant={jobTypeFilter === "contract" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("contract")}
            >
              Contract
            </Badge>
            <Badge
              variant={jobTypeFilter === "internship" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("internship")}
            >
              Internship
            </Badge>
            <Badge
              variant={jobTypeFilter === "remote" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setJobTypeFilter("remote")}
            >
              Remote
            </Badge>
          </div>
          
          <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} jobs found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="browse" className="mb-8">
          <TabsList className="mx-auto w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            {sortedJobs.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No matching jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {sortedJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                            <img src={job.logo} alt={`${job.company} logo`} className="w-10 h-10" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {job.company}
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaveJob(job.id)}
                        >
                          {savedJobs.includes(job.id) ? (
                            <Bookmark className="h-5 w-5 fill-current" />
                          ) : (
                            <BookmarkPlus className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {job.type}
                        </Badge>
                        {job.salary && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            {job.salary}
                          </Badge>
                        )}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatRelativeDate(job.postedDate)}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {job.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {req}
                            </li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-sm text-primary">
                              +{job.requirements.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {job.companySize}
                        </span>
                        <span>{job.industry}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                      <Button className="gap-1">
                        Apply Now
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="gap-1">
                        View Details
                      </Button>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {savedJobs.length === 0 ? (
              <div className="text-center py-16">
                <Bookmark className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No saved jobs yet</h3>
                <p className="text-muted-foreground mb-4">
                  Save jobs you're interested in to revisit them later
                </p>
                <Button variant="outline" onClick={() => document.querySelector('[data-state="inactive"]')?.click()}>
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {jobs
                  .filter(job => savedJobs.includes(job.id))
                  .map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                              <img src={job.logo} alt={`${job.company} logo`} className="w-10 h-10" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {job.company}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveJob(job.id)}
                          >
                            {savedJobs.includes(job.id) ? (
                              <Bookmark className="h-5 w-5 fill-current" />
                            ) : (
                              <BookmarkPlus className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.type}
                          </Badge>
                          {job.salary && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              {job.salary}
                            </Badge>
                          )}
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatRelativeDate(job.postedDate)}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {job.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {req}
                              </li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-sm text-primary">
                                +{job.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {job.companySize}
                          </span>
                          <span>{job.industry}</span>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                        <Button className="gap-1">
                          Apply Now
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="gap-1">
                          View Details
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Job Search Tips */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center font-montserrat">Job Search Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfect Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Tailor your resume for each application by highlighting relevant skills and experiences.
                  Use our professional templates and AI-powered suggestions.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <a href="/resume">Create Resume</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prepare for Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Practice common interview questions and scenarios with our AI-powered mock interview tool.
                  Get feedback and improve your responses.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <a href="/interview">Interview Preparation</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enhance Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stay competitive by acquiring in-demand skills through our courses and certifications.
                  Add these credentials to your resume to stand out.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA */}
        <section className="mt-16 bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 font-montserrat">Get Personalized Job Recommendations</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our AI-powered job matching tool can help you find relevant opportunities
            based on your skills, experience, and career goals.
          </p>
          <Button className="rounded-full">Create Job Alert</Button>
        </section>
      </div>
    </div>
  );
}
