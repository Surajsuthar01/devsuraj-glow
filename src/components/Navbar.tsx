import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "certifications", label: "Certifications" },
  { id: "leetcode", label: "LeetCode" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: Nav links */}
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-md ${
                    isActive
                      ? "text-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-secondary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: External links + theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Surajsuthar01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/Suraj_Resume.pdf"
              download="Suraj_Suthar_Resume.pdf"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 px-4 py-1.5 text-sm font-medium rounded-full border border-secondary/40 text-secondary hover:bg-secondary/10 transition-all duration-300 flex items-center gap-1.5"
            >
              {theme === "light" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )}
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
