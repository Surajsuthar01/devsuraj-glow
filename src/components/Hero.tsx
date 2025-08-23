import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-in-left">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-lg font-mono">Hi, I'm</p>
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
                  Suraj Suthar
                </h1>
                <div className="relative">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-foreground overflow-hidden whitespace-nowrap border-r-2 border-primary animate-typewriter font-mono">
                    Kubernetes Specialist
                  </h2>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
                Specializing in Linux, Docker, AWS, Kubernetes, Ansible, Jenkins and infrastructure automation 
                with a passion for building resilient cloud solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group">
                  <span>View My Work</span>
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
              
              <div className="flex gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '1s' }}>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-full blur-lg opacity-30 animate-glow-pulse"></div>
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-card">
                <div className="w-full h-full bg-gradient-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">SS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;