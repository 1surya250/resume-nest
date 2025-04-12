
import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ThemeProvider } from "../theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

export function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="resumenest-theme">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">
          <ScrollArea className="h-full">
            <Outlet />
          </ScrollArea>
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
