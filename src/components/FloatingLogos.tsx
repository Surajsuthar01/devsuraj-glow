import { 
  Server, 
  Cloud, 
  Database, 
  Settings, 
  Code, 
  GitBranch, 
  Shield, 
  Cpu, 
  HardDrive, 
  Network,
  Container,
  Layers,
  Terminal,
  Zap,
  Globe,
  Lock
} from "lucide-react";

const techIcons = [
  Server, Cloud, Database, Settings, Code, GitBranch, 
  Shield, Cpu, HardDrive, Network, Container, Layers,
  Terminal, Zap, Globe, Lock
];

const FloatingLogos = ({ section = "hero" }: { section?: string }) => {
  const getPositionClass = (index: number) => {
    const positions = [
      "top-10 left-10", "top-20 right-20", "top-40 left-1/4", "top-60 right-1/3",
      "bottom-40 left-20", "bottom-20 right-10", "bottom-32 left-1/3", "bottom-60 right-1/4",
      "top-1/3 left-10", "top-2/3 right-10", "top-1/4 right-40", "bottom-1/4 left-40",
      "top-1/2 left-1/4", "top-1/3 right-1/4", "bottom-1/3 left-1/2", "bottom-1/2 right-1/3"
    ];
    return positions[index % positions.length];
  };

  const getAnimationDelay = (index: number) => `${(index * 0.5) % 4}s`;
  
  const getSize = (index: number) => {
    const sizes = ["w-12 h-12", "w-16 h-16", "w-10 h-10", "w-20 h-20"];
    return sizes[index % sizes.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map((Icon, index) => (
        <div
          key={index}
          className={`absolute ${getPositionClass(index)} p-2 md:p-3 bg-card/20 backdrop-blur-sm rounded-lg border border-primary/10 animate-float opacity-60 hover:opacity-100 transition-opacity duration-300`}
          style={{ 
            animationDelay: getAnimationDelay(index),
            animationDuration: `${3 + (index % 3)}s`
          }}
        >
          <Icon className={`${getSize(index)} text-primary/60 animate-pulse`} 
                style={{ animationDelay: `${index * 0.2}s` }} />
        </div>
      ))}
      
      {/* Additional animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id={`line-gradient-${section}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Curved connecting lines */}
        <path
          d="M50,100 Q200,50 400,150 T800,200"
          stroke={`url(#line-gradient-${section})`}
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <path
          d="M100,300 Q300,200 600,350 T1000,400"
          stroke={`url(#line-gradient-${section})`}
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        />
        <path
          d="M0,500 Q400,400 800,500 T1200,600"
          stroke={`url(#line-gradient-${section})`}
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '6s' }}
        />
        
        {/* Orbiting circles */}
        <circle
          cx="200"
          cy="200"
          r="3"
          fill="hsl(var(--primary))"
          opacity="0.5"
          className="animate-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 200 200;360 200 200"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="600"
          cy="400"
          r="2"
          fill="hsl(var(--secondary))"
          opacity="0.4"
          className="animate-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="360 600 400;0 600 400"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      
      {/* Particle system */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary/30 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingLogos;