import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cloud, Container, Settings, Monitor, Code } from "lucide-react";
import FloatingLogos from "./FloatingLogos";

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
    <section className="py-12 md:py-20 relative">
      <FloatingLogos section="about" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* About Content */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-primary bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
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
                <p>
                  Throughout my journey, I've developed numerous projects showcasing my diverse skill set. 
                  From creating containerized Flask applications and Django-based notes systems to building 
                  voting applications in C# and expense tracking tools, I enjoy tackling challenges across 
                  the full technology stack. My repository includes automation scripts in Bash, Kubernetes 
                  configurations, Terraform infrastructure definitions, and data structure implementations 
                  in C++ and Java.
                </p>
                <p>
                  What drives me is the intersection of development and operations - creating seamless workflows 
                  that bridge the gap between code and production. Whether it's designing CI/CD pipelines, 
                  orchestrating containerized services, or optimizing cloud infrastructure for performance and 
                  cost-effectiveness, I'm passionate about building systems that scale and empower development teams.
                </p>
              </div>
            </div>
            
            {/* Personal Info */}
            <Card className="bg-gradient-card border-primary/10 shadow-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">Jaipur, Rajasthan, India</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium break-all">surajsuthar0654@gmail.com</p>
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
            <h3 className="text-xl md:text-2xl font-bold text-center lg:text-left mb-6 md:mb-8">What I Specialize In</h3>
            
            <div className="grid gap-4 md:gap-6">
              {specializations.map((spec, index) => (
                <Card 
                  key={spec.title}
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-primary/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                          <spec.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
                        <h4 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {spec.title}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {spec.description}
                        </p>
                        <div className="flex flex-wrap gap-1 md:gap-2">
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