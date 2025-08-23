import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FloatingLogos from "./FloatingLogos";

const techStack = [
  {
    id: "ansible",
    name: "Ansible",
    icon: "https://cdn.worldvectorlogo.com/logos/ansible.svg",
    proficiency: 80,
    category: "Automation"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "https://cdn.worldvectorlogo.com/logos/kubernets.svg",
    proficiency: 75,
    category: "Orchestration"
  },
  {
    id: "terraform",
    name: "Terraform",
    icon: "https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg",
    proficiency: 70,
    category: "IaC"
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: "https://cdn.worldvectorlogo.com/logos/jenkins-1.svg",
    proficiency: 75,
    category: "CI/CD"
  },
  {
    id: "prometheus",
    name: "Prometheus",
    icon: "https://cdn.worldvectorlogo.com/logos/prometheus.svg",
    proficiency: 85,
    category: "Monitoring"
  },
  {
    id: "grafana",
    name: "Grafana",
    icon: "https://cdn.worldvectorlogo.com/logos/grafana.svg",
    proficiency: 85,
    category: "Visualization"
  },
  {
    id: "docker",
    name: "Docker",
    icon: "https://cdn.worldvectorlogo.com/logos/docker.svg",
    proficiency: 80,
    category: "Containerization"
  },
  {
    id: "aws",
    name: "AWS",
    icon: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
    proficiency: 85,
    category: "Cloud"
  },
  {
    id: "git",
    name: "Git",
    icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
    proficiency: 90,
    category: "Version Control"
  },
  {
    id: "linux",
    name: "Linux",
    icon: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg",
    proficiency: 90,
    category: "Operating System"
  }
];

const TechStack = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background with floating logos */}
      <FloatingLogos section="tech-stack" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 id="tech-stack" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            DevOps Tools & Technologies
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized expertise in the latest DevOps technologies and infrastructure management tools.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {techStack.map((tech, index) => (
            <Card 
              key={tech.id} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-primary/10 animate-bounce-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/tool/${tech.id}`}>
                <CardContent className="p-4 md:p-6 text-center space-y-3 md:space-y-4 relative">
                  <div className="relative mx-auto w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 delay-300"
                        style={{ width: `${tech.proficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{tech.proficiency}%</span>
                  </div>
                  
                  <ArrowRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Click to learn more</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;