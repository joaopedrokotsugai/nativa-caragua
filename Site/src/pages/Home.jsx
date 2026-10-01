import Hero from "../components/Hero";
import WhyAttention from "../components/WhyAttention";
import HowToHelp from "../components/HowToHelp";
import { usePageTitle } from "../lib/usePageTitle";

function Home() {
  usePageTitle("");
  return (
    <>
      <Hero />
      <WhyAttention />
      <HowToHelp />
    </>
  );
}

export default Home;
