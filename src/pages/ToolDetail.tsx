import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Wrench, Zap, Building, Users, TrendingUp } from "lucide-react";

const toolData = {
  "ansible": {
    name: "Ansible",
    category: "Automation",
    proficiency: 80,
    description: "A powerful automation platform that makes your applications and systems easier to deploy and maintain.",
    fullDescription: "Ansible is an open-source automation tool that automates software provisioning, configuration management, and application deployment. It connects to your nodes and pushes out small programs, which are executed over SSH by default, removing them when finished.",
    whyUsed: "Ansible is used because it simplifies complex tasks, reduces human error, and increases efficiency. It uses a simple, human-readable language (YAML) and doesn't require agents on target systems.",
    industryApplications: [
      "Configuration Management: Managing server configurations consistently across environments",
      "Application Deployment: Automating application deployments and updates",
      "Infrastructure Provisioning: Setting up cloud resources and virtual machines",
      "Security Compliance: Ensuring systems comply with security policies",
      "Orchestration: Coordinating complex workflows across multiple systems"
    ],
    keyFeatures: [
      "Agentless Architecture",
      "YAML-based Playbooks",
      "Idempotent Operations",
      "Multi-cloud Support",
      "Extensive Module Library",
      "Role-based Organization"
    ],
    benefits: [
      "Reduces deployment time from hours to minutes",
      "Eliminates configuration drift",
      "Improves system reliability and consistency",
      "Scales from few to thousands of nodes",
      "Integrates with existing tools and workflows"
    ],
    realWorldUse: "At enterprise level, Ansible is used to manage thousands of servers, deploy applications across multiple environments, and maintain consistent configurations. Companies like NASA, BMW, and Twitter use Ansible for their infrastructure automation.",
    learnMore: "https://docs.ansible.com/"
  },
  "kubernetes": {
    name: "Kubernetes",
    category: "Orchestration",
    proficiency: 75,
    description: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.",
    fullDescription: "Kubernetes (K8s) is a portable, extensible, open-source platform for managing containerized workloads and services. It facilitates both declarative configuration and automation, providing a framework to run distributed systems resiliently.",
    whyUsed: "Kubernetes is essential for modern application deployment because it provides automatic scaling, self-healing, service discovery, and rolling updates. It abstracts away infrastructure complexity and provides a consistent API across different environments.",
    industryApplications: [
      "Microservices Architecture: Managing complex distributed applications",
      "CI/CD Pipelines: Automated testing and deployment workflows",
      "Multi-cloud Deployment: Running applications across different cloud providers",
      "Auto-scaling: Automatically adjusting resources based on demand",
      "Service Mesh: Managing service-to-service communication"
    ],
    keyFeatures: [
      "Container Orchestration",
      "Automatic Scaling",
      "Self-healing Systems",
      "Service Discovery",
      "Rolling Updates",
      "Resource Management"
    ],
    benefits: [
      "Reduces infrastructure costs through efficient resource utilization",
      "Improves application availability and resilience",
      "Accelerates development and deployment cycles",
      "Provides consistent environments across dev, staging, and production",
      "Enables easy scaling from single instances to thousands"
    ],
    realWorldUse: "Used by companies like Google, Airbnb, and Spotify to manage their container infrastructure. Kubernetes powers everything from small startups to Fortune 500 companies, managing billions of containers daily.",
    learnMore: "https://kubernetes.io/docs/"
  },
  "terraform": {
    name: "Terraform",
    category: "Infrastructure as Code",
    proficiency: 70,
    description: "An open-source infrastructure as code software tool for building, changing, and versioning infrastructure safely and efficiently.",
    fullDescription: "Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. It can manage existing and popular service providers as well as custom in-house solutions using a declarative configuration language.",
    whyUsed: "Terraform enables Infrastructure as Code (IaC), allowing teams to define infrastructure in configuration files that can be versioned, shared, and reused. This approach improves consistency, reduces manual errors, and accelerates infrastructure provisioning.",
    industryApplications: [
      "Cloud Infrastructure: Provisioning AWS, Azure, GCP resources",
      "Multi-cloud Strategy: Managing resources across multiple cloud providers",
      "Disaster Recovery: Recreating infrastructure quickly in different regions",
      "Environment Consistency: Ensuring dev, staging, and prod environments match",
      "Cost Optimization: Managing resource lifecycle and preventing waste"
    ],
    keyFeatures: [
      "Declarative Configuration",
      "Multi-cloud Support",
      "State Management",
      "Resource Dependencies",
      "Plan and Apply Workflow",
      "Module System"
    ],
    benefits: [
      "Infrastructure versioning and rollback capabilities",
      "Reduced manual provisioning errors",
      "Faster environment setup and teardown",
      "Improved collaboration through shared configurations",
      "Cost control through infrastructure lifecycle management"
    ],
    realWorldUse: "Companies like Uber, Slack, and GitHub use Terraform to manage their cloud infrastructure. It's particularly valuable for organizations adopting multi-cloud strategies or those needing to rapidly scale infrastructure.",
    learnMore: "https://developer.hashicorp.com/terraform/docs"
  },
  "docker": {
    name: "Docker",
    category: "Containerization",
    proficiency: 80,
    description: "A platform for developing, shipping, and running applications using containerization technology.",
    fullDescription: "Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers. These containers can run consistently across different computing environments, from development laptops to production servers.",
    whyUsed: "Docker solves the 'it works on my machine' problem by ensuring applications run the same way everywhere. It enables microservices architecture, simplifies deployment, and improves resource utilization compared to traditional virtual machines.",
    industryApplications: [
      "Application Deployment: Packaging and deploying applications consistently",
      "Microservices: Breaking down monolithic applications into smaller services",
      "Development Environment: Creating consistent development environments",
      "CI/CD Pipelines: Building and testing applications in isolated environments",
      "Cloud Migration: Modernizing legacy applications for cloud deployment"
    ],
    keyFeatures: [
      "Container Runtime",
      "Image Management",
      "Dockerfile Configuration",
      "Multi-platform Support",
      "Resource Isolation",
      "Registry Integration"
    ],
    benefits: [
      "Faster application startup compared to VMs",
      "Consistent environments across development stages",
      "Improved resource utilization and cost efficiency",
      "Simplified application packaging and distribution",
      "Enhanced scalability and portability"
    ],
    realWorldUse: "Docker is used by millions of developers worldwide. Companies like Netflix, PayPal, and Spotify use Docker to deploy and scale their applications efficiently across their infrastructure.",
    learnMore: "https://docs.docker.com/"
  },
  "aws": {
    name: "Amazon Web Services",
    category: "Cloud",
    proficiency: 85,
    description: "A comprehensive and broadly adopted cloud platform offering over 200 fully featured services from data centers globally.",
    fullDescription: "Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon. It offers a broad set of global cloud-based products including compute, storage, databases, analytics, networking, mobile, developer tools, and more.",
    whyUsed: "AWS is chosen for its reliability, scalability, and comprehensive service offering. It enables organizations to reduce costs, increase agility, and innovate faster by providing on-demand access to computing resources without upfront infrastructure investment.",
    industryApplications: [
      "Web Applications: Hosting scalable web applications and websites",
      "Data Analytics: Processing and analyzing large datasets",
      "Machine Learning: Building and deploying ML models at scale",
      "Backup and Storage: Secure and durable data storage solutions",
      "Enterprise Applications: Running mission-critical business applications"
    ],
    keyFeatures: [
      "Global Infrastructure",
      "Comprehensive Service Portfolio",
      "Security and Compliance",
      "Scalability and Flexibility",
      "Cost Optimization Tools",
      "Developer-friendly APIs"
    ],
    benefits: [
      "Pay-as-you-use pricing model reduces upfront costs",
      "Global reach with 99+ availability zones worldwide",
      "Enterprise-grade security and compliance",
      "Rapid scaling to meet demand fluctuations",
      "Continuous innovation with new service releases"
    ],
    realWorldUse: "AWS powers some of the world's largest applications including Netflix, Airbnb, and NASA. From startups to Fortune 500 companies, millions of customers use AWS to lower costs and become more agile.",
    learnMore: "https://docs.aws.amazon.com/"
  }
};

const ToolDetail = () => {
  const { id } = useParams();
  const tool = toolData[id as keyof typeof toolData];

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
            <Wrench className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {tool.name}
          </h1>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-secondary/20 text-secondary">
            {tool.category}
          </Badge>
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Proficiency</span>
              <span className="text-sm font-mono text-primary">{tool.proficiency}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-1000"
                style={{ width: `${tool.proficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What is it */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Wrench className="h-6 w-6 text-primary" />
                  What is {tool.name}?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {tool.description}
                </p>
                <p className="text-foreground leading-relaxed">
                  {tool.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Why is it used */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Why is it Used in Industry?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {tool.whyUsed}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Key Benefits:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {tool.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Applications */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Building className="h-6 w-6 text-primary" />
                  Industry Applications
                </h2>
                <div className="space-y-4">
                  {tool.industryApplications.map((application, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-foreground font-medium">
                        {application.split(':')[0]}:
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {application.split(':')[1]}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real World Usage */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Real-World Usage
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.realWorldUse}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Features */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-in-right">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <div className="space-y-2">
                  {tool.keyFeatures.map((feature) => (
                    <Badge 
                      key={feature} 
                      variant="outline" 
                      className="w-full justify-start border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learn More */}
            <Card className="bg-gradient-card border-primary/20 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Learn More</h3>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <a href={tool.learnMore} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Official Documentation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;