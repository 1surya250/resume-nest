
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BookOpenCheck, FileText, FileType } from "lucide-react";

export default function GuidePage() {
  const resumeGuides = [
    {
      title: "Crafting an Effective Resume",
      description: "Learn the fundamentals of creating a professional resume that stands out to recruiters and hiring managers.",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Understanding the purpose of a resume",
        "Key sections to include in your resume",
        "How to highlight your skills and achievements",
        "Formatting and design best practices",
        "Common resume mistakes to avoid"
      ]
    },
    {
      title: "Resume Structure and Content",
      description: "Dive deeper into the specific sections of your resume and learn how to optimize each one.",
      icon: <BookOpenCheck className="h-5 w-5" />,
      items: [
        "Crafting an impactful professional summary",
        "Effectively presenting your work experience",
        "Listing education and certifications",
        "Including relevant skills and competencies",
        "Adding additional sections for extra impact"
      ]
    },
    {
      title: "Tailoring Your Resume",
      description: "Learn how to customize your resume for specific job applications to increase your chances of success.",
      icon: <BadgeCheck className="h-5 w-5" />,
      items: [
        "Analyzing job descriptions for keywords",
        "Adapting your resume for different industries",
        "Highlighting relevant experience for each application",
        "Using action verbs and achievement-focused language",
        "Quantifying your achievements with metrics"
      ]
    }
  ];

  const coverLetterGuides = [
    {
      title: "Cover Letter Fundamentals",
      description: "Understand the purpose and structure of an effective cover letter.",
      icon: <FileType className="h-5 w-5" />,
      items: [
        "The purpose and importance of a cover letter",
        "Standard cover letter structure and format",
        "Addressing the hiring manager appropriately",
        "Tailoring your cover letter for each application",
        "Proper tone and language for cover letters"
      ]
    },
    {
      title: "Writing Compelling Content",
      description: "Learn how to write engaging cover letter content that complements your resume.",
      icon: <BookOpenCheck className="h-5 w-5" />,
      items: [
        "Creating an attention-grabbing opening paragraph",
        "Connecting your skills to the job requirements",
        "Telling your career story effectively",
        "Expressing genuine interest in the company",
        "Crafting a strong closing paragraph"
      ]
    },
    {
      title: "Cover Letter Dos and Don'ts",
      description: "Avoid common mistakes and follow best practices for cover letter writing.",
      icon: <BadgeCheck className="h-5 w-5" />,
      items: [
        "Keeping your cover letter concise and focused",
        "Avoiding generic and template-sounding language",
        "Proper proofreading and editing techniques",
        "Common cover letter mistakes to avoid",
        "When to follow up after submitting your application"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-careercraft-purple hover:bg-careercraft-purple text-white">Career Guide</Badge>
          <h1 className="text-4xl font-bold mb-4 font-montserrat">Resume & Cover Letter Guide</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Master the art of creating impactful resumes and cover letters that help you stand out in the job market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="rounded-full">Take Knowledge Test</Button>
            <Button variant="outline" className="rounded-full">Create Resume</Button>
          </div>
        </div>

        {/* Importance Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-montserrat">Why Resumes and Cover Letters Matter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-careercraft-purple/10">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">First Impression</h3>
                <p className="text-sm text-muted-foreground">
                  Your resume is often the first interaction between you and a potential employer. Making it count is crucial for moving forward in the hiring process.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-careercraft-yellow/10">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Marketing Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Both documents serve as personal marketing tools that showcase your skills, experiences, and qualifications to potential employers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-careercraft-green/10">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Career Advancement</h3>
                <p className="text-sm text-muted-foreground">
                  Well-crafted resumes and cover letters can significantly increase your chances of landing interviews and advancing in your career.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-muted-foreground">
            In today's competitive job market, having a strong resume and cover letter is more important than ever. These documents help you stand out from other candidates and showcase your unique value to potential employers. They serve as your personal marketing materials, highlighting your skills, experiences, and qualifications in a way that demonstrates your fit for specific roles.
          </p>
        </section>

        {/* Guides Section */}
        <section className="mb-12">
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="resume">Resume Guide</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="resume">
              <div className="space-y-8">
                {resumeGuides.map((guide, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {guide.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">{guide.title}</h3>
                          <p className="text-muted-foreground mb-4">{guide.description}</p>
                          <ul className="space-y-2">
                            {guide.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button variant="ghost" size="sm">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="cover-letter">
              <div className="space-y-8">
                {coverLetterGuides.map((guide, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {guide.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">{guide.title}</h3>
                          <p className="text-muted-foreground mb-4">{guide.description}</p>
                          <ul className="space-y-2">
                            {guide.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button variant="ghost" size="sm">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 font-montserrat">Ready to Apply Your Knowledge?</h2>
          <p className="text-muted-foreground mb-6">
            Test your understanding of resume and cover letter best practices or start building your professional documents.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full bg-careercraft-purple hover:bg-careercraft-purple/90">
              <a href="/test">Take the Knowledge Test</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="/resume">Create Your Resume</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
