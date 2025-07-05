import HeroSection from "@/app/components/HeroSection";
import FeatureHighlights from "@/app/components/FeaturedHighlights";
import FAQAccordion from "./components/FAQAccordion";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureHighlights />
      <FAQAccordion />
    </div>
  );
}
