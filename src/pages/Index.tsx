import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import LeetCode from "@/components/LeetCode";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen max-w-[1400px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24">
      <Navbar />
      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="education"><Education /></div>
      <div id="tech-stack"><TechStack /></div>
      <div id="certifications"><Certifications /></div>
      <div id="leetcode"><LeetCode /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  );
};

export default Index;
