
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Search, Filter, ArrowRight, Bookmark, Crown, Lock, Wallet, ExternalLink } from "lucide-react";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { AptosWalletButton } from "@/components/resume/AptosWalletButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  popular: boolean;
  premium: boolean;
};

export default function ResumeTemplatesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showWalletInfoDialog, setShowWalletInfoDialog] = useState(false);
  const { walletInfo } = useAptosWallet();

  const templates: ResumeTemplate[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and modern design suitable for most industries",
      thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=2070",
      tags: ["Professional", "Clean", "Corporate"],
      popular: true,
      premium: false,
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Eye-catching design for creative professionals",
      thumbnail: "https://images.unsplash.com/photo-1583912267550-83f84bf936b3?q=80&w=2070",
      tags: ["Creative", "Bold", "Design"],
      popular: true,
      premium: false,
    },
    {
      id: "minimal",
      name: "Minimal Classic",
      description: "Traditional layout with clean minimalist styling",
      thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070",
      tags: ["Minimal", "Traditional", "Simple"],
      popular: false,
      premium: false,
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Sophisticated design for senior professionals",
      thumbnail: "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=1974",
      tags: ["Executive", "Formal", "Corporate"],
      popular: false,
      premium: true,
    },
    {
      id: "tech",
      name: "Tech Innovator",
      description: "Modern layout for tech industry professionals",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072",
      tags: ["Tech", "Modern", "Digital"],
      popular: true,
      premium: true,
    },
    {
      id: "academic",
      name: "Academic CV",
      description: "Comprehensive layout for academic professionals",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
      tags: ["Academic", "Detailed", "Research"],
      popular: false,
      premium: true,
    },
    {
      id: "startup",
      name: "Startup Founder",
      description: "Dynamic layout for entrepreneurs and founders",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
      tags: ["Startup", "Entrepreneur", "Bold"],
      popular: true,
      premium: true,
    },
    {
      id: "medical",
      name: "Medical Professional",
      description: "Specialized layout for healthcare professionals",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
      tags: ["Medical", "Healthcare", "Professional"],
      popular: false,
      premium: true,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === "popular") return matchesSearch && template.popular;
    if (filter === "free") return matchesSearch && !template.premium;
    if (filter === "premium") return matchesSearch && template.premium;
    
    return matchesSearch;
  });

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Once connected, we can navigate to resume creation
    navigate(`/resume?template=${templateId}`);
  };

  const handleFilterClick = (filterName: string) => {
    if (filter === filterName) {
      setFilter(null);
    } else {
      setFilter(filterName);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 font-montserrat">Resume Templates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our professionally designed templates to create a standout resume that will impress employers
          </p>

          {/* Aptos Wallet Connection */}
          <div className="mt-6 flex flex-col items-center">
            {!walletInfo.isConnected ? (
              <div className="flex flex-col items-center gap-2">
                <Button 
                  onClick={() => setShowWalletInfoDialog(true)} 
                  variant="outline" 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90 mb-2 gap-2"
                >
                  <Crown className="h-4 w-4" /> Premium Templates
                </Button>
                <p className="text-sm text-muted-foreground">
                  Connect your Aptos wallet to unlock premium templates and features
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 p-2 px-4 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-800">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Premium access unlocked</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connected as: {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={filter === "popular" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleFilterClick("popular")}
            >
              Popular
            </Button>
            <Button 
              variant={filter === "free" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleFilterClick("free")}
            >
              Free
            </Button>
            <Button 
              variant={filter === "premium" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleFilterClick("premium")}
              className={filter === "premium" ? "" : "gap-1"}
            >
              {filter !== "premium" && <Crown className="h-3.5 w-3.5" />} Premium
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`overflow-hidden hover:shadow-lg transition-all ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              } ${template.premium && !walletInfo.isConnected ? "opacity-80" : ""}`}
            >
              <div className="relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full aspect-[3/4] object-cover"
                />
                {template.premium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500 gap-1">
                      <Crown className="h-3.5 w-3.5" /> Premium
                    </Badge>
                  </div>
                )}
                {template.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500">Popular</Badge>
                  </div>
                )}
                {template.premium && !walletInfo.isConnected && (
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                    <Lock className="h-12 w-12 mb-2" />
                    <p className="font-bold text-lg">Premium Template</p>
                    <p className="text-sm opacity-90">Connect wallet to unlock</p>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <Bookmark size={16} className="mr-1" />
                  Save
                </Button>
                <Button 
                  onClick={() => handleSelectTemplate(template.id)}
                  disabled={template.premium && !walletInfo.isConnected}
                >
                  {template.premium && !walletInfo.isConnected ? (
                    <>
                      <Lock size={16} className="mr-1" />
                      Unlock
                    </>
                  ) : (
                    <>
                      Use this template
                      <ArrowRight size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Wallet Information Dialog */}
      <Dialog open={showWalletInfoDialog} onOpenChange={setShowWalletInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Connect Aptos Wallet
            </DialogTitle>
            <DialogDescription>
              Connect your wallet to access premium templates and features
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2 p-4 rounded-md border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="font-medium flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" /> Premium Benefits
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <div>Access to all premium templates</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <div>Unlimited resume exports</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <div>Custom resume sections</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5">•</div>
                  <div>Priority support</div>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">How to connect:</h3>
              <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                <li>Install the Petra Wallet browser extension</li>
                <li>Create a new wallet or import an existing one</li>
                <li>Make sure you have some APT tokens for transaction fees</li>
                <li>Click the connect button below</li>
              </ol>
            </div>
          </div>
          
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={() => window.open("https://petra.app/", "_blank")}
              className="w-full sm:w-auto gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Get Petra Wallet
            </Button>
            <AptosWalletButton variant="default" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
