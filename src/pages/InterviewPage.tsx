
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mic, Video, MessageSquare, Play, Pause, UserPlus, Briefcase, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const mockInterview = {
    position: "Software Developer",
    company: "TechCorp Inc.",
    duration: "25 min",
    questions: [
      {
        id: 1,
        question: "Tell me about yourself and your background.",
        tips: [
          "Keep it professional and relevant to the job",
          "Structure it as: past, present, future",
          "Focus on achievements rather than duties",
          "Aim for 1-2 minutes in length"
        ]
      },
      {
        id: 2,
        question: "What are your strengths and weaknesses?",
        tips: [
          "Choose strengths relevant to the position",
          "Provide examples that demonstrate your strengths",
          "For weaknesses, show self-awareness and improvement",
          "Avoid clichés like 'I'm a perfectionist'"
        ]
      },
      {
        id: 3,
        question: "Describe a challenging project you worked on and how you handled it.",
        tips: [
          "Use the STAR method (Situation, Task, Action, Result)",
          "Focus on your specific contribution",
          "Highlight problem-solving skills and teamwork",
          "Quantify results where possible"
        ]
      },
      {
        id: 4,
        question: "Why do you want to work for this company?",
        tips: [
          "Show you've researched the company",
          "Connect their values/mission to your own goals",
          "Mention specific projects or initiatives that interest you",
          "Explain what you can contribute"
        ]
      },
      {
        id: 5,
        question: "Where do you see yourself in 5 years?",
        tips: [
          "Show ambition but be realistic",
          "Connect your goals to the position and company",
          "Emphasize your desire for growth and learning",
          "Avoid generic answers"
        ]
      }
    ]
  };

  const triggerNextStep = () => {
    if (interviewStep < mockInterview.questions.length - 1) {
      setCompletedSteps([...completedSteps, interviewStep]);
      setInterviewStep(interviewStep + 1);
    } else {
      // Interview completed
      setCompletedSteps([...completedSteps, interviewStep]);
    }
  };

  const resetInterview = () => {
    setInterviewStep(0);
    setCompletedSteps([]);
    setIsRecording(false);
  };

  const progressPercentage = interviewStep === 0 && completedSteps.length === 0
    ? 0
    : ((completedSteps.length + (interviewStep === mockInterview.questions.length - 1 ? 1 : 0)) / mockInterview.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 font-montserrat">Interview Training</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Practice for job interviews with our AI-powered mock interview simulations
          </p>
          
          <Tabs defaultValue="mock" className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
              <TabsTrigger value="questions">Q&A Practice</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="mock">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-2xl">{mockInterview.position}</CardTitle>
                      <CardDescription>{mockInterview.company} • {mockInterview.duration}</CardDescription>
                    </div>
                    <Badge className="bg-careercraft-purple hover:bg-careercraft-purple text-white">
                      Technical
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} />
                  </div>
                </CardHeader>
                
                <CardContent>
                  {completedSteps.length === mockInterview.questions.length ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Interview Completed!</h3>
                      <p className="text-muted-foreground mb-6">
                        You've completed all questions in this mock interview. 
                        You can review your responses or start a new interview.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetInterview}>
                          Start New Interview
                        </Button>
                        <Button>
                          View Feedback
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          Question {interviewStep + 1} of {mockInterview.questions.length}
                        </h3>
                        <div className="bg-muted p-4 rounded-md mb-4">
                          <p className="text-lg">{mockInterview.questions[interviewStep].question}</p>
                        </div>
                        
                        <div className="bg-secondary/30 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Response Tips:</h4>
                          <ul className="space-y-2">
                            {mockInterview.questions[interviewStep].tips.map((tip, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex gap-4 flex-wrap">
                          <Button 
                            className={`${isRecording ? "bg-red-500 hover:bg-red-600" : ""} gap-2`}
                            onClick={() => setIsRecording(!isRecording)}
                          >
                            {isRecording ? (
                              <>
                                <Pause className="h-4 w-4" /> Stop Recording
                              </>
                            ) : (
                              <>
                                <Mic className="h-4 w-4" /> Start Recording
                              </>
                            )}
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Video className="h-4 w-4" /> Video Response
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <MessageSquare className="h-4 w-4" /> Text Response
                          </Button>
                        </div>
                      </div>
                      
                      {isRecording && (
                        <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6 animate-pulse">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <p className="text-sm font-medium text-red-700 dark:text-red-300">Recording in progress...</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
                
                {completedSteps.length !== mockInterview.questions.length && (
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={resetInterview}
                      disabled={interviewStep === 0 && completedSteps.length === 0}
                    >
                      Start Over
                    </Button>
                    <Button onClick={triggerNextStep} disabled={!isRecording}>
                      {interviewStep < mockInterview.questions.length - 1 ? "Next Question" : "Complete Interview"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Common Interview Questions</CardTitle>
                  <CardDescription>
                    Practice your answers to frequently asked interview questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Coming soon! Practice individual interview questions categorized by:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Behavioral</Badge>
                      <Badge variant="outline">Technical</Badge>
                      <Badge variant="outline">Situational</Badge>
                      <Badge variant="outline">Company-specific</Badge>
                      <Badge variant="outline">Role-specific</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Feedback</CardTitle>
                  <CardDescription>
                    Review AI-powered analysis and feedback from your mock interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Coming soon! After completing mock interviews, you'll receive:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Detailed feedback on your responses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Content analysis and improvement suggestions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Communication style assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Areas of strength and improvement</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Interview Types Section */}
        <section className="my-16">
          <h2 className="text-2xl font-semibold mb-8 text-center font-montserrat">Interview Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Technical Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Practice coding problems, system design questions, and technical 
                  assessments specific to your field.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Software development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Data science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">IT roles</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Try Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Behavioral Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Master common behavioral questions that assess your soft skills,
                  teamwork, and past experiences.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">STAR method responses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Conflict resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Leadership experiences</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Try Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-10 h-10 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Scenario-Based Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Prepare for hypothetical scenarios that test your problem-solving,
                  critical thinking, and decision-making skills.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Case studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Role-playing exercises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">Critical incident scenarios</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Try Now</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 font-montserrat">Ready to Ace Your Next Interview?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start practicing with our AI-powered interview simulator to build confidence
            and improve your performance in real job interviews.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="rounded-full bg-careercraft-purple hover:bg-careercraft-purple/90">
              Start Mock Interview
            </Button>
            <Button variant="outline" className="rounded-full">
              Browse Interview Tips
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
