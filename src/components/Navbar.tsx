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
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "top-4" : "top-6"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`relative flex items-center gap-1.5 rounded-full border border-primary/20 backdrop-blur-2xl transition-all duration-500 ease-out ${
          isExpanded
            ? "bg-background/90 shadow-elegant px-6 py-3"
            : "bg-background/70 shadow-card px-4 py-3"
        }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-[0.08] blur-2xl -z-10" />
        <div className="absolute inset-0 rounded-full border border-primary/10 -z-10" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-primary-foreground bg-gradient-primary shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isExpanded ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0"
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
