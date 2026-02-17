import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified Background - just gradient, no heavy grid */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Ambient glow lights */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-5 md:space-y-7">
              <div className="space-y-3">
                <p className="text-muted-foreground text-base md:text-lg font-mono tracking-wide">Hi, I'm</p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                    Suraj Suthar
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground font-mono">
                  DevOps Engineer
                </h2>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Specializing in <span className="text-primary font-semibold">Linux</span>, <span className="text-primary font-semibold">Docker</span>, <span className="text-primary font-semibold">AWS</span>, <span className="text-primary font-semibold">Kubernetes</span>, <span className="text-primary font-semibold">Ansible</span>, and <span className="text-primary font-semibold">Jenkins</span>. 
                Building resilient cloud infrastructure and automating deployment pipelines.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base px-8 py-6"
                  onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore My Skills
                </Button>
                <a href="/Suraj_Resume.pdf" download="Suraj_Suthar_Resume.pdf">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8 py-6 w-full">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </a>
              </div>
              
              {/* Social buttons instead of icons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="https://github.com/Surajsuthar01" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-border/60 hover:border-primary hover:text-primary text-base px-6 py-5">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-border/60 hover:border-primary hover:text-primary text-base px-6 py-5">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Button>
                </a>
                <a href="mailto:surajsuthar0654@gmail.com">
                  <Button variant="outline" size="lg" className="border-border/60 hover:border-primary hover:text-primary text-base px-6 py-5">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-primary rounded-full blur-xl opacity-30"></div>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 border-primary/40 shadow-elegant bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <img 
                  src="/images/suraj-profile.png" 
                  alt="Suraj Suthar - DevOps Engineer" 
                  className="w-full h-full object-cover object-top scale-110 hover:scale-120 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-primary/10 rounded-full"></div>
              </div>
              
              {/* Orbiting tech badges */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 md:top-8 right-4 md:right-8 p-2 bg-primary/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-primary">K8s</span>
                </div>
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 p-2 bg-secondary/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-secondary">AWS</span>
                </div>
                <div className="absolute top-1/2 right-0 p-2 bg-primary/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-primary">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
