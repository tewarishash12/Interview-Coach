import HeroSection from "./components/HeroSection";
import FeatureHighlights from "./components/FeaturedHighlights";
import FAQAccordion from "./components/FAQAccordion";
import FeedbackForm from "./components/FeedbackForm";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureHighlights />
      <FAQAccordion />
      <FeedbackForm />
    </div>
  );
}
