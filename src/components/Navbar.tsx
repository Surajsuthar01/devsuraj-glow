import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((item) => item.id);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
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
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full px-5 py-1.5 hidden md:block ${
          isScrolled
            ? "bg-background/70 backdrop-blur-xl border border-primary/10 shadow-md"
            : "bg-background/40 backdrop-blur-md border border-white/10"
        }`}
      >
        <div className="flex items-center gap-1.5">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-full ${
                  isActive
                    ? "text-secondary bg-secondary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="w-px h-4 bg-border/40 mx-1" />

          <a
            href="https://github.com/Surajsuthar01"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/40"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/40"
          >
            LinkedIn
          </a>

          <a
            href="/Suraj_Resume.pdf"
            download="Suraj_Suthar_Resume.pdf"
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/40"
          >
            Resume
          </a>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-1 px-3 py-1.5 text-sm font-medium rounded-full border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all duration-200 flex items-center gap-1.5"
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

      {/* Mobile Toggle Button */}
      <div className="fixed top-3 right-3 z-[60] block md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-full bg-background/70 backdrop-blur-xl border border-primary/20 shadow-md"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative z-50 flex flex-col items-center justify-center h-full gap-3">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 text-base font-medium rounded-full transition-all ${
                    isActive
                      ? "text-secondary bg-secondary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="w-16 h-px bg-border/40 my-2" />

            <a
              href="https://github.com/Surajsuthar01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-muted-foreground hover:text-foreground"
            >
              LinkedIn
            </a>

            <a
              href="/Suraj_Resume.pdf"
              download="Suraj_Suthar_Resume.pdf"
              className="text-base text-muted-foreground hover:text-foreground"
            >
              Resume
            </a>

            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                setMobileOpen(false);
              }}
              className="mt-2 px-4 py-2 text-base font-medium rounded-full border border-secondary/30 text-secondary hover:bg-secondary/10 flex items-center gap-2"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
