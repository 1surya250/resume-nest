
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-careercraft-purple to-careercraft-green flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="font-bold text-xl">CareerCraft</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Elevate your career with AI-powered resume building, professional development,
              and job search assistance.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Github"
              >
                <Github size={18} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:info@careercraft.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Chat"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resume Guide
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Courses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/test" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Knowledge Test
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Interview Training
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Job Search
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest career resources and tools.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md bg-muted border-r-0 focus:outline-none text-sm flex-1"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm focus:outline-none hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareerCraft. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
