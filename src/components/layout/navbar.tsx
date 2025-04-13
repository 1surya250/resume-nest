
import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { AptosWalletButton } from "@/components/resume/AptosWalletButton";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard", subItems: [
      { title: "Profile", href: "/dashboard/profile" },
      { title: "Tasks", href: "/dashboard/tasks" },
      { title: "Analytics", href: "/dashboard/analytics" }
    ]},
    { title: "Guide", href: "/guide" },
    { title: "Test", href: "/test" },
    { title: "Resume", href: "/resume" },
    { title: "Courses", href: "/courses" },
    { title: "Interview", href: "/interview" },
    { title: "Jobs", href: "/jobs" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#7F82BB] to-[#75F94D] flex items-center justify-center">
                <span className="text-white font-bold">RN</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">ResumeNest</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.subItems ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                    {link.title}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to={link.href} className="w-full">{link.title} Overview</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {link.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        <Link to={subItem.href} className="w-full">{subItem.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.title}
                </Link>
              )
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AptosWalletButton variant="outline" />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata.avatar_url || ""} alt={user.email || ""} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Account</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex w-full cursor-pointer items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            <div className="md:hidden">
              <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {navLinks.map((link) => (
                    link.subItems ? (
                      <DropdownMenuSub key={link.href}>
                        <DropdownMenuSubTrigger>{link.title}</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem asChild>
                            <Link to={link.href}>{link.title} Overview</Link>
                          </DropdownMenuItem>
                          {link.subItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.href} asChild>
                              <Link to={subItem.href}>{subItem.title}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link to={link.href}>{link.title}</Link>
                      </DropdownMenuItem>
                    )
                  ))}
                  {!user && (
                    <DropdownMenuItem asChild>
                      <Link to="/auth">Sign In</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
