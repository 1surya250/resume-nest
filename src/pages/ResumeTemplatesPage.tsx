
import { useState } from "react";
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
import { Search, Filter, ArrowRight, Bookmark } from "lucide-react";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";

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
  const { walletInfo, connectWallet, disconnectWallet, isLoading } = useAptosWallet();

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
          <div className="mt-6 flex justify-center">
            {!walletInfo.isConnected ? (
              <Button 
                onClick={connectWallet} 
                disabled={isLoading} 
                variant="outline" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
              >
                {isLoading ? "Connecting..." : "Connect Aptos Wallet for Premium Templates"}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="py-2">
                  Connected: {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
                </Badge>
                <Button variant="ghost" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
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
            >
              Premium
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`overflow-hidden hover:shadow-lg transition-all ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full aspect-[3/4] object-cover"
                />
                {template.premium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500">Premium</Badge>
                  </div>
                )}
                {template.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500">Popular</Badge>
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
                  Use this template
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
