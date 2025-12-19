import { Hero } from "@/components/landing/Hero";
import { NotYourAverageRealtor } from "@/components/landing/NotYourAverageRealtor";
import { Projects } from "@/components/landing/Projects";
import { Navigation } from "@/components/landing/Navigation";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { AboutUs } from "@/components/landing/AboutUs";
import { HappyClients } from "@/components/landing/HappyClients";
import { ImageGridSection } from "@/components/landing/ImageGridSection";
import { ListingProcessSection } from "@/components/landing/ListingProcessSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <NotYourAverageRealtor />
      <WhyChooseUs />
      <ImageGridSection />
      <AboutUs />
      <Projects />
      <HappyClients />
      <ListingProcessSection />
     
    </div>
  );
};

export default Index;