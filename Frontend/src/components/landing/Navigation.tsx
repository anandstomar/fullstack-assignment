import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/", section: null },
    { label: "Services", to: "#services", section: "services" },
    { label: "About", to: "#about", section: "about" },
    { label: "Projects", to: "#projects", section: "projects" },
    { label: "Best Proposals", to: "#proposals", section: "proposals" },
  ];

  const scrollToSection = (sectionId: string | null) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              {/* Logo can be an img or svg here if needed */}
              
              <img src="./logo.svg" alt="logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.section)}
                className={`text-[#2d3a4a] hover:text-blue-700 transition-colors font-medium ${link.label === "Home" ? "font-bold text-blue-700" : ""}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-2 ml-2 shadow"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="ml-2">
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.section)}
                  className={`block w-full text-left px-3 py-2 text-[#2d3a4a] hover:text-blue-700 transition-colors font-medium ${link.label === "Home" ? "font-bold text-blue-700" : ""}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-2 mt-2"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
              <Link to="/admin" className="block px-3 py-2">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};