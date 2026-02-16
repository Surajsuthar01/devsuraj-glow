import { useState, useEffect } from "react";
import { Home, User, Layers, Award, GraduationCap, Mail } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "tech-stack", label: "Skills", icon: Layers },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "education", label: "Edu", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map((item) => item.id);
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
    setIsExpanded(false);
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "top-3" : "top-5"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`relative flex items-center gap-1 px-2 py-2 rounded-full border border-border/50 backdrop-blur-xl transition-all duration-500 ease-out ${
          isExpanded
            ? "bg-card/80 shadow-elegant px-4"
            : "bg-card/60 shadow-card"
        }`}
      >
        {/* Glow effect behind */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-[0.07] blur-xl -z-10" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "text-primary-foreground bg-gradient-primary shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isExpanded ? "max-w-[60px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
