import { Card, CardContent } from "@/components/ui/card";

const techStack = [
  {
    name: "Ansible",
    icon: "https://cdn.worldvectorlogo.com/logos/ansible.svg",
    proficiency: 80,
    category: "Automation"
  },
  {
    name: "Kubernetes",
    icon: "https://cdn.worldvectorlogo.com/logos/kubernets.svg",
    proficiency: 75,
    category: "Orchestration"
  },
  {
    name: "Terraform",
    icon: "https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg",
    proficiency: 70,
    category: "IaC"
  },
  {
    name: "Jenkins",
    icon: "https://cdn.worldvectorlogo.com/logos/jenkins-1.svg",
    proficiency: 75,
    category: "CI/CD"
  },
  {
    name: "Prometheus",
    icon: "https://cdn.worldvectorlogo.com/logos/prometheus.svg",
    proficiency: 85,
    category: "Monitoring"
  },
  {
    name: "Grafana",
    icon: "https://cdn.worldvectorlogo.com/logos/grafana.svg",
    proficiency: 85,
    category: "Visualization"
  },
  {
    name: "Docker",
    icon: "https://cdn.worldvectorlogo.com/logos/docker.svg",
    proficiency: 80,
    category: "Containerization"
  },
  {
    name: "AWS",
    icon: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
    proficiency: 85,
    category: "Cloud"
  },
  {
    name: "Git",
    icon: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
    proficiency: 90,
    category: "Version Control"
  },
  {
    name: "Linux",
    icon: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg",
    proficiency: 90,
    category: "Operating System"
  }
];

const TechStack = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            DevOps Tools & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized expertise in the latest DevOps technologies and infrastructure management tools.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techStack.map((tech, index) => (
            <Card 
              key={tech.name} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-primary/10 animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative mx-auto w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;