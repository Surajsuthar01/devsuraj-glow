import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "certifications", label: "Certifications" },
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-2 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg"
          : "bg-background/50 backdrop-blur-md border border-border/20"
      }`}
    >
      <div className="flex items-center gap-2">
        {/* Nav links */}
        {navLinks.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-full ${
                isActive
                  ? "text-secondary bg-secondary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-6 bg-border/40 mx-2" />

        {/* External links */}
        <a
          href="https://github.com/Surajsuthar01"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-full hover:bg-muted/50"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-full hover:bg-muted/50"
        >
          LinkedIn
        </a>
        <a
          href="/Suraj_Resume.pdf"
          download="Suraj_Suthar_Resume.pdf"
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap rounded-full hover:bg-muted/50"
        >
          Resume
        </a>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="ml-1 px-4 py-2 text-sm font-medium rounded-full border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all duration-300 flex items-center gap-2"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
