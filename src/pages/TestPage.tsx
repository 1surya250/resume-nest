
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Trophy, Clock } from "lucide-react";
import { BadgeDisplay } from "@/components/ui/badge-display";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ question: number; isCorrect: boolean }[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  
  const resumeQuestions: Question[] = [
    {
      id: 1,
      question: "What is the recommended length for a professional resume?",
      options: [
        "As long as needed to include all experiences",
        "1-2 pages",
        "3-5 pages",
        "Always exactly 1 page"
      ],
      correctAnswer: 1,
      explanation: "Most employers prefer resumes that are 1-2 pages in length. This provides enough space to highlight relevant experiences while remaining concise."
    },
    {
      id: 2,
      question: "Which of the following should NOT be included in a modern resume?",
      options: [
        "Professional summary",
        "Skills section",
        "Photo of yourself",
        "Work experience"
      ],
      correctAnswer: 2,
      explanation: "Unless you're in specific industries like acting or modeling, photos are generally not recommended for resumes as they can lead to unconscious bias."
    },
    {
      id: 3,
      question: "What is the best approach for formatting dates on a resume?",
      options: [
        "Only include years (e.g., 2018-2022)",
        "Include full dates with day, month, and year",
        "Use a consistent format (either Month/Year or just Year)",
        "Only include the duration (e.g., 4 years)"
      ],
      correctAnswer: 2,
      explanation: "Using a consistent date format throughout your resume is important for readability. Month/Year (e.g., January 2020 - March 2022) is typically the most common format."
    },
    {
      id: 4,
      question: "Which action verbs are most effective for describing achievements on a resume?",
      options: [
        "Helped, tried, attempted",
        "Managed, developed, implemented",
        "Was responsible for, did, worked on",
        "Participated in, assisted with, supported"
      ],
      correctAnswer: 1,
      explanation: "Strong action verbs like 'managed,' 'developed,' and 'implemented' demonstrate leadership and concrete accomplishments rather than passive participation."
    },
    {
      id: 5,
      question: "How should you list your education on a resume?",
      options: [
        "Always at the top, regardless of experience level",
        "At the bottom for experienced professionals, at the top for recent graduates",
        "Only include your highest degree",
        "Include every educational experience you've had"
      ],
      correctAnswer: 1,
      explanation: "For recent graduates, education is typically placed at the top. For experienced professionals, it's usually placed after work experience as your professional background becomes more relevant."
    }
  ];
  
  const coverLetterQuestions: Question[] = [
    {
      id: 1,
      question: "What is the primary purpose of a cover letter?",
      options: [
        "To repeat the information in your resume",
        "To explain employment gaps",
        "To introduce yourself and explain why you're a good fit for the position",
        "To list all your qualifications in detail"
      ],
      correctAnswer: 2,
      explanation: "A cover letter should complement your resume by introducing yourself, explaining your interest in the position, and highlighting specific experiences that make you a strong candidate."
    },
    {
      id: 2,
      question: "What is the recommended length for a cover letter?",
      options: [
        "3-4 pages",
        "1/2 page or less",
        "2-3 pages",
        "3/4 to 1 page"
      ],
      correctAnswer: 3,
      explanation: "Cover letters should typically be 3/4 to 1 page in length. This provides enough space to make your case without overwhelming the reader."
    },
    {
      id: 3,
      question: "To whom should you address your cover letter?",
      options: [
        "The hiring manager by name",
        "'To Whom It May Concern'",
        "'Dear Sir or Madam'",
        "The company name"
      ],
      correctAnswer: 0,
      explanation: "Whenever possible, address your cover letter to the specific hiring manager or recruiter by name. This personalizes your application and shows you've done your research."
    },
    {
      id: 4,
      question: "Which of the following should NOT be included in a cover letter?",
      options: [
        "Why you're interested in the company",
        "Salary expectations",
        "How your skills match the job requirements",
        "A brief introduction about yourself"
      ],
      correctAnswer: 1,
      explanation: "Salary expectations should typically not be included in a cover letter unless specifically requested. This discussion is better saved for later in the interview process."
    },
    {
      id: 5,
      question: "What is the best approach for ending a cover letter?",
      options: [
        "Express eagerness for an interview without any follow-up plan",
        "Thank the reader for their consideration and include your contact information",
        "State that you'll call them next week to discuss further",
        "List references"
      ],
      correctAnswer: 1,
      explanation: "A strong closing should thank the reader for their consideration, express interest in an interview, and include your contact information for easy follow-up."
    }
  ];
  
  const [activeTest, setActiveTest] = useState<'resume' | 'cover-letter'>('resume');
  const questions = activeTest === 'resume' ? resumeQuestions : coverLetterQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
  
  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionIndex);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setResults([...results, { question: currentQuestion.id, isCorrect }]);
    setIsAnswerSubmitted(true);
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setResults([]);
    setTestCompleted(false);
  };
  
  const handleTabChange = (value: string) => {
    if (testCompleted || currentQuestionIndex === 0) {
      setActiveTest(value as 'resume' | 'cover-letter');
      handleRestart();
    }
  };
  
  const badge = {
    id: "resume-expert",
    name: "Resume Expert",
    description: "Awarded for scoring 80% or higher on the Resume Knowledge Test",
    icon: "🏆",
    color: "careercraft-purple",
    earned: score >= 4, // 80% of 5 questions
    earnedDate: new Date().toLocaleDateString(),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 font-montserrat">Test Your Knowledge</h1>
          <p className="text-muted-foreground">
            Challenge yourself with these quizzes to test your understanding of resume and cover letter best practices.
          </p>
        </div>

        <Tabs value={activeTest} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resume">Resume Quiz</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter Quiz</TabsTrigger>
          </TabsList>
          <TabsContent value="resume">
            <div className="text-center mb-4">
              <p>Test your knowledge about resume writing best practices.</p>
            </div>
          </TabsContent>
          <TabsContent value="cover-letter">
            <div className="text-center mb-4">
              <p>Test your knowledge about cover letter writing best practices.</p>
            </div>
          </TabsContent>
        </Tabs>

        {!testCompleted ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
                </div>
                <div className="text-sm font-medium">Score: {score}/{currentQuestionIndex}</div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <CardTitle className="mt-4 text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedOption === index 
                        ? isAnswerSubmitted
                          ? index === currentQuestion.correctAnswer
                            ? "bg-green-100 dark:bg-green-900/30 border-green-500"
                            : "bg-red-100 dark:bg-red-900/30 border-red-500"
                          : "bg-primary/10 border-primary"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">{option}</div>
                      {isAnswerSubmitted && selectedOption === index && (
                        <div className="ml-2">
                          {index === currentQuestion.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {isAnswerSubmitted && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="font-medium">Explanation:</p>
                  <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!isAnswerSubmitted ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={selectedOption === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-center">
                You scored {score} out of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                {score >= 4 ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Trophy className="h-12 w-12 text-careercraft-yellow" />
                    </div>
                    <p className="font-medium text-lg">Great job! You've earned a badge!</p>
                    <div className="flex justify-center">
                      <BadgeDisplay badge={badge} size="lg" />
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    You need to score at least 4 out of 5 to earn a badge. Keep learning and try again!
                  </p>
                )}
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-medium">Question Summary:</h3>
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md ${
                      result.isCorrect 
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    <div className="flex items-center">
                      {result.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      )}
                      <span>Question {index + 1}: {result.isCorrect ? "Correct" : "Incorrect"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleRestart}>
                Retake Quiz
              </Button>
              <Button variant="outline" asChild>
                <a href="/guide">Review Guide</a>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
