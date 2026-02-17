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
    <section className="py-12 md:py-20 relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* About Content */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-primary bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  I'm a passionate DevOps Engineer and System Administrator with extensive expertise in cloud technologies, 
                  infrastructure automation, and full-stack development. My journey in technology is driven by a deep 
                  fascination with creating robust, scalable systems that bridge the gap between development and operations.
                </p>
                <p>
                  With an academic foundation in Computer Science and practical experience in enterprise-grade solutions, 
                  I've cultivated a comprehensive skill set spanning multiple domains. My approach combines traditional 
                  system administration with modern DevOps practices, ensuring that infrastructure not only meets current 
                  needs but scales seamlessly for future growth.
                </p>
                <p>
                  As a Red Hat Certified System Administrator (RHCSA), I specialize in Linux system management, security 
                  hardening, and performance optimization. My expertise extends across AWS cloud services, Docker 
                  containerization, Kubernetes orchestration, CI/CD pipeline design with Jenkins, and infrastructure 
                  as code using Terraform and Ansible. I believe in automation-first approaches that eliminate manual 
                  errors and accelerate deployment cycles.
                </p>
                <p>
                  My GitHub portfolio showcases a diverse range of projects that demonstrate my technical versatility. 
                  I've developed containerized Flask applications with Docker integration, built comprehensive Django-based 
                  note management systems, and created sophisticated voting applications using C# and .NET frameworks. 
                  My expense tracking tools incorporate modern database design patterns and RESTful API architectures.
                </p>
                <p>
                  Beyond application development, I've implemented complex infrastructure solutions including multi-environment 
                  Kubernetes clusters, automated deployment pipelines, and cloud-native monitoring systems. My Terraform 
                  configurations manage everything from AWS VPC setups to auto-scaling groups, while my Ansible playbooks 
                  ensure consistent server configurations across development, staging, and production environments.
                </p>
                <p>
                  My programming proficiency spans multiple languages and frameworks - from Python and Flask for rapid 
                  prototyping to Java and C++ for performance-critical applications. I've implemented complex data structures, 
                  algorithms, and system designs that demonstrate both theoretical knowledge and practical application. 
                  My Bash automation scripts streamline repetitive operations and enhance operational efficiency.
                </p>
                <p>
                  What truly excites me about DevOps is the continuous evolution of the field. Whether I'm designing 
                  fault-tolerant microservices architectures, implementing advanced monitoring with Prometheus and Grafana, 
                  or optimizing CI/CD workflows for faster time-to-market, I approach each challenge with curiosity and 
                  a commitment to best practices. I'm passionate about creating systems that not only work today but 
                  adapt and scale for tomorrow's requirements.
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