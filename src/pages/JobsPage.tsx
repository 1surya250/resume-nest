
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    description: "We're looking for a skilled frontend developer with React experience.",
    skills: ["React", "TypeScript", "CSS", "HTML"],
    postedDate: "2 days ago",
    applicants: 24,
    matchScore: 92,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupInc",
    location: "New York, NY (Hybrid)",
    salary: "$130,000 - $160,000",
    description: "Join our team to build innovative web applications using modern technologies.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    postedDate: "1 week ago",
    applicants: 47,
    matchScore: 85,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Austin, TX (On-site)",
    salary: "$100,000 - $130,000",
    description: "Create beautiful and intuitive user interfaces for our products.",
    skills: ["Figma", "Adobe XD", "Sketch", "UI/UX"],
    postedDate: "3 days ago",
    applicants: 36,
    matchScore: 78,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "ServerLogic",
    location: "Seattle, WA (Remote)",
    salary: "$140,000 - $170,000",
    description: "Build scalable APIs and backend services for our growing platform.",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    postedDate: "Just now",
    applicants: 12,
    matchScore: 88,
  },
];

const JobsPage: React.FC = () => {
  // Function to safely handle element click
  const handleApplyClick = (element: Element | null) => {
    if (element && element instanceof HTMLElement) {
      element.click();
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 font-montserrat">Find Your Next Opportunity</h1>
          <p className="text-lg text-muted-foreground">
            Browse through job listings matched to your resume and skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and filters sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input 
                    type="search" 
                    placeholder="Search job title or keyword" 
                    className="w-full pl-10" 
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <Input placeholder="City, state, or zip code" />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Job Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Remote</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Hybrid</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">On-site</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Full-time</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Part-time</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Experience Level</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Entry Level</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Mid Level</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Senior</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resume Match Insights</CardTitle>
                <CardDescription>How your resume compares to job requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Skills Match</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Experience Match</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Education Match</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <Button variant="outline">Update Your Resume</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job listings */}
          <div className="lg:col-span-2 space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company} • {job.location}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">{job.matchScore}% Match</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="mb-2 text-sm">{job.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Posted {job.postedDate}</div>
                    <div>{job.applicants} applicants</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleApplyClick(document.getElementById(`save-${job.id}`))}>
                    Save
                  </Button>
                  <Button size="sm">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
            
            <div className="flex justify-center pt-6">
              <Button variant="outline">Load More Jobs</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default export
export default JobsPage;
