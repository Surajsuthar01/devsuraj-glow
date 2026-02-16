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
          ? "bg-background/90 backdrop-blur-xl border-b border-secondary/10 shadow-lg"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Left: Nav links */}
          <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto scrollbar-hide">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 lg:px-4 py-2 text-[15px] font-medium transition-all duration-300 whitespace-nowrap rounded-lg ${
                    isActive
                      ? "text-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: External links + theme toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://github.com/Surajsuthar01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/Suraj_Resume.pdf"
              download="Suraj_Suthar_Resume.pdf"
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-3 px-5 py-2 text-[15px] font-medium rounded-full border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all duration-300 flex items-center gap-2"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>

        {/* Bottom border glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      </div>
    </nav>
  );
};

export default Navbar;
