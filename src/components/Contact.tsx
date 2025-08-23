import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import FloatingLogos from "./FloatingLogos";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "surajsuthar0654@gmail.com",
    href: "mailto:surajsuthar0654@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6350692701",
    href: "tel:+916350692701"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jaipur, Rajasthan, India",
    href: null
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/suraj-suthar-7a088a28b/",
    color: "hover:text-blue-500"
  },
  {
    icon: Github,
    label: "GitHub", 
    href: "https://github.com/Surajsuthar01/",
    color: "hover:text-foreground"
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:surajsuthar0654@gmail.com",
    color: "hover:text-primary"
  }
];

const Contact = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      <FloatingLogos section="contact" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Feel free to contact me for any inquiries or opportunities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">Let's Connect</h3>
              <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                I'm always interested in discussing new opportunities, 
                collaborating on exciting projects, or just having a chat about DevOps and cloud technologies.
              </p>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.label}
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-primary/10 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300 flex-shrink-0">
                        <info.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="font-medium text-foreground hover:text-primary transition-colors text-sm md:text-base break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground text-sm md:text-base break-words">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-base md:text-lg font-semibold text-foreground">Follow Me</h4>
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className={`border-primary/20 hover:border-primary hover:shadow-glow transition-all duration-300 ${social.color} w-10 h-10 md:w-12 md:h-12`}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-gradient-card border-primary/10 shadow-card animate-slide-in-right">
            <CardContent className="p-4 md:p-6">
              <form className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs md:text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      placeholder="Enter your name"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs md:text-sm font-medium text-foreground">
                      Your Email
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs md:text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    placeholder="What's this about?"
                    className="bg-background/50 border-primary/20 focus:border-primary transition-colors text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs md:text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Tell me more about your project or inquiry..."
                    rows={5}
                    className="bg-background/50 border-primary/20 focus:border-primary transition-colors resize-none text-sm"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group text-sm md:text-base"
                >
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;