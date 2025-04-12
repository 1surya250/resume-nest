
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AptosWalletButton } from "./AptosWalletButton";
import { LayoutTemplate, Save, FileText } from "lucide-react";

export function ResumeHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState(false);

  useEffect(() => {
    // Check if there's a template parameter in the URL
    const params = new URLSearchParams(location.search);
    setHasSelectedTemplate(params.has("template"));
  }, [location.search]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-1 font-montserrat">Create Your Resume</h1>
        <p className="text-muted-foreground">
          {hasSelectedTemplate 
            ? "Complete each section to build your professional resume" 
            : "Select a template to get started with your resume"}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <AptosWalletButton />
        {!hasSelectedTemplate && (
          <Button onClick={() => navigate("/resume/templates")}>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            Browse Templates
          </Button>
        )}
        {hasSelectedTemplate && (
          <>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
