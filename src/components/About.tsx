import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cloud, Container, Settings, Monitor, Code } from "lucide-react";

const specializations = [
  {
    icon: Server,
    title: "Linux Administration",
    description: "RHCSA-certified Linux expert specializing in system setup, security hardening, and performance optimization.",
    skills: ["System Administration", "Security Hardening", "Performance Tuning", "RHEL/CentOS"]
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS cloud solutions including EC2, S3, VPC, IAM with security best practices and monitoring.",
    skills: ["AWS EC2", "S3", "VPC", "IAM", "CloudWatch"]
  },
  {
    icon: Settings,
    title: "Infrastructure as Code",
    description: "Automating infrastructure with Terraform and configuration management with Ansible for consistent environments.",
    skills: ["Terraform", "Ansible", "CloudFormation", "Pulumi"]
  },
  {
    icon: Container,
    title: "Containerization",
    description: "Docker containerization and Kubernetes orchestration for scalable, portable application deployments.",
    skills: ["Docker", "Kubernetes", "Helm", "Container Security"]
  },
  {
    icon: Code,
    title: "CI/CD Pipeline Design",
    description: "Creating efficient Jenkins pipelines for continuous integration, testing, and deployment workflows.",
    skills: ["Jenkins", "GitLab CI", "GitHub Actions", "Pipeline Design"]
  },
  {
    icon: Monitor,
    title: "Monitoring & Observability",
    description: "Implementing Prometheus and Grafana for comprehensive system monitoring and visualization.",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Alerting"]
  }
];

const About = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* About Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a DevOps Engineer and System Administrator with expertise in cloud technologies 
                  and infrastructure automation.
                </p>
                <p>
                  With a background in Computer Science and a passion for automation, I've developed 
                  a strong foundation in Linux systems, containerization, and cloud infrastructure. 
                  I believe in creating efficient, reliable systems that empower teams to deliver 
                  better software faster.
                </p>
                <p>
                  As a Red Hat Certified System Administrator (RHCSA), I specialize in building and 
                  maintaining robust infrastructure solutions. My expertise spans across AWS cloud services, 
                  Docker containerization, Kubernetes orchestration, CI/CD pipelines with Jenkins, 
                  and infrastructure as code with Terraform and Ansible.
                </p>
              </div>
            </div>
            
            {/* Personal Info */}
            <Card className="bg-gradient-card border-primary/10 shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">Jaipur, Rajasthan, India</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">surajsuthar0654@gmail.com</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <p className="font-medium">devsuraj.online</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Degree:</span>
                    <p className="font-medium">B.Tech, Computer Science</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Specializations */}
          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-2xl font-bold text-center lg:text-left mb-8">What I Specialize In</h3>
            
            <div className="grid gap-6">
              {specializations.map((spec, index) => (
                <Card 
                  key={spec.title}
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-primary/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                          <spec.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {spec.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {spec.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {spec.skills.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;