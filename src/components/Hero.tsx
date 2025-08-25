import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import surajProfile from "@/assets/suraj-profile.png";
import FloatingLogos from "./FloatingLogos";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          {/* Matrix-like grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 md:grid-cols-12 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-b border-primary/10 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Tech Elements */}
      <FloatingLogos section="hero" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-in-left order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm md:text-lg font-mono tracking-wide">Hi, I'm</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite] bg-clip-text text-transparent">
                    Suraj Suthar
                  </span>
                </h1>
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground font-mono border-r-2 border-primary animate-typewriter">
                    DevOps Engineer
                  </h2>
                </div>
              </div>
              
              <p className="text-sm md:text-lg text-muted-foreground max-w-2xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.5s' }}>
                Specializing in <span className="text-primary font-semibold">Linux</span>, <span className="text-primary font-semibold">Docker</span>, <span className="text-primary font-semibold">AWS</span>, <span className="text-primary font-semibold">Kubernetes</span>, <span className="text-primary font-semibold">Ansible</span>, and <span className="text-primary font-semibold">Jenkins</span>. 
                Building resilient cloud infrastructure and automating deployment pipelines.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group text-sm md:text-base"
                  onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Explore My Skills</span>
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm md:text-base">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
              
              <div className="flex gap-6 md:gap-8 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '1s' }}>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:shadow-glow group-hover:bg-gradient-primary/40 transition-all duration-300 hover:scale-110 border border-primary/20">
                    <Github className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:shadow-glow group-hover:bg-gradient-primary/40 transition-all duration-300 hover:scale-110 border border-primary/20">
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                </a>
                <a href="mailto:your.email@example.com" className="group">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:shadow-glow group-hover:bg-gradient-primary/40 transition-all duration-300 hover:scale-110 border border-primary/20">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-primary rounded-full blur-xl opacity-40 animate-glow-pulse"></div>
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden border-4 border-primary/40 shadow-elegant bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <img 
                  src="/lovable-uploads/7d75b1cd-eec9-42d5-b7b1-74e5e91bab41.png" 
                  alt="Suraj Suthar - DevOps Engineer" 
                  className="w-full h-full object-cover object-center scale-125 hover:scale-140 transition-transform duration-700"
                  style={{ 
                    filter: 'contrast(1.2) brightness(1.1) saturate(1.1)',
                    mixBlendMode: 'luminosity'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/20 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-primary/15 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              </div>
              
              {/* Orbiting tech badges */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 md:top-8 right-4 md:right-8 p-2 bg-primary/20 backdrop-blur-sm rounded-full animate-float">
                  <span className="text-xs font-bold text-primary">K8s</span>
                </div>
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 p-2 bg-secondary/20 backdrop-blur-sm rounded-full animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-xs font-bold text-secondary">AWS</span>
                </div>
                <div className="absolute top-1/2 right-0 p-2 bg-primary/20 backdrop-blur-sm rounded-full animate-float" style={{ animationDelay: '2s' }}>
                  <span className="text-xs font-bold text-primary">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-muted-foreground font-mono">Scroll Down</span>
            <ArrowDown className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;